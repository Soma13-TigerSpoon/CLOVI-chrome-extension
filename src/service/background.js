import Video from "./video.js";
chrome.tabs.onActivated.addListener(getUrl);

function getUrl() {
  let url, video_id;
  chrome.tabs.query(
    { active: true, lastFocusedWindow: true, currentWindow: true },
    async (tabs) => {
      url = tabs[0].url;
      video_id = youtube_id_parser(url);
      console.log(url);
      let videoData;
      if(video_id != false){
        console.log(video_id);
          console.log(typeof video_id);

        const storageObj = await chrome.storage.local.get(null);
        if(storageObj.hasOwnProperty(video_id)){
          console.log('1', video_id);
            videoData = await chrome.storage.local.get(video_id);
            console.log(videoData);
        } else {
          console.log('2', video_id);
          const myvideo = new Video(video_id, "핏더사이즈");
          videoData = myvideo.info();
          console.log(videoData);
          console.log(video_id, typeof video_id);
          chrome.storage.local.set({ [video_id]: videoData });
          chrome.storage.local.get(null, item => console.log(item));
        }
      } else {
        console.log(`video_id is false! - video_id: ${video_id}`);
      }
      console.log(videoData);
    }
  );
}

function youtube_id_parser(url) {
  var regExp =
    /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  var match = url.match(regExp);
  return match && match[7].length == 11 ? match[7] : false;
}

// let color = '#3aa757';

// chrome.runtime.onInstalled.addListener(() => {
//   chrome.storage.sync.set({ color });
//   console.log('Default background color set to %cgreen', `color: ${color}`);
// });

// import { dummydata } from './dummydata.js';
// console.log(dummydata);

// let currentUrl, currentTime;

// let currentVideo = 'initial state';
// chrome.runtime.onInstalled.addListener(() => {
//   chrome.storage.sync.set({ currentVideo });
//   console.log('Default currentVideo set to:', currentVideo);
// });

// chrome.tabs.onActivated.addListener(activeInfo => {
//   console.log('detected');
//   chrome.tabs.get(activeInfo.tabId, (tab) => {
//     if(currentUrl !== tab.url){
//       currentUrl = tab.url;
//       chrome.storage.sync.set({ currentUrl });
//       console.log(currentUrl);
//       console.log("url updated by onActivated event.");
//     }
//   });
// });

// chrome.tabs.onUpdated.addListener(
//   (tabId, changeInfo, tab) => {
//     if(currentUrl !== tab.url){
//       currentUrl = tab.url;
//       chrome.storage.sync.set({ currentUrl });
//       console.log(currentUrl);
//       console.log("url updated by onUpdated event.");
//     }
//   }
// );
