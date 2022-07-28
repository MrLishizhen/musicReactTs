import Axios from '../util/request'

//获取歌单详情
export function getPlaylistDetail(id:string){
    return Axios({
        url:`/playlist/detail?id=${id}`,
        method:'post',
    });
}

//获取歌单所有歌曲
export function getPlaylistAll(id:string,limit:number,offset:number){
    // /playlist/track/all
    return Axios({
        url:`/playlist/track/all?id=${id}`,
        method:'post',
    });
}
