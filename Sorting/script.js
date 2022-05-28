let G = {
    DEBUG_MODE: false,
    isworking: false,
    speed: 10,
    number_of_bars: 0,
    maxHeight: Math.floor(window.innerHeight - $(".header").height()),
};
let arr = [];
let history_times = [];
let collection = document.getElementById("chartID");
let timer = document.getElementById("a-timer");

$("#myRange").val(10);
$("#myRange").on("click", function () {
    if (G.DEBUG_MODE == true) console.log($(this).val());
    G.speed = 40 - $(this).val();
});
/*-------------- script starts here ------------*/

$(() => start());

function start() {
    const w = $("#chartID").outerWidth();
    const bar_w = $("#sample-bar").outerWidth();
    G.number_of_bars = Math.floor(Math.ceil(w) / Math.ceil(bar_w)) - 1;
    if (G.DEBUG_MODE == true) console.log(w, bar_w, G.number_of_bars);
    Bars.initialize(G.number_of_bars, 0, G.maxHeight);

    timer = new Stopwatch(timer);

    $(".history").hide();
}
