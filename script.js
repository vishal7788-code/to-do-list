const inputBox = document.getElementById("input-text");
const tasks = document.getElementById("tasks");
function addTasks () {
    if (inputBox.value === '') {
        alert("Please add task.");
        console.log("Please add a task.");
    }
    else {
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        tasks.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
    }
    inputBox.value = "";
    saveData()
}
tasks.addEventListener("click",(e)=>{
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("checked");
        saveData()
    }
    else if(e.target.tagName === "SPAN"){
        e.target.parentElement.remove();
        saveData()
    }
}, false);
function saveData(){
    localStorage.setItem("data", tasks.innerHTML);
}
function showTask(){
    tasks.innerHTML = localStorage.getItem("data")
}
showTask();