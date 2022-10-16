let youtuber,
  collections = {},
  videoData,
  timeline,
  currentItemId = -1;

const $body = document.getElementsByTagName("body")[0];
const $clovi = document.createElement("div");
$clovi.id = "clovi";
$body.appendChild($clovi);
const $header = document.createElement("header");
const $footer = document.createElement("footer");
$header.className = "clv-header";
$footer.className = "clv-footer";
$footer.innerHTML = "<a class='clv-a' target='_blank' href='https://www.clovi.app/'><div class='clv-footer-text'>클로비 웹사이트 방문하기</div></a>";
const $main = document.createElement("main");
$main.className = "clv-main";
// $main.innerHTML = '<div class="clv-div clv-emptyItems">No items to load.</div>';
const $header__youtuber = document.createElement("div");
const $header__right = document.createElement("div");
const $right__model = document.createElement("div");
const $right__close = document.createElement("div");
$header__youtuber.className = "clv-div clv-header__youtuber";
$header__right.className = "clv-div clv-header__right";
$right__model.className = "clv-div clv-right__model";
$right__close.className = "clv-div clv-right__close";
$right__close.innerHTML = "<span>&#10005;</span>";
$right__close.addEventListener("click", () => {
  $clovi.style.display = "none";
});
$clovi.appendChild($header);
$clovi.appendChild($main);
$clovi.appendChild($footer);
$header.appendChild($header__youtuber);
$header.appendChild($header__right);
$header__right.appendChild($right__model);
$header__right.appendChild($right__close);

const updateContents = (timeline, byRender, video_data, video) => {
  console.log("update, video_data:", video_data);
  if (byRender) {
    console.log("by render");
  } else {
    console.log("by timeupdate event");
  }
  let newCurrentItemId;
  const currentTimeInSec = Math.floor(video.currentTime);
  if (currentTimeInSec < timeline[0]) {
    newCurrentItemId = -1;
  } else {
    for (i = timeline.length - 1; i > -1; i--) {
      if (currentTimeInSec >= timeline[i]) {
        newCurrentItemId = timeline[i];
        break;
      }
    }
  }
  if (newCurrentItemId != currentItemId) {
    currentItemId = newCurrentItemId;
    $right__model.innerHTML = get_right__model(currentItemId);
    $main.innerHTML = get_items(currentItemId);
    const $shopLinks = document.getElementsByClassName("clv-shopLink");
    console.log("$shopLink", $shopLinks);
    for (const shopLink of $shopLinks) {
      shopLink.onclick = function () {
        console.log(
          `clicked, log data:\n\titem id: ${shopLink.dataset.itemId}\n\tshop id: ${shopLink.dataset.shopId}\n\tvideo id: ${video_data.id}`
        );
        // alert(
        //   `item id: ${shopLink.dataset.itemId}\nshop id: ${shopLink.dataset.shopId}\nvideo id: ${video_data.id}`
        // );
        chrome.runtime.sendMessage(
          {
            greeting: "log_data",
            videoId: video_data.id,
            itemId: shopLink.dataset.itemId,
            shopId: shopLink.dataset.shopId,
          },
          function (response) {
            console.log(response.farewell);
          }
        );
      };
    }
    if (newCurrentItemId !== -1) {
      let $folds = document.getElementsByClassName("clv-fold");
      for (let i = 0; i < $folds.length; i++) {
        $folds[i].addEventListener("click", function () {
          this.classList.toggle("clv-active");
          this.children[0].classList.toggle("clv-superactive");
          let shops = this.parentElement.nextElementSibling;
          if (shops.style.display === "block") {
            shops.style.display = "none";
          } else {
            shops.style.display = "block";
          }
        });
      }
    }
  }
};

const get_header__youtuber = (youtuber = null) => {
  const profileUrl = youtuber === null ? "" : youtuber.profileUrl;
  const creator = youtuber === null ? "" : youtuber.creator;
  return `
    <img class="clv-header__youtuber__img" src=${profileUrl}>
    <div class="clv-div">${creator}</div>
  `;
};

const get_right__model = (currentItemId) => {
  if (currentItemId === -1) {
    return "";
  } else {
    let model = collections[currentItemId].model;
    return `
      <div class="clv-div clv-right__model-name clv-right__model__children">${model.name}</div>
      <div class="clv-div clv-right__model-height clv-right__model__children">${model.height}cm</div>
      <div class="clv-div clv-right__model-weight clv-right__model__children">${model.weight}kg</div>
    `;
  }
};
const get_items = () => {
  if (currentItemId === -1) {
    return '';
  } else {
    console.log(collections);
    let clothes = collections[currentItemId].items;
    console.log(clothes);
    return clothes
      .map(
        (i) => `
        <div class="clv-div clv-card">
          <a class="clv-a clv-shopLink" data-item-id="${
            i.item.id
          }" data-shop-id="${
          i.affiliationLink
            ? i.affiliationLink.shopId
            : i.item.shops.length > 0
            ? i.item.shops[0].id
            : null
        }" href="${
          // 여기 ternary operator는 affiliation이 아직 적용이 안 되었기 때문에 있는 것
          i.affiliationLink
            ? i.affiliationLink.shopUrl
            : i.item.shops.length > 0
            ? i.item.shops[0].shopUrl
            : null
        }" target="_blank">
            <div class="clv-div clv-item">
                <img class="clv-item__img" src=${i.item.itemImgUrl}>
                <div class="clv-div clv-item__info">
                    <div class="clv-div clv-info__name">
                      <span class="clv-info__name-brand">[${
                        i.item.brand
                      }]</span>
                      <span>${i.item.name}</span>
                    </div>
                    <div class="clv-div clv-info__others">
                        <div class="clv-div clv-others__seller">
                            <img class="clv-seller__img" src=${
                              i.affiliationLink
                                ? i.affiliationLink.shopLogoUrl
                                : i.item.shops.length > 0
                                ? i.item.shops[0].logoUrl
                                : ""
                            }>
                            <div class="clv-div clv-seller__name">${
                              i.affiliationLink
                                ? i.affiliationLink.shopName
                                : i.item.shops.length > 0
                                ? i.item.shops[0].name
                                : "판매처를 찾을 수 없습니다."
                            }</div>
                        </div>
                        <div class="clv-div clv-others__right">
                            <div class="clv-div clv-right__price">${
                              i.affiliationLink
                                ? i.affiliationLink.price
                                : i.item.shops.length > 0
                                ? new Intl.NumberFormat().format(
                                    i.item.shops[0].price
                                  )
                                : 0
                            }원</div>
                            <div class="clv-div clv-right__colorSize">${
                              i.item.color
                            }/${i.item.size}</div>
                        </div>
                    </div>
                </div>
            </div>
          </a/>
          <div class="clv-div clv-fold">
              <div class="clv-div clv-fold__button">&#9660;</div>
          </div>
      </div>
      <div class="clv-div clv-shops">
        ${i.item.shops
          .map(
            (shop) => `
            <a class="clv-a clv-shopLink" data-item-id="${
              i.item.id
            }" data-shop-id="${shop.id}" href="${shop.shopUrl}" target="_blank">
              <div class="clv-div clv-shops__shop">
                <div class="clv-div clv-shop__shopInfo">
                  <img class="clv-shopInfo__shopLogo" src=${shop.logoUrl}>
                  <div class="clv-div clv-shopInfo__shopName">${shop.name}</div>
                </div>
                <div class="clv-div clv-shop__price">${new Intl.NumberFormat().format(
                  shop.price
                )}원</div>
              </div>
            </a>
        `
          )
          .join("")}
      </div>
    `
      )
      .join("");
  }
};

let video;
const render = (video_data = null) => {
  video = document.getElementsByClassName("video-stream")[0];
  console.log(video);
  console.log(video.currentTime);
  console.log("video_data:", video_data);
  videoData = video_data;
  console.log("videoData:", videoData);
  console.log("youtuber:", youtuber);

  youtuber = {
    creator: videoData.creator,
    profileUrl: videoData.profileImgUrl,
  };
  console.log("youtuber:", youtuber);
  collections = {};
  videoData.lists.forEach((i) => {
    collections[i.times.start] = {
      model: {
        height: i.model.height_cm,
        name: i.model.name,
        weight: i.model.weight_kg,
      },
      items: i.items,
    };
  });
  console.log(collections);
  console.log("$header__youtuber.innerHTML:", $header__youtuber.innerHTML);
  $header__youtuber.innerHTML = get_header__youtuber(youtuber);
  console.log("$header__youtuber.innerHTML:", $header__youtuber.innerHTML);
  timeline = Object.keys(collections).map((i) => i);
  timeline.sort((a, b) => a - b);
  console.log(timeline);
  updateContents(timeline, 1, videoData, video);

  video.ontimeupdate = function () {
    if (videoData != null) {
      updateContents(timeline, 0, videoData, video);
    }
  };
};

const clear = () => {
  console.log("clear!!!");
  $header__youtuber.innerHTML = get_header__youtuber();
  // video = null;
  video = document.getElementsByClassName("video-stream")[0]
    ? document.getElementsByClassName("video-stream")[0]
    : null;
  if (video) {
    video.ontimeupdate = null;
  }
  $right__model.innerHTML = "";
  $main.innerHTML =
    '';
  // 이 부분을 다르게 렌더링하면 비디오 아닌 경우에 보여줄 화면을 따로 지정하는 것이 가능함.
};

// const timeupdateHandler = () => {
//   if (videoData != undefined) {
//     updateContents(timeline, 0, video_data, video);
//   }
// };
// video.addEventListener("timeupdate", timeupdateHandler);

// document.addEventListener("yt-navigate-start", () => {
//   console.log('yt-navigate-start');
//   video.removeEventListener("timeupdate", timeupdateHandler);
// });
// window.onhashchange = () => {
//   console.log('going back and forth');
//   video.removeEventListener("timeupdate", timeupdateHandler);
// }

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log(
    sender.tab
      ? "from a content script:" + sender.tab.url
      : "from the extension"
  );
  if (request.message === "TabUpdated_Video_Registered") {
    console.log("tab updated and is a registered Video.");
    console.log("CS", request.video_data);
    $clovi.style.display = "block";
    sendResponse({ message: "rendered and $clovi turned on." });
    render(request.video_data);
  } else if (request.message === "TabUpdated_Video_NOT_Registered") {
    console.log("tab updated and is NOT a registered Video.");
    $clovi.style.display = "none";
    sendResponse({ message: "$clovi turned off." });
    clear();
  } else if (request.message === "TabUpdated_NotVideo") {
    console.log("tab updated and is NOT video confirmed.");
    $clovi.style.display = "none";
    sendResponse({ message: "$clovi turned off." });
    clear();
  }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log(
    sender.tab
      ? "from a content script:" + sender.tab.url
      : "from the extension"
  );
  if (request.message === "show_UI") {
    console.log("request to show UI confirmed");
    $clovi.style.display = "block";
    sendResponse({ message: "showing UI again." });
  }
});

console.log("content script loaded!");
