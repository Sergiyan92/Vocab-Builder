<script setup>
import { computed } from 'vue'
import UkraineIcon from '../icons/UkraineIcon.vue'
import UKIcon from '../icons/UKIcon.vue'
import CloseIcon from '../icons/CloseIcon.vue'
import { useStore } from 'vuex';

const store = useStore()

const isModalOpen = computed(()=>store.getters.isAddWordModalOpen)
const closeAddWordModal = ()=> store.commit('closeAddWordModal')

</script>

<template>
  <div
    v-if="isModalOpen"
    class="fixed inset-0 flex justify-center items-center z-10"
  >
  <div @click="closeAddWordModal" class="absolute inset-0 bg-black opacity-20"></div>
    <form class="relative flex-col w-[628px] p-[64px] bg-green rounded-[30px] z-20">
      <CloseIcon class="absolute top-[20px] right-[20px] w-[32px] h-[32px] cursor-pointer" @click="closeAddWordModal" />
      <div class="flex">
        <div>
          <input
            type="text"
            name="ukraine"
            placeholder="Українське слово"
            class="border border-main border-opacity-30 bg-green rounded-2xl w-[354px] pl-[18px] pt-4 pb-4 mb-[18px] placeholder:text-main"
          />
          <input
            type="text"
            name="english"
            placeholder="English word"
            class="border border-main border-opacity-30 bg-green rounded-2xl w-[354px] pl-[18px] pt-4 pb-4 placeholder:text-main"
          />
        </div>
        <div class="flex flex-col justify-between pt-[11px] pb-[11px]">
          <span class="text-main flex items-center"><UkraineIcon class="mr-2" />Ukraine </span>
          <span class="text-main flex items-center"><UKIcon class="mr-2" />English </span>
        </div>
      </div>

      <div class="mt-8 w-full">
        <button
          type="button"
          class="pt-[14px] pb-[14px] pl-[101px] pr-[101px] bg-main rounded-[30px] mr-[10px]"
        >
          Save
        </button>
        <button
          type="button"
          class="pt-[14px] pb-[14px] pl-[92px] pr-[92px] border border-main text-main rounded-[30px]"
          @click="closeAddWordModal"
        >
          Cancel
        </button>
      </div>
    </form>
  </div>
</template>
