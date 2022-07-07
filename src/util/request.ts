// import {ReactElement} from 'react';
import ReactDOM from 'react-dom';
import Axios, {AxiosRequestConfig, AxiosRequestHeaders} from 'axios';
import cookie from 'js-cookie'

import qs from 'qs';

import {createTimestamp} from './methods'
const CancelToken = Axios.CancelToken;
const source = CancelToken.source();
let loadingInstance = false; // loading实例是否存在
let needLoadingRequestCount = 0; //当前正在请求的数量

//展开loading效果
function shouLoading(){
    const domstr = '<div style="position:fixed;left:0;top:0;right:0;bottom:0;font-size:0.16rem;color:#999;background-color:#fff;z-index:100">加载中....</div>'
    if(needLoadingRequestCount===0){
        console.log(123456,needLoadingRequestCount)
        let dom = document.createElement('div')
        dom.setAttribute('id', 'loading')
        dom.innerHTML = domstr;
        document.body.appendChild(dom)
    }
    loadingInstance=true;
}
//关闭loading

function removeLoading(){
    if (needLoadingRequestCount === 0) {
        loadingInstance=false;
        if(document.getElementById('loading')){
           setTimeout(()=>{
               console.log(123)
               let dom = document.querySelectorAll('#loading');
               for(let i=0;i<dom.length;i++){
                   document.body.removeChild(dom[i] as HTMLElement)
               }

           },5000)
        }
    }
}


//路由请求拦截
// Axios.defaults.headers= {
//         'MUSIC_U': cookie.get('MUSIC_U')||'',
//         '__csrf':cookie.get('__csrf')||'',
//         '__remember_me':cookie.get('__remember_me')||'',
// }
// Axios.defaults.headers.common['MUSIC_U']=cookie.get('MUSIC_U')||''
// Axios.defaults.baseURL = process.env.REACT_APP_IMAGE_URL
Axios.defaults.baseURL = '/api'
// Axios.defaults.headers.post['Authorization'] = cookie.get("userToken");

Axios.interceptors.request.use((config:any)=>{
    //如果为0则重新创建loading
    //get请求添加时间戳
    config.cancelToken = source.token;
    if(config.method==='get'&&config.GetShow){
        config.url = config.url+"?"+createTimestamp();
    }else if(config.method==='POST'){
        // config.data = qs.stringify(config.data);

    }
    console.log(config)
    if(config.loading){
        if(needLoadingRequestCount===0){
            shouLoading()
        }
        //计数
        needLoadingRequestCount++;
    }
    // console.log(config);
    if(config.headers["Content-Type"] !== "multipart/form-data"){

    }else{
        config.data = qs.stringify(config.data);
    }

    return config

},error=>{
    loadingInstance && removeLoading();
    return Promise.reject(error.response);
})

//响应拦截
Axios.interceptors.response.use((response:any)=>{
        // console.log(response);
        // console.log(loadingInstance,123);
        console.log(needLoadingRequestCount)
        //计数减少
        if(response?.config?.loading){
            needLoadingRequestCount--;
            //判断needLoadingRequestCount的数值
            needLoadingRequestCount = needLoadingRequestCount<0?0:needLoadingRequestCount;
            //计数等于0并且有值则关闭loading
            needLoadingRequestCount === 0 && loadingInstance && removeLoading();
        }

        // console.log(response)
        if(response?.status===401){
            // console.log(1);
            needLoadingRequestCount=0;
            source.cancel();
            // response.data.message='权限验证失败，请重新登录'
            // message.error('登录失效，请重新登录');
            console.log('登录失效，请重新登录');
            //清除状态

        }

        return response.data;
        // else if(response.data.status===199){
        //     Message.error(response.data.message);
        // }



    },
    error=>{
        if (Axios.isCancel(error)) { // 取消请求的情况下，终端Promise调用链
            return new Promise(() => {});
        } else {
            if (loadingInstance) {
                needLoadingRequestCount--;
                needLoadingRequestCount = needLoadingRequestCount < 0 ? 0 : needLoadingRequestCount;
                needLoadingRequestCount === 0 && loadingInstance && removeLoading(); //关闭加载动画
            }

            console.log('请求数据失败');
            return Promise.reject(error.response);
        }

    })

export default  Axios;
