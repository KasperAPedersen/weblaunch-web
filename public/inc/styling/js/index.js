let navigationLinks = document.getElementsByClassName('navBtn');
let dialogBox = document.getElementById('mobileNav').getElementsByTagName('dialog')[0];

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