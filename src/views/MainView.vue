<template>
    <div class="main-panel">
        <div class="content">
            <div class="container-fluid">
                <h4 class="page-title">Dashboard</h4>
                <div class="row">
                    <div class="col-md-8">
                        <movie-list :list="movies"  @selected="onSelected" @edit="edit" @remove="remove"></movie-list>
                        <episode-list v-if="selectedMovie" :list="episodes"></episode-list>
                    </div>
                    <div class="col-md-4">
                      <transition enter-active-class="animated shake" duration="300" mode="in-out">
                        <movie-card v-if="selectedMovie" :movie="selectedMovie"></movie-card>
                      </transition>
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
import MovieCard from "@/components/MovieCard.vue";
import { State, Getter } from "vuex-class";
import { IMovie, Movie, MoviesService, IEpisode } from "@/services/hyouka-api";
import { FETCH_MOVIES, DELETE_MOVIE, FETCH_EPISODES } from "@/store/constant";
import EpisodeList from "@/components/EpisodeList.vue";
import { Watch } from "vue-property-decorator";
import { episode } from "@/store/episode-state";

@Component({
  components: {
    MovieList,
    MovieCard,
    EpisodeList
  }
})
export default class MainView extends Vue {
  @Getter("movieItems") movies: Array<IMovie>;
  @Getter("episodes") episodes: Array<IEpisode>;

  selectedMovie: IMovie = null;

  mounted() {
    this.$store.state.app.isLoading = true;
    this.$store
      .dispatch(FETCH_MOVIES, null, { root: true })
      .then(() => (this.$store.state.app.isLoading = false));
  }

  onSelected(movie: Movie): void {
    this.selectedMovie = movie;
  }

  edit(movie: Movie): void {
    this.$router.push({
      name: "create",
      params: { id: movie.movieId.toString() }
    });
  }

  remove(movie: Movie): void {
    this.$store.dispatch(DELETE_MOVIE, movie.movieId);
  }

  @Watch("selectedMovie")
  onSelectedMovieChange() {
    if (this.selectedMovie) {
      this.$store.dispatch(FETCH_EPISODES, this.selectedMovie.movieId);
    }
  }
}
</script>
