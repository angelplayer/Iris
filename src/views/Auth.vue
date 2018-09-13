<template>
    <div class="d-flex flex-column full-h ">
      <div class="align-self-center mx-auto">
        <div class="btn-group btn-group-toggle" data-toggle="buttons">
          <button v-if="!isLogin" @click="toggle()" class="btn btn-info active">Login</button>
          <button v-if="isLogin" @click="toggle()"  class="btn btn-danger active float-right">Register</button>
        </div>
        <login v-if="isLogin" class="auth-card"></login>
        <register v-else class="auth-card"></register>
      </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import Login from "@/components/auth/Login.vue";
import Register from "@/components/auth/Register.vue";

@Component({
  components: {
    Login,
    Register
  }
})
export default class Auth extends Vue {
  isLogin: boolean = true;

  toggle(): void {
    this.isLogin = !this.isLogin;
  }
}
</script>


<style>
.auth-card {
  width: 300px;
  height: 450px;
}
.full-h {
  height: 100vh;
}

.background-cover {
  background-color: transparent;
  background-size: cover;
  background-repeat: no-repeat;
}
</style>

