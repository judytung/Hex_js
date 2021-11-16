const list = document.querySelector('.list')
// console.log(list)
list.addEventListener('click', function (e) {
    // console.log(e.target.nodeName)
    // e.preventDefault();
    if (e.target.nodeName !== 'SPAN') {
        return;
    }
    console.log(e.target.nodeName)
})