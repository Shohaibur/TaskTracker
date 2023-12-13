let taskInput = document.querySelector("#input_form");
let task = document.querySelector("#new_task");
let tasklist = document.querySelector("ul");
let clearAll = document.querySelector("#reset_btn");

taskInput.addEventListener("submit", add_task);
tasklist.addEventListener("click", removeTask);
clearAll.addEventListener("click", clearTasks);

function add_task(e) {
  if (task.value === '') {
    alert("Please Add Task");
  } else {
    let li = document.createElement("li");
    li.appendChild(document.createTextNode(task.value + " "));
    tasklist.appendChild(li);
    let dltTaskLink = document.createElement("a");
    dltTaskLink.setAttribute("href", "#"); //#=clickable
    dltTaskLink.innerHTML = "X";
    li.appendChild(dltTaskLink);
    task.value = " ";

  }
  e.preventDefault(); // Prevent default form submission
}

function removeTask(e) {
  if (e.target.hasAttribute("href")) {
    if (confirm("Are you sure ?")) {
      let ele = e.target.parentElement;
      ele.remove();
    }
  }
}

function clearTasks(e) {
  if (confirm("Are you sure to Reset all tasks?"))
    tasklist.innerHTML = "";
}