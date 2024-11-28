
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
    document.getElementById('timestamp').value = Date.now();
    try {
        const response = await fetch('/getAllCards');
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const data = await response.json();

        for(let i = 0; i < data.length; i++) {
            let cardData = data[i];
            const price = new Intl.NumberFormat('da-DK', { style: 'currency', currency: 'DKK' }).format(cardData.price);

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
                        <p><strong>${cardData.price !== null ? `${price}</strong><br><span>(ekskl. moms)</span>` : "Få et tilbud"}</p>
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
        const price = new Intl.NumberFormat('da-DK', { style: 'currency', currency: 'DKK' }).format(data.price);
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
                <p><strong>${data.price !== null ? `${price}</strong><br><span>(ekskl. moms)</span>` : "Få et tilbud"}</p>
            </div>`;

        document.getElementById('priceCardText').appendChild(card);
        document.getElementById('selectedPackage').value = data.name;

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

document.getElementById('orderForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    let selectedPackage = document.getElementById('selectedPackage').value;
    let name = document.getElementById('orderName').value;
    let email = document.getElementById('orderMail').value;
    let phone = document.getElementById('orderPhone').value;
    let message = document.getElementById('orderMessage').value;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Indtast venligst en gyldig email adresse');
        return;
    }

    const phoneRegex = /^(?:\+45)?\s?(?:\d{2}\s?){4}$/;
    if (!phoneRegex.test(phone)) {
        alert('Indtast venligst et gyldigt telefonnummer');
        return;
    }

    const data = {
        name: name,
        email: email,
        phone: phone,
        subject: `${selectedPackage} Bestilling`,
        message: message
    };

    console.log(data);
    await fetch('/sendmail', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    const successMessage = document.createElement('p');
    successMessage.textContent = 'Din besked er blevet sendt med succes!';
    document.getElementById('orderForm').appendChild(successMessage);
});

// Contact form honeypot
document.getElementById('contactForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    if (document.getElementById('website').value !== '') {
        return;
    }

    const timeElapsed = Date.now() - document.getElementById('timestamp').value;
    if (timeElapsed < 3000) {  // If submitted in less than 3 seconds
        console.log('Submission too fast. Possible bot detected.');
        return;
    }

    let name = document.getElementById('contactName').value;
    let email = document.getElementById('contactMail').value;
    let phone = document.getElementById('contactPhone').value;
    let subject = document.getElementById('contactSubject').value;
    let message = document.getElementById('contactMessage').value;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Indtast venligst en gyldig email adresse');
        return;
    }

    const phoneRegex = /^(?:\+45)?\s?(?:\d{2}\s?){4}$/;
    if (!phoneRegex.test(phone)) {
        alert('Indtast venligst et gyldigt telefonnummer');
        return;
    }

    const data = {
        name: name,
        email: email,
        phone: phone,
        subject: subject,
        message: message
    };

    console.log(data);
    await fetch('/sendmail', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    // Display success message
    const successMessage = document.createElement('p');
    successMessage.textContent = 'Din besked er blevet sendt med succes!';
    document.getElementById('contactForm').appendChild(successMessage);
});