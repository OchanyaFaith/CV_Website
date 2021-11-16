// show menu
const showMenu = (toggleId, navId) =>{
    const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId)

    if(toggle && nav){
        toggle.addEventListener('click', ()=>{
            nav.classList.toggle('show-menu')
        });
    }
}

showMenu('nav-toggle','nav-menu')

// remove menu mobile responsive
const navLink = document.querySelectorAll('.nav_link')
function linkAction(){
   
   /* // active link 
    navLink.forEach(n => n.classList.remove('active'))
    this.classList.add('active')
    */

    // remove menu after active link(on click)
    const navMenu = document.getElementById('nav-menu')
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction));

// active link for scroll section
const sections = document.querySelectorAll('section[id]')
function scrollActive(){
    const scrollY = window.pageYOffset

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight
        const sectionTop = current.offsetTop - 50;
        sectionId = current.getAttribute('id')

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            document.querySelector('.nav_menu a[href*=' + sectionId + ']').classList.add('active-link')
        }else{
            document.querySelector('.nav_menu a[href*=' + sectionId + ']').classList.remove('active-link')
        }
    })
}
window.addEventListener('scroll', scrollActive)

/*===========SHOW SCROLL TOP==============*/
function scrollTop(){
    const scrollTop = document.getElementById('scroll-top')
    // when scroll is higher than 200 viewport height, add the scroll-header class to 
    if(this.scrollY>= 200) scrollTop.classList.add('show-scroll'); else scrollTop.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollTop)

// =============CHANGE THEME(dark theme)==============
const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'fa-sun'

// previously selected topic (if user select)
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon') 

//  current theme that the interfaces has is obtained by validating the dark theme clas
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark':'light'
const getCurrentIcon  = () => themeButton.classList.contains(iconTheme) ? 'fa-moon':'fa-sun'

//validate if the user previously chose a topic
if(selectedTheme){
    //if the validation is fulfilled,
    document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
    themeButton.classList[selectedIcon === 'fa-moon' ? 'add' : 'remove'](iconTheme)
}

//activate/deactivate the theme manually with the button

themeButton.addEventListener('click', ()=>{
    //add or remove the dark theme
    document.body.classList.toggle(darkTheme)
    themeButton.classList.toggle(iconTheme)
    //save the theme and icon the user chose
    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())

})

// ================REDUCE THE SIZE AND PRINT ON A4 PAPER============
function scaleCv(){
    document.body.classList.add('scale-cv')
}

// ========REMOVE THE SIZE AFTER DOWNLOA======//
function removeScale(){
    document.body.classList.remove('scale-cv')
}

// =========GENERATE PDF===========
let areaCv = document.getElementById('area-cv')
let resumeButton = document.getElementById('resume-button')

// html to pdf options
let opt = {
    margin:       0,
    filename:     'Resume.pdf',
    image:        { type: 'jpeg', quality: 0.98 },
    html2canvas:  { scale: 4 },
    jsPDF:        { unit: 'in', format: 'a4', orientation: 'portrait' }
  }; 
//function to call areacv and html 2 pdf options
function generateResume(){
    html2pdf(areaCv, opt)
}
//excecutes all 3 functions on click
resumeButton.addEventListener('click', () =>{
    //add scale-cv to the body
    scaleCv()
    // pdf is generated
     generateResume();
    // remove scale-cv form the body after a specified time
    setTimeout(removeScale, 4000)
})
