//具体的内容
import {SHOW,SHUTDOWN} from '../constant'

interface paly_type{
    show?:boolean
    // type:string
}
let playObj = {
    show:false
}
export default function playRedaer(preState:paly_type=playObj,action:any){
    const {type,data} = action;
    switch (type){
        case SHOW:
            return data
        case SHUTDOWN:
            return data
        default:
            return preState
    }

}