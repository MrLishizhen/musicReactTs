import React, {useState,useEffect, useRef} from "react";
import styles from './index.module.less'
import loading from '../../assets/imgs/bg.png';
import {Loading} from '@icon-park/react'
import {useNavigate} from "react-router-dom";
const PictureCom:React.FC<{data:PictureCom}>= (props)=>{
    let getdom = useRef<HTMLImageElement|null>(null);
    // const [src, setSrc] = useState('')
    const [src, setSrc] = useState(loading as string)
    // 是否第一次加载，如果不使用这个会加载两次
    const [isFlag, setIsFlag] = useState(false)
    const [imgHeight,setImgHeight] = useState<number|undefined>(0);
    let {picUrl='',name='',id=0,width_str='0.92rem',line=1} = props.data;
    /**
     * 图片加载完成
     */
    const handleOnLoad = () => {
        // 判断是否第一次加载
        if (isFlag) return;
        // 创建一个img标签
        const imgDom = new Image();
        imgDom.src = picUrl;

        // let getdomCurrent = getdom.current;
        // console.log(getdomCurrent?.clientWidth)
        // setImgHeight(getdomCurrent?.clientWidth)

        // 图片加载完成使用正常的图片
        imgDom.onload = function () {
            setIsFlag(true)
            setSrc(picUrl)
        }
        // 图片加载失败使用图片占位符
        imgDom.onerror = function () {
            setIsFlag(true)
            setSrc(loading as string)
        }
    }
    // useEffect(()=>{
    //     console.log(picUrl);
    //     if(isFlag){
    //         setIsFlag(false);
    //     }
    // },[picUrl])

    let navigate = useNavigate();
    const toLink = ()=>{
        let {link=''} = props.data;
        if(!link){
            return ;
        }else{
            navigate(link)
        }
    }

    return (
        <div className={styles.picture_com} style={{width:width_str}} onClick={toLink}>
            <img onLoad={handleOnLoad} src={src} style={{background:'#e0e0e0'}} alt={name} ref={getdom}/>
            {/*<img onLoad={handleOnLoad} src={src} alt={name} style={{display:isFlag?'inline-block':'none'}} ref={getdom}/>*/}
            {/*<div className={styles.loading} style={{height:imgHeight,display:isFlag?'none':'inline-block'}}>*/}
            {/*    <Loading theme="outline" size="24" fill="#ff0d0d" strokeWidth={2} strokeLinejoin="bevel"/>*/}
            {/*</div>*/}
            {
                line===0?'':<span className={styles.span} style={{WebkitLineClamp:line}}>{name}</span>
            }
        </div>
    )
}
export default PictureCom
