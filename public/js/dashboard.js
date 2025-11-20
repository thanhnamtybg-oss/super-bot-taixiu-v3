
const s = io();
let totals = [];
let labels = [];

const ctx = document.getElementById('sumChart');
const diceCtx = document.getElementById('diceChart');

const sumChart = new Chart(ctx, {
    type:'line',
    data:{labels:[], datasets:[{label:'Tổng điểm', data:[], borderColor:'cyan'}]}
});

const diceChart = new Chart(diceCtx, {
    type:'line',
    data:{labels:[], datasets:[
        {label:'Xúc xắc 1', data:[], borderColor:'yellow'},
        {label:'Xúc xắc 2', data:[], borderColor:'lime'},
        {label:'Xúc xắc 3', data:[], borderColor:'red'}
    ]}
});

s.on("update", d=>{
    labels.push(d.round);
    sumChart.data.labels = labels;
    sumChart.data.datasets[0].data.push(d.total);
    sumChart.update();

    diceChart.data.labels = labels;
    diceChart.data.datasets[0].data.push(d.dice[0]);
    diceChart.data.datasets[1].data.push(d.dice[1]);
    diceChart.data.datasets[2].data.push(d.dice[2]);
    diceChart.update();
});
