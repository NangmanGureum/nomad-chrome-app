// // 메인 화면
// const showToDo = document.querySelector(".js-showToDo");

// To-Do List
// const sectionToDoList = document.querySelector(".js-toDoList"),
//   toDoForm = document.querySelector(".js-toDoForm"),
//   toDoInput = document.querySelector("input[type=text]"),
//   pendingList = document.querySelector(".js-pending"),
//   finishedList = document.querySelector(".js-finished");

// LS 변수
// const TODO_PENDING_LS = "toDoPending",
//  TODO_FINISHED_LS = "toDoFinished";

let toDoShowing = false;
let pendingArray = [];
let finishedArray = [];

const ICON_CHECK = "images/check-icon.svg",
  ICON_X = "images/x-icon.svg",
  ICON_BACK = "images/back-icon.svg";


function loadLS(lsName) {
    const lsText = localStorage.getItem(lsName);
    return JSON.parse(lsText);
}

function refreshLS() {
    const pendingJson = JSON.stringify(pendingArray);
    const finishedJson = JSON.stringify(finishedArray);

    localStorage.setItem(TODO_PENDING_LS, pendingJson);
    localStorage.setItem(TODO_FINISHED_LS, finishedJson);
}

function handleDelBtn(event) {
    const target = event.target;
    const li = target.parentNode;
    const ul = li.parentNode;

    const id = parseInt(li.id);
    const ulClass = ul.classList;
    ul.removeChild(li);
    

    if (ulClass.contains("js-finished")) {
        finishedArray = finishedArray.filter(obj => obj.id !== id);
    } else {
        pendingArray = pendingArray.filter(obj => obj.id !== id);
    }

    refreshLS();
}

function handleFuncBtn(event) {
    const target = event.target;
    const li = target.parentNode;
    const ul = li.parentNode;

    const id = parseInt(li.id);
    const value = li.textContent;
    const ulClass = ul.classList;

    if (ulClass.contains("js-finished")) {
        finishedList.removeChild(li);
        finishedArray = finishedArray.filter(obj => obj.id !== id);
        panintToDo(value, false);
    } else {
        pendingList.removeChild(li);
        pendingArray = pendingArray.filter(obj => obj.id !== id);
        panintToDo(value, true);
    }
}

function panintToDo(value, isFinished) {
    /*
    About isFinished
    true : Finished
    false : Pending
    */

    let id = null
    
    // HTML Elements
    const li = document.createElement("li");

    const span = document.createElement("span");
    const delBtn = document.createElement("img");
    const funcBtn = document.createElement("img");

    span.innerText = value;
    delBtn.src = ICON_X;

    delBtn.addEventListener("click", handleDelBtn);
    funcBtn.addEventListener("click", handleFuncBtn);

    li.appendChild(span);
    li.appendChild(funcBtn);
    li.appendChild(delBtn);

    if (isFinished) {
        id = finishedArray.length + 1;
        funcBtn.src = ICON_BACK;
    } else {
        id = pendingArray.length + 1;
        funcBtn.src = ICON_CHECK;
    }

    li.id = id;

    obj = {
        id,
        value
    }

    if (isFinished) {
        finishedArray.push(obj);
        finishedList.appendChild(li);
    } else {
        pendingArray.push(obj);
        pendingList.appendChild(li);
    }

    refreshLS();
}

function handleShowToDo() {
    if (!toDoShowing) {
        toDoShowing = true;
        showToDo.innerText = "Hide To-do List";
        toDoPopup(sectionToDoList);
    } else {
        toDoShowing = false;
        showToDo.innerText = "Show To-do List";
        toDoHide(sectionToDoList);
    }
}

function handleToDoSubmit(event) {
    event.preventDefault();
    if (ifNotNull(toDoInput.value)) {
        panintToDo(toDoInput.value,false);
    }

    toDoInput.value = "";
}

function toDo() {
    showToDo.addEventListener("click", handleShowToDo);
    toDoForm.addEventListener("submit", handleToDoSubmit);

    const lsPendingObj = loadLS(TODO_PENDING_LS);
    const lsFinishedObj = loadLS(TODO_FINISHED_LS);

    if (lsPendingObj !== null) {
        lsPendingObj.forEach(obj => panintToDo(obj.value, false));
    }

    if (lsFinishedObj !== null) {
        lsFinishedObj.forEach(obj => panintToDo(obj.value, true));
    }

}

toDo();