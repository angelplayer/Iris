<template>
  	<div class="main-panel">
				<div class="content">
					<div class="container-fluid">
						<h4 class="page-title">GENRE</h4>
						<div class="row">
							<div class="col-md-12">
								<div class="card">
									<div class="card-header">
										<div class="card-title">Genre</div>
										<div class="card-category">Darling in the franxx</div>
									</div>
									<div class="card-body">
										<div class="form">
											<div class="form-group from-show-notify row">
												<div class="col-lg-6 col-md-12 col-sm-12 mx-auto">
													 <label for="largeInput">New genre</label>
                          <input @keypress="onEnter" v-model="newGenre" type="text" class="form-control form-control-lg" id="largeInput" placeholder="New genre...">
												</div>
											</div>
                      <div class="form-group form-show-notify row">
                        <div class="col-md-12 mx-auto">
                          <p class="demo">
                            <button v-for="(genre, index) in genres" :key="index" class="btn btn-primary mx-1">
                              {{genre.genreId}}.{{genre.name}}
                              <i @click="remove(genre)" class="la la-close"></i>
                            </button>										    </p>
                        </div>
                      </div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
</template>


<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { IGenre, GenresService, Command6 } from "@/services/hyouka-api";
import { Getter } from "vuex-class";
import { ADD_GENRE, FETCH_GENRES } from "@/store/constant";

@Component({})
export default class GenreView extends Vue {
  @Getter("genres") genres: Array<IGenre>;
  newGenre: string = "";

  mounted() {
    this.$store.dispatch(FETCH_GENRES);
  }

  onEnter(event: KeyboardEvent) {
    if (event.keyCode == 13 && this.newGenre != "") {
      this.$store.dispatch(ADD_GENRE, new Command6({ name: this.newGenre }));
    }
  }
}
</script>
