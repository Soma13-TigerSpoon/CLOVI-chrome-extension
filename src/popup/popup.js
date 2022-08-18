
const $header = document.getElementById('header');
console.log('popup.js loaded')
$header.innerText = 'popup'
chrome.runtime.onMessage.addListener(
    (request, sender, sendResponse) => {
        console.log('message requested');
        console.log(sender.tab ? 
            "from a content script" + sender.tab.url : 
            "from the extension"  
        );
        $header.innerText = request.currTimeInSec;
        sendResponse('response');
    }
);
