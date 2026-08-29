<template>
    <v-app>
        <v-app-bar :color="bg(user.role)" flat>
            <v-app-bar-nav-icon @click="drawer = !drawer" />
            <v-toolbar-title>NTC EVALAUTION SYSTEM</v-toolbar-title>
            <spacer/>
            <v-btn @click="dialog = !dialog"><v-avatar :image="`${uploads}/${user.pic_user}`" ></v-avatar></v-btn>
            <p class="text-center ms-4">ผู้ใช้งาน : {{ user.fname }} {{ user.lname }} <br> {{ user.role }}</p>&nbsp;&nbsp;
            <v-btn variant="text" icon="mdi-logout" @click="logout"></v-btn>

            <v-dialog v-model="dialog">
                <v-row justify="center">
                    <v-col cols="12" md="4">
                        <v-card>
                            <v-row class="pa-3">
                                <v-col cols="12" md="12"><v-img :src="`${uploads}/${user.pic_user}`" v-if="user.pic_user"></v-img>
                                    <v-row justify="center" v-else>
                                        <v-col cols="12" md="6">
                                            <center><v-card border="3px" color="warning" style="width: 100%; padding: 60px 0px;"><h1 class="text-center">ไม่มีรูปภาพ</h1></v-card></center>
                                        </v-col>
                                    </v-row>
                                    
                                </v-col>
                            </v-row>
                            <v-divider class="mt-3 mb-3" thickness="3"></v-divider>
                            <h1 class="text-h5 text-center">รูปภาพสมาชิก</h1>
                        </v-card>
                    </v-col>
                </v-row>
                
            </v-dialog>
        </v-app-bar>

        <clientOnly>
            <v-navigation-drawer v-model="drawer" app width="260" color="#404040" :temporary="isMobile" :permanent="!isMobile">
                <v-list density="comfortable">
                    <v-list-item v-for="item in navitem" :key="item.title" :to="item.to">
                        {{ item.title }}
                    </v-list-item>
                </v-list>
            </v-navigation-drawer>
        </clientOnly>

        <v-main>
            <v-container class="py-2" fluid>
                <slot/>
            </v-container>
            <v-footer class="text-caption justify-center">© 2026 NTC EVALAUTION SYSTEM</v-footer>
        </v-main>
    </v-app>
</template>

<script setup lang="ts">
import axios from 'axios';
import { useDisplay } from 'vuetify';
import { api } from '~/API/base';

const {mdAndDown} = useDisplay()
const isMobile = computed(()=> mdAndDown.value)
const drawer = ref(false)
const user = ref<any>({})
const uploads = 'http://localhost:3001/uploads/pic_user'
const dialog = ref(false)

const logout = ()=>{
    if(!confirm('ท่านต้องการออกจากระบบหรือไม่'))
    localStorage.removeItem('token')
    return navigateTo('/',{replace:true})
}

const navitem = computed(()=> roles.filter((item)=> item.role.includes(user.value.role)))



const fecth = async()=>{
    const token = localStorage.getItem('token')
    if(!token){
        return await navigateTo('/',{replace:true})
    }
    try {
        const res = await axios.get(`${api}/profile`,{headers:{Authorization:`Bearer ${token}`}})
        user.value = res.data
    } catch (error) {
        console.error('Error Get User',error)
    }
}
onMounted(fecth)

const roles = [
    {title:'หน้าหลัก',to:'/Staff/',role:'ฝ่ายบุคลากร'},
    {title:'จัดการผู้รับการประเมินผล',to:'/Staff/ManageEva',role:'ฝ่ายบุคลากร'},
    {title:'จัดการกรรมการประเมิน',to:'/Staff/ManageCommit',role:'ฝ่ายบุคลากร'},
    {title:'จัดการหัวข้อการประเมิน',to:'/Staff/Topic',role:'ฝ่ายบุคลากร'},
    {title:'จัดการตัวชี้วัด',to:'/Staff/Indicate',role:'ฝ่ายบุคลากร'},
    {title:'จัดการรอบการประเมิน',to:'/Staff/Round_eva',role:'ฝ่ายบุคลากร'},
    {title:'จัดการแบบประเมิน',to:'/Staff/Eva',role:'ฝ่ายบุคลากร'},
    {title:'ผลสรุปการประเมินผู้รับการประเมินผล',to:'/Staff/Score_evaList',role:'ฝ่ายบุคลากร'},
    {title:'ผลสรุปการประเมินกรรมการประเมิน',to:'/Staff/Score_commitList',role:'ฝ่ายบุคลากร'},
    {title:'สถานะการประเมินผู้รับการประเมินผล',to:'/Staff/Status_eva',role:'ฝ่ายบุคลากร'},
    {title:'สถานะการประเมินกรรมการประเมิน',to:'/Staff/Status_commit',role:'ฝ่ายบุคลากร'},
    {title:'เอกสารหรือคู่มือการประเมิน',to:'/Staff/Document',role:'ฝ่ายบุคลากร'},
    {title:'รายงานผู้รับการประเมินผล',to:'/Staff/Report',role:'ฝ่ายบุคลากร'},

    //eva
    {title:'หน้าหลัก',to:'/Evaluatee',role:'ผู้รับการประเมินผล'},
    {title:'แก้ไขข้อมูลส่วนตัว',to:'/Evaluatee/edit_eva',role:'ผู้รับการประเมินผล'},
    {title:'แบบประเมินตนเอง',to:'/Evaluatee/selfeva',role:'ผู้รับการประเมินผล'},
    {title:'ตรวจสอบผลการประเมิน',to:'/Evaluatee',role:'ผู้รับการประเมินผล'},
    {title:'รายงานผลการประเมิน',to:'/Evaluatee',role:'ผู้รับการประเมินผล'},
    {title:'ประเมิน',to:'/Staff/Status_commit',role:'ผู้รับการประเมินผล'},
    {title:'คู่มือการประเมิน',to:'/Evaluatee/Doc',role:'ผู้รับการประเมินผล'},

    //comit
    {title:'รายชื่อผู้รับการประเมิน',to:'/Committee',role:'กรรมการประเมิน'},
    {title:'ดำเนินการประเมิน',to:'/Committee/showeva',role:'กรรมการประเมิน'},
    {title:'ตรวจสอบผลและยืนยัน',to:'/Committee/Check_confirm',role:'กรรมการประเมิน'},
    {title:'คู่มือการประเมิน',to:'/Committee/Doc',role:'กรรมการประเมิน'},

]

const bg =(role)=>{
    if(role === 'ฝ่ายบุคลากร')return '#647687'
    if(role === 'กรรมการประเมิน')return '#007FFF'
    if(role === 'ผู้รับการประเมินผล')return '#7d0c14'
}
</script>

<style scoped>
@media print{
    .v-app-bar,.v-btn.no-p{
        display: none !important;
        margin: 0 !important;
        margin-top: 0 !important;
        padding: 0 !important;
        width: 100 !important;
    }
}
</style>