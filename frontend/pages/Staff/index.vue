<template>
    <v-container>
        <h1>Dashboard-Staff</h1>
        <v-sheet class="pa-3" elevation="5" rounded="lg">
            <v-row>
                <v-col v-for="b in box" :key="b" cols="12" md="4">
                    <v-card class="pa-3">
                        <h3 class="text-center">{{ b.title }}</h3>
                        <h3 class="text-center">{{ b.value }}</h3>
                    </v-card>
                </v-col>
            </v-row>
            <v-row>
                <v-col v-for="b in box2" :key="b" cols="12" md="4">
                    <v-card class="pa-3">
                        <h3 class="text-center">{{ b.title }}</h3>
                        <h3 class="text-center">{{ b.value }}</h3>
                    </v-card>
                </v-col>
            </v-row>
        </v-sheet>
    </v-container>
</template>

<script setup lang="ts">
import { api } from '~/API/base';
import axios from 'axios'

const token = import.meta.client ? localStorage.getItem('token'):null

const box = ref([])
const box2= ref([])

const fetch=async()=>{

    try {
        
        const res = await axios.get(`${api}/dash/staff`,{headers:{Authorization:`Bearer ${token}`}})
        box.value = res.data.box
        box2.value = res.data.box2

    } catch (error) {
        console.error("Error get box");
        
    }

}

onMounted(fetch)

</script>

<style scoped>

</style>