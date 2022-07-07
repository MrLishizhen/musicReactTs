import styles from './index.module.less'
import {HeadphoneSound,Radio,Ranking,Fm} from '@icon-park/react'
export default function HomeTab(){


    return (
        <div className={styles.home_tab}>
            <div className={styles.home_tab_li}>
                <div className={styles.home_tab_top}>
                    <HeadphoneSound theme="outline" size="24" fill="#fff" strokeWidth={2} strokeLinejoin="bevel"/>
                </div>
                <div className={styles.home_tab_bom}>每日推荐</div>
            </div>
            <div className={styles.home_tab_li}>
                <div className={styles.home_tab_top}>
                    <Radio theme="outline" size="24" fill="#fff" strokeWidth={2} strokeLinejoin="bevel"/>
                </div>
                <div className={styles.home_tab_bom}>私人FM</div>
            </div>
            <div className={styles.home_tab_li}>
                <div className={styles.home_tab_top}>
                    <Ranking theme="outline" size="24" fill="#fff" strokeWidth={2} strokeLinejoin="bevel"/>
                </div>
                <div className={styles.home_tab_bom}>排行榜</div>
            </div>
            <div className={styles.home_tab_li}>
                <div className={styles.home_tab_top}>
                    <Fm theme="outline" size="24" fill="#fff" strokeWidth={2} strokeLinejoin="bevel"/>
                </div>
                <div className={styles.home_tab_bom}>电台</div>
            </div>
        </div>
    )
}
