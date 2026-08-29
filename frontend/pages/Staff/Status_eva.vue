<template>
    <v-container>
        <v-row justify="center">
            <v-col md="12" cols="12">
                <v-card class="pa-2">
                    <v-card-title>
                        <h1 class="text-h5 text-center">สถานะการประเมินผู้รับการประเมินผล</h1>
                    </v-card-title>
                    <v-card-text>
                        <v-table class="table mt-3">
                            <thead>
                                <tr>
                                    <th class="border text-center">ลำดับ</th>
                                    <th class="border text-center">ผู้รับการประเมินผล</th>
                                    <th class="border text-center">รอบการประเมิน</th>
                                    <th class="border text-center">วันที่ออกแบบประเมิน</th>
                                    <th class="border text-center">สถานะการประเมิน</th>
                                </tr>
                                
                            </thead>
                            <tbody>
                                <tr v-for="(items,index) in result" :key="items.id_eva">
                                    <td class="border text-center">{{ index+1 }}</td>
                                    <td class="border text-center">{{ items.fname }} {{ items.lname }}</td>
                                    <td class="border text-center">รอบการประเมินที่:{{ items.round_sys }} ปี:{{ items.year_sys }}</td>
                                    <td class="border text-center">{{ items.day_eva }}</td>
                                    <td class="border text-center">
                                        <center>
                                            <v-btn class="text-center ma-2 text-white" :color="bg(items.status_eva)" size="small">{{ items.status_eva === 1 ? 'รอการประเมินตนเอง' : items.status_eva === 2 ? 'รอกรรมการประเมิน' :'ประเมินแล้ว' }}</v-btn>
                                        </center>
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
const result = ref([])
const eva = ref([])
const round = ref([])

const token = import.meta.client ? localStorage.getItem('token'):null


const fetch = async()=>{
    try {
        
        const res = await axios.get(`${staff}/eva/show`,{headers:{Authorization:`Bearer ${token}`}})
        result.value = res.data
        const res2 = await axios.get(`${staff}/member/showE`,{headers:{Authorization:`Bearer ${token}`}})
        eva.value = res2.data
        const res3 = await axios.get(`${staff}/round/show`,{headers:{Authorization:`Bearer ${token}`}})
        round.value = res3.data


    } catch (error) {
        console.error("error fetch eva",error);
        
    }
}

const bg =(status_eva:number)=>{
    if(status_eva === 1)return "error"
    else if(status_eva === 2)return "warning"
    else if(status_eva === 3)return "success"
}

onMounted(fetch)

</script>

<style scoped>

</style>