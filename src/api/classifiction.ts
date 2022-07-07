import Axios from '../util/request'

//推荐歌单分类
export function getPlayListHot(){
    return Axios({
        url:'/playlist/hot',
        method:'post',
    });
}
//歌单分类
export function getPlayListCatlist(){
    return Axios({
        url:'/playlist/catlist',
        method:'post',
    });
}
//获取歌单内容
export function getPlayList(before?:number|string,cat:string='全部',limit:number=15){
    // limit: 取出歌单数量 , 默认为 20
    // before: 分页参数,取上一页最后一个歌单的 updateTime 获取下一页数据
    // cat：可选tag名称
    // let data = {};
    let data = {
        limit:limit,
        before:before,
        cat:cat
    };

    return Axios({
        url:'/top/playlist/highquality',
        method:'post',
        params:data
    });
}
