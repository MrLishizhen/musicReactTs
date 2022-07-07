import {Link,NavLink} from 'react-router-dom'
import styles from './index.module.less'

interface listArrType {
    name: string,
    link: string,
}

export default function AppTab() {

    const listArr: listArrType[] = [
        {
            name: '主页',
            link: '/',
        },
        {
            name: '歌单',
            link: 'classification',
        },
        {
            name: '视频',
            link: 'list',
        },
        {
            name: '我的',
            link: 'we'
        }

    ]
    return (
        <div className={styles.app_tab}>
            {
                listArr.map(v => {
                    return <div key={v.link} className={styles.app_tab_item}>
                        <NavLink to={v.link}> {v.name}</NavLink>
                    </div>
                })
            }
        </div>
    )
}
