import React from "react";
import {Play} from '@icon-park/react'
import styles from './index.module.less'
const SongCom:React.FC<any> = (props)=>{

    let {singers='',album='',index=0,name=''} = props;


    return (
        <div className={styles.song_dom}>
            <i className={styles.song_index}>{index}</i>
            <div className={styles.song_dom_com}>
                <span className={`${styles.song_name} ellipsis`}>
                    {name}
                </span>
                <span className={`${styles.song_singer} ellipsis`}>
                    {singers+' - '+album}
                </span>
            </div>
            <span className={styles.song_icon}>
                <Play theme="outline" size="24" fill="#303030" strokeWidth={2} strokeLinejoin="bevel"/>
            </span>
        </div>
    )
}

export default SongCom
