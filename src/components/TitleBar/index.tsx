import style from './index.module.less'
import {People} from '@icon-park/react'
import {useNavigate} from 'react-router-dom'
import React from 'react'
const Tabbar:React.FC<any> = (props) => {
    let navigate = useNavigate();
    const toLink = ()=>{
        let {link=''} = props;
        if(!link){
            return ;
        }else{
            navigate(link)
        }
    }
    return (
        <div className={style.tabbar_box}>
            <div className={style.tabbar_left}>
                {
                    props.leftTitle
                }
            </div>

            <div className={style.tabbar_right} onClick={toLink}>
                {/*发现*/}
                {
                    props.right ?props.right :<People theme="outline" size="24" fill="#333" strokeWidth={2} strokeLinejoin="bevel"/>
                }
            </div>
        </div>

    )
}
export default Tabbar
