import pl from 'date-fns/esm/locale/pl/index.js';
import React, { useEffect, useRef } from 'react';
import Two from 'two.js';
import vegaEmbed from "vega-embed";

export default function MarkRecapture() {
  var domElement = useRef();

  useEffect(setup, []);

  function setup() {
    var two = new Two({ width: 300, height: 300 }).appendTo(domElement.current);
    // Border
    var border = two.makeRectangle(0, 0, two.width, two.height);
    border.translation.set(two.width/2, two.height/2)
    border.linewidth = 4
    border.stroke = '#ecf0f1'

    // Cage
    var cage = two.makeRectangle(0, 0, two.width/2, two.height/2);
    cage.translation.set(two.width/2, two.height/2)
    cage.linewidth = 1.5
    cage.stroke = '#e67e22'

    // SETTINGS
    var P_COLOR = ['#3498db', '#e67e22', '#1abc9c', '#9b59b6', '#34495e', '#2ecc71', '#9AECDB', '#F97F51']
    let pop_size = 250;
    var t0 = 0;
    var nb_cap = 0;
    var reset_cap = 10;


    function rand(min, max) {
        return Math.random() * (max - min) + min;
    }

    function choose(choices) {
        var index = Math.floor(Math.random() * choices.length);
        return choices[index];
    }

    // two has convenience methods to create shapes.
    var createParticle = function (x,y, id) {
        let particle = two.makeCircle(x, y, 2);
        particle.fill = P_COLOR[0];
        particle.stroke = P_COLOR[0]; // Accepts all valid css color
        let mean = 8;
        let std = 5;
        let v_x_sign = choose([-1,1]);
        let v_y_sign = choose([-1,1]);
        return {
            particle: particle,
            v: {
                x: mean*v_x_sign + std*rand(-1, 1),
                y: mean*v_y_sign + std*rand(-1, 1)
            },
            k: 0,
            id:id
        };
    }

    var collision = function (p) {
        // bottom
        if(p.particle.position.y + p.particle.radius > two.height){
            p.particle.position.y = two.height - p.particle.radius;
            p.v.y = -p.v.y;
        }
        // top
        if(p.particle.position.y - p.particle.radius< 0){
            p.particle.position.y = p.particle.radius;
            p.v.y = -p.v.y;
        }
        //left
        if(p.particle.position.x - p.particle.radius < 0){
            p.particle.position.x = p.particle.radius;
            p.v.x = -p.v.x;
        }
        //right
        if(p.particle.position.x + p.particle.radius > two.width){
            p.particle.position.x = two.width - p.particle.radius;
            p.v.x = -p.v.x;
        }
    }

    let particles = [];
    let part_capt = [];
    for (let i=0; i<pop_size; i++){
        part_capt.push(0)
        particles.push(createParticle(
            two.width*Math.random(),
            two.height*Math.random(),
            i
        ))
    }

    let captured_counts = 0;
    var capture = function (){
        cage.position.x = rand(cage.width/2, two.width-cage.width/2);
        cage.position.y = rand(cage.height/2, two.height-cage.height/2);

        let newly_captured = 0;

        particles.forEach(function (p) {
            if ( Math.abs(p.particle.position.x-cage.position.x) < cage.width/2
                && Math.abs(p.particle.position.y-cage.position.y) < cage.height/2 ) {

                if (p.k === 0){
                    newly_captured += 1;
                }

                p.k += 1;
                p.particle.fill = P_COLOR[1];
                p.particle.stroke = P_COLOR[1];
            }
        })

        update_belief(newly_captured, captured_counts);
        plot();
    }

    


    let candidate_pop_sizes = [...Array(350).keys()].map(i => i + 100);
    let belief = [...Array(pop_size).keys()].map(i => 1.0);
    let sumBelief = belief.reduce((cum, curr)=>cum+curr, 0.);
    belief = belief.map(v => v/sumBelief);

    function binom(n, k) {
        let coeff = 1;
        let i;

        if (k < 0 || k > n) return 0;

        for (i = 0; i < k; i++) {
            coeff = coeff * (n - i) / (i + 1);
        }

        return coeff;
    }

    function hypergeom(N, n, k, K){
        return binom(K, k)*binom(N-K, n-k)/binom(N,n)
    }

    function update_belief (newly_capture, already_captured) {
        for (let i = 0; i < pop_size; i++) {
            let N = candidate_pop_sizes[i];
            let hypo_pop_size = N - already_captured;
            let likelihood = hypergeom(
                N,
                newly_capture+already_captured,
                newly_capture,
                hypo_pop_size);
            belief[i] = belief[i]* likelihood*0.1;
            if (isNaN(belief[i])){
                belief[i]=0
            }
        }
        let sum = belief.reduce((cum, curr)=>cum+curr, 0.);
        belief = belief.map(v => v/sum);
        captured_counts += newly_capture;
    }

    function plot (){
      let data = [];
      for(let i=0; i<pop_size; i++){
          data.push({
                "pop_size" : candidate_pop_sizes[i],
                "belief" : belief[i],
                "gt": pop_size
          })
      }
    
      var vlSpec = {
          $schema: "https://vega.github.io/schema/vega-lite/v4.json",
          "description": "A simple bar chart with embedded data.",
          "height":300,
          "data": {
              "values": data
          },
          "layer":[
              {
                  "mark": "bar",
                  "encoding": {
                      "x": {
                          "field": "pop_size",
                          "type": "quantitative",
                          "axis": {"labelAngle": -90},
                      },
    
                      "y": {
                          "field": "belief",
                          "type": "quantitative",
                      }}
              },
              {
                  "mark": "rule",
                  "encoding": {
                      "x": {"aggregate": "min", "field": "gt"},
                      "color": {"value": "red"},
                      "size": {"value": 2}
                  }
              }
          ]
      }
    
      var vlOpts = {width: 280, height:280, actions:false};
      vegaEmbed("#plot", vlSpec, vlOpts);
    }

    // Don't forget to tell two to render everything
    // to the screen
    two.bind('update', function(t) {
      if(t==0){
        plot()
      }
        if(t%2==0) {
            particles.forEach(function (p) {
                p.particle.position.y = p.particle.position.y + p.v.y * (t - t0) * 10e-2;
                p.particle.position.x = p.particle.position.x + p.v.x * (t - t0) * 10e-2;
                collision(p)
            })
            t0 = t;
        }
        if(nb_cap>=reset_cap){
            particles.forEach(function (p) {
                p.particle.fill = P_COLOR[0];
                p.particle.stroke = P_COLOR[0];
                p.k = 0;
                });

            belief = belief.map(i=>1.);
            let sumBelief = belief.reduce((cum, curr)=>cum+curr, 0.);
            belief = belief.map(v => v/sumBelief);
            nb_cap=0;
            captured_counts=0;
        }
        else if (t%100==0 && t!=0) {
          capture()
          nb_cap += 1;
        }
        
    }).play();  // Finally, start the animation loop

  }

  return (
  <div className='flex flex-row'>
    <div ref={domElement} />
    <div id='plot' />
  </div>
  );
}
