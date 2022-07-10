chrome.runtime.onMessage.addListener(function(request, sender) {
    if (request.action == "getSource") {
        this.pageSource = request.source;
        var title = this.pageSource.match(/<title[^>]*>([^<]+)<\/title>/)[1];
        alert(title)
    }
});

chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    chrome.tabs.executeScript(
        tabs[0].id,
        { code: 'var s = document.documentElement.outerHTML; chrome.runtime.sendMessage({action: "getSource", source: s});' }
    );
});