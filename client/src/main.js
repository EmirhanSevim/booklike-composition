//----- Cli Default --------------------------
import { createApp } from 'vue'

import App from './App.vue' 
import router from './router'
import store from "./store";
import {appAxios} from "./utils/appAxios" 
import "@/assets/style.css"


import appHeader from "@/components/Shared/appHeader"
import appBookmarkList from "@/components/Shared/appBookmarkList"

import io from "socket.io-client";
const socket=io("http://localhost:2001") //uygulama geneli 1  socket 

const app=createApp(App)

app.component("AppHeader",appHeader)//application seviyesinde register ediyoruz.
app.component("AppBookmarkList",appBookmarkList)
app.use(router)
app.use(store);
app.config.globalProperties.$appAxios=appAxios
app.config.globalProperties.$socket=socket;

app.provide("socket",socket);
app.provide("appAxios",appAxios);

app.mount('#app')
 