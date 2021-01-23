/*

What Should I do

- Wheather

*/


// 요소 불러오기

// 배경사진
const bgImg = document.querySelector(".js-bgImg");

// 이름 입력란
const sectionWIYN = document.querySelector(".js-whatIsYourName"),
  nameForm = document.querySelector(".js-nameForm"),
  nameInput = nameForm.querySelector("input[type=text]");

// 메인 화면
const mainScreen = document.querySelector(".js-mainScreen"),
  clock = document.querySelector(".js-clock"),
  greeting = document.querySelector(".js-greeting"),
  weather = document.querySelector(".js-weather"),
  showToDo = document.querySelector(".js-showToDo");

// To-Do List
const sectionToDoList = document.querySelector(".js-toDoList"),
  toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input[type=text]"),
  pendingList = document.querySelector(".js-pending"),
  finishedList = document.querySelector(".js-finished");

// Weather
const divWeather = document.querySelector(".js-weather"),
  weatherInfo = divWeather.querySelector(".js-weatherInfo"),
  degree = divWeather.querySelector(".js-degree"),
  where = divWeather.querySelector(".js-where"),
  weatherStatus = divWeather.querySelector(".js-status");

/*
상수
*/

// LS 이름
const USERNAME_LS = "username",
  TODO_PENDING_LS = "toDoPending",
  TODO_FINISHED_LS = "toDoFinished";

const QUANTITY_OF_IMGS = 3;

/*
펑션 
*/

// 기타 펑션
function fillZero(num) {
    return `${num < 10 ? `0${num}` : `${num}`}`
}

function greet(name) {
    greeting.innerText = `Hello, ${name}!`;
}

function ifNotNull(text) {
    return text.replace(/\s/g, '') !== ""
}

// Clock
function getDate() {
    const date = new Date();
    
    const seconds = date.getSeconds();
    const minutes = date.getMinutes();
    const hours = date.getHours();

    return {
        seconds,
        minutes,
        hours
    }
}

function paintClock() {
    const timeObj = getDate();

    const s = fillZero(timeObj.seconds);
    const m = fillZero(timeObj.minutes);
    const h = fillZero(timeObj.hours);

    clock.innerText = `${h}:${m}:${s}`;
}

function initClock() {
    paintClock()
    setInterval(paintClock,1000);
}

// WIYN

function handleWIYN(event) {
    event.preventDefault();
    const value = nameInput.value;

    if (ifNotNull(value)) {
        greet(value);
        localStorage.setItem(USERNAME_LS, value);
        crossfading(mainScreen,sectionWIYN,510);
    }
}

function wiyn() {
    showingDelay(sectionWIYN,0);
    nameForm.addEventListener("submit", handleWIYN);
}

// 배경화면
function paintBg(bgNum) {
    const src = bgNum + 1;
    bgImg.src = `images/bg/${src}.jpg`
}

function background() {
    const ranNum = Math.floor(Math.random() * QUANTITY_OF_IMGS); 
    paintBg(ranNum);
    bgImg.addEventListener('load', (event) => {
            showingDelay(bgImg,0);
     });
}

// Init 펑션
function init() {
    const lsUsername =  localStorage.getItem(USERNAME_LS);
    
    initClock();
    background();

    if (lsUsername !== null) {
        greet(lsUsername);
        showingDelay(mainScreen,0);
    } else {
        wiyn();
    }

}

init();
