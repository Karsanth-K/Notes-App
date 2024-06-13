<template>
  <TitleComponent/>
  <NavbarComponent v-if="currentRoute.name!=='login' && currentRoute.name!=='signup'"/>
  <div class="mainDisplay">
    <RouterView/>
  </div>
</template>

<script setup>
//imports
  import NavbarComponent from '@/components/layouts/NavbarComponent.vue'
  import TitleComponent from '@/components/layouts/TitleComponent.vue'
  import { useRoute } from 'vue-router';
  import useNotesStore from '@/store/notesStore';
  import { onMounted } from 'vue';

  const currentRoute = useRoute()
  const notesStore = useNotesStore()

  //onMount
  onMounted(() => { 
    notesStore.getNotes()
  })

</script>

<style>
  @import 'bulma/css/bulma.css';

  html{
    background-color: #0f0f0f;
  }
  
  body{
    font-family: 'Brush Script MT', cursive;
  }
  
  .card{
    box-shadow: none;
    border: 1px solid #3e3e47;
    background-color: rgb(24, 24, 24);
    max-width: 600px;
    position: relative;
    left: 50%;
    translate: -50%;
    color: #b0b0b0;
    transition: all 500ms;
  }

  .card-header{
    font-size: x-large;
    position: absolute;
    left: 2%;
    top: -20%;
    color: #6f6ff6;
  }
  
  .card:hover{
    scale: 1.015;
  }
  
  .no-hover:hover{
    scale: 1;
  }

  .mainDisplay {
    padding: 20px;
    padding-top: 5px;
    border-radius: 20px;
    min-width: fit-content;
    max-width: 850px;
    margin: auto;
  }

  @media (max-width: 500px){
    body{
      font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    }
    .card{
      max-width: 400px;
    }
  }
</style>