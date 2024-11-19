
let navigationLinks = document.getElementById('headerNav').getElementsByTagName('a');

for(let i = 0; i < navigationLinks.length; i++) {
    navigationLinks[i].addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        const offset = 125;
        console.log(targetElement.offsetTop);

        window.scrollTo({
            top: targetElement.offsetTop - offset,
            behavior: 'smooth'
        });
    });
}