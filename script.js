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

function getMapper(num) {
    var mm = [[[],[]],[[],[]]];
    var it = 1;
    for (var k = 0; k <= 1; k++)
        for (var j = 0; j <= 1; j++)
            for (var i = 0; i <= 1; i++) {
                // console.log(k+" "+j+" "+i);
                // console.log((Math.floor(num/it)%2));
                mm[i][j][k]= (Math.floor(num/it)%2);
                it=2*it;
            }
    return mm;
}

function drawCanvas(id, arr){
    var c=document.getElementById(id);
    var ctx=c.getContext("2d");
    for(var i=0; i<arr.length;i++)
        for(var j=0;j<elems;j++){
            ctx.beginPath();
            if(arr[i][j]==true)
                ctx.fillStyle = "red";
            else
                ctx.fillStyle = "white";
            var x= j*(c.width/elems);
            var y= i*(c.height/hist);
            ctx.fillRect(x,y,x+10,y+10);
            ctx.strokeRect(x,y,x+10,y+10);
        }
    
}

/////////////////////////////////////////////////////////////////////////////////////////////////////

function reset() {
    pause = false;
    stand = [[]];
    zaburz = [[]];
    for (var i = 0; i < elems; i++)
        stand[0][i] = Math.random() < 0.5 ? false : true;
    for (var i = 0; i < elems; i++) {
        zaburz[0][i] = stand[0][i];
    }
    var r = Math.floor((Math.random() * elems));
    zaburz[0][r] = !zaburz[0][r];
    roznica = diff(stand, zaburz);
}

reset();
// console.log(stand);
// console.log(zaburz);
// console.log(roznica);
// console.log(getMapper(10));
console.log(stand);
drawCanvas("std",stand);