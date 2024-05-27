<template>
  <div class="notes">
    <!-- <div class="saveChangesDiv">
      <button class="button" :disabled="!notesStore.saveChangesEnabled" @click="checkForSaveEnabled">Save Changes</button>
    </div> -->
    <NotesInput />
    <div id="notesDiv">
      <Note
        v-for="(note) in notesStore.notes"
        :key="note.id"
        :note="note"
      />
    </div>
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
  .saveChangesDiv{
    display: flex;
    justify-content: flex-end;
    margin-bottom: 20px;
    margin-right: 20px;
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