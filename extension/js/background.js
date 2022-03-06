chrome.action.onClicked.addListener((tab) => {
    console.log(tab);
    chrome.tabs.sendMessage(tab.id, { command: "loadsvg" });
  });