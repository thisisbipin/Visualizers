function plot_root_locus(gains, rootsL) {
  $("#plot-area").empty();
  let configs = {
    scrollZoom: true,
    displaylogo: false,
  };
  let plots = [];
  for (let traceLine = 0; traceLine < rootsL.length; traceLine++) {
    var trace = {
      x: rootsL[traceLine][0],
      y: rootsL[traceLine][1],
      name: "Line " + (traceLine + 1),
      mode: "lines",
      type: "scatter",
    };
    plots.push(trace);
  }
  let layout = {
    title: "Root Locus",
    showlegend: true,
    // plot_bgcolor: "#292929",
    // paper_bgcolor: "#292929",
    font: {
      // color: "#ff  1,f",
    },
  };

  // Zeroes
  let zeroes = [];
  for (let i = 0; i < rootsL.length; i++)
    zeroes.push([rootsL[i][0][0], rootsL[i][1][0]]);
  zeroes = transpose(zeroes);
  console.log("Zeroes:", zeroes);
  let traceZ = {
    x: zeroes[0],
    y: zeroes[1],
    name: "Zeroes",
    mode: "markers",
    type: "scatter",
    marker: {
      size: 12,
      // shape: "line-ew",
    },
  };
  plots.push(traceZ);
  console.log(traceZ);

  // Poles
  let poles = [];
  for (let i = 0; i < rootsL.length; i++)
    poles.push([rootsL[i][0].slice(-1)[0], rootsL[i][1].slice(-1)[0]]);
  poles = transpose(poles);
  console.log("Poles:", poles);
  let traceP = {
    x: poles[0],
    y: poles[1],
    name: "Poles",
    mode: "markers",
    type: "scatter",
    marker: {
      size: 12,
      // shape: "line-ew",
    },
  };
  plots.push(traceP);
  console.log(traceP);
  Plotly.newPlot("plot-area", plots, layout, configs);
}
