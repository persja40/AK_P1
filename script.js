var pause;
var mapper = [[[false, false], [false, false]], [[false, false], [false, false]]];
var elems = 50;
var hist = 80;
var stand;
var zaburz;
var roznica;

/////////////////////////////////////////////////////////////////////////////////////////////////////

function diff(st, rz) {
    var ret = [];
    for (var i = 0; i < st.length; i++) {
        ret[i] = [];
        for (var j = 0; j < elems; j++)
            ret[i][j] = (st[i][j] != rz[i][j]);
    }
    return ret;
}

/////////////////////////////////////////////////////////////////////////////////////////////////////

function reset() {
    pause = false;
    stand = [[]];
    zaburz = [[]];
    // stand[0] = [];
    // zaburz[0] = [];
    for (var i = 0; i < elems; i++)
        stand[0][i] = Math.random() < 0.5 ? false : true;
    console.log(stand);
    console.log(zaburz);
    for (var i = 0; i < stand.length; i++) {
        console.log(i);
        zaburz[i] = stand[i].slice();
    }
    console.log(zaburz);
    zaburz[Math.floor((Math.random() * elems))] = !zaburz[Math.floor((Math.random() * elems))];
    roznica = diff(stand, zaburz);
}

reset();
console.log('ALa ma kota');
console.log(stand);
console.log(zaburz);
console.log(roznica);


