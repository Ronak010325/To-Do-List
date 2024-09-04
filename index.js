const input = document.getElementById("inputText");
const list = document.getElementById("list-container");

function addtask(){
    if(input.value === ""){
        alert("add a task first");
    } else{
        //it helps to create a new list tag 
        let li = document.createElement("li");
        
        let length = input.value.length;
        let first = input.value.slice(0,1).toUpperCase();
        let rest = input.value.slice(1,length).toLowerCase();
        
        //it helps to insert the input value in the li tag
        li.innerHTML = first+rest;

        //it helps to insert that li tag at the end of the existing li tags
        list.appendChild(li);

        let button = document.createElement("button");
        button.innerHTML = "Done";
        li.appendChild(button);

        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
    }
    input.value = "";
    saveInfo();
}

list.addEventListener("click" , (e) => {
    if(e.target.tagName == "BUTTON"){
        e.target.parentElement.classList.toggle("checked");
        saveInfo();
    } else if(e.target.tagName == "SPAN"){
        e.target.parentElement.remove();
        saveInfo();
    }
},false);

function saveInfo(){
    localStorage.setItem("data" , list.innerHTML);
}

function showTask() {
    list.innerHTML = localStorage.getItem("data");
}

showTask();