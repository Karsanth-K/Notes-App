<template>
  <div class="title px-10">
    <h1>Notes App</h1>
  </div>
</template>
<style scoped>
 .title {
    position: absolute;
    left: 0;
    top: 0;
    color: rgb(115, 94, 255);
    font-size: 30px;
    margin: 5px 10px;
    padding: 8px 2px;
    border-bottom: 2px solid rgb(115, 94, 255);
    transition: all 0.5s;
  }
  .title:hover {
    filter: drop-shadow(0 0 8px rgb(115, 94, 255));
  }
  @media (max-width: 500px) {
    h1 {
      font-size: 20px;
    }
  }
</style>