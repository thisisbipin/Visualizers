let Bars =  {
    initialize(n, min, max) {
        if(G.DEBUG_MODE == true)
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
        if(G.DEBUG_MODE == true)
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
        if(G.DEBUG_MODE == true)
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
