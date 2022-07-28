// import Video from './video.js';
// chrome.tabs.onActivated.addListener(getUrl);

// function getUrl() {
//   let url,video_id;
//   chrome.tabs.query({'active': true, 'lastFocusedWindow': true, 'currentWindow': true}, function (tabs) {
//     url = tabs[0].url;
//     video_id = youtube_id_parser(url)
//     console.log(url);
//     if (video_id != false){
//       console.log(video_id);
//       const myvideo = new Video(video_id,"핏더사이즈");
//       const response = myvideo.info();
//       console.log(response);
//     }
//   }); 
// }

// function youtube_id_parser(url){
//   var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
//   var match = url.match(regExp);
//   return (match&&match[7].length==11)? match[7] : false;
// }

// let color = '#3aa757';

// chrome.runtime.onInstalled.addListener(() => {
//   chrome.storage.sync.set({ color });
//   console.log('Default background color set to %cgreen', `color: ${color}`);
// });



// import { dummydata } from './dummydata.js';
// console.log(dummydata);

let currentUrl;

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ currentUrl });
  console.log('Default currentUrl set to:', currentUrl);
});


chrome.tabs.onActivated.addListener(activeInfo => {
  console.log('detected');
  chrome.tabs.get(activeInfo.tabId, (tab) => {
    if(currentUrl !== tab.url){ 
      currentUrl = tab.url;
      chrome.storage.sync.set({ currentUrl });
      console.log(currentUrl);
      console.log("url updated by onActivated event.");
    }
  });
});

chrome.tabs.onUpdated.addListener(
  (tabId, changeInfo, tab) => {
    if(currentUrl !== tab.url){ 
      currentUrl = tab.url;
      chrome.storage.sync.set({ currentUrl });
      console.log(currentUrl);
      console.log("url updated by onUpdated event.");
    }
  }
);