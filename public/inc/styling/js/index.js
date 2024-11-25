
const navigationLinks = [...document.getElementsByClassName('navBtn')];
const dialogBox = document.getElementById('mobileNavModal');
let priceCardModal = document.getElementById('priceCardModal');
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

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('/getAllCards');
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const data = await response.json();

        for(let i = 0; i < data.length; i++) {
            let cardData = data[i];
            let card = document.createElement('article');
            card.innerHTML = `
            <h3>${cardData.name}</h3>
                    <h4>${cardData.description}</h4>
                    <ul>
                        ${(
                            cardData.features.map(feature => {
                                return `<li>${feature.description}</li>`;
                            }).join('')
                            )}
                    </ul>
                    <div>
                        <p><strong>${cardData.price !== null ? `${cardData.price},-</strong><br><span>(ekskl. moms)</span>` : "Få et tilbud"}</p>
                        <button onclick="viewCard(${cardData.id});">Bestil</button>
                    </div>`;

            document.getElementById('prices').appendChild(card);
        }

    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
});

let viewCard = async (id) => {
    try {
        togglePriceCardModal();
        const response = await fetch('/getCard/' + id);
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const data = await response.json();
        document.getElementById('priceCardText').innerHTML = "";

        let card = document.createElement('article');
        card.innerHTML = `
            <h3>${data.name}</h3>
            <h4>${data.description}</h4>
            <ul>
                ${(
            data.features.map(feature => {
                        return `<li>${feature.description}</li>`;
                    }).join('')
                )}
            </ul>
            <div>
                <p><strong>${data.price !== null ? `${data.price},-</strong><br><span>(ekskl. moms)</span>` : "Få et tilbud"}</p>
            </div>`;

        document.getElementById('priceCardText').appendChild(card);

    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
}

let togglePriceCardModal = () => {
    priceCardModal.open ? priceCardModal.close() : priceCardModal.showModal();
}

priceCardModal.addEventListener('click', (event) => {
    const rect = priceCardModal.getBoundingClientRect();
    if (!(event.clientX >= rect.left && event.clientX <= rect.right && event.clientY >= rect.top && event.clientY <= rect.bottom)) {
        priceCardModal.close();
    }
});