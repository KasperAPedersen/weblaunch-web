const navigationLinks = [...document.getElementsByClassName('navBtn')];
const dialogBox = document.getElementById('mobileNavModal');
let navigationBtnUsed = false;

const setActiveNav = (target) => {
    navigationLinks.forEach(link => link.className = "navBtn");
    target.className = "headerNavActive navBtn";
};

const scrollToSection = (targetId) => {
    window.scrollTo({
        top: document.getElementById(targetId).offsetTop - 125,
        behavior: 'smooth'
    });
};

navigationLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        navigationBtnUsed = true;
        setTimeout(() => navigationBtnUsed = false, 1000);
        scrollToSection(link.getAttribute('href').substring(1));
        if (dialogBox.open) dialogBox.close();
        setActiveNav(e.target);
    });
});

const mobileNavToggle = () => {
    dialogBox.style.display = dialogBox.open ? "none" : "grid";
    dialogBox.open ? dialogBox.close() : dialogBox.showModal();
};

dialogBox.addEventListener('click', (event) => {
    const rect = dialogBox.getBoundingClientRect();
    if (!(event.clientX >= rect.left && event.clientX <= rect.right && event.clientY >= rect.top && event.clientY <= rect.bottom)) {
        dialogBox.close();
    }
});

window.addEventListener('scroll', () => {
    const pages = ['about', 'prices', 'contact'].map(id => document.getElementById(id));
    const navBtns = ['headerNavAbout', 'headerNavPrices', 'headerNavContact'].map(id => document.getElementById(id));


    if (navigationBtnUsed) return;
    const usePage = pages.reduce((closest, page, i) =>
        Math.abs(page.getBoundingClientRect().top) < Math.abs(pages[closest].getBoundingClientRect().top) ? i : closest, 0);
    setActiveNav(navBtns[usePage]);
});