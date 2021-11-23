// 宣告要用的變數
const addTxt = document.querySelector('.addText');
const addBtn = document.querySelector('.addBtn');
const tab = document.querySelector('.tab');
const list = document.querySelector('.list');
let data = JSON.parse(localStorage.getItem('listData')) || [];

// 1. 新增
// 註冊監聽是否點擊
addBtn.addEventListener('click', addData);
// 新增的函式
function addData (e) {
    // 宣告一個物件，每一筆我們新增的資料就是此物件
    console.log('123')
    let todo = {
        txt: addTxt.value,  // 輸入欄位的值
        id: new Date().getTime(), // 取時間毫秒作為 id 
        checked: ''  // 是否勾選為已完成
    }
    // 簡單防呆機制，若為空字串就不能新增
    if (todo.txt.trim() !== '') {
        // 新增要為第一筆，使用 unshift
        data.unshift(todo);
        // 新增完清空輸入欄位
        addTxt.value = '';
    }
    localStorage.setItem('listData',JSON.stringify(data));
    render(); // 渲染畫面
}