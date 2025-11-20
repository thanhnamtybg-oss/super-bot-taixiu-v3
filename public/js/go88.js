
const s = io();
s.on("update", d=>{
    document.getElementById("box").innerText = JSON.stringify(d,null,2);
});
