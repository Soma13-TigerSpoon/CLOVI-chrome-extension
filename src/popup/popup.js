// chrome.runtime.onMessage.addListener(function(request, sender) {
//     if (request.action == "getSource") {
//         this.pageSource = request.source;
//         var title = this.pageSource.match(/<title[^>]*>([^<]+)<\/title>/)[1];
//         alert(title)
//     }
// });

// chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
//     chrome.tabs.executeScript(
//         tabs[0].id,
//         { code: 'var s = document.documentElement.outerHTML; chrome.runtime.sendMessage({action: "getSource", source: s});' }
//     );
// });

const dummydata = [
    {
        "youtuber" : {
            "name": "킹타쿠Kingtaku",
            "profileUrl": "../../assets/images/clovi-logo.png",
        },
        "model" : {
            "name": "킹타쿠",
            "height": 173,
            "weight": 65
        },
        "clothes" : [
            {
                "name": "Shirter Silky Wide Shirts", 
                "imageUrl": "../../assets/images/clovi-logo.png",
                "size": 'S',
                "color": 'White',
                "sellers": [
                    {
                        "name": "무신사",
                        "shopImage": "../../assets/images/clovi-logo.png",
                        "price": 148000
                    },
                    {
                        "name": "WOULDBE",
                        "shopImage": "../../assets/images/clovi-logo.png",
                        "price": 147900
                    },
                    {
                        "name": "무신사",
                        "shopImage": "../../assets/images/clovi-logo.png",
                        "price": 148000
                    }
                ]
            },
            {
                "name": "Wouldbe V Neck Knit Vest", 
                "imageUrl": "../../assets/images/clovi-logo.png",
                "size": 'M',
                "color": 'Ivory',
                "sellers": [
                    {
                        "name": "무신사",
                        "shopImage": "../../assets/images/clovi-logo.png",
                        "price": 148000
                    },
                    {
                        "name": "WOULDBE",
                        "shopImage": "../../assets/images/clovi-logo.png",
                        "price": 147900
                    },
                    {
                        "name": "무신사",
                        "shopImage": "../../assets/images/clovi-logo.png",
                        "price": 148000
                    }
                ]
            },
            {
                "name": "Ordinary Fits New Farmers Denim", 
                "imageUrl": "../../assets/images/clovi-logo.png",
                "size": '30',
                "color": 'Used',
                "sellers": [
                    {
                        "name": "무신사",
                        "shopImage": "../../assets/images/clovi-logo.png",
                        "price": 148000
                    },
                    {
                        "name": "WOULDBE",
                        "shopImage": "../../assets/images/clovi-logo.png",
                        "price": 147900
                    },
                    {
                        "name": "무신사",
                        "shopImage": "../../assets/images/clovi-logo.png",
                        "price": 148000
                    }
                ]
            },
            {
                "name": "Ancient Greek Sandals Hero Sandal", 
                "imageUrl": "../../assets/images/clovi-logo.png",
                "size": 'S',
                "color": 'White',
                "sellers": [
                    {
                        "name": "무신사",
                        "shopImage": "../../assets/images/clovi-logo.png",
                        "price": 148000
                    },
                    {
                        "name": "WOULDBE",
                        "shopImage": "../../assets/images/clovi-logo.png",
                        "price": 147900
                    },
                    {
                        "name": "무신사",
                        "shopImage": "../../assets/images/clovi-logo.png",
                        "price": 148000
                    }
                ]
            }
        ]
    }
];

// let $message = document.getElementById("message");

// $message.innerText = String(dummydata);

// chrome.storage.sync.get("currentUrl", ({ currentUrl }) => {
//     $message.innerText = currentUrl;
// });

let dd = dummydata[0];

// 아이콘 클릭하면 지정해놓은 아이템 리스트 나오도록. 
let $header = document.getElementById("header");
console.log($header);
let $main = document.getElementById("main");
$header.innerHTML = `
    <div class="header__youtuber">
        <img class="header__youtuber__img" src=${dd.youtuber.profileUrl}>
        <div>${dd.youtuber.name}</div>
    </div>
    <div class="header__model">
        <div class="header__model-name header__model__children">${dd.model.name}</div>
        <div class="header__model-height header__model__children">${dd.model.height}cm</div>
        <div class="header__model-weight header__model__children">${dd.model.weight}kg</div>
    </div>
`;


$main.innerHTML = dd.clothes.map(i => (`
    <div class="card">
        <div class="item">
            <img class="item__img" src=${i.imageUrl}>
            <div class="item__info">
                <div class="info__name">${i.name}</div>
                <div class="info__others">
                    <div class="others__seller">
                        <img class="seller__img" src=${i.sellers[0].shopImage}>
                        <div class="seller__name">${i.sellers[0].name}</div>
                    </div>
                    <div class="others__right">
                        <div class="right__price">${i.sellers[0].price}원</div>
                        <div class="right__colorSize">${i.color}/${i.size}</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="fold">
            <i></i>
        </div>
    </div>
`)).join('');



// chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
//     chrome.tabs.sendMessage(tabs[0].id, {greeting: "hello"}, function(response) {
//       console.log(response.farewell);
//     });
//   });

// **************** let's do injection