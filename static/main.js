async function runSim() {
    let n = document.getElementById("num").value;
    let res = await fetch("/api/simulate", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({n: n})
    });
    let data = await res.json();
    document.getElementById("stats").innerText = JSON.stringify(data.stats, null, 2);
    drawChart1(data.stats);
    drawChart2(data.totals);
}
function drawChart1(stats){
    new Chart(document.getElementById("chart1"), {
        type: "bar",
        data: {
            labels: Object.keys(stats),
            datasets: [{ label: "Số lần xuất hiện", data: Object.values(stats),
                backgroundColor: ["#00eaff", "#00ff95", "#ff0066"] }]
        }
    });
}
function drawChart2(arr){
    new Chart(document.getElementById("chart2"), {
        type: "line",
        data: {
            labels: arr.map((x,i)=>i),
            datasets: [{ label: "Biểu đồ tổng điểm", data: arr, borderColor: "#00eaff" }]
        }
    });
}
