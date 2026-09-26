/* Baner zgody na cookies + Meta Pixel ładowany dopiero po akceptacji. */
(function () {
  var PIXEL_ID = '1518350943392081';
  var KEY = 'rm-cookie-consent'; // 'granted' | 'denied'

  function getChoice() {
    try { return localStorage.getItem(KEY); } catch (e) { return null; }
  }
  function setChoice(value) {
    try { localStorage.setItem(KEY, value); } catch (e) {}
  }

  function loadPixel() {
    if (window.fbq) return;
    /* Meta Pixel Code */
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', PIXEL_ID);
    fbq('track', 'PageView');
    /* End Meta Pixel Code */
  }

  var css = '' +
    '.cc-banner{position:fixed;left:20px;bottom:20px;z-index:90;width:min(420px,calc(100vw - 40px));padding:20px 20px 18px;border-radius:20px;' +
    'background:rgba(13,12,24,.96);border:1px solid rgba(142,120,255,.28);box-shadow:0 24px 70px rgba(0,0,0,.5);color:#f8f7ff;' +
    'font:inherit;font-size:.9rem;line-height:1.5;backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);' +
    'opacity:0;transform:translateY(12px);transition:opacity .25s ease,transform .25s ease}' +
    '.cc-banner.show{opacity:1;transform:none}' +
    '.cc-banner strong{display:block;font-size:1rem;margin-bottom:6px}' +
    '.cc-banner p{margin:0;color:#b9b6cd}' +
    '.cc-banner a{color:#ad9cff;font-weight:700;text-decoration:underline;text-underline-offset:2px}' +
    '.cc-actions{display:flex;gap:10px;margin-top:16px}' +
    '.cc-btn{flex:1;min-height:44px;border-radius:99px;font-weight:800;font-size:.88rem;cursor:pointer;transition:filter .2s ease,background .2s ease}' +
    '.cc-accept{border:0;color:#fff;background:linear-gradient(115deg,#8a6cff,#4b8dff)}' +
    '.cc-accept:hover{filter:brightness(1.1)}' +
    '.cc-deny{border:1px solid rgba(142,120,255,.35);background:transparent;color:#f8f7ff}' +
    '.cc-deny:hover{background:rgba(142,120,255,.1)}' +
    '@media (max-width:640px){.cc-banner{left:12px;right:12px;bottom:12px;width:auto}}';

  function showBanner() {
    if (document.querySelector('.cc-banner')) return;
    if (!document.getElementById('cc-style')) {
      var style = document.createElement('style');
      style.id = 'cc-style';
      style.textContent = css;
      document.head.appendChild(style);
    }
    var el = document.createElement('div');
    el.className = 'cc-banner';
    el.setAttribute('role', 'dialog');
    el.setAttribute('aria-label', 'Zgoda na pliki cookies');
    el.innerHTML =
      '<strong>🍪 Pliki cookies</strong>' +
      '<p>Używamy cookies Meta Pixel, żeby mierzyć skuteczność naszych reklam na Facebooku i Instagramie. ' +
      'Włączymy je tylko za Twoją zgodą. Szczegóły w <a href="polityka-prywatnosci.html#cookies">polityce prywatności</a>.</p>' +
      '<div class="cc-actions">' +
      '<button type="button" class="cc-btn cc-deny">Odrzucam</button>' +
      '<button type="button" class="cc-btn cc-accept">Akceptuję</button>' +
      '</div>';
    document.body.appendChild(el);
    requestAnimationFrame(function () { el.classList.add('show'); });

    function close(choice) {
      setChoice(choice);
      if (choice === 'granted') loadPixel();
      else if (window.fbq) fbq('consent', 'revoke'); // wycofanie zgody w trakcie wizyty
      el.classList.remove('show');
      setTimeout(function () { el.remove(); }, 250);
    }
    el.querySelector('.cc-accept').addEventListener('click', function () { close('granted'); });
    el.querySelector('.cc-deny').addEventListener('click', function () { close('denied'); });
  }

  // Link „Ustawienia cookies” w stopce ponownie otwiera baner.
  document.addEventListener('click', function (e) {
    var link = e.target.closest && e.target.closest('[data-cookie-settings]');
    if (!link) return;
    e.preventDefault();
    showBanner();
  });

  var choice = getChoice();
  if (choice === 'granted') loadPixel();
  else if (choice !== 'denied') {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', showBanner);
    else showBanner();
  }
})();
