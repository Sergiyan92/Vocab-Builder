<script setup>
import {RouterLink} from 'vue-router'
import ArrowRight from '../icons/ArrowRight.vue'
import PlusIcon from '../icons/PlusIcon.vue'
import SearchIcon from '../icons/SearchIcon.vue'
import SelectIcon from '../icons/SelectIcon.vue'
</script>

<template>
  <section class="flex dashboard justify-between items-center mt-[80px]">
    <div class="flex">
      <div class="relative">
        <input
          class="border-[1px] w-[274px] pt-[12px] pb-[12px] pl-[24px] pr-[24px] rounded-2xl border-opacity-10 border-black placeholder:text-black"
          type="text"
          placeholder="Find the word"
        />
        <SearchIcon class="absolute top-1/2 right-[30px] transform -translate-y-1/2" />
      </div>

      <div class="relative w-[164px] ml-[8px]">
        <select
          name=""
          id=""
          class="appearance-none border-[1px] pt-[12px] pb-[12px] pl-[24px] pr-[50px] rounded-2xl border-opacity-10 border-black placeholder:text-black w-full"
        >
          <option>Phrasal verb</option>
          <option>Verb</option>
          <option>Preposition</option>
          <option>Noun</option>
        </select>
        <SelectIcon
          class="absolute top-1/2 right-[20px] transform -translate-y-1/2 pointer-events-none"
        />
      </div>
    </div>

    <div class="flex stat">
      <p><span class="text-black opacity-50">To study:</span> 20</p>
      <button class="mr-[16px] ml-[16px] items-center flex">
        Add word <PlusIcon class="ml-[8px]" />
      </button>
      <router-link to="/training" class="flex items-center">
        Train oneself <ArrowRight class="stroke-green ml-[8px]" />
      </router-link>
    </div>
  </section>
</template>

<style scoped>
@media (max-width: 1024px) {
  .dashboard {
    display: block;
  }
  .stat {
    margin-top: 28px;
  }
}
</style>
