(function(){
  'use strict';

  // Elements
  const passwordScreen = document.getElementById('passwordScreen');
  const passwordInput  = document.getElementById('passwordInput');
  const passwordBtn    = document.getElementById('passwordBtn');
  const passwordError  = document.getElementById('passwordError');
  const container      = document.querySelector('.container');

  // Ensure initial states
  if (container) container.style.display = 'none';
  if (passwordScreen) passwordScreen.style.display = 'flex';

  // Password check
  const PASSWORD = '1408';
  function unlock(){
    const val = (passwordInput && passwordInput.value || '').trim();
    if (val === PASSWORD){
      if (passwordScreen) passwordScreen.style.display = 'none';
      if (container) container.style.display = 'block';
      passwordError && (passwordError.textContent = '');
    } else {
      passwordError && (passwordError.textContent = '❌ كلمة المرور غير صحيحة');
    }
  }
  passwordBtn && passwordBtn.addEventListener('click', unlock);
  passwordInput && passwordInput.addEventListener('keydown', e => (e.key === 'Enter') && unlock());

  // Dropdown handler
  const btn   = document.getElementById('platformBtn');
  const list  = document.getElementById('platformList');
  const icon  = document.getElementById('platformIcon');
  const label = document.getElementById('platformText');

  btn && btn.addEventListener('click', () => {
    list && list.classList.toggle('show');
  });

  list && list.querySelectorAll('.dropdown-item').forEach(item => {
    item.addEventListener('click', () => {
      const img = item.getAttribute('data-img');
      const text = (item.textContent || '').trim();
      if (icon && img) icon.src = img;
      if (label) label.textContent = text.toUpperCase();
      list.classList.remove('show');
    });
  });

  document.addEventListener('click', (e) => {
    if (!btn) return;
    if (!btn.contains(e.target) && !(list && list.contains(e.target))) {
      list && list.classList.remove('show');
    }
  });

  // Get Signal (simple countdown + random direction)
  const getSignalBtn = document.getElementById('getSignal');
  const timerEl      = document.getElementById('timer');
  const outputEl     = document.getElementById('signalOutput');
  const timeSelect   = document.getElementById('timeSelect');
  const curSelect    = document.getElementById('currencySelect');

  let tHandle = null;
  function startCountdown(seconds){
    const end = Date.now() + seconds*1000;
    clearInterval(tHandle);
    tHandle = setInterval(() => {
      const left = Math.max(0, end - Date.now());
      const s = Math.ceil(left/1000);
      timerEl && (timerEl.textContent = '⏳ ' + s + 's');
      if (left <= 0){
        clearInterval(tHandle);
        const dir = Math.random() > 0.5 ? 'CALL ⬆️' : 'PUT ⬇️';
        const pair = (curSelect && curSelect.value) || '';
        outputEl && (outputEl.textContent = 'Signal: ' + dir + '  •  ' + pair);
        timerEl && (timerEl.textContent = '');
      }
    }, 200);
  }

  getSignalBtn && getSignalBtn.addEventListener('click', () => {
    const seconds = parseInt(timeSelect && timeSelect.value || '60', 10);
    outputEl && (outputEl.textContent = '');
    startCountdown(seconds);
  });

  // Right-side clock (+03)
  const clock = document.getElementById('clock');
  function updateClock(){
    const now = new Date();
    const utc = now.getTime() + now.getTimezoneOffset()*60000;
    const ksa = new Date(utc + 3*3600000);
    const hh  = String(ksa.getHours()).padStart(2,'0');
    const mm  = String(ksa.getMinutes()).padStart(2,'0');
    const ss  = String(ksa.getSeconds()).padStart(2,'0');
    clock && (clock.textContent = hh + ':' + mm + ':' + ss + '  (+03)');
  }
  updateClock();
  setInterval(updateClock, 1000);
})();