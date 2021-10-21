async function wait(ms) {
    return new Promise(r => setTimeout(r, ms))
}
function toggleWorking(fromalgo) {
    let working = document.getElementById('working');
    if (G.isworking == true) {
        G.isworking = false;
        working.textContent = 'DONE';
        timer.stop(fromalgo);
    }
    else {
        G.isworking = true;
        let spinner = document.createElement('i');
        spinner.className = "fa-solid fa-spinner spin";
        // <i class="fa-duotone fa-spinner"></i>
        working.textContent = 'Working  ';
        working.appendChild(spinner);
        timer.reset();
        timer.start();
    }
}
async function insertionsort() {
    if (G.isworking == true) {
        alert('Already Working...');
        return;
    }

    toggleWorking('Insertion Sort');

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
        await wait(G.speed * 10);
        Bars.inactiveBar(i);
        Bars.updatebars();
    }

    toggleWorking('Insertion Sort');

    //just traversing
    for (let i = 0; i < arr.length; i++) {
        Bars.activeinterativeBar(i);
        await wait(10);
        Bars.inactiveBar(i);
    }
}

async function mergesort() {
    if (G.isworking == true) {
        alert('Already Working...');
        return;
    }
    toggleWorking('Merge Sort');
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
                await wait(G.speed * 10);
                Bars.inactiveBar(i);
                arr[i] = temp[i - l];
            }
            Bars.updatebars();
        }

        // await wait(100);
        Bars.updatebars();
    }

    toggleWorking('Merge Sort');

    //just traversing
    for (let i = 0; i < arr.length; i++) {
        Bars.activeinterativeBar(i);
        await wait(10);
        Bars.inactiveBar(i);
    }
};

async function bubblesort() {
    if (G.isworking == true) {
        alert('Already Working...');
        return;
    }
    toggleWorking('Bubble Sort');
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < (arr.length - i - 1); j++) {
            if (arr[j] > arr[j + 1]) {

                // If the condition is true then swap them
                var temp = arr[j];
                Bars.activeinterativeBar(j);
                Bars.activeBar(j + 1);
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
                await wait(G.speed * 10);
                Bars.inactiveBar(j);
                Bars.inactiveBar(j + 1);
                Bars.updatebars();
            } else {
                Bars.activeinterativeBar(j);
                Bars.activeinterativeBar(j + 1);
                await wait(G.speed * 10);
                Bars.inactiveBar(j);
                Bars.inactiveBar(j + 1);
                Bars.updatebars();
            }
        }
    }

    toggleWorking('Bubble Sort');

    //just traversing
    for (let i = 0; i < arr.length; i++) {
        Bars.activeinterativeBar(i);
        await wait(10);
        Bars.inactiveBar(i);
    }
}

function partition(items, left, right) {
    var pivot = items[Math.floor((right + left) / 2)], //middle element
        i = left, //left pointer
        j = right; //right pointer
    while (i <= j) {
        while (items[i] < pivot) {
            i++;
        }
        while (items[j] > pivot) {
            j--;
        }
        if (i <= j) {
            swap(items, i, j); //swap two elements
            i++;
            j--;
        }
    }
    return i;
}


function swap(leftIndex, rightIndex) {
    var temp = arr[leftIndex];
    arr[leftIndex] = arr[rightIndex];
    arr[rightIndex] = temp;
}
async function partition(left, right) {
    var pivot = arr[Math.floor((right + left) / 2)], //middle element
        i = left, //left pointer
        j = right; //right pointer
    while (i <= j) {
        while (arr[i] < pivot) {
            i++;
        }
        while (arr[j] > pivot) {
            j--;
        }
        if (i <= j) {
            swap(i, j); //sawpping two elements
            i++;
            j--;
        }
    }
    Bars.updatebars();
    return i;
}

async function quicksort(left, right) {
    let index;
    if (arr.length > 1) {
        index = await partition(left, right); //index returned from partition
        if (left < index - 1) { //more elements on the left side of the pivot
            await wait(G.speed * 10);
            await quicksort(left, index - 1);
        }
        if (index < right) { //more elements on the right side of the pivot
            await wait(G.speed);
            await quicksort(index, right);
        }
    }
    return arr;
}









function cycleSort() {
    // loop from the beginning of the array to the second to last item
    for (let currentIndex = 0; currentIndex < arr.length - 1; currentIndex++) {
        // save the value of the item at the currentIndex
        let item = arr[currentIndex]

        let currentIndexCopy = currentIndex
        // loop through all indexes that proceed the currentIndex
        for (let i = currentIndex + 1; i < arr.length; i++)
            if (arr[i] < item)
                currentIndexCopy++

        // if currentIndexCopy has not changed, the item at the currentIndex is already in the correct currentIndexCopy
        if (currentIndexCopy == currentIndex)
            continue

        // skip duplicates
        while (item == arr[currentIndexCopy])
            currentIndexCopy++

        // swap
        let temp = arr[currentIndexCopy]
        arr[currentIndexCopy] = item
        item = temp

        // repeat above steps as long as we can find values to swap
        while (currentIndexCopy != currentIndex) {
            currentIndexCopy = currentIndex
            // loop through all indexes that proceed the currentIndex
            for (let i = currentIndex + 1; i < arr.length; i++)
                if (arr[i] < item)
                    currentIndexCopy++

            // skip duplicates
            while (item == arr[currentIndexCopy])
                currentIndexCopy++

            // swap
            temp = arr[currentIndexCopy]
            arr[currentIndexCopy] = item
            item = temp
        }
    }
}
