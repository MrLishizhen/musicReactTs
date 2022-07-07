import React,{ReactNode} from 'react';
import styles from './index.module.less'
import Tab from '../../components/AppTab'
import Component from "../../components/Components";
import Music_play from '../../components/Music_play'
import {showFunc,hideFunc} from '../../redux/action/play'
// interface play_type{
//     play?:any,
//     children?:ReactNode,
//     dispatch?:any,
// }
// interface play {
//     Play?:any
// }
// import {connect} from 'react-redux'
const Layout=()=> {

    return (
        <div className={styles.layout_box}>
            <Component/>
            {/*<Music_play isShow={{display:props.play.show?'block':'none'}}></Music_play>*/}
            <Tab/>
        </div>
    )
}

export default Layout;

// connect((store:play)=>{
//
//     return {play:store.Play}
//     // return {}
// },{
//     showFunc,
//     hideFunc
// })(Layout)
