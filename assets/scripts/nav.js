console.log("%cHOP", "color: orange; font-size: xxx-large"); // for fun

const nav = document.querySelector('nav')
const menuBurger = document.querySelector('.menu-burger')
const navLi = document.querySelectorAll('nav li')

navLi.forEach((li) => {
    li.addEventListener('click', () => {
        nav.classList.remove('nav-active')
        menuBurger.classList.remove('nav-active')
    })
})

document.body.addEventListener('click', function (event) {
    if (!nav.contains(event.target) && nav.classList.contains('nav-active') && !menuBurger.contains(event.target)) {
        nav.classList.remove('nav-active')
        menuBurger.classList.remove('nav-active')
    }
})

menuBurger.addEventListener('click', () => {
    nav.classList.toggle('nav-active')
    menuBurger.classList.toggle('nav-active')
})
