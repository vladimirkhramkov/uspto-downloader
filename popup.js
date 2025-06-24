document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('downloadBtn').addEventListener('click', async () => {
    chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
      chrome.tabs.sendMessage(tab.id, { action: 'startDownload' });
    });
  });

  document.getElementById('resetBtn').addEventListener('click', () => {
    chrome.storage.local.set({ downloadedZips: [] }, () => {
      alert('Download history cleared!');
    });
  });
});