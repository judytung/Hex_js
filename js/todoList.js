//宣告我們需要用到的 DOM 元素
const addTxt = document.querySelector('.addText');
const addBtn = document.querySelector('.addBtn');
const list = document.querySelector('.list');

//當localStorage裡listData有資料時用JSON.parse轉出來，若裡面沒資料則回傳空陣列
let data = JSON.parse(localStorage.getItem('listData')) || [];
// 先定義出 data 為一個空陣列，裏面的每一個物件為我們之後要新增的列表

// 利用 forEach 跑出 data 裡的資料看看
// 宣告一個空字串，並將 forEach 跑出的資料帶進去空字串，組出來後用 innerHTML 插到 list 裏面
// 並用一個函式 renderData() 將此包起來，作為資料初始化的渲染，每次跑這個函式就會渲染出 data 裏面的東西
function renderData() {
    let str = '';
    data.forEach(function (item,index) {
        str += `<li class="list-item">
        <h2 class="item-title">${item.content}</h2>
        <a href="#">
            <span class="material-icons-outlined deleteIcon" data-index="${index}">
                delete_outline
                </span>
        </a>
    </li>`
    })
    
    list.innerHTML = str;
}
renderData(data);

// 對新增按鈕綁定監聽事件

addBtn.addEventListener('click', function add(e) {
    e.preventDefault();
    if (addTxt.value === '') {
        alert('請輸入內容')
        return;
        // 如果輸入欄位內為空值就不執行
    }
    // 宣告要帶入的物件資訊
    //  {
    //    "content": "事項一"
    //  },
    let dataItem = {};
    dataItem.content = addTxt.value; // 給 dataItem 裏面新增一個 content 屬性，並賦予輸入欄位的值
    data.push(dataItem); // 將值加入到 data 裏面
    renderData();
    localStorage.setItem('listData',JSON.stringify(data))
    addTxt.value = '';
})


// 刪除事件功能，對整個列表做監聽
list.addEventListener('click', function (e) {
    e.preventDefault();
    // console.log(e.target);
    // 點到按鈕以外的就中斷函式
    if (e.target.nodeName !== 'SPAN') {
        return;
    }
    // 宣告 num 為資料的索引值
    let num = e.target.getAttribute('data-index');
    // console.log(num)
    data.splice(num,1);
    // 有做刪除動作，需重新載入資料到localStorage
    localStorage.setItem('listData',JSON.stringify(data));
    renderData();
})

