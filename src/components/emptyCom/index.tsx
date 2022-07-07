import React from 'react';
import styles from './index.module.less'
const EmptyCom:React.FC<{title?:string}> = (props)=>{
    let {title='暂无数据'} = props;
    return (
        <div className={styles.empty_box}>
            {
                title
            }
        </div>
    )
}


export default EmptyCom
