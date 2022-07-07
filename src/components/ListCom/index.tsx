import React, {useEffect, useRef} from 'react'
import PictureCom from "../Picture_com";
import styles from './index.module.less'
import EmptyCom from "../emptyCom";

const ListCom:React.FC<{data:PlayList[],scrllFc:any,title:string}> = (props)=>{
    let {data,scrllFc} = props;
    const getListDom = useRef<HTMLDivElement|null>(null);
    const getDOM = getListDom.current as HTMLDivElement;
    useEffect(()=>{
        const scrollFunc = (event:any)=>{
            // console.log(event)
            let target = event.target;
            // console.log(target.offsetHeight+target.scrollTop,target.scrollHeight)
            if(target.offsetHeight+target.scrollTop >=target.scrollHeight){
                console.log('李秋雨')
                scrllFc();
            }
        }
        if(getDOM){
            getDOM.addEventListener('scroll',scrollFunc,false)
        }
        return ()=>{
            if(getDOM){

                getDOM.removeEventListener('scroll',scrollFunc,false);
            }
        }
    },[data])
    return (
        <div className={styles.list_com} ref={getListDom}>
            {
                data.map(u=>{
                    return (
                        <PictureCom key={u.id} data={{picUrl:u.coverImgUrl,name:u.name,id:u.id,line:2,width_str:'33.33333%'}}></PictureCom>
                    )
                })
            }
            <EmptyCom title={props.title}></EmptyCom>
        </div>
    )
}
export default ListCom;
