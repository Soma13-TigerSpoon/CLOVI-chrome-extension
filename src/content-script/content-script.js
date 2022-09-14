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
$header.className = "clv-header"
const $main = document.createElement("main");
$main.className = "clv-main"
$main.innerHTML = '<div class="clv-div clv-emptyItems">No items to load.</div>';
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
$header.appendChild($header__youtuber);
$header.appendChild($header__right);
$header__right.appendChild($right__model);
$header__right.appendChild($right__close);

const render = (video_data=null) => {

  const updateContents = (timeline) => {
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

  const get_header__youtuber = (youtuber) => {
    return `
      <img class="clv-header__youtuber__img" src=${youtuber.profileUrl}>
      <div class="clv-div">${youtuber.creator}</div>
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
  const get_items = (clothes, reset) => {
    if (currentItemId === -1) {
      return '<div class="clv-div clv-emptyItems">No items to load.</div>';
    } else {
      console.log(collections);
      let clothes = collections[currentItemId].items;
      console.log(clothes);
      return clothes
        .map(
          (i) => `
          <div class="clv-div clv-card">
            <a class="clv-a" href="${i.shops[0].shopUrl}" target="_blank">
              <div class="clv-div clv-item">
                  <img class="clv-item__img" src=${i.itemImgUrl}>
                  <div class="clv-div clv-item__info">
                      <div class="clv-div clv-info__name">${i.name}</div>
                      <div class="clv-div clv-info__others">
                          <div class="clv-div clv-others__seller">
                              <img class="clv-seller__img" src=${
                                i.shops[0].logoUrl
                              }>
                              <div class="clv-div clv-seller__name">${
                                i.shops[0].name
                              }</div>
                          </div>
                          <div class="clv-div clv-others__right">
                              <div class="clv-div clv-right__price">${
                                new Intl.NumberFormat().format(i.shops[0].price)
                              }원</div>
                              <div class="clv-div clv-right__colorSize">${i.color}/${
            i.size
          }</div>
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
          ${i.shops
            .map(
              (shop) => `
              <a class="clv-a" href="${shop.shopUrl}" target="_blank">
                <div class="clv-div clv-shops__shop">
                  <div class="clv-div clv-shop__shopInfo">
                    <img class="clv-shopInfo__shopLogo" src=${shop.logoUrl}>
                    <div class="clv-div clv-shopInfo__shopName">${shop.name}</div>
                  </div>
                  <div class="clv-div clv-shop__price">${new Intl.NumberFormat().format(shop.price)}원</div>
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

  const video = document.getElementsByClassName("video-stream")[0];
  console.log(video);
  console.log(video.currentTime);

  videoData = video_data;
  youtuber = {
    creator: videoData.creator,
    profileUrl: videoData.profileImgUrl
  };
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
  $header__youtuber.innerHTML = get_header__youtuber(youtuber);
  timeline = Object.keys(collections).map((i) => i);
  timeline.sort((a, b) => a - b);
  console.log(timeline);
  updateContents(timeline);

  video.addEventListener("timeupdate", () => {
    if (videoData != undefined) {
      updateContents(timeline);
    }
  });
};

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log(
    sender.tab
      ? "from a content script:" + sender.tab.url
      : "from the extension"
  );
  if (request.message === "TabUpdated_Video_Registered") {
    console.log("tab updated and is a registered Video.");
    console.log('CS', request.video_data);
    $clovi.style.display = "block";
    sendResponse({ message: "rendered and $clovi turned on." });
    render(request.video_data);
  } else if(request.message === "TabUpdated_Video_NOT_Registered"){
    console.log("tab updated and is NOT a registered Video.");
    $clovi.style.display = "none";
    sendResponse({ message: "$clovi turned off." });
  }else if (request.message === "TabUpdated_NotVideo") {
    console.log("tab updated and is NOT video confirmed.");
    $clovi.style.display = "none";
    sendResponse({ message: "$clovi turned off." });
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