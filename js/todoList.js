// 宣告要用的變數
const addTxt = document.querySelector('.addText');
const addBtn = document.querySelector('.addBtn');
const tab = document.querySelector('.tab');
const list = document.querySelector('.list');
const cleanBtn = document.querySelector('#clean');
let data = JSON.parse(localStorage.getItem('listData')) || [];

// 1. 新增
// 註冊監聽是否點擊
addBtn.addEventListener('click', addData);
// 新增的函式
function addData (e) {
    // 宣告一個物件，每一筆我們新增的資料就是此物件
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
    // render(data); // 渲染畫面
    updateList();
}

// 2. 渲染
function render (arr) {
    let str = '';
    arr.forEach( item => {
        str += ` <li class="list-item" data-id=${item.id}>
        <label class="checkbox" for="" >
          <input type="checkbox" ${item.checked}/>
          <span>${item.txt}</span>
        </label>
        <a href="#" class="delete">
            <span class="material-icons-outlined deleteIcon">
                delete_outline
                </span>
        </a>
    </li>`
    });
    list.innerHTML = str;
}


// 3. tab 切換（css 樣式)
// 全域時的狀態
let toggleStatus = "all";
const tabItem = document.querySelectorAll('.tab li');
// 監聽整個 tab 
tab.addEventListener('click',changeTab);
function changeTab (e) {
    toggleStatus = e.target.dataset.tab;
    // 先移除所有 tabItem active 的樣式
    tabItem.forEach(item => {
        item.classList.remove('active');
    });
    
    // 點擊就新增 active 的樣式
    e.target.classList.add('active');
    updateList();
}

// 4. 刪除 & 切換 checked 狀態
list.addEventListener('click', delData);
function delData (e) {
    //透過 closest 的方式能找出點擊到的 li 標籤
    //透過 dataset.id 取出埋在該 li 內的 id
    //取出來的 id 會是字串型別記得幫它轉型成數字型別
    let id = parseInt(e.target.closest("li").dataset.id);
    if (e.target.classList.contains('deleteIcon')){
        e.preventDefault();
        data = data.filter((i) => i.id !== id); 
    } else {
        data.forEach((item) => {
            if (item.id === id) {
                if (item.checked === "checked") {
                    item.checked = "";
                } else {
                    item.checked = "checked";
                }
            }
        });
    }
    localStorage.setItem('listData',JSON.stringify(data));
    // render(data);
    updateList();
}


// 5. 更新待辦清單，切換 tab 時顯示的畫面資料
function updateList () {
    let showData = [];
    // 利用 toggleStatus 的狀態來判斷
    if (toggleStatus === 'all') {
        showData = data;
    } else if (toggleStatus === 'ing') {
        showData = data.filter((item) => item.checked === '');
    } else {
        showData = data.filter((item) => item.checked === 'checked');
    }
    // 計算待完成項目
    const ingNum = document.getElementById('ingId');
    // 計算待完成的陣列長度
    let ingLen = data.filter((item) => item.checked === '');
    ingNum.textContent = ingLen.length;
    render(showData);
}

updateList(); // 初始化頁面

// 6. 刪除已完成

cleanBtn.addEventListener('click', clean);
function clean (e) {
    e.preventDefault;
    data = data.filter((item) => item.checked === '');
    updateList();
    
}

// 優化 enter 鍵能直接新增

addTxt.addEventListener('keyup', function (e) {
    if (e.key === 'Enter') {
        addData();
    }
});