import styles from './index.module.less'
import React from 'react'
const Music_play:React.FC<any>=(props)=>{

    let {isShow} = props;
    return (
        <div className={styles.music} style={isShow}>

        </div>
    )
}
export default Music_play