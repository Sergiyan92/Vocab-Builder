<script setup>
import { RouterLink, useRoute } from 'vue-router'
import ArrowRight from '../icons/ArrowRight.vue'
import PlusIcon from '../icons/PlusIcon.vue'
import SearchIcon from '../icons/SearchIcon.vue'
import SelectIcon from '../icons/SelectIcon.vue'
import { useStore } from 'vuex'
import { computed, onMounted } from 'vue'
import AddWordModal from '../AddWordModal/AddWordModal.vue'

onMounted(() => {
  store.dispatch('loadCategory')
  store.dispatch('getStatistic')
})

const route = useRoute()
const store = useStore()

const statistics = computed(() => store.getters.getStatistics)

const selectCategory = computed({
  get: () => store.state.selectedCategory,
  set: (value) => store.commit('setSelectedCategory', value)
})

const searchQuery = computed({
  get: () => store.state.searchQuery,
  set: (value) => store.commit('setSearchQuery', value)
})

const openAddWordModal = () => store.commit('openAddWordModal')

const categories = computed(() => store.getters.getCategoryList)

const handleAddWord = (data) => store.dispatch('addWord', data)

const selectVerbType = computed({
  get: () => store.state.selectedVerbType,
  set: (value) => store.commit('setSelectedVerbType', value)
})
</script>

<template>
  <section class="flex dashboard justify-between items-center pt-[80px]">
    <div class="flex">
      <div class="relative">
        <input
          v-model="searchQuery"
          class="border-[1px] w-[274px] pt-[12px] pb-[12px] pl-[24px] pr-[24px] rounded-2xl border-opacity-10 border-black placeholder:text-black"
          type="text"
          placeholder="Find the word"
        />
        <SearchIcon class="absolute top-1/2 right-[30px] transform -translate-y-1/2" />
      </div>

      <div class="relative w-[164px] ml-[8px]">
        <select
          v-model="selectCategory"
          class="appearance-none border-[1px] pt-[12px] pb-[12px] pl-[24px] pr-[50px] rounded-2xl border-opacity-10 border-black placeholder:text-black w-full"
        >
          <option value="all">all</option>
          <option v-for="category in categories" :key="category.id" :value="category">
            {{ category }}
          </option>
        </select>
        <SelectIcon
          class="absolute top-1/2 right-[20px] transform -translate-y-1/2 pointer-events-none fill-black"
        />
      </div>

      <div v-if="selectCategory === 'verb'" class="flex items-center ml-2">
        <label class="custom-radio" :class="{ 'radio-checked': selectVerbType === 'regular' }">
          <input type="radio" name="verbType" value="regular" v-model="selectVerbType" />
          Regular
        </label>

        <label
          class="custom-radio ml-4"
          :class="{ 'radio-checked': selectVerbType === 'irregular' }"
        >
          <input type="radio" name="verbType" value="irregular" v-model="selectVerbType" />
          Irregular
        </label>
      </div>
    </div>

    <div class="flex stat">
      <p class="mr-[16px]"><span class="text-black opacity-50 ">To study:</span> {{ statistics }}</p>
      <button
        v-if="route.name !== 'recommend'"
        class="  items-center flex"
        @click="openAddWordModal"
      >
        Add word <PlusIcon class="ml-[8px]" />
      </button>
      <router-link to="/training" class="flex items-center ml-[16px]">
        Train oneself <ArrowRight class="stroke-green ml-[8px]" />
      </router-link>
    </div>
  </section>
  <AddWordModal @submit="handleAddWord" />
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

/* Сховуємо стандартну радіо-кнопку */
.custom-radio input[type='radio'] {
  position: absolute;
  opacity: 0;
  cursor: pointer;
}

/* Стиль кастомної радіо-кнопки */
.custom-radio {
  display: inline-flex;
  align-items: center;
  position: relative;
  padding-left: 30px; /* Відступ для радіо-кнопки */
  cursor: pointer;
}

/* Коло для кастомної радіо-кнопки */
.custom-radio::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  border: 2px solid gray;
  border-radius: 50%;
  transition: border-color 0.3s ease;
}

/* Коли радіо-кнопка вибрана */
.radio-checked::before {
  border-color: #85aa9f; /* Зелений колір при виборі */
}

/* Стиль для заповненого кола при виборі */
.radio-checked::after {
  content: '';
  position: absolute;
  left: 5px;
  top: 50%;
  transform: translateY(-50%);
  width: 10px;
  height: 10px;
  background-color: #85aa9f; /* Колір всередині вибраної кнопки */
  border-radius: 50%;
}
</style>
