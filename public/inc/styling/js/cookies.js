function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function createCookieConsentBanner() {
    if (!getCookie('cookieConsent')) {
        const banner = document.createElement('div');
        banner.innerHTML = `
            <article class="cookieBanner">
                <button id="acceptCookies">I understand</button>
                <p>This website uses cookies to enhance the user experience.</p>
            </article>`;
        document.body.appendChild(banner);

        document.getElementById('acceptCookies').addEventListener('click', function () {
            setCookie('cookieConsent', 'accepted', 365);
            banner.remove();
        });
    }
}

document.addEventListener('DOMContentLoaded', createCookieConsentBanner);