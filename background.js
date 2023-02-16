chrome.tabs.onUpdated.addListener( function (tabId, changeInfo, tab) {
    if (tab.url?.startsWith("chrome://")) return undefined;
    if (!tab.url?.startsWith("https://us-east-1.console.aws.amazon.com/")) return undefined;
    try {
      chrome.scripting.executeScript({
        target: {
          tabId: tabId,
        },
        func: () => {
  
          const navaws = document.querySelectorAll('[data-testid=awsc-nav-account-menu-button]')[0];
          const title = navaws.querySelector('span').getAttribute('title');
          const text = title.split('@')[1].trim();
  
          const preftoreplace = document.querySelectorAll('[data-testid=awsc-footer-cookie-preferences]')[0];
          preftoreplace.innerHTML = text;
          console.log('replaced cookie preferences with account name');
        },
      });
    } catch (err) {
      console.error(`failed to execute script: ${err}`);
    }
});