<template>
    <div class="card">
      <div class="card-header">
        <h6 class="card-title">Login</h6>
      </div>
      <div class="card-body background-cover d-flex flex-column" :style="{ backgroundImage: `url('./img/auth.jpg')` }">
        <div class="form-group my-0 mt-auto">
          <input class="form-control" type="text" placeholder="Usename" v-model="username"/>
        </div>
        <div class="form-group my-0">
           <input class="form-control" type="password" placeholder="Password" v-model="password"/>
        </div>
        <div class="form-group button-group my-0 text-white">
          <a @click.prevent="login()" class="btn btn-sm btn-primary w-100 mb-2">Login</a>
          <a class="btn btn-sm btn-primary w-100">Register</a>
        </div>
      </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { UserService } from "@/services/hyouka-api";

@Component({})
export default class Login extends Vue {
  username: string = "";
  password: string = "";

  constructor() {
    super();
  }

  login(): void {}
}
</script>

<style scoped>
.background-cover {
  background-color: transparent;
  background-size: cover;
  background-repeat: no-repeat;
}
</style>


