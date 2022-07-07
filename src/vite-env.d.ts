/// <reference types="vite/client" />
interface banners {
    imageUrl?:string,
    typeTitle?:string,
    titleColor?:string,
    [propName:string]:any,
}
interface PictureCom{
    id:number,
    picUrl:string,
    name:string,
    width_str?:string
    [propName:string]:any,
}
//推荐歌单
interface PlayListHot{
    id?:number,
    name:string,
    [propName:string]:any,
}
//二级tag必须值
interface subList{
    category:number,
    name:string,
    [propName:string]:any,
}

//歌单列表必须参数
interface PlayList{
    coverImgUrl:string,
    name:string,
    id:number
}
