import styles from './index.module.less'
import {useParams,useNavigate} from 'react-router-dom'
import React, {useEffect, useState} from "react";
import {getPlaylistDetail,getPlaylistAll} from '@/api/songlist'
import {ArrowCircleLeft} from '@icon-park/react'
import Tabbar from "@/components/Tabbar";
import PictureCom from "@/components/Picture_com";
import SongCom from "@/components/songCom";
import EmptyCom from "@/components/emptyCom";

interface name{
    name:string
}

export default function SongList(){
    let {id=''} = useParams();
    let navigate = useNavigate();
    //歌单信息
    let [playlist,setPlaylist] = useState<PlayListDetails>({id:0,name:'',coverImgUrl:''});
    let [playListData,setPlayListData] = useState<song[]>([])
    let [offest,setOffest] = useState(0)
    let [emptyTitle,setEmptyTitle] = useState<string>("加载中...")
    useEffect(()=>{
        getPlaylistDetail(id).then(res=>{
            if(res.code===200){
                setPlaylist(res.playlist);
            }
        })
    },[id])
    const getArOrAl = (array:name[]):string=>{
        if(array.length===0){
            return ''
        }else{
            let names = [];
            for(let i=0;i<array.length;i++){
                names.push(array[i].name)
            }
            return names.join('/')
        }
    }
    useEffect(()=>{
        getPlaylistAll(id,10,offest).then(res=>{
            if(res.code===200){
                let data = res.songs;
                let songs:song[] = [];
                //存贮歌曲列表信息
                for(let i=0;i<data.length;i++){
                    let song:song = {ar:'',al:'',index:0,name:'',id:0};
                    song.ar = getArOrAl(data[i].ar);
                    song.al = data[i].al.name;
                    song.name = data[i].name;
                    song.id = data[i].id;
                    songs.push(song);
                }
                setPlayListData(songs);
                setEmptyTitle('往下没有了...')
            }
        });
    },[id])


    const leftTitle = (<div className={styles.left_icon} onClick={()=>navigate(-1)}><ArrowCircleLeft theme="outline" size="30" fill="#e9e9e9" strokeWidth={3} strokeLinejoin="bevel"/></div>)

    return(
        <div className={styles.song_list}>
            <header className={styles.song_top}>
                <Tabbar styles={{background:'transparent',height:"0.6rem"}} leftTitle={leftTitle} right={''}></Tabbar>
                <div className={styles.bg} style={{backgroundImage:`url(${playlist?.coverImgUrl})`}}></div>
                <div className={styles.song_top_bom}>
                    {
                        playlist?.coverImgUrl ?
                        <PictureCom data={{picUrl:playlist?.coverImgUrl||'',name:playlist?.name || '',id:playlist?.id || 0,line:0,width_str:'1.2rem'}}></PictureCom>
                        :''
                    }
                    <div className={styles.right}>
                        <h3 className={`${styles.right_name} ellipsis2`}>{playlist?.name}</h3>
                        <h4 className={`${styles.right_sub_name} ellipsis3`}>{playlist?.description}</h4>
                        {
                            playlist?.tags ?
                                <ul className={styles.tags_ul}>
                                    {
                                        playlist.tags.map((u,i)=>{
                                            return (<li key={i} className={styles.tags}>
                                                {u}
                                            </li>)
                                        })
                                    }
                                </ul>
                                :''
                        }
                    </div>
                </div>
            </header>
            <section className={styles.song_bom}>
                <div className={styles.song_list}>
                    {
                        playListData.map((u,i)=>{
                            return <SongCom key={u.id} singers={u.ar} album={u.al} index={(i+1)} name={u.name}></SongCom>
                        })
                    }
                    <EmptyCom title={emptyTitle}></EmptyCom>
                </div>
            </section>
        </div>
    )
}
