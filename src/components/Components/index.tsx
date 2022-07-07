import {Outlet} from "react-router-dom";
import styles from './index.module.less'
import Tab from "../AppTab";
import React from "react";

export default function Component(props:any){
    return (
        <div className={styles.box}>
            <Outlet></Outlet>
        </div>
    )
}