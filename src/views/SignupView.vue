<template>
  <div class="signupDiv">
    <div class="signupTitle">Signup</div>
      <form class="signupContent">
        <div class="inputDiv">
          <label class="focus-out" ref="usernameRef" for="username">Username</label>
          <input class="input" v-model="inputRefs.username" @focus="handleFocusIn('username')" @focusout="handleFocusOut('username')" id="username"/>
        </div>
        <div class="inputDiv">
          <label class="focus-out" ref="passwordRef" for="password">Password</label>
          <input class="input" v-model="inputRefs.password" @focus="handleFocusIn('password')" @focusout="handleFocusOut('password')" id="password" type="password"/>
        </div>
        <div class="inputDiv">
          <label class="focus-out addSomeLeft" ref="cnfrmpasswordRef" for="cnfrmpassword">Confirm Password</label>
          <input class="input" v-model="inputRefs.cnfrmpassword" @focus="handleFocusIn('cnfrmpassword')" @focusout="handleFocusOut('cnfrmpassword')" id="cnfrmpassword" type="password"/>
        </div>
        <button class="button" @click.prevent="signup">Sign Up</button>
      </form>
  </div>
  <div class="goToSignup">
    <router-link to="/">Already have an account? Log in here!</router-link>
  </div>
</template>

<script setup>

  //imports
  import { ref, reactive } from 'vue';
  import { useRouter } from 'vue-router';

  //username and password fields
  const inputRefs = reactive({
    username: '',
    password:  '',
    cnfrmpassword: ''
  })

  //router
  const router = useRouter()

  //username and password input component references
  const usernameRef = ref(null)
  const passwordRef = ref(null)
  const cnfrmpasswordRef = ref(null)
  const inputLabelsRefs = reactive({
    usernameRef,
    passwordRef,
    cnfrmpasswordRef
  })

  //animation while input fields are focused in and out
  function handleFocusIn(ele) {
    inputLabelsRefs[ele+'Ref'].classList.remove('focus-out')
    inputLabelsRefs[ele+'Ref'].classList.add('focus-in')
  }
  function handleFocusOut(ele) {
    if (inputRefs[ele].length)
      return
    inputLabelsRefs[ele+'Ref'].classList.remove('focus-in')
    inputLabelsRefs[ele+'Ref'].classList.add('focus-out')
  }

  //login function
  function signup() {
    router.push('/notes')
  }

</script>

<style scoped>
  .focus-in{
    left: 5px;
    scale: 0.65;
    translate: 0 0;
  }
  .focus-out{
    left: 50%;
    scale: 1;
    translate: -50% 130%;
  }
  .addSomeLeft.focus-in{
    left: -5px;
  }
  .signupDiv{
     min-width: fit-content;
     max-width: 400px;
     height: 415px;
     background-color: #191919;
     border-radius: 10px;
     margin: auto;
     margin-top: 100px;
  }
  .signupTitle{
     text-align: center;
     font-size: 30px;
     color: #6f6ff6;
     font-weight: bold;
     padding-top: 20px;
     padding-bottom: 20px;
  }
  .signupContent{
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 175px;
    gap: 10px;
  }
  .inputDiv{
    width: 300px;
    height: 100px;
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    padding-left: 20px;
    padding-right: 20px;
  }
  .inputDiv>label{
    width: fit-content;
    position: relative;
    transition: all 500ms;
    z-index: 100;
  }
  .inputDiv>input{
    background-color: #000;
    height: 10px;
    color: #c0c0c0;
    border: 1px solid #303030;
    outline: none;
    border-radius: 20px;
    padding: 20px;
  }
  button{
    font-weight: 900;
    font-size: large;
    background-color: #4f4ff6;
    box-shadow: 0 0 10px black;
    border: none;
    color: #f0f0f0;
    margin-top: 30px;
    cursor: pointer;
    transition: all 250ms;
  }
  button:hover{
    background-color: #4f4ff6;
  }
  button:active{
    scale: 0.95;
  }
  .goToSignup{
    text-align: center;
    margin-top: 10px;
    font-size: small;
    margin-bottom: 25px;
  }
</style>