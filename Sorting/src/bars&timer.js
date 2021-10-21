let Bars = {
    initialize(n, min, max) {
        if (G.DEBUG_MODE == true)
            console.log('Initialize invoked');
        for (let i = 0; i < n; i++)
            this.createBar(i);
        G.number_of_bars = n;
        this.randomize(min, max);

    },

    updateBar(i, height) {
        $(`#bar${i}`).height(`${height}px`);
    },

    activeBar(i) {
        if (i < arr.length)
            $(`#bar${i}`).attr("class", 'active-bar');
    },

    inactiveBar(i) {
        if (i < arr.length)
            $(`#bar${i}`).attr("class", 'bar');
    },

    createBar(i) {
        let bar = document.createElement('div');
        bar.id = 'bar' + i;
        if (G.DEBUG_MODE == true)
            bar.textContent = i;
        bar.className = 'bar';
        bar.style = `height: ${arr[i]}px;`;

        collection.appendChild(bar);
    },
    activeinterativeBar(i) {
        $(`#bar${i}`).attr("class", 'iterative-bar');
    },

    updatebars() {
        for (let i = 0; i < arr.length; i++) {
            this.updateBar(i, arr[i]);
        }
    },
    randomize(min, max) {
        if (G.DEBUG_MODE == true)
            console.log('Randomize invoked');
        else if (G.isworking == true) {
            alert('Algorithm is working please wait!');
            return;
        }
        for (let i = 0; i < G.number_of_bars; i++)
            arr[i] = Math.floor(Math.random() * (max - min) + min);
        this.updatebars();
    }
};

class Stopwatch {
    constructor() {

        this.createTimer();
        this.interval = null;
        this.delay = 1;
        this.clocktime = 0;
        this.starttime = 0;
        this.reset();
    }

    // default options


    // private functions
    createTimer() {
        jQuery('<span>', { id: 'timer' }).html('0.000 s').appendTo('#timer-container');
    }
    start() {
        if (G.DEBUG_MODE == true)
            console.log('started!');
        if (!this.interval) {
            this.starttime = Date.now();
            this.interval = setInterval(() => this.clocktime = this.update(this.starttime), this.delay);
        }
    }

    stop(fromalgo) {
        if (G.DEBUG_MODE == true)
            console.log('stopped!');
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
            console.log(this.clocktime);
            if (this.clocktime / 1000 > 1) {
                history_times.push(this.clocktime / 1000);
                jQuery('<li>').html((this.clocktime / 1000).toFixed(3) + ' - ' + fromalgo).appendTo('.history');
            }
        }
    }

    update(st) {
        let now = Date.now();
        // this.clocktime =1000;
        let ct = now - st;
        $('#timer').html((ct / 1000).toFixed(3) + ' s');

        if (G.DEBUG_MODE == true)
            console.log('update!', (ct) / 1000);

        return ct;
    }

    reset() {
        if (G.DEBUG_MODE == true)
            console.log(this.starttime, this.clocktime)
        $('#timer').html('0.000');
    }
};
