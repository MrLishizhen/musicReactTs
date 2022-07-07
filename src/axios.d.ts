
import axios,{AxiosRequestHeaders} from "axios";
// 解决报错 TS2339: Property 'code' does not exist on type 'AxiosResponse<any, any>'.
interface AxiosRequestConfigExtend {
    loading?:boolean,
    GetShow?:boolean,
    // headers?: AxiosRequestHeaders;
}
declare module 'axios' {

    interface AxiosInstance {
        (config: AxiosRequestConfig&AxiosRequestConfigExtend): Promise<any>
    }
}
