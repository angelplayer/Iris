<template>
    <div class="main-panel">
        <div class="content">
            <div class="container-fluid">
                <h4 class="page-title">Dashboard</h4>
                <div class="row">
                    <div class="col-md-8">
                        <movie-list :list="movies"></movie-list>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import MovieList from "@/components/MovieList.vue";
import { State, Getter } from "vuex-class";
import { IMovie } from "@/services/hyouka-api";
import { FETCH_MOVIES } from "@/store/constant";

@Component({
  components: {
    MovieList
  }
})
export default class MainView extends Vue {
  @Getter("movieItems") movies: Array<IMovie>;

  mounted() {
    this.$store.dispatch(FETCH_MOVIES, null, { root: true });
  }
}
</script>
