async function wait(ms) {
    return new Promise(r => setTimeout( r, ms))
}
function toggleWorking() {
    let working = document.getElementById('working');
    if (G.isworking == true) {
        G.isworking = false;
        working.textContent = 'DONE';
    }
    else {
        G.isworking = true;
        let spinner = document.createElement('i');
        spinner.className = "fa-solid fa-spinner spin";
        // <i class="fa-duotone fa-spinner"></i>
        working.textContent = 'Working  ';
        working.appendChild(spinner);
    }
}
async function insertionsort() {
    if (G.isworking == true) {
        alert('Already Working...');
        return;
    }
    
    toggleWorking();

    for (let i = 0; i < arr.length; i++) {
        let key = arr[i];
        Bars.activeinterativeBar(i);
        let j = i - 1;
        while (j >= 0 && arr[j] > key) {
            Bars.activeBar(j);
            arr[j + 1] = arr[j];
            await wait(G.speed);
            Bars.inactiveBar(j);
            j--;
        }
        arr[j + 1] = key;
        await wait(G.speed*10);
        Bars.inactiveBar(i);
        Bars.updatebars();
    }

    //just traversing
    for (let i = 0; i < arr.length; i++) {
        Bars.activeinterativeBar(i);
        await wait(10);
        Bars.inactiveBar(i);
    }
    toggleWorking();
}

async function mergesort() {
    if (G.isworking == true) {
        alert('Already Working...');
        return;
    }
    toggleWorking();
    let low = 0, high = arr.length - 1;
    for (let m = 1; m <= high - low; m = 2 * m) {
        for (let k = low; k < high; k += 2 * m) {
            let l = k;
            let mid = k + m - 1;
            let r = Math.min(k + 2 * m - 1, high);

            /*----------- just merging ----------*/
            let i, j, temp = [];
            i = l;
            j = mid + 1;
            while (i <= mid && j <= r) {
                if (arr[i] < arr[j]) {
                    Bars.activeBar(i);
                    await wait(G.speed);
                    temp.push(arr[i++]);
                }
                else {
                    Bars.activeinterativeBar(j);
                    await wait(G.speed);
                    temp.push(arr[j++]);
                }
            }
            while (i <= mid) {
                Bars.activeBar(i);
                temp.push(arr[i++]);
            }
            while (j <= r) {
                Bars.activeinterativeBar(j);
                temp.push(arr[j++]);
            }
            // console.log(temp);
            for (i = l; i <= r; i++) {
                await wait(G.speed *10);
                Bars.inactiveBar(i);
                arr[i] = temp[i - l];
            }
            Bars.updatebars();
        }

        // await wait(100);
        Bars.updatebars();
    }
    //just traversing
    for (let i = 0; i < arr.length; i++) {
        Bars.activeinterativeBar(i);
        await wait(10);
        Bars.inactiveBar(i);
    }
    toggleWorking();
};

async function bubblesort() {
    if (G.isworking == true) {
        alert('Already Working...');
        return;
    }
    for(let i = 0; i < arr.length; i++){
        for (let j = 0; j < (arr.length - i - 1); j++) {
            if (arr[j] > arr[j + 1]) {

                // If the condition is true then swap them
                var temp = arr[j];
                Bars.activeinterativeBar(j);
                Bars.activeBar(j + 1);
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
                await wait(G.speed);
                Bars.inactiveBar(j);
                Bars.inactiveBar(j + 1);
                Bars.updatebars();
            }
        }
 }  
}