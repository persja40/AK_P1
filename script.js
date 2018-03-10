var pause;
var mapper = [[[false, false], [false, false]], [[false, false], [false, false]]];
var elems = 50;
var hist = 80;
var stand;
var zaburz;
var roznica;
var wykres;
var chart;

/////////////////////////////////////////////////////////////////////////////////////////////////////

function diff(st, rz) {
    var ret = [];
    for (var i = 0; i < st.length; i++) {
        ret[i] = [];
        for (var j = 0; j < elems; j++)
            ret[i][j] = (st[i][j] != rz[i][j]);
    }
    wykres++;
    chart.data.labels.push(wykres);
    chart.data.datasets.forEach(element => {
        element.data.push(ret[0].reduce((a, b) => a + b, 0));
    });
    chart.update();
    return ret;
}

function initMapper() {
    var opt = document.querySelector('input[name="sameradio"]:checked').value;
    var licz = 0;
    if (opt == "liczba")
        licz = document.getElementById("lelem").value;
    else {
        licz = 10;
        var aut = document.getElementsByName("automat");
        var vals = [];
        aut.forEach((el) => { if (el.checked) vals.push(Math.pow(2, parseInt(el.value, 2))) });
        licz = vals.reduce((a, b) => a + b, 0);
    }
    // console.log(licz);
    mapper = getMapper(licz);
}

function getMapper(num) {
    var mm = [[[], []], [[], []]];
    var it = 1;
    for (var k = 0; k <= 1; k++)
        for (var j = 0; j <= 1; j++)
            for (var i = 0; i <= 1; i++) {
                // console.log(k+" "+j+" "+i);
                // console.log((Math.floor(num/it)%2));
                mm[i][j][k] = (Math.floor(num / it) % 2);
                it = 2 * it;
            }
    return mm;
}

function drawCanvas(id, arr) {
    var c = document.getElementById(id);
    var ctx = c.getContext("2d");
    ctx.clearRect(0, 0, c.width, c.height);
    for (var i = 0; i < arr.length; i++)
        for (var j = 0; j < elems; j++) {
            if (arr[i][j] == true)
                ctx.fillStyle = "red";
            else
                ctx.fillStyle = "white";
            var x = j * (c.width / elems);
            var y = i * (c.height / hist);
            ctx.beginPath();
            ctx.fillRect(x, y, x + 10, y + 10);
            ctx.strokeRect(x, y, x + 10, y + 10);
            ctx.stroke();
            //console.log(x + " " + y + " ; " + (x + 10) + " " + (y + 10));
        }
    ctx.fillStyle = "white";
    var y = arr.length * (c.height / hist);
    ctx.fillRect(0, y, c.width, c.height);
    ctx.moveTo(0, y);
    ctx.lineTo(c.width, y);
    ctx.stroke();
}

function initChart() {
    chart = new Chart(document.getElementById("line-chart"), {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                data: [],
                label: "Africa",
                borderColor: "#3e95cd",
                fill: false
            }
            ]
        },
        options: {
            title: {
                display: true,
                text: 'Odległość Hamminga'
            },
            legend: {
                display: false
            }
        }
    });
}

function next(arr) {
    var step = [];
    for (var i = 0; i < elems; i++)
        switch (i) {
            case 0:
                step[i] = mapper[Number(arr[0][i + 1])][Number(arr[0][i])][Number(arr[0][elems - 1])];
                break;
            case elems - 1:
                step[i] = mapper[Number(arr[0][0])][Number(arr[0][i])][Number(arr[0][i - 1])];
                break;
            default:
                step[i] = mapper[Number(arr[0][i + 1])][Number(arr[0][i])][Number(arr[0][i - 1])];
                break;
        }
    arr.unshift(step);
    if (arr.length > hist)
        arr.pop();
}

/////////////////////////////////////////////////////////////////////////////////////////////////////

function reset() {
    initChart();
    pause = true;
    stand = [[]];
    zaburz = [[]];
    wykres = 0;
    for (var i = 0; i < elems; i++)
        stand[0][i] = Math.random() < 0.5 ? false : true;
    for (var i = 0; i < elems; i++) {
        zaburz[0][i] = stand[0][i];
    }
    var r = Math.floor((Math.random() * elems));
    zaburz[0][r] = !zaburz[0][r];
    roznica = diff(stand, zaburz);
    drawCanvas("std", stand);
    drawCanvas("zbr", zaburz);
    drawCanvas("rzn", roznica);
}

function simul() {
    if (pause)
        return;
    next(stand);
    next(zaburz);
    roznica = diff(stand, zaburz);
    drawCanvas("std", stand);
    drawCanvas("zbr", zaburz);
    drawCanvas("rzn", roznica);
    setTimeout(simul, 500);
}

reset();

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function clicker(id) {
    var aut = document.getElementsByName("automat");
    var vals = [];
    aut.forEach((el) => { if (el.checked) vals.push(el.value) });
    switch (document.querySelector('input[name="sameradio"]:checked').value) {
        case "legal":
            document.getElementById("c000").checked = true;
            var leg = [["c110", "c011"], ["c100", "c001"]];
            var v = document.getElementById(id).checked;
            leg.forEach(elem => {
                if (elem.includes(id))
                    elem.forEach(el => document.getElementById(el).checked = v)
            });
            break;
        case "glos":
            var leg = [["c110", "c101", "c011"], ["c100", "c010", "c001"]];
            var v = document.getElementById(id).checked;
            leg.forEach(elem => {
                if (elem.includes(id))
                    elem.forEach(el => document.getElementById(el).checked = v)
            });
            break;
    }
}
