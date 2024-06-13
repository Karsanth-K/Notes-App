<template>
  <div class="no-hover inputField mb-5 card">
    <h2 class="card-header">Edit Note</h2>
    <h3 class="noOfChar">{{ computedNoOfChar }}</h3>
    <textarea
      v-model="noteStrVal"
      id="addNoteInput"
      class="textarea"
      placeholder="Write a note..."
      ref="inputRef"
      v-autofocus
    />
    <footer class="card-footer">
      <button
        @click="editNote"
        class="card-footer-item">
          Confirm
      </button>
      <button
        @click="$router.back()"
        class="card-footer-item">
          Cancel
      </button>
    </footer>
  </div>
</template>
<script setup>
  //imports
  import useNotesStore from '@/store/notesStore'
  import { useRoute, useRouter } from 'vue-router';
  import { ref, computed, onMounted, onUnmounted } from 'vue';
  import vAutofocus from '@/directives/autofocus'

  //initiating router
  const route = useRoute()
  const router = useRouter()
  
  //notes store
  const notesStore = useNotesStore()

  //get the note to be edited
  const id = route.params.id
  const note = ref(function(){
    for (let note of notesStore.notes) {
      if (note.id === id) {
        return note
      }
    }
  }())

  //component references
  const inputRef = ref(null)

  //edit note
  const noteStrVal = ref(note.value.value)

  // edit functionality
  function editNote(){
      if(notesStore.editNote(id, noteStrVal)){
        router.back()
      }
  }
      
  //computed
  const computedNoOfChar = computed(() => {
    const length = noteStrVal.value.length
    if (length === 0)
      return null
    if (length === 1)
      return `${length} Charater`
    return `${length} Charaters`
  })

  //onMount and onUnmount
  onMounted(() => {
    document.getElementById('notesLink').classList.add('is-active')
  })
  onUnmounted(() => {
    document.getElementById('notesLink').classList.remove('is-active')
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
    max-width: 750px;
    background-color: rgb(24, 24, 24);
    position: relative;
    left: 50%;
    translate: -50%;
    margin-top: 50px;
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
