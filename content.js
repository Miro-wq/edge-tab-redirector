document.addEventListener('click', function (e) {
  const anchor = e.target.closest('a');
  if (anchor && anchor.href && anchor.target !== '_blank') {
    chrome.storage.sync.get(['enabled'], (data) => {
      if (data.enabled) {
        e.preventDefault();
        chrome.runtime.sendMessage({ action: "openInAnotherWindow", url: anchor.href });
      }
    });
  }
});
