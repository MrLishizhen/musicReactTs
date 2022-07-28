// import {
//     Outlet,
//     useNavigate,
// } from "react-router-dom";
import React, {useState, useEffect} from "react";
// import { Scrollbars } from 'react-custom-scrollbars';
import styles from './index.module.less'
import Tabbar from '../../components/Tabbar/index';
import Banner from '../../components/Banner/index';
import HomeTab from './HomeTab'
import TitleBar from '../../components/TitleBar/index'
import EmptyTitle from '../../components/emptyTitle/index'
import PictureCom from "../../components/Picture_com";
import {User, DoubleRight} from '@icon-park/react'
import {getbanner, getRPlaylist, getSongs} from "../../api/home";
import style from "../../components/Tabbar/index.module.less";



export default function Home() {


    // const navigate= useNavigate();
    const [banner, setBanner] = useState<banners[]>([]);
    const [pictureCom, setPictureCom] = useState<PictureCom[] | []>([])
    const [songs,setSongs] = useState<PictureCom[]>([])
    const clickRight = () => {
        console.log(123)
    }
    useEffect(() => {
        getbanner().then((res: any) => {
            if (res?.code === 200) {
                setBanner(res.banners);
            }
        })

        getRPlaylist().then((res) => {
            if (res?.code === 200) {
                setPictureCom(res.result)
            }
        })
        getSongs().then(res=>{
            if(res?.code===200){
                setSongs(res.result)
            }
        })
    }, [])

    const PlayListTitle = <DoubleRight theme="outline" size="24" fill="#666" strokeWidth={2} strokeLinejoin="bevel"/>;

    const rightTab = <div onClick={clickRight} className={styles.rightTab}>
        <User theme="outline" size="24" fill="#333" strokeWidth={2} strokeLinejoin="bevel"/>
    </div>;
    const content = <div className={style.tabbar_input}>
        欢迎来到我的世界
    </div>
    // const clickdl=()=>{
    //     navigate('/login')
    // }
    // const renderThumb = () => { // renderThumb改变样式时被调用的函数，必须是函数
    //     const thumbStyle = { // 设置滚动条样式
    //         backgroundColor: '#fff',
    //         borderRadius: '4px',
    //     }
    //     return <div id={'123'} style={{...thumbStyle}} />
    // }

    return (
        <div className={styles.com}>
            {/*<Scrollbars className={styles.scroll} >*/}
                <Tabbar right={rightTab} content={content}></Tabbar>
                <Banner banners={banner} styles={{marginTop:'0.6rem'}}></Banner>
                {/*home页bar*/}
                <HomeTab></HomeTab>
                {/*内容区*/}
                <div className={styles.content}>
                    <div className={styles.recommend_the_playlist}>
                        <div className={styles.playlist_top}>
                            <TitleBar leftTitle={'推荐歌单'} link={'Classification'} right={PlayListTitle}></TitleBar>
                        </div>
                        <div className={styles.playlist_com}>
                            {
                                pictureCom.map((u: PictureCom) => {
                                    return <React.Fragment key={u.id}>
                                        <PictureCom data={{...u,width_str:'33.33333%',link:`songlist/${u.id}`}}></PictureCom>
                                    </React.Fragment>
                                })

                            }
                        </div>
                    </div>

                    <div className={styles.recommend_songs}>
                        <div className={styles.playlist_top}>
                            <TitleBar leftTitle={'推荐歌曲'} right={PlayListTitle}></TitleBar>
                        </div>

                        <div className={styles.songs_box}>
                            <div className={styles.songs}>
                                {
                                    songs.map(u=>{
                                        return <React.Fragment key={u.id}>
                                            <PictureCom data={{...u,width_str:'20%'}}></PictureCom>
                                        </React.Fragment>
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <EmptyTitle></EmptyTitle>
            {/*</Scrollbars>*/}

        </div>
    )
}
