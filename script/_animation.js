const HIDE_CLASS = "hide",
 FADE_IN_CLASS = "fadeIn",
 FADE_OUT_CLASS = "fadeOut",
 TO_DO_POPUP_CLASS = "toDoPopup",
 TO_DO_HIDE_CLASS = "toDoHide";


// 애니메이션 함수
function animation(obj,className,ms) {
    obj.classList.add(className);
    setTimeout(function(obj, className) {obj.classList.remove(className)}, ms, obj, className);
}

// 페이드 인/아웃
function fadeIn(obj) {
    animation(obj, FADE_IN_CLASS, 500);
}

function fadeOut(obj) {
    animation(obj, FADE_OUT_CLASS, 500);
}

// 숨김, 보여주기
function hiding(obj) {
    obj.classList.add(HIDE_CLASS);
}

function showing(obj) {
    obj.classList.remove(HIDE_CLASS);
}

// 보여주기 효과 및 크로스페이딩
function showingDelay(obj, ms) {
    setTimeout(function(obj) {fadeIn(obj);showing(obj);}, ms, obj);
}

function hidingEffect(obj) {
    fadeOut(obj);
    setTimeout(function(obj) {hiding(obj);}, 500, obj);
}

function crossfading(showObj, hideObj, ms) {
    showingDelay(showObj, ms);
    hidingEffect(hideObj);
}

// 투두 애니메이션
function toDoPopup(obj) {
    animation(obj, TO_DO_POPUP_CLASS, 400);
    showing(obj);
}

function toDoHide(obj) {
    animation(obj, TO_DO_HIDE_CLASS, 400);
    setTimeout(function(obj) {hiding(obj);}, 400, obj);
}
