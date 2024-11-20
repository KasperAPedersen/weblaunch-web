let navigationLinks = document.getElementsByClassName('navBtn');
let dialogBox = document.getElementById('mobileNavModal');

for(let i = 0; i < navigationLinks.length; i++) {
    navigationLinks[i].addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        const offset = 125;

        window.scrollTo({
            top: targetElement.offsetTop - offset,
            behavior: 'smooth'
        });

        if(dialogBox.open) dialogBox.close();
        for(let i = 0; i < navigationLinks.length; i++) navigationLinks[i].classList = "navBtn";
        e.target.classList = "headerNavActive navBtn";
    });
}

let mobileNavToggle = () => {
    if(dialogBox.open) {
        dialogBox.close();
        dialogBox.style.display = "none";
    } else {
        dialogBox.showModal();
        dialogBox.style.display = "grid";
    }
}

dialogBox.addEventListener('click', (event) => {
    let rect = dialogBox.getBoundingClientRect();
    let isInDialog =
        event.clientX >= rect.left &&
        event.clientX <= rect.right &&
        event.clientY >= rect.top &&
        event.clientY <= rect.bottom;

    if(!isInDialog) dialogBox.close();
});


let currentNavHead = 1;
window.addEventListener('scroll', (e) =>  {
   let pages = [
       document.getElementById('about'),
       document.getElementById('prices'),
       document.getElementById('contact')
   ];

   let navBtns = [
       document.getElementById('headerNavAbout'),
       document.getElementById('headerNavPrices'),
       document.getElementById('headerNavContact')
   ];

   let usePage = 0;
   for(let i = 0; i < pages.length; i++){


       let page = pages[usePage].getBoundingClientRect();
       let checkPage = pages[i].getBoundingClientRect();

       let pageTop = Math.trunc(Number(String(page.top).replace('-', '')));
       let checkPageTop = Math.trunc(Number(String(checkPage.top).replace('-', '')));

       if(pageTop < checkPageTop) continue;

       usePage = i;

       for(let o = 0; o < navBtns.length; o++) navBtns[o].classList = "navBtn";
       navBtns[usePage].classList = "headerNavActive navBtn";
   }
});