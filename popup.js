document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('toggle');
  const redirectBtn = document.getElementById('set-redirect');

  chrome.storage.sync.get(['enabled'], (data) => {
    toggle.checked = data.enabled ?? true;
  });

  toggle.addEventListener('change', () => {
    chrome.storage.sync.set({ enabled: toggle.checked });
  });

  if (redirectBtn) {
    redirectBtn.addEventListener('click', () => {
      chrome.windows.getCurrent((win) => {
        chrome.storage.local.set({ redirectWindowId: win.id }, () => {
          alert("Redirect destination set.");
        });
      });
    });
  }
});
