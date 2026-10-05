<template>
    <v-container>
        <v-row justify="center">
            <v-col md="12" cols="12">
                <v-card class="pa-2">
                    <v-card-title>
                        <h1 class="text-h5 text-center">สถานะการประเมินกรรมการประเมิน</h1>
                    </v-card-title>
                    <v-card-text>
                        <v-table class="table mt-3">
                            <thead>
                                <tr>
                                    <th class="border text-center">ลำดับ</th>
                                    <th class="border text-center">กรรมการ</th>
                                    <th class="border text-center">ตำแหน่ง</th>
                                    <th class="border text-center">สถานะการประเมิน</th>
                                </tr>
                                
                            </thead>
                            <tbody>
                                <tr v-for="(items,index) in result" :key="items.id_commit">
                                    <td class="border text-center">{{ index+1 }}</td>
                                    <td class="border text-center">{{ items.fname }} {{ items.lname }}</td>
                                    <td class="border text-center">{{ items.level_commit }}</td>
                                    <td class="border text-center">
                                        <center>
                                            <v-btn class="text-center ma-2 text-white" :color="bg(items.status_commit)" size="small">{{ items.status_commit === 'y' ? 'ประเมินแล้ว':'ยังไม่ได้ประเมิน' }}</v-btn>
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
const id_eva = useRoute().params.id_eva

const fetch = async()=>{
    try {
        
        const res = await axios.get(`${staff}/status/${id_eva}`,{headers:{Authorization:`Bearer ${token}`}})
        result.value = res.data


    } catch (error) {
        console.error("error fetch commit",error);
        
    }
}

const bg =(status_commit:string)=>{
    if(status_commit === 'n')return "error"
    else if(status_commit === 'y')return "success"
}

onMounted(fetch)

</script>

<style scoped>

</style>