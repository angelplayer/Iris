<template>
    <div class="d-flex flex-column full-h ">
      <div class="align-self-center mx-auto">
        <login class="auth-card"></login>
      </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import Login from "@/components/auth/Login.vue";

@Component({
  components: {
    Login
  }
})
export default class Auth extends Vue {}
</script>


<style scoped>
.auth-card {
  width: 300px;
  height: 450px;
}
.full-h {
  height: 100vh;
}
</style>

