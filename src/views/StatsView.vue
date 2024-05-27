<template>
  <div class="stats">
    <table class="table">
      <thead>
        <tr>
          <th width="60%">STAT</th>
          <th>VALUE</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>No. of notes</td>
          <td>{{notesStore.getNumOfNotes}}</td>
        </tr>
        <tr>
          <td>Total no. of characters</td>
          <td>{{notesStore.getNumOfChars}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>

  //imports
  import { onMounted, onUnmounted } from 'vue';
  import useNotesStore from '@/store/notesStore'

  //notes store
  const notesStore = useNotesStore()
  
  //onMount and onUnmount
  onMounted(() => {
    document.getElementById('statsLink').classList.add('is-active')
  })

  onUnmounted(() => {
    document.getElementById('statsLink').classList.remove('is-active')
  })
</script>

<style scoped>
 .table{
  width: 75%;
  position: relative;
  left: 50%;
  translate: -50%;
  text-align: center;
  border: 1px solid #404040;
  background-color: #161616;
 }
 .table th{
  height: 100px;
  align-content: center;
  text-align: center;
  border: 1px solid #404040;
  font-size: x-large;
  color: #6f6ff6;
 }
 .table td{
  padding: 20px;
  border: 1px solid #404040;
  height: 75px;
  align-content: center;
  color: #b0b0b0;
 }
</style>