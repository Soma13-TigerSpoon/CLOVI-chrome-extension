let message = document.getElementById('message')
let count = 0;

message.innerText = count;

// chrome.runtime.onMessage.addListener(function(request, sender) {
//     if (request.action == "getSource") {
//         this.pageSource = request.source;
//         var title = this.pageSource.match(/<title[^>]*>([^<]+)<\/title>/)[1];
//         alert(title)
//     }
// });

chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    console.log(tabs[0].id);
    message.innerText = tabs[0].id;
});