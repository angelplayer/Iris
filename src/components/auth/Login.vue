<template>
    <div class="card">
      <div class="card-header">
        <h6 class="card-title">Login</h6>
      </div>
      <div class="card-body background-cover d-flex flex-column" :style="{ backgroundImage: `url('../../img/auth.jpg')` }">
        <div class="form-group my-0 mt-auto">
          <input class="form-control" type="text" placeholder="Usename" v-model="username"/>
        </div>
        <div class="form-group my-0">
           <input class="form-control" type="password" placeholder="Password" v-model="password"/>
        </div>
        <div class="form-group button-group my-0 text-white">
          <a @click.prevent="login()" class="btn btn-sm btn-primary w-100 mb-2">Login</a>
        </div>
      </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import {
  UserService,
  LoginData,
  Command2,
  ICommand2
} from "@/services/hyouka-api";
import { LOGIN } from "@/store/constant";

@Component({})
export default class Login extends Vue {
  username: string = "";
  password: string = "";

  constructor() {
    super();
  }

  login(): void {
    const data = new LoginData({
      username: this.username,
      password: this.password
    });

    this.$store
      .dispatch(LOGIN, { user: data })
      .then(() => {
        this.$router.push({ name: "main-view" });
      })
      .catch(e => console.log(e));
  }
}
</script>



