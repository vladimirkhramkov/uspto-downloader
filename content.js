chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
  if (request.action === 'startDownload') {
    const allLinks = Array.from(document.querySelectorAll('a'))
      .filter(a => /^ip[ag]\d{6}(_r\d+)?\.zip$/i.test(a.textContent.trim()));

    const zipNames = allLinks.map(a => a.textContent.trim());

    const { downloadedZips = [] } = await chrome.storage.local.get(['downloadedZips']);
    const toDownload = zipNames.filter(name => !downloadedZips.includes(name));

    for (const name of toDownload) {
      const link = allLinks.find(a => a.textContent.trim() === name);
      if (link) {
        console.log('Clicking:', name);
        link.scrollIntoView();
        link.click();
        downloadedZips.push(name);
        await chrome.storage.local.set({ downloadedZips });
        await new Promise(res => setTimeout(res, 10000));
      }
    }

    alert(`Clicked ${toDownload.length} new ZIP links.`);
  }
});