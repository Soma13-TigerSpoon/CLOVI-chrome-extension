import Video from "./video.js";

function youtube_id_parser(url) {
  var regExp =
    /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  var match = url.match(regExp);
  return match && match[7].length == 11 ? match[7] : false;
}

async function getVideoData(request, sender) {
  console.log(
    sender.tab
      ? "from a content script:" + sender.tab.url
      : "from the extension"
  );

  let url, video_id, video_data;
  url = sender.tab.url;
  video_id = youtube_id_parser(url);
  console.log(url);
  if (video_id != false) {
    console.log(video_id);
    console.log(typeof video_id);

    const storageObj = await chrome.storage.local.get(null);
    console.log(storageObj);

    if (!storageObj.hasOwnProperty(video_id)) {
      console.log("first time to load this video. setting storage", video_id);
      const myvideo = new Video(video_id, "핏더사이즈");
      const newVideoData = await myvideo.info();
      await chrome.storage.local.set({ [video_id]: newVideoData });
    }
    
    console.log("now getting data from storage");
    video_data = await chrome.storage.local.get(video_id);

  } else {
    console.log(`video_id is false! - video_id: ${video_id}`);
  }
  console.log(video_data);
  return video_data[video_id];
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  getVideoData(request, sender).then(sendResponse);
  return true;
});

let urlBefore = '';
chrome.tabs.onUpdated.addListener(
  (tabId, changeInfo, tab) => {
    // if(urlBefore === tab.url)
    //   return;

    // urlBefore = tab.url;
    if(changeInfo.status !== 'complete')
      return;

    if(tab.url.startsWith('https://www.youtube.com/watch?v=')){
      console.log("now you're watching a video");

      const ping = () => {
        console.log('pinged');
        chrome.tabs.sendMessage(tabId, {
          message: "TabUpdated_Video"
        }, (response) => {
          if(chrome.runtime.lastError){
            setTimeout(ping, 1000);
          }else{
            console.log(response.message);
          }
        });
      };
      ping();

    }else{
      console.log("now you're NOT watching a video");
      const ping2 = () => {
        console.log('ping2ed');
        chrome.tabs.sendMessage(tabId, {
          message: "TabUpdated_NotVideo"
        }, (response) => {
          if(chrome.runtime.lastError){
            setTimeout(ping2, 1000);
          }else{
            console.log(response.message);
          }
        });
      };
      ping2();
    }

  }
  
);