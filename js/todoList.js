// 宣告要用的變數
const addTxt = document.querySelector('.addText');
const addBtn = document.querySelector('.addBtn');
const tab = document.querySelector('.tab');
const list = document.querySelector('.list');
let data = JSON.parse(localStorage.getItem('listData')) || [];

// 1. 新增
// 註冊監聽是否點擊
