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
        // result 의 status 에 따라서 오류 처리 해주어야 할지도?
        // 503인 경우 html 태그를 리턴하기 때문에 Uncaught (in promise) 
        // SyntaxError: Unexpected token '<', "<html> <h"... is not valid JSON 에러가 발생함. 
        return result.json();
    }
}