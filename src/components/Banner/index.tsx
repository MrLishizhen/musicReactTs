import styles from './index.module.less'
import React, {useState, useEffect, useRef} from 'react';
// import {Simulate} from "react-dom/test-utils";
// import touchStart = Simulate.touchStart;
interface styles {
    marginTop:string
}

const Banner:React.FC<{banners:banners[],styles:styles}>=(props)=>{
    let [banner_list,setBanner_list] = useState<banners[]>([]);

    let [left,setLeft] = useState<number>(1);
    let [iconLeft,setIconLeft] = useState<number>(0)
    let banner_dom = useRef<HTMLDivElement|null>(null);
    const getBanner_dom  = ()=>banner_dom.current as HTMLDivElement;
    const {banners} = props;
    let time:NodeJS.Timeout;
    useEffect(() => {

        if(banners.length>0){
            setBanner_list([banners[banners.length-1],...banners,banners[0]])
        }
    },[props.banners]);

    useEffect(()=>{
        // console.log(123,banners)

        // if(banners.length>0){
        //     time=setTimeout(()=>{
        //         setLeft(left += 1);
        //
        //         setIconLeft(iconLeft += 1);
        //
        //         (banner_dom.current as HTMLDivElement).style.transitionDuration='1s';
        //         if(left===banner_list.length-1){
        //             setIconLeft(0);
        //             setTimeout(()=>{
        //                 (banner_dom.current as HTMLDivElement).style.transitionDuration='0s';
        //                 setLeft(1);
        //             },800)
        //         }
        //     },3000)
        //     return ()=>clearInterval(time)
        // }
    },[left,iconLeft,banners])

    const touchStart=(e:TouchEvent)=>{
        console.log('我结束了')
        clearInterval(time)
    }
    const touchEnd = (e:TouchEvent)=>{
        console.log('我又重启了')
        // time=setTimeout(()=>{
        //     setLeft(left += 1);
        //
        //     setIconLeft(iconLeft += 1);
        //
        //     (banner_dom.current as HTMLDivElement).style.transitionDuration='1s';
        //     if(left===banner_list.length-1){
        //         setIconLeft(0);
        //         setTimeout(()=>{
        //             (banner_dom.current as HTMLDivElement).style.transitionDuration='0s';
        //             setLeft(1);
        //         },800)
        //     }
        // },3000)
    }
    useEffect(()=>{
        getBanner_dom().ontouchstart =touchStart
        getBanner_dom().ontouchend = touchEnd
    })

    const leftClick = ()=>{
        let data = props.banners;
        setLeft(left -= 1);
        setIconLeft(iconLeft -= 1);
        (banner_dom.current as HTMLDivElement).style.transitionDuration='1s';
        if(left===0){
            setIconLeft(data.length-1);
            setTimeout(()=>{
                (banner_dom.current as HTMLDivElement).style.transitionDuration='0s';
                setLeft(banner_list.length-2);
            },800)
        }

    }
    const rightClick = ()=>{

            setLeft(left += 1);

            setIconLeft(iconLeft += 1);
            (banner_dom.current as HTMLDivElement).style.transitionDuration='1s';
            if(left===banner_list.length-1){
                setIconLeft(0);

                setTimeout(()=>{
                    (banner_dom.current as HTMLDivElement).style.transitionDuration='0s';
                    setLeft(1);
                },800)
            }


    }
    return (
        <div className={styles.banner_box} style={props.styles}>
            {/*<div className={styles.banner} ref={banner_dom}  style={{transition: `left ${1}s`,width:banner_list.length*3.75+'rem',left:`${-left*3.75}rem`}}>*/}
                <div className={styles.banner} ref={banner_dom}  style={{transition: `left ${1}s`,width:banner_list.length*100+'%',left:`${-left*100}%`}}>
                {
                    banner_list.map((u:banners,i:number)=>{
                        return (<div key={i} className={styles.banner_li} style={{width:100/banner_list.length+'%'}}>
                            <img src={u.pic} alt=""/>
                        </div>)
                    })
                }
            </div>
            <div className={styles.icons}>
                {
                    props.banners.map((u,i)=>{
                        return (<span key={i} className={i===iconLeft?styles.hot:''}></span>)
                    })
                }
            </div>
            {/*<div className={styles.left_btn} onTouchStart={leftClick}></div>*/}
            {/*<div className={styles.right_btn} onTouchStart={rightClick}></div>*/}
        </div>
    )
}
export default Banner;
