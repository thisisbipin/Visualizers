let G = {
    DEBUG_MODE: false,
    isworking: false,
    speed: 10,
    number_of_bars: 0,
    maxHeight: Math.floor(window.innerHeight - $('.header').height()),
}
let arr = [];
let collection = document.getElementById('chartID');

$('#myRange').val(10)
$("#myRange").on('click', function() {
    console.log($(this).val());
    G.speed = 40 - $(this).val();
});
/*-------------- script starts here ------------*/

$(() => start())

function start(){
    const w = $('#chartID').outerWidth();          
    const bar_w = $('#sample-bar').outerWidth();
    G.number_of_bars = Math.floor(Math.ceil(w)/ Math.ceil(bar_w));
    console.log(w,bar_w,G.number_of_bars);
    Bars.initialize(G.number_of_bars, 0, G.maxHeight);
}