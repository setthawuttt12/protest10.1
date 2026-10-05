<template>
    <v-container>
        <v-row justify="center">
            <v-col md="12" cols="12">
                <v-card class="pa-2">
                    <v-card-title>
                        <h1 class="text-h5 text-center">รายงานผู้รับการประเมินผล</h1>
                    </v-card-title>
                    <v-card-text>
                        <v-table class="table mt-3">
                            <thead>
                                <tr>
                                    <th class="border text-center">ลำดับ</th>
                                    <th class="border text-center">รายงานผู้รับการประเมินผล</th>
                                    <th class="border text-center">รายละเอียด</th>
                                </tr>
                                
                            </thead>
                            <tbody>
                                <tr>
                                    <td class="border text-center">1</td>
                                    <td class="border text-center">รายงานผู้รับการประเมินผล</td>
                                    <td class="border text-center"><nuxt-link to="/Staff/Re_eva"><v-btn class="text-center text-white" color="blue">รายละเอียด</v-btn></nuxt-link></td>
                                </tr>
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


</script>

<style scoped>

</style>