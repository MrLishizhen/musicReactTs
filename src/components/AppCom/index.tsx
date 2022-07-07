import styles from  './index.module.less'
import routers from '../../router'
import {Outlet, useRoutes} from "react-router-dom";
import React from "react";

export default function AppCom(){

    const element = useRoutes(routers);

    return (
        <div className={styles.app_com}>
            {
                element
            }
        </div>
    )
}