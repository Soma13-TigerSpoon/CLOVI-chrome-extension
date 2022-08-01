// const $ytbTimeStampCurrentTime =
//   document.getElementsByClassName("ytp-time-current")[0];

// const $title = document.getElementById("logo-icon");

// let observer = new MutationObserver((mutations) => {
//   console.log(mutations[1].addedNodes[0].nodeValue);
//   console.log(typeof mutations[1].addedNodes[0].nodeValue);
//   $title.innerHTML = mutations[1].addedNodes[0].nodeValue;
// });

// var config = {
//   childList: true,
// };
// observer.observe($ytbTimeStampCurrentTime, config);

video = document.getElementsByClassName('video-stream')[0];
console.log(video);
console.log(video.currentTime);
// video.currentTime은 4.946527 처럼 100만분의 1초까지 나오네. 
// 아니 그럼 time change는 어케 감지되지 1초에 백만번감지되면 안되는디. 
setTimeout(() => console.log(video.currentTime), 5000);
video.addEventListener("timeupdate", () => console.log(Math.floor(video.currentTime)));