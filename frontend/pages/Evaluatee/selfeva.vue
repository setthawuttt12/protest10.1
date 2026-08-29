<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <h1 class="text-h5 font-weight-bold">แบบประเมินตนเอง</h1>
                <v-form>
                    <v-card class="mt-2 pa-2">
                        <p>ผู้ใช้งาน : {{ user.fname }} {{ user.lname }}</p>
                        <p>รอบการประเมินที่ : {{ user.round_sys }} ปี {{ user.year_sys }}</p>
                    </v-card>
                    <v-row v-for="(topic,t) in topics" :key="topic.id_topic">
                        <v-col cols="12">
                            <h1 class="text-h5 font-weight-bold">{{ t+1 }}.{{ topic.name_topic }}</h1>
                        </v-col>
                        <v-card class="pa-2">
                            <v-row v-for="(indicate,i) in topic.indicate" :key="indicate.id_indicate" >
                            <v-col col="12">
                                {{ t+1 }}{{ i+1 }} {{ indicate.name_indicate }} รายละเอียดตัวชี้วัด : {{ indicate.detail_indicate }} 
                                น้ำหนักคะแนน {{ indicate.point_indicate }} คะแนนเต็ม : {{ indicate.point_indicate*4 }} 
                                <v-textarea v-model="indicate.detail_eva" rows="2" label="คำอธิบายเพิ่มเติม(ถ้ามี)"></v-textarea>
                                <v-file-input label="*** fileรองรับเฉพาะ .png .jpg .pdf ** " @change="onFileChange($event, topic.id_topic , indicate.id_indicate)" accept=".png,.jpg,.pdf"></v-file-input>
                                <v-select v-if="check_indicate === 'y'" v-model="indicate.score" label="ใส่คะแนน1-4" :items="[1,2,3,4]"></v-select>
                                v-text-
                            </v-col>
                        </v-row>
                        </v-card>
                    </v-row>
                </v-form>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup lang="ts">
import axios from 'axios';
import { er } from 'vue-router/dist/index-DaOfZHXc.js';
import { eva } from '~/API/base';

const user = ref<any>({})
const topics = ref<any>([])

const fileMap = <Record<string,File>>({})
const onFileChange = (event:Event,id_topic:number,id_indicate:number)=>{
    const  file = (event.target as HTMLInputElement)?.files?.[0]
    if(!file)return
    fileMap.value[`${id_topic}-${id_indicate}`]= file
}


const fecth = async () => {
    const token = localStorage.getItem('token')
    try {
        const res = await axios.get(`${eva}/selfeva/user`, { headers: { Authorization: `Bearer ${token}` } })
        user.value = res.data
    } catch (error) {
        console.error('error get user', error)
    }
}
const fecthTopics = async () => {
    const token = localStorage.getItem('token')
    try {
        const res = await axios.get(`${eva}/selfeva/topic`, { headers: { Authorization: `Bearer ${token}` } })
        topics.value = res.data
    } catch (error) {
        console.error('error get user', error)
    }
}

onMounted(async () => {
    Promise.all([fecth(),fecthTopics()])
})

</script>

<style scoped></style>