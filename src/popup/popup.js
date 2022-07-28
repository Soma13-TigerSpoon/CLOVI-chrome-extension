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

let $message = document.getElementById("message");

// $message.innerText = String(dummydata);

chrome.storage.sync.get("currentUrl", ({ currentUrl }) => {
    $message.innerText = currentUrl;
});


// 아이콘 클릭하면 지정해놓은 아이템 리스트 나오도록. 

// **************** let's do injection