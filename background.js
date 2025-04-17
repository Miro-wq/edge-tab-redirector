chrome.webNavigation.onBeforeNavigate.addListener(async (details) => {
  if (details.frameId !== 0) return;

  const { enabled } = await chrome.storage.sync.get(['enabled']);
  if (!enabled) return;

  const { lastRedirectUrl, redirectWindowId } = await chrome.storage.local.get(['lastRedirectUrl', 'redirectWindowId']);
  if (lastRedirectUrl === details.url) {
    chrome.storage.local.remove('lastRedirectUrl');
    return;
  }

  chrome.tabs.get(details.tabId, (tab) => {
    if (redirectWindowId && tab.windowId !== redirectWindowId) {
      chrome.storage.local.set({ lastRedirectUrl: details.url });

      chrome.tabs.remove(details.tabId, () => {
        chrome.tabs.create({
          windowId: redirectWindowId,
          url: details.url,
          active: true
        });
      });
    }
  });
});
