function linspace(startValue, stopValue, cardinality) {
  var arr = [];
  var step = (stopValue - startValue) / (cardinality - 1);
  for (var i = 0; i < cardinality; i++) {
    arr.push(startValue + step * i);
  }
  return arr;
}

function roots(num) {
  let polynomial = "0";
  for (let i = 0; i < num.length; i++) {
    polynomial = num[i] + "*x^" + i + "+" + polynomial;
  }
  let roots = [];
  let intermediate = nerdamer.solveEquations(polynomial, "x");
  for (let i = 0; i < intermediate.length; i++)
    roots.push(
      nerdamer(intermediate[i].toString(), { x: 0 }).evaluate().text()
    );
  return roots;
}

function transfer_function(num = [], den = []) {
  // Assuming num<denum
  let size = den.length - num.length;
  let tf = Array(size).fill(0);
  tf = [[...tf, ...num]];
  tf.push(den);
  return tf;
}
function compute_roots(tf, gains) {
  let rootsList = [],
    num = tf[0],
    denum = tf[1];
  for (let i = 0; i < gains.length; i++) {
    let gain = gains[i];
    let ch_eq = [];
    for (let j = 0; j < num.length; j++) ch_eq.push(denum[j] + num[j] * gain);
    let ch_roots = roots(ch_eq);
    ch_roots.sort();
    rootsList.push(ch_roots);
  }
  return rootsList;
}
function splitAndModify(rootsList) {
  console.log(rootsList);
  let newR = [];
  for (let i = 0; i < rootsList.length; i++) {
    let thisone = [];
    // iota wale pe tha mai aur problem lenght ka hai idhar re baba
    for (let j = 0; j < rootsList[0].length; j++) {
      let str = rootsList[i][j].replace("*", "");
      // console.log(str);
      let c = math.Complex(str);
      // console.log(c);
      thisone.push([c.re, c.im]);
    }
    newR.push(thisone);
  }
  console.log(newR);
  return newR;
}
function plot_root_locus(gains, rootsL) {
  let toPx = [],
    toPy = [];
  for (let i = 0; i < rootsL.length; i++) {
    toPx.push(rootsL[i][0][0]);
    toPy.push(rootsL[i][0][1]);
  }
  console.log(toPx, toPy);
  var trace2 = {
    x: toPx,
    y: toPy,
    mode: "lines+markers",
    type: "scatter",
  };
  Plotly.newPlot("plot-area", [trace2]);
}
let num = [1, 1];
let denum = [1, 9.5, 32];
let GH = transfer_function(num, denum);
console.log(GH);
let gains = linspace(0.0, 10.0, 10);
// console.log(gains);
let rootsList = compute_roots(GH, gains);
rootsList = splitAndModify(rootsList);
plot_root_locus(1, rootsList);
// fig, (ax = plot_root_locus(gains, roots));
//

// and
//https://plotly.com/javascript/reference/scatter/#scatter
