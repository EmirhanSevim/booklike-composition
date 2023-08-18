<template>
    <app-header/>
    <div class="flex flex-row">
        <side-bar/>
        <!-- <component :is="$route.meta.componentName" :items="bookmarkList"/> -->
        <!-- <div class="socket">
            <input type="text" @keydown.enter="SEND_MESSAGE"/>
        </div> -->
    </div>
    <!-- <appBookmarkList v-if="bookmarkList.length>0" :items="bookmarkList"/>
    <div v-else> Bookmark Bulunmamaktadır</div> -->
</template>
<script setup>
import sideBar from "@/components/Account/sideBar";
import {ref,inject} from 'vue'
const bookmarkList=ref([]);
const appAxios=inject("appAxios")
appAxios.get("/bookmarks?_expand=category&_expand=user").then(bookmark_list_response=>{ //expand edince category'i categories tablosunda arıyor ve sonuna categoryId ile arama yapıyor.
            console.log(bookmark_list_response)
            bookmarkList.value=bookmark_list_response?.data||[];
        })
</script>

