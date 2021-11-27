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

  // Poles
  let Poles = [];
  for (let i = 0; i < rootsL.length; i++)
    Poles.push([rootsL[i][0].slice(-1)[0], rootsL[i][1].slice(-1)[0]]);
  Poles = transpose(Poles);
  let traceP = {
    x: Poles[0],
    y: Poles[1],
    name: "Poles",
    mode: "markers",
    type: "scatter",
    marker: {
      size: 12,
      symbol: "circle-open",
      line: {
        width: 3,
      },
    },
  };
  plots.push(traceP);

  // Zeroes
  let Zeroes = [];
  for (let i = 0; i < rootsL.length; i++)
    Zeroes.push([rootsL[i][0][0], rootsL[i][1][0]]);
  Zeroes = transpose(Zeroes);
  let traceZ = {
    x: Zeroes[0],
    y: Zeroes[1],
    name: "Zeroes",
    mode: "markers",
    type: "scatter",
    marker: {
      color: "black",
      size: 12,
      symbol: "x",
    },
  };
  plots.push(traceZ);
  console.log(traceZ);
  Plotly.newPlot("plot-area", plots, layout, configs);
}
