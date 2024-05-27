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
    max-width: 750px;
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
    padding: 50px;
    padding-top: 5px;
    border-radius: 20px;
    max-width: 850px;
    margin: auto;
  }

  @media (max-width: 768px){
    .mainDisplay{
      border-top-color: transparent;
    }
  }
</style>