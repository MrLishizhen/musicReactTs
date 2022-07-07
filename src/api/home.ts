import Axios from '../util/request'
// import cookie from 'js-cookie';
//用户信息
export function getbanner(){
    return Axios({
        url:'/banner?type=1',
        method:'post',
    });
}
//推荐歌单
export function getRPlaylist(){
    return Axios({
        url:'/personalized?limit=6',
        method:'post',
    });
}
//推荐新音乐
export function getSongs(){
    return Axios({
        url:'/personalized/newsong?limit=10',
        method:'post',
    });
}
