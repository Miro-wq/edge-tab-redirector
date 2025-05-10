document.addEventListener('DOMContentLoaded', () => {
  const toggleOn = document.getElementById('toggle-on');
  const toggleOff = document.getElementById('toggle-off');

  chrome.storage.sync.get(['enabled'], (data) => {
    if (data.enabled ?? true) {
      setActive('on');
    } else {
      setActive('off');
    }
  });

  function setActive(state) {
    if (state === 'on') {
      toggleOn.classList.add('active');
      toggleOff.classList.remove('active');
      chrome.storage.sync.set({ enabled: true });
    } else {
      toggleOff.classList.add('active');
      toggleOn.classList.remove('active');
      chrome.storage.sync.set({ enabled: false });
    }
  }

  toggleOn.addEventListener('click', () => setActive('on'));
  toggleOff.addEventListener('click', () => setActive('off'));

  const redirectBtn = document.getElementById('set-redirect');
  if (redirectBtn) {
    redirectBtn.addEventListener('click', () => {
      chrome.windows.getCurrent((win) => {
        chrome.storage.local.set({ redirectWindowId: win.id }, () => {
          alert("The current window has been set as the redirect destination.");
        });
      });
    });
  }
});
