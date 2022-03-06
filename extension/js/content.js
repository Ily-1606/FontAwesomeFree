chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.command == "loadsvg") {
      const search = window.location.search;
      const searchParams = new URLSearchParams(search);
      const style = searchParams.get('s');
      const iconName = window.location.pathname.split('icons/')[1]
      window.open(`https://site-assets.fontawesome.com/releases/v6.0.0/svgs/${style}/${iconName}.svg`)
  }
});
