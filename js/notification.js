let button = document.getElementById('markButton')
let activeCount = document.getElementById('activeMsg')

function onClickMark() {
    button.classList.remove('mark_all')
    activeCount.textContent = ''
}
button.addEventListener('click', onClickMark)