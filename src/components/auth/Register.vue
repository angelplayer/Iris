<template>
   <div class="card">
      <div class="card-header">
        <h6 class="card-title">Register</h6>
      </div>
      <div class="card-body background-cover d-flex flex-column" :style="{ backgroundImage: `url('../../img/auth.jpg')` }">
      <div class="form-group my-0 mt-auto">
          <input class="form-control" type="text" placeholder="Email" v-model="email"/>
        </div>
        <div class="form-group my-0 mt-auto">
          <input class="form-control" type="text" placeholder="Usename" v-model="username"/>
        </div>
        <div class="form-group my-0">
           <input class="form-control" type="password" placeholder="Password" v-model="password"/>
        </div>
        <div class="form-group my-0">
           <input class="form-control" type="password" placeholder="Password" v-model="repassword"/>
        </div>
        <div class="form-group button-group my-0 text-white">
          <a @click.prevent="register()" class="btn btn-sm btn-primary w-100 mb-2">Register</a>
        </div>
      </div>
    </div>
</template>


<script lang="ts">
import Vue from "vue";
import { REGISTER } from "@/store/constant";
import { Command3, ICommand3, UserData } from "@/services/hyouka-api";

export default class Register extends Vue {
  email: string = "";
  username: string = "";
  password: string = "";
  repassword: string = "";

  register(): void {
    if (this.password === this.repassword) {
      const data: ICommand3 = {
        user: new UserData({
          username: this.username,
          email: this.email,
          password: this.password
        })
      };
      this.$store.dispatch(REGISTER, data).then(() => {
        this.$router.push({ name: "dashboard" });
      });
    } else {
      //TODO: popup when register errors
    }
  }
}
</script>
