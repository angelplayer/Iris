<template>
    <div>
      <router-view/>
      <loading :loading="isLoading"/>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { MoviesService } from "@/services/hyouka-api";
import Loading from "@/components/layout/Loading.vue";
import { State, Getter } from "vuex-class";

@Component({
  components: {
    Loading
  }
})
export default class App extends Vue {
  @Getter("loading") isLoading: boolean;
}
</script>


<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
