//所需要用到的方法
import {SHOW,SHUTDOWN} from '../constant'
export const showFunc = <T>(data:boolean) => {return ({type:SHOW,data})}
export const hideFunc = <T>(data:boolean) => {return ({type:SHUTDOWN,data})}