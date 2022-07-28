import type { RouteObject, } from "react-router-dom";
import Layout from '../pages/Layout/index'
import We from '../pages/We/index'
import Classification from '../pages/Classification/index'
import Home from '../pages/Home/index'
import List from '../pages/List/index'
import Login from '../pages/Login/index'
import SongList from '../pages/SongList/index'
const routers:RouteObject[] = [
    {
        path:'/',
        element:<Layout/>,
        children:[
            {
                index:true,
                element:<Home />,
            },
            {
                path:'we',
                element:<We/>
            },
            {
                path:'classification',
                element:<Classification/>
            },
            {
                path:'list',
                element:<List/>
            },
            {
                path:'songlist/:id',
                element:<SongList/>
            },
        ]
    },

    {
        path:'/login',
        element:<Login/>
    }
]

export default routers
