import { postInterface } from "../interface/postInterface";

export const checkIfVide=(slug:string,title:string,body:string):boolean=>{
    if(slug === '' || title === '' || body ===''){
        return true;
    }
    return false;
}   