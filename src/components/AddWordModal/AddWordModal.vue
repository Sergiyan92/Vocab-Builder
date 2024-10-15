<script setup>
import { computed, onMounted, reactive, ref, toRaw } from 'vue'
import UkraineIcon from '../icons/UkraineIcon.vue'
import UKIcon from '../icons/UKIcon.vue'
import CloseIcon from '../icons/CloseIcon.vue'
import { useStore } from 'vuex'
import SelectIcon from '../icons/SelectIcon.vue'

const store = useStore()
const emit = defineEmits(['submit'])
const categories = computed(() => store.getters.getCategoryList)

onMounted(() => {
  store.dispatch('loadCategory')
})

const wordData = reactive({
  en: '',
  ua: '',
  category: 'noun',
  isIrregular: false
})

const selectCategory = ref('noun')
const selectVerbType = ref('regular')

const handleCategoryChange = (e) => {
  selectCategory.value = e.target.value
  wordData.category = e.target.value
}

const handleVerbTypeChange = (e) => {
  selectVerbType.value = e.target.value
  wordData.isIrregular = selectVerbType.value === 'irregular';
}

const handleSubmit = () => {
  const dataToSubmit = {
    en: wordData.en,
    ua: wordData.ua,
    category: wordData.category,
  };

  // Додаємо isIrregular лише для категорії verb
  if (wordData.category === 'verb') {
    dataToSubmit.isIrregular = wordData.isIrregular;
  }

  emit('submit', toRaw(dataToSubmit))

  // Скидаємо поля
  wordData.en = ''
  wordData.ua = ''
  wordData.category = 'noun'
  wordData.isIrregular = false;
  selectVerbType.value = 'regular';
}

const isModalOpen = computed(() => store.getters.isAddWordModalOpen)
const closeAddWordModal = () => store.commit('closeAddWordModal')
</script>

<template>
  <div v-if="isModalOpen" class="fixed inset-0 flex justify-center items-center z-10">
    <div @click="closeAddWordModal" class="absolute inset-0 bg-black opacity-20"></div>
    <form
      @submit.prevent="handleSubmit"
      class="relative flex-col w-[628px] p-[64px] bg-green rounded-[30px] z-20"
    >
      <CloseIcon
        class="absolute top-[20px] right-[20px] w-[32px] h-[32px] cursor-pointer"
        @click="closeAddWordModal"
      />
      <div class="flex flex-col">
        <div>
          <h2 class="text-main text-h1 mb-5 font-semibold">Add word</h2>
          <p class="text-main text-h2 mb-8 font-regular">
            Adding a new word to the dictionary is an important step in enriching the language base
            and expanding the vocabulary.
          </p>
        </div>

        <div class="relative w-[204px] mb-2">
          <select
            :value="selectCategory"
            @change="handleCategoryChange"
            class="appearance-none border-[1px] bg-green pt-[12px] pb-[12px] pl-[24px] pr-[50px] rounded-2xl border-opacity-30 border-main text-main w-full"
          >
            <option v-for="category in categories" :key="category.id" :value="category">
              {{ category }}
            </option>
          </select>
          <SelectIcon
            class="absolute top-1/2 right-[20px] fill-main transform -translate-y-1/2 pointer-events-none"
          />
        </div>

        <div v-if="selectCategory === 'verb'" class="mb-9">
          <label
            class="mr-4 text-main custom-radio"
            :class="{ 'radio-checked': selectVerbType === 'regular' }"
            ><input
              type="radio"
              value="regular"
              name="verbType"
              @change="handleVerbTypeChange"
              :checked="selectVerbType === 'regular'"
              class="mr-2"
            />Regular</label
          >
          <label
            class="text-main custom-radio"
            :class="{ 'radio-checked': selectVerbType === 'irregular' }"
            ><input
              type="radio"
              value="irregular"
              name="verbType"
              @change="handleVerbTypeChange"
              :checked="selectVerbType === 'irregular'"
              class="mr-2"
            />Irregular</label
          >
        </div>

        <div class="flex">
          <div>
            <input
              type="text"
              v-model="wordData.ua"
              name="ukraine"
              placeholder="Українське слово"
              class="border border-main border-opacity-30 text-main bg-green rounded-2xl w-[354px] pl-[18px] pt-4 pb-4 mb-[18px] placeholder:text-main"
            />
            <input
              type="text"
              v-model="wordData.en"
              name="english"
              placeholder="English word"
              class="border border-main border-opacity-30 text-main bg-green rounded-2xl w-[354px] pl-[18px] pt-4 pb-4 placeholder:text-main"
            />
          </div>
          <div class="flex flex-col justify-between pt-[11px] pb-[11px]">
            <span class="text-main flex items-center"><UkraineIcon class="mr-2" />Ukraine </span>
            <span class="text-main flex items-center"><UKIcon class="mr-2" />English </span>
          </div>
        </div>
      </div>

      <div class="mt-8 w-full">
        <button
          type="submit"
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

<style scoped>
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
  border: 2px solid rgb(252, 252, 252, 0.3);
  border-radius: 50%;
  transition: border-color 0.3s ease;
}

.radio-checked::before {
  border-color: #fcfcfc;
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
  background-color: #fcfcfc; /* Колір всередині вибраної кнопки */
  border-radius: 50%;
}
</style>
