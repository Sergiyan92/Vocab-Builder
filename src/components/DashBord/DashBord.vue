<script setup>
import PlusIcon from '../icons/PlusIcon.vue'
import SearchIcon from '../icons/SearchIcon.vue'
import SelectIcon from '../icons/SelectIcon.vue'
</script>

<template>
  <div class="flex">
    <div class="relative w-[274px]">
      <input
        class="border-[1px] pt-[12px] pb-[12px] pl-[24px] pr-[24px] rounded-2xl border-opacity-10 border-black placeholder:text-black"
        type="text"
        placeholder="Find the word"
      />
      <!-- Іконка пошуку всередині поля -->
      <SearchIcon class="absolute top-1/2 right-[50px] transform -translate-y-1/2" />
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
      <!-- Стрілочка для select -->

      <SelectIcon
        class="absolute top-1/2 right-[20px] transform -translate-y-1/2 pointer-events-none"
      />
    </div>
  </div>
  <p>To study: 20</p>

  <button class="">Add word <PlusIcon /></button>
</template>
