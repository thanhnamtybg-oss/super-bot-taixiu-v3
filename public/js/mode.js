
function toggleMode(){
    const b=document.body;
    if(b.classList.contains("dark")){
        b.classList.remove("dark");
        b.classList.add("light");
    } else {
        b.classList.remove("light");
        b.classList.add("dark");
    }
}
