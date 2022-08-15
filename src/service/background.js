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
    if (storageObj.hasOwnProperty(video_id)) {
      console.log("1", video_id);
      video_data = await chrome.storage.local.get(video_id);
      console.log(video_data);
    } else {
      console.log("2", video_id);
      const myvideo = new Video(video_id, "핏더사이즈");
      video_data = await myvideo.info();
      console.log(video_data);
      console.log(video_id, typeof video_id);
      chrome.storage.local.set({ [video_id]: video_data });
      chrome.storage.local.get(null, (item) => console.log(item));
    }
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
