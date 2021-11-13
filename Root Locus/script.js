let G = {
  DEBUG_MODE: false,
  THEME: "light",
  noOfGains: 10,
  maxGain: 10.0,
};
$(() => {
  let height = window.innerHeight - Math.ceil($(".header").outerHeight());
  $("#plot-area").height(height);
});

function plotIt() {
  let num = $("#num").val();
  let denum = $("#denum").val();
  num = num.split(",").map((x) => parseInt(x));
  denum = denum.split(",").map((x) => parseInt(x));
  //   console.log(num, denum);
  // num = [1, 3];
  // denum = [1, 13, 56, 92, 48, 0];

  let transfer_f_GH = transfer_function(num, denum);
  let gains = linspace(0.0, G.maxGain, G.noOfGains);
  let rootsList = compute_roots(transfer_f_GH, gains);
  plot_root_locus(1, rootsList);
}

// Update the current slider value (each time you drag the slider handle)
document.getElementById("myRange").oninput = function () {
  if (G.DEBUG_MODE == true) console.log("Speed Changed to:", G.algo_speed);
  G.noOfGains = this.value;
};
