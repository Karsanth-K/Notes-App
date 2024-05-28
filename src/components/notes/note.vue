<template>
  <div ref="cardDivRef" :class="(edited)?'card mb-5 edited':'card mb-5'">
    <div class="editedDisplay">Edited</div>
    <div class="card-content">
      <div class="content">
        {{ note.value }}<br/>
        <div class="dateDiv">
          <div class="date">{{date}}</div>
          <div class="time">{{time}}</div>
        </div>
      </div>
    </div>
    <footer class="card-footer">
      <button @click="handleEditNote" class="card-footer-item">Edit</button>
      <button @click.prevent="goForConfirmation" v-if="!deleteNoteValue" class="card-footer-item">Delete</button>
      <button @click.prevent="deleteNote" v-if="deleteNoteValue" class="card-footer-item confirm-delete">Sure?</button>
    </footer>
  </div>
</template>

<script setup>

  //imports
  import useNotesStore from '@/store/notesStore'
  import { ref, onMounted, onUpdated, watch } from 'vue';

  //use notes store
  const notesStore = useNotesStore()

  //props
  const props = defineProps({
    note: {
      type: Object,
      required: true
    }
  })
  // get date
  const date = `${props.note.date.length===1?'0'+props.note.date:props.note.date} / ${props.note.month.length===1?'0'+props.note.month:props.note.month} / ${props.note.year}`
  const minute = props.note.minute.length === 1 ? '0' + props.note.minute : props.note.minute
  const ampm = props.note.hour>'12'? 'PM':'AM'
  const hour = props.note.hour>'12'? (props.note.hour-'12').toString(): props.note.hour
  const time = `${hour.length===1?'0'+hour:hour}:${minute} ${ampm}`

  //set edited
  const edited = ref(props.note.edited)

  //check for 'edited' class and remove it
  const cardDivRef = ref(null)

  //on changes to the states
  onUpdated(() => {
    edited.value = notesStore.notes[notesStore.findIndById(props.note.id)].edited
    if (edited.value) {
      //scroll to the element
      setTimeout(() => {
        cardDivRef.value.scrollIntoView({behavior: "smooth", block: "center", inline: "nearest"})
      }, 0);
      //remove 'edited' value which further removes 'edited' class
      setTimeout(() => {
        notesStore.setEditedToFalse(props.note.id)
        edited.value = false
      }, 1000);
    }
  })
  if (edited.value) {
    //scroll to the element
    setTimeout(() => {
      cardDivRef.value.scrollIntoView({behavior: "smooth", block: "center", inline: "nearest"})
    }, 0);
    //remove 'edited' value which further removes 'edited' class
    setTimeout(() => {
      notesStore.setEditedToFalse(props.note.id)
      edited.value = false
    }, 1000);
  }
  
  //handle edit note
  const handleEditNote = () => {
    window.location = `./#/editNote/${props.note.id}`
  }
  
  //handle delete note
  const deleteNoteValue = ref(false)
  
  const deleteNote = () => {
    let indToBeRemoved = notesStore.findIndById(props.note.id)
    const noteElementToBeRemoved = document.getElementById("notesDiv").children[indToBeRemoved]
    noteElementToBeRemoved.style.opacity = 0
    noteElementToBeRemoved.style.scale = 0
    setTimeout(() => {
      notesStore.deleteNote(indToBeRemoved)
    }, 400);
  }
  
  const goForConfirmation = () => {
    deleteNoteValue.value = true
    setTimeout(() => {
      deleteNoteValue.value = false
    }, 3000);
  }
  
</script>
<style scoped>
  .card{
    transition: all 500ms;
  }
  .card>.editedDisplay{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.5rem;
    background-color: #202020;
    color: #6f6ff6;
    transition: all 1s;
    opacity: 0;
    z-index: -1;
  }
  .edited>.editedDisplay{
    z-index: 1;
    opacity: 1;
  }
  .content{
    text-align: justify;
  }
  .dateDiv{
    display: flex;
    gap: 20px;
    font-size: 10px;
    height: 15px;
    justify-content: end;
    margin-top: 10px;
    margin-bottom: -17px;
    color: #707070;
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
  .card-footer>.confirm-delete{
    color: #f55;
  }
  .card-footer>.confirm-delete:hover {
    box-shadow: 0 0 5px #f55;
  }
</style>