<script setup>
import DeleteIcon from '../icons/DeleteIcon.vue';
import EditIcon from '../icons/EditIcon.vue';

const props = defineProps({
  isOpen: Boolean,
  wordId: String
})

const emit = defineEmits(['deleteWord', 'editWord'])

const deleteWord = () => {
  emit('deleteWord', props.wordId)
}

const editWord = () => {
  emit('editWord', props.wordId)
}
</script>
<template>
  <div v-if="isOpen" class="w-[124px] h-[80px] flex flex-col bg-main absolute pt-3 pb-3 pl-6 pr-6">
    <button
      type="button"
      class="flex items-center text-black font-standart text-[16px] mb-2"
      @click="deleteWord"
    >
      <DeleteIcon class="mr-2" /> Delete
    </button>
    <button
      type="button"
      class="flex items-center text-black font-standart text-[16px]"
      @click="editWord"
    >
      <EditIcon class="mr-2" /> Edit
    </button>
  </div>
</template>
