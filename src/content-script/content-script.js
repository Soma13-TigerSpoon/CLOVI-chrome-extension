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
const $main = document.createElement("main");
$main.innerHTML = '<div class="emptyItems">No items to load.</div>';
const $header__youtuber = document.createElement("div");
const $header__right = document.createElement("div");
const $right__model = document.createElement("div");
const $right__close = document.createElement("div");
$header__youtuber.className = "header__youtuber";
$header__right.className = "header__right";
$right__model.className = "right__model";
$right__close.className = "right__close";
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

const render = () => {
  const video = document.getElementsByClassName("video-stream")[0];
  console.log(video);
  console.log(video.currentTime);

  video.addEventListener("timeupdate", () => {
    if (videoData != undefined) {
      updateContents(timeline);
    }
  });

  chrome.runtime.sendMessage({ greeting: "hello" }, (video_data) => {
    console.log(video_data);
    videoData = video_data;
    youtuber = video_data.Items[0];
    videoData.Items[0].lists.forEach((i) => {
      collections[i.time.start] = {
        model: {
          height: i.model.height,
          name: i.model.name,
          weight: i.model.weight,
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
  });

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
        let $folds = document.getElementsByClassName("fold");
        for (let i = 0; i < $folds.length; i++) {
          $folds[i].addEventListener("click", function () {
            this.classList.toggle("active");
            this.children[0].classList.toggle("superactive");
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
      <img class="header__youtuber__img" src=${youtuber.profileUrl}>
      <div>${youtuber.creator}</div>
    `;
  };
  const get_right__model = (currentItemId) => {
    if (currentItemId === -1) {
      return "";
    } else {
      let model = collections[currentItemId].model;
      return `
        <div class="right__model-name right__model__children">${model.name}</div>
        <div class="right__model-height right__model__children">${model.height}cm</div>
        <div class="right__model-weight right__model__children">${model.weight}kg</div>
      `;
    }
  };
  const get_items = (clothes, reset) => {
    if (currentItemId === -1) {
      return '<div class="emptyItems">No items to load.</div>';
    } else {
      console.log(collections);
      let clothes = collections[currentItemId].items;
      console.log(clothes);
      return clothes
        .map(
          (i) => `
          <div class="card">
            <a href="${i.shops[0].shopUrl}" target="_blank">
              <div class="item">
                  <img class="item__img" src=${i.imgUrl}>
                  <div class="item__info">
                      <div class="info__name">${i.name}</div>
                      <div class="info__others">
                          <div class="others__seller">
                              <img class="seller__img" src=${
                                i.shops[0].shopUrl
                              }>
                              <div class="seller__name">${
                                i.shops[0].shopName
                              }</div>
                          </div>
                          <div class="others__right">
                              <div class="right__price">${
                                i.shops[0].price
                              }원</div>
                              <div class="right__colorSize">${i.color}/${
            i.size
          }</div>
                          </div>
                      </div>
                  </div>
              </div>
            </a/>
            <div class="fold">
                <div class="fold__button">&#9660;</div>
            </div>
        </div>
        <div class="shops">
          ${i.shops
            .map(
              (shop) => `
              <a href="${shop.shopUrl}" target="_blank">
                <div class="shops__shop">
                  <div class="shop__shopInfo">
                    <img class="shopInfo__shopLogo" src=${shop.imgUrl}>
                    <div class="shopInfo__shopName">${shop.shopName}</div>
                  </div>
                  <div class="shop__price">${shop.price}원</div>
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
};

// render();

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log(
    sender.tab
      ? "from a content script:" + sender.tab.url
      : "from the extension"
  );
  if (request.message === "TabUpdated_Video") {
    console.log("tab updated and is video confirmed.");
    $clovi.style.display = "block";
    render();
    sendResponse({ message: "rendered and $clovi turned on." });
  } else if (request.message === "TabUpdated_NotVideo") {
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