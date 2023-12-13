let taskInput = document.querySelector("#input_form");
let task = document.querySelector("#new_task");
let tasklist = document.querySelector("ul");
let clearAll = document.querySelector("#reset_btn");
let filter = document.querySelector("#filter_task");

taskInput.addEventListener("submit", add_task);
tasklist.addEventListener("click", removeTask);
clearAll.addEventListener("click", clearTasks);
filter.addEventListener("keyup", filterTask);
document.addEventListener("DOMContentLoaded",getTasks);


function add_task(e) {
  if (task.value === '') {
    alert("Please Insert a Task");
  } else {
    let li = document.createElement("li");
    li.appendChild(document.createTextNode(task.value + " "));
    let dltTaskLink = document.createElement("a");
    dltTaskLink.setAttribute("href", "#"); //#=clickable
    dltTaskLink.innerHTML = "X";
    tasklist.appendChild(li);
    li.appendChild(dltTaskLink);

    storeTaskInLocalStorage(task.value); //add to local storage by task query
    task.value = " ";

  }
  e.preventDefault(); // Prevent default form submission
}

function removeTask(e) {
  if (e.target.hasAttribute("href")) {
    if (confirm("Are you sure ?")) {
      let ele = e.target.parentElement;
      ele.remove();
      removeFromLS(ele);
    }
  }
}

function clearTasks(e) {
  if (confirm("Are you sure to Reset all tasks?"))
   while(tasklist.firstChild){
    tasklist.removeChild(tasklist.firstChild);
   }
  localStorage.clear();
}

function filterTask(e) {
  let text = e.target.value.toLowerCase();
  //console.log(text);

  document.querySelectorAll("li").forEach(task => {
    let item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = "block";
    } else {
      task.style.display = "none";
    }
  });
}

function storeTaskInLocalStorage(task){
  let tasks;
  if (localStorage.getItem("tasks") === null ){ 
    tasks = [];

  }else{
    tasks = JSON.parse(localStorage.getItem("tasks")); //get Item from local storage
  }
  tasks.push(task);
  localStorage.setItem("tasks",JSON.stringify(tasks));
}

function getTasks(){
  let tasks;
  if (localStorage.getItem("tasks") === null ){ 
    tasks = [];

  }else{
    tasks = JSON.parse(localStorage.getItem("tasks")); //get Item from local storage
  }
  tasks.forEach(task =>{
    let li = document.createElement("li");
    li.appendChild(document.createTextNode(task + " "));
    tasklist.appendChild(li);
    let dltTaskLink = document.createElement("a");
    dltTaskLink.setAttribute("href", "#"); //#=clickable
    dltTaskLink.innerHTML = "X";
    li.appendChild(dltTaskLink);
  })
}

function removeFromLS(taskItem){
  let tasks;
  if (localStorage.getItem("tasks") === null){ 
    tasks = [];

  }else{
    tasks = JSON.parse(localStorage.getItem("tasks")); //get Item from local storage
  }
  let li = taskItem;
  li.removeChild(li.lastChild); //<a>x</a>

  tasks.forEach((task, index) =>
  {
    if(li.textContent.trim()===task){
      tasks.splice(index,1);
    }
  });
  localStorage.setItem("tasks",JSON.stringify(tasks));
}