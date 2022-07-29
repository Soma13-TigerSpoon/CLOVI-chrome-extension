import {requestUrl} from "../config.js";

export default class Video{
    constructor(id, creator){
        this.id = id;
        this.creator = creator;
    }
    get videoUrl(){
        return "https://www.youtube.com/watch?v={}".format(this.id);
    }
    async info(){
        let params = { "id": this.id, "creator": this.creator }; 
        let query = "?"+Object.keys(params) 
            .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k])) 
            .join('&'); 
        console.log(query);
        const result = await fetch(requestUrl + query,{
            method: "GET",
            mode: 'cors',
            headers:{
                "Content-Type": "application/json",
            }
        })
        .then(data => data.text()) 
        .then((text) => { console.log('request succeeded with JSON response', text) })
        .catch(function (error) { console.log('request failed', error) });
        return result;
    }

}