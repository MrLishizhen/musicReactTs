import style from './index.module.less'
import {People} from '@icon-park/react'
import React from 'react'
const Tabbar:React.FC<any> = (props) => {

    let leftTitle= props.leftTitle||'发现';
    let content = props.content||""
    let styles = props.styles||{};
    return (
        <div className={style.tabbar_box} style={{...styles}}>
            <div className={style.tabbar_left}>
                {leftTitle}
            </div>
            <div className={style.tabber_content}>
                {
                    content?content:''
                }
            </div>
            {
                props.right===''?'':<div className={style.tabbar_right}>
                    {/*发现*/}
                    {
                        props.right ?props.right :<People theme="outline" size="24" fill="#333" strokeWidth={2} strokeLinejoin="bevel"/>
                    }
                </div>
            }

        </div>

    )
}
export default Tabbar
