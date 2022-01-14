import React, { useEffect, useRef } from 'react';
import Two from 'two.js';

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

    two.bind('update', ()=>{}).play();
  }

  return <div ref={domElement} />;
}
