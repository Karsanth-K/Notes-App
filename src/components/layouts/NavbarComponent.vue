<template> 
  <div class="tabs">
  <ul>
    <li id="notesLink" class="">
      <router-link to="/notes">Notes</router-link>
    </li>
    <li id="statsLink"><router-link to="/stats">Stats</router-link></li>
  </ul>
</div>
</template>
<style scoped>
  div{
    width: fit-content;
    position: relative;
    left: 50%;
    translate: -50%;
  }
  .is-active{
    border-radius: 5px;
  }
  @media (max-width: 768px) {
    div{
      left: 100%;
      translate: -110%;
    }
  }
</style>