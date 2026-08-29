<template>
    <v-container>
        <v-row justify="center">
            <v-col md="12" cols="12">
                <v-card class="pa-2">
                    <v-card-title>
                        <h1 class="text-h5 text-center">คู่มือประกอบการประเมิน</h1>
                    </v-card-title>
                    <v-card-text>
                        <v-table>
                            <thead>
                                <tr>
                                    <th class="border text-center">ตัวชี้วัด</th>
                                    <th class="border text-center">รายละเอียดตัวชี้วัด</th>
                                    <th class="border text-center">น้ำหนักคะแนน</th>
                                    <th class="border text-center">คะแนนเต็ม</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(items,index) in result" :key="items.id_doc">
                                    <td class="border text-center">{{ index+1 }}</td>
                                    <td class="border text-center">{{ items.name_doc }}</td>
                                    <td class="border text-center">{{ items.day_doc }}</td>
                                    <td class="border text-center">
                                        <v-btn class="text-center text-white" prepend-icon="mdi-eye" @click="view(items.file)"color="info">เปิดดู</v-btn>
                                    </td>
                                </tr>
                                <tr  v-if="result.length === 0"><td class="text-center text-red" colspan="10">ไม่พบข้อมูล</td></tr>
                            </tbody>
                        </v-table>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup lang="ts">
import axios from 'axios';
import { api, staff } from '~/API/base';


const error = ref<Record<string,string>>({})
const file = ref<File | null>(null)
const dataResult = ref([])
const search = ref('')
const name_doc = ref('')

const token = import.meta.client ? localStorage.getItem('token'):null



const fetch = async()=>{
    try {
        
        const res = await axios.get(`${api}/docnoe`,{headers:{Authorization:`Bearer ${token}`}})
        result.value =res.data


    } catch (error) {
        console.error("error fetch doc",error);
        
    }
}


const result = ref([])




const view = (filename:string)=>{
    const url = new URL(`/uploads/document/${filename}`,api).href
    window.open(url,'_blank')
}

onMounted(fetch)

</script>

<style scoped>

</style>