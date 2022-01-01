import { useState, useEffect, useRef } from 'react';
import * as d3 from "d3";


export default function BackgroundPlot() {
  const [width, setWidth] = useState(0)
  const ref = useRef(null)

  useEffect(() => {
    setWidth(ref.current.clientWidth)
    plot({width})
    console.log(width)
  }, [width])

  return (<div ref={ref} id="background" className='w-full mt-1 mb-1'></div>);
}


function plot(size) {
  var n = 50,
    random = d3.random.normal(0, 0.2),
    data1 = d3.range(n).map(random),
    data2 = data1.map(function (d) {
      return d + random() * 0.6;
    });

  var margin = { top: 20, right: 0, bottom: 20, left: 0 },
    width = size.width - margin.left - margin.right,
    height = 100 - margin.top - margin.bottom;

  var x = d3.scale
    .linear()
    .domain([0, n - 1])
    .range([0, width]);

  var y = d3.scale.linear().domain([-1, 1]).range([height, 0]);

  var line = d3.svg
    .line()
    .x(function (d, i) {
      return x(i);
    })
    .y(function (d, i) {
      return y(d);
    })
    .interpolate("basis");
  
  d3.selectAll('#svg_plot').remove();  

  var svg = d3
    .select("#background")
    .append("svg")
    .attr("id", 'svg_plot')
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  svg
    .append("defs")
    .append("clipPath")
    .attr("id", "clip")
    .append("rect")
    .attr("width", width)
    .attr("height", height);

  var path1 = svg
    .append("g")
    .attr("clip-path", "url(#clip)")
    .append("path")
    .datum(data1)
    .attr("class", "fill-[none] stroke-[1.5px] stroke-black dark:stroke-white")
    .attr("d", line);

  svg
    .append("rect")
    .attr("x", width - width / 4)
    .attr("y", 0)
    .attr("width", width / 4)
    .attr("height", height)
    .attr("class", "fill-gray-50 dark:fill-gray-900");

  var path2 = svg
    .append("g")
    .attr("clip-path", "url(#clip)")
    .append("path")
    .datum(data2)
    .attr("class", "fill-[none] stroke-[1.5px] stroke-black dark:stroke-white")
    .attr("d", line)
    .style("stroke-opacity", 0.3);

  tick();

  function tick() {
    // push a new data point onto the back
    const rval1 = random() * 2;
    const rval2 = rval1 + random() * 0.6;

    data1.push(rval1);
    data2.push(rval2);

    // redraw the line, and slide it to the left
    path1
      .attr("d", line)
      .attr("transform", null)
      .transition()
      .duration(500)
      .ease("linear")
      .attr("transform", "translate(" + x(-1) + ",0)");

    path2
      .attr("d", line)
      .attr("transform", null)
      .transition()
      .duration(500)
      .ease("linear")
      .attr("transform", "translate(" + x(-1) + ",0)")
      .each("end", tick);

    // pop the old data point off the front
    data1.shift();
    data2.shift();
  }
}
