const input = document.getElementById("inputText");
const list = document.getElementById("list-container");
const clearButton = document.getElementById("clear");

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
        li.innerHTML = "<div>"+first+rest+"</div>";

        //it helps to insert that li tag at the end of the existing li tags
        list.appendChild(li);

        let edit = document.createElement("button");
        edit.innerHTML = "Edit";
        li.appendChild(edit);



        let button = document.createElement("button");
        button.innerHTML = "Done";
        button.setAttribute("class","done");
        li.appendChild(button);

        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
    }
    input.value = "";
    saveInfo();
}

list.addEventListener("click" , (e) => {
    if(e.target.innerHTML == "Done"){
        e.target.parentElement.classList.toggle("checked");
        saveInfo();
    } else if (e.target.innerHTML == "Edit") {
        edit(e.target.previousSibling.innerHTML);
        saveInfo();
    } else if(e.target.tagName == "SPAN"){
        e.target.parentElement.remove();
        saveInfo();
    }
},false);

document.firstChild

function saveInfo(){
    localStorage.setItem("data" , list.innerHTML);
}

function showTask() {
    list.innerHTML = localStorage.getItem("data");
}

showTask();

clearButton.addEventListener("click" , function(){
    var check = document.querySelectorAll("ul li");
    if(check.length == 0) {
        alert("Add a Task First");
    } else {
        remove_list(check);
        $(".edit-container").slideUp();
        saveInfo();
    }
});

function remove_list (arr) {
    for (let i = 0 ; i < arr.length ; i++) {
        arr[i].remove();
    }
}

let before;
let Edit = document.getElementById("edit");

$(".edit-container").hide();

function edit(text) {
    before = text;
    Edit.removeAttribute("disabled");
    $(".edit-container").slideDown();
    document.querySelector(".edit .input").value = text;
}

function save() {
    let todos = document.querySelectorAll("li div");
    // console.log(todos);
    // console.log(todos[0].innerHTML);
    if(Edit.value == "") {
        alert("Enter a Task First");
    } else {
        for (let i = 0 ; i < todos.length ; i++) {
            if(todos[i].innerHTML == before) {
                todos[i].innerHTML = Edit.value;
                saveInfo();
            }
        }
    }
    // console.log(Edit.value);
    Edit.value = "";
    $(".edit-container").slideUp();
}
