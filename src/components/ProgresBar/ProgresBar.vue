<script setup>
const props = defineProps({
  progress: {
    type: Number,
    required: true
  }
})
</script>

<template>
  <v-container>
    <v-row class="justify-center items-center">
      <v-col class="flex items-center text-center">
        <!-- Прогрес у вигляді кола -->
        <v-progress-circular
          :model-value="progress"
          rotate="360"
          class="my-4 w-7 h-7 text-[#008000]"
        >
          <!-- Відсоток всередині кола --> </v-progress-circular
        ><strong class="ml-4">{{ progress }}%</strong>
      </v-col>
    </v-row>
  </v-container>
</template>
<style>

</style>