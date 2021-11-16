//宣告我們需要用到的 DOM 元素
const addTxt = document.querySelector('.addText');
const addBtn = document.querySelector('.addBtn');
const list = document.querySelector('.list');
// 先定義出 data 為一個空陣列，裏面的每一個物件為我們之後要新增的列表
let data = [

]

// 利用 forEach 跑出 data 裡的資料看看
// 宣告一個空字串，並將 forEach 跑出的資料帶進去空字串，組出來後用 innerHTML 插到 list 裏面
// 並用一個函式 renderData() 將此包起來，作為資料初始化的渲染，每次跑這個函式就會渲染出 data 裏面的東西
function renderData() {
    let str = '';
    data.forEach(function (item) {
        str += `<li class="list-item">
        <h2 class="item-title">${item.content}</h2>
        <a href="#">
            <span class="material-icons-outlined deleteIcon">
                delete_outline
                </span>
        </a>
    </li>`
    })
    
    list.innerHTML = str;
}

// 對新增按鈕綁定監聽事件

addBtn.addEventListener('click', function (e) {
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
    addTxt.value = '';
})
