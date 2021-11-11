let num = [1, 1];
let denum = [1, 9.5, 32];
let GH = transfer_function(num, denum);
let gains = linspace(0.0, 10.0, 100);
let rootsList = compute_roots(GH, gains);
console.log(rootsList);
plot_root_locus(1, rootsList);
