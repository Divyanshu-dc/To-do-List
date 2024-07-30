let inputBar = document.querySelector("input");
let addBtn = document.querySelector("button");
let cont = document.querySelector(".cont");

let tasksArray = [];

let prevTask = localStorage.getItem("Tasks");
// checking last tasks
if (prevTask) {
  

  let parsedArray = JSON.parse(prevTask);

  tasksArray = [...parsedArray];

  ticketAdderOnUI(tasksArray);
}
// add button
addBtn.addEventListener("click", function () {
  let value = inputBar.value;

  inputBar.value = "";

  if (value.length == 0) return;

  let taskObj = {
    id: Date.now(),
    task: value,
  };

  tasksArray.push(taskObj);

  ticketAdderOnUI(tasksArray); 

  localStorage.setItem("Tasks", JSON.stringify(tasksArray));
});
// ticket shown on ui
function ticketAdderOnUI(arr) {
  cont.innerHTML = "";

  arr.forEach(function (taskObj) {
    let id = taskObj.id;

    let taskEle = document.createElement("div");
    taskEle.classList.add("task");
    taskEle.innerHTML = `<p> ${taskObj.task} </p>
              <div class="dlt">
                  <svg xmlns="http://www.w3.org/2000/svg" width="25px" viewBox="0 0 24 24"  fill="currentColor"><path d="M20 7V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V7H2V5H22V7H20ZM11 10V17H13V10H11ZM7 2H17V4H7V2Z"></path></svg>
              </div>`;

    // task delete
    let delIcon = taskEle.querySelector(".dlt");

    delIcon.addEventListener("click", function () {
      cont.removeChild(taskEle); 

      let filteredTaskArray = tasksArray.filter(function (taskObj) {
        return taskObj.id != id;
      });
     // update the array
      tasksArray = filteredTaskArray;

      localStorage.setItem("Tasks", JSON.stringify(tasksArray));
    });

    cont.appendChild(taskEle);
  });
}