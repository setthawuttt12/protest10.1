<template>
    <v-container fluid class="py-10">
                <v-card>
                    <v-sheet class="pa-4" color="">
                        <h1 class="text-h5 font-weight-bold">รายชื่อผู้รับการประเมิน</h1>
                    </v-sheet>
                    <v-card-text>
                        <v-table>
                            <thead>
                                <tr>
                                    <th class="text-center border">ลำดับ</th>
                                    <th class="text-center border">ชื่อ-นามสกุล</th>
                                    <th class="text-center border">วันที่ออกแบบประเมิน</th>
                                    <!-- <th class="text-center border">รอบการประเมิน</th>
                                    <th class="text-center border">สถานะการประเมิน</th> -->
                                    <th class="text-center border">คะแนนประเมิน</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(items,index) in result" :key="items.id_eva">
                                    <td class="text-center border">{{ index+1 }}</td>
                                    <td class="text-center border">{{ items.fname }} {{ items.lname }}</td>
                                    <td class="text-center border">{{ formatDate(items.day_eva) }}</td>
                                    <!-- <td class="text-center border">รอบการประเมินที่ {{ items.round_sys }} ปี {{ year_sys }}</td>
                                    <td class="text-center border">{{ items.status_eva === 1 ? 'ยังไม่ได้ประเมิน' : items.status_eva === 2 ? 'รอกรรมการประเมิน' : 'ประเมินเสร็จสิ้น' }}</td> -->
                                    <td class="text-center border">
                                        <!-- <v-btn color="warning" class="text-white" size="small" @click="edit(items)">แก้ไข</v-btn>&nbsp; -->
                                        <v-btn color="blue" class="text-white" size="small" @click="go(items.id_eva)">รายละเอียด</v-btn>
                                    </td>
                                </tr>
                                <tr v-if="result.length === 0">
                                    <td class="text-center border" colspan="10">ไม่พบข้อมูล</td>
                                </tr>
                            </tbody>
                        </v-table>
                    </v-card-text>
                </v-card>
   </v-container>
</template>

<script setup lang="ts">
import axios from 'axios'
import {api,commit, staff} from '../../API/base'

const token = import.meta.client ? localStorage.getItem('token') : null

const result = ref ([])

const fetch = async () => {
    try{
        const res = await axios.get(`${staff}/eva/show`,{headers:{Authorization:`Bearer ${token}`}})
        result.value = res.data
    }catch(err){
        console.error("Error Fetching",err)
    }
}

const formatDate = (dateStr:string)=>{
    if(!dateStr)return '-'
    const date = new Date(dateStr)
    const day = String(date.getDay()).padStart(2,'0')
    const month = String(date.getMonth()).padStart(2,'0')
    const year = String(date.getFullYear())
    return `${day}/${month}/${year}`
}

const go = (id_eva:number) => {
    navigateTo({path:`/Staff/Score_member${id_eva}`})
}

onMounted(fetch)
</script>

<style scoped>

</style>