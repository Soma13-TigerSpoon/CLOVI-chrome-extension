import {requestUrl} from "../config.js";

export default class Video{
    constructor(id){
        this.id = id; 
    }
    get videoUrl(){
        return "https://www.youtube.com/watch?v={}".format(this.id);
    }
    async info(){
        const result = await fetch(requestUrl+this.id);
        console.log(result);
        return result.json();
    }
}