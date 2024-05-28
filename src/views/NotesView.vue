<template>
  <div class="notes">
    <NotesInput />
    <button v-if="notesStore.loadingNotes" class="button is-link is-loading">Loading...</button>
    <div v-else id="notesDiv">
      <Note
        v-for="(note) in notesStore.notes"
        :key="note.id"
        :note="note"
      />
    </div>
    <label for="addNoteInput" v-if="!notesStore.notes.length" class="no-notes">
      <h1 class="title">It's blank...</h1>
      <h2 class="subtitle">No notes found.. &nbsp; Add a note to get started !</h2>
    </label>
  </div>
</template>

<script setup>
  //imports
  import { ref, onMounted, onUnmounted, computed, watch } from 'vue';
  import Note from '@/components/notes/note.vue'
  import NotesInput from '@/components/notes/notesInput.vue';
  import useNotesStore from '@/store/notesStore';

  //notes store
  const notesStore = useNotesStore()
  
  //onMount and onUnmount
  onMounted(() => {
    document.getElementById('notesLink').classList.add('is-active')
  })
  onUnmounted(() => {
    if (!document.getElementById('notesLink'))
     return
    document.getElementById('notesLink').classList.remove('is-active')
  })

  //save changes to db
  async function checkForSaveEnabled(){
    if (!notesStore.saveChangesEnabled) return
    await notesStore.saveChanges()

  }

</script>
<style scoped>
  .notes{
    scroll-behavior: smooth;
  }
  .is-loading{
    background: transparent;
    position: relative;
    left: 50%;
    translate: -50%;
  }
  .no-notes{
    border-radius: 20px;
    margin: auto;
    margin-top: 50px;
    min-width: fit-content;
    max-width: 600px;
    padding: 50px;
    display: flex;
    gap: 20px;
    flex-direction: column;
    justify-content: center;
  }
  .no-notes>*{
    width: fit-content;
    color: #606060;
  }
  button{
    background-color: #4f4ff4;
    border: none;
    transition: all 500ms;
  }
  button:disabled{
    background-color: #6f6ff6;
  }
</style>