import React, {useEffect, useRef} from 'react'
import PictureCom from "../Picture_com";
import styles from './index.module.less'
import EmptyCom from "../emptyCom";
import SongCom from "@/components/songCom";

const ListCom:React.FC<{data?:PlayListDetails[],songs?:song[],scrllFc:any,title:string,type:number}> = (props)=>{
    let {data,scrllFc,type=0,songs} = props;
    const getListDom = useRef<HTMLDivElement|null>(null);
    const getDOM = getListDom.current as HTMLDivElement;
    useEffect(()=>{
        const scrollFunc = (event:any)=>{
            console.log(event)
            let target = event.target;
            // console.log(target.offsetHeight+target.scrollTop,target.scrollHeight)
            if(target.offsetHeight+target.scrollTop >=target.scrollHeight){

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
    },[data,songs])

    const setDataDom = ()=>{
        if(type===0){
            return (
                <>
                    {
                        data&&data.map((u)=>{
                            return (
                                <PictureCom key={u.id} data={{link:`/songlist/${u.id}`,picUrl:u.coverImgUrl,name:u.name,id:u.id,line:2,width_str:'33.33333%'}}></PictureCom>
                            )
                        })
                    }
                </>
            )
        }
    }

    return (
        <div className={styles.list_com} ref={getListDom}>
            {
                setDataDom()
            }
            <EmptyCom title={props.title}></EmptyCom>
        </div>
    )
}
export default ListCom;
