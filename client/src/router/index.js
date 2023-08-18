import { createRouter, createWebHashHistory} from "vue-router";
import store from "../store"

const routes=[
    {
    name:"HomePage",
    path:'/',
    component: ()=>import("@/views/Home")
    },
    {
        name:"LoginPage",
        path:'/login',
        component: ()=>import("@/views/Login")
    },
    {
        name:"RegisterPage",
        path:'/register',
        component: ()=>import("@/views/Register")
    },
    {
        name:"NewBookmarkPage",
        path:'/new',
        component: ()=>import("@/views/NewBookmark")
    },
    {
        name:"Favorites",
        path:'/favorites',
        meta:{
            componentName:"appBookmarkList",
        },
        component: ()=>import("@/views/Account")
    },
    {
        name:"Likes",
        path:'/likes',
        meta:{
            componentName:"appBookmarkList",
        },
        component: ()=>import("@/views/Account")
    },
    {
        name:"Settings",
        path:'/settings',
        meta:{
            componentName:"userSettings",
        },
        component: ()=>import("@/views/Account")
    },
    
]

// export default createRouter({
//     routes,
//     history:createWebHashHistory()
// })

const router=createRouter({
    routes,
    history:createWebHashHistory()
})
//routerı export etmeden önce 
router.beforeEach((to,from,next)=>{ //bir componentin her işleminden önce bir hook yaratır.
    //amacımız login olmadan giriç yapılmasını engellemek hompage'e
    
    const authRequiredRoutes=["HomePage"];

    //giriş yapmış kullanıcının logout olana kadar tekrar giriş istemesine gerek yok
    const authNotRequiredRoutes=["LoginPage,RegisterPage"];

    if(authNotRequiredRoutes.indexOf(to.name)>-1 && _isAuthenticated) next(false);//gitme işlemini iptal et autheticated edilmiş kullanıcı ilgili sayfalara gitmek isterse 

    const _isAuthenticated=store.getters._isAuthenticated
    if(authRequiredRoutes.indexOf(to.name)>-1) {
        if( _isAuthenticated) next();
        else next({name:"LoginPage"});
    }else{
        next();
    }
    
    //console.log('to',to); 
    //console.log('from', from)
    //next();//next bir callbackür
    //next(false) //denilirse sayfa görünmez 
}) //

export default router;