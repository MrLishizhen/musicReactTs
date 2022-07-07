import React from 'react';
import styles from './index.module.less'



interface dataTc{
    title?:string,
}
const EmptyTitle:React.FC<dataTc>=(props)=>{
    let title = props.title;
    return (
        <div className={styles.emptyTitle}>
            {title||'没有更多了哟...'}
        </div>
    )
}
export default EmptyTitle
