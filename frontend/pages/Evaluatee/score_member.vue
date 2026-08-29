<template>
<v-container>
    <v-row>
        <v-col col="12">
            <v-form v-if="user.status_eva === 2 || user.status_eva === 3">
                <h1 class="text-h5 font-weight-bold" >คะแนนประเมินตนเอง</h1>
                v-card
            </v-form>
        </v-col>
    </v-row>
</v-container>
</template>

<script setup>

</script>

<style lang="scss" scoped>

</style>