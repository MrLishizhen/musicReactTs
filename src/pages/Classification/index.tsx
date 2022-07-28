
import React, {useState, useEffect, useRef, MouseEvent} from "react";
import Tabbar from "../../components/Tabbar";
import ListCom from '../../components/ListCom'
import styles from './index.module.less'
import {getPlayListHot, getPlayListCatlist, getPlayList} from "../../api/classifiction";

import {DoubleDown} from '@icon-park/react'
export default function Classification(){
    //热点tag标签
    let [playListHot,setPlayListHot] = useState<PlayListHot[]>([]);
    //更多标签分类
    let [categories,setcategories] = useState<string[]>([]);
    //更多标签二级分类
    let [sub,setsub] = useState<subList[]>([]);
    //判断是否展开更多内容
    let [ismodule,setIsmodule] = useState<boolean>(false);

    let [title,setTitle] = useState<string>('精品歌单')
    //保存列表数据
    let [list_data,setListData] = useState<PlayList[]>([]);
    let [lasttime,setLasttime] = useState<number|string>(0);

    let [emptyTitle,setEmptyTitle] = useState<string>('加载中...')

    //获取背景元素
    let getdom = useRef<HTMLDivElement|null>(null);
    const getBanner_dom  = ()=>getdom.current as HTMLDivElement;
    useEffect(()=>{
        getPlayListHot().then(res=>{
            if(res.code===200){
                setPlayListHot([{name:'全部',id:0,tab_hot:true},...res.tags])
            }
        })
        getPlayListCatlist().then(res=>{
            if(res.code===200){
                setcategories(Object.values(res.categories));
                setsub(res.sub);
            }
        })
        getPlayList().then(res=>{
            if(res.code===200){

                setLasttime(res.lasttime);
                setListData(res.playlists);
            }
        })

    },[])

    const tabClick = (name:string)=>{
        let tag:PlayListHot = {name:'',id:0};
        let tags:PlayListHot[] = [...playListHot];
        let subs:subList[] = [...sub];
        for(let i = 0;i < tags.length;i++){
            if(tags[i].name===name){
                tag=tags[i];
                tags[i].tab_hot=true;
                tags[i].name ==='全部'?setTitle('精品歌单'):setTitle(tags[i].name);;
            }else{
                tags[i].tab_hot=false;
            }
        }
        subs.forEach(u=>{
            if(u.name===name){
                tag=u;
                u.tab_hot=true;
                setTitle(u.name);;
            }else{
                u.tab_hot=false;
            }
        })
        setEmptyTitle('加载中...')
        setListData([]);
        getPlayList('',tag?.name).then(res=>{
            if(res.code===200){
                if(res.playlists.length===0||res.playlists.length<15){
                    setEmptyTitle('没有更多了哟...')
                }else{
                    setEmptyTitle('加载中...')
                }
                setLasttime(res.lasttime);
                setListData(res.playlists);
            }
        })
        setsub([...subs])
        setPlayListHot(tags);
    }


    //tabs hot
    const content = <div className={styles.classification_top}>
        {
            playListHot.map((u:PlayListHot)=>{
                return <span key={u.id} style={{color:u.tab_hot?'red':'rgb(153, 153, 153)'}} onClick={()=>tabClick(u.name)}>{u.name}</span>
            })
        }
    </div>

    const ismodulefunc = ()=>{
        setIsmodule(true);
    }
    const modulefunc= (event:MouseEvent)=>{
        // event.stopPropagation();
        if(event.target as HTMLDivElement === getBanner_dom()){
            setIsmodule(false);
        }
    }
    const onChangFc = ():void=>{
        if(lasttime){
            getPlayList(lasttime,title).then(res=>{
                if(res.code===200){
                    if(res.playlists.length===0){
                        setEmptyTitle('没有更多了哟...')
                    }else{
                        setEmptyTitle('加载中...')
                    }
                    setLasttime(res?.lasttime||'');
                    setListData([...list_data,...res.playlists]);
                }
            })
        }else{
            setEmptyTitle('没有更多了哟...')
        }

    }
    return (
        <div className={styles.classification}>
            <Tabbar right={''} leftTitle={'歌单'} content={content}></Tabbar>
            <div className={styles.classification_box}>
                <div className={styles.classification_module}>
                    <span onClick={ismodulefunc}>{
                        title
                    }</span>
                    <DoubleDown onClick={ismodulefunc} style={{transform:`rotate(${ismodule?'180deg':'0deg'})`}} theme="outline" size="21" fill="#333" strokeWidth={2} strokeLinejoin="bevel"/>
                </div>

                {/*滚动列表*/}
                <ListCom data={[...list_data]} type={0} title={emptyTitle} scrllFc={onChangFc}></ListCom>
            </div>
            <div className={styles.module} ref={getdom} onClick={modulefunc} style={{display:ismodule?'block':'none'}}>
                <div className={styles.module_box}>
                    {/*<span className={`${styles.module_item} ${styles.module_all}`} >全部</span>*/}
                    <div className={styles.module_box_scroll}>
                        {
                            categories.map((u,i)=>{
                                return <React.Fragment key={i}>
                                    <h4>{u}</h4>
                                    <div className={styles.module_box_scroll_item}>
                                        {
                                            sub.map(j=>{
                                               if(j.category===i){
                                                   return  <span onClick={()=>tabClick(j.name)} key={j.name} style={{borderColor:j.tab_hot?'red':'rgb(153, 153, 153)',color:j.tab_hot?'red':'rgb(153, 153, 153)'}} className={`${styles.module_item}`} >{j.name}</span>
                                               }
                                            })
                                        }
                                    </div>
                                </React.Fragment>
                            })
                        }
                    </div>
                </div>

            </div>
        </div>
    )
}
