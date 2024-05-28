<template>
  <div class="inputField mb-5 card">
    <h3 class="noOfChar">{{ computedNoOfChar }}</h3>
    <textarea
      v-model="newNoteStrVal"
      id="addNoteInput"
      class="textarea"
      placeholder="Write a note..."
      ref="newNoteRef"
      :autofocus="!isMobileDisplay"
    />
    <footer class="card-footer">
      <button
        @click="notesStore.addNote(newNoteStrVal),newNoteStrVal='',newNoteRef.focus()" 
        class="card-footer-item">
          Add New Note
      </button>
    </footer>
  </div>
</template>
<script setup>
  //imports
  import { ref,computed,onUnmounted } from 'vue'
  import useNotesStore from '@/store/notesStore'

  //check for mobile display
  const isMobileDisplay = ref(window.innerWidth < 500)

  const checkMobileDisplay = () => {
    isMobileDisplay.value = window.innerWidth < 500
  }

  window.addEventListener('resize', checkMobileDisplay)

  //notes store
  const notesStore = useNotesStore()
  
  //new note str
  const newNoteStrVal = ref('')
  const newNoteRef = ref(null) //accessing the textarea element
  
  //computed properties
  const computedNoOfChar = computed(() => {
    const length = newNoteStrVal.value.length
    if (length === 0)
      return null
    if (length === 1)
      return `${length} Charater`
    return `${length} Charaters`
  })

//remove event listeners
  onUnmounted(() => {
    window.removeEventListener('resize', checkMobileDisplay)
  })
  
</script>
<style scoped>
  #addNoteInput{
    resize: none;
    background-color: transparent;
    border: none;
    color: #c0c0c0;
    padding: 25px;
    text-align: justify;
  }
  #addNoteInput::-webkit-scrollbar{
    display: block;
    margin-right: 100px;
  }
  .inputField>::-webkit-scrollbar{
    display: none;
  }
  .inputField{
    max-width: 600px;
    background-color: rgb(24, 24, 24);
    position: relative;
    left: 50%;
    translate: -50%;
    margin-top: 15px;
  }
  .inputField>.noOfChar{
    position: absolute;
    top: 2px;
    right: 10px;
    border-radius: 3px;
    font-size: 15px;
    color: #f0f0f0a0;
    background-color: #0f0f0f70;
    z-index: 10;
  }
  .card-footer>button:hover{
    box-shadow: 0 0 5px #6f6ff6;
    border-radius: 10px;
    background-color: #202020;
  }
  .card-footer>button{
    color: #6f6ff6;
    border-color: #303030;
    transition: all 500ms;
  }
</style>