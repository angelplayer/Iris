<template>
    <div class="card">
       <div class="card-body">
         <div class="card-header">
            <h6 class="card-text">New Episode</h6>
         </div>
         <div class="form-group row">
           <label class="col-md-4">Episode Number</label>
           <div class="col-md-4">
             <input class="form-control" v-model="newEpisode.number" placeholder="eg. Ep.11">
           </div>
         </div>
        <div class="form-group row">
          <label class="col-md-4">Episode Name:</label>
          <div class="col-md-8">
            <input class="form-control" v-model="newEpisode.name" placeholder="eg. The School">
          </div>
        </div>
        <div class="form-group row">
          <label class="col-md-4">Media:</label>
          <label for="" class="col-md-8">
              <button @click="chooseFile()" class="btn btn-info w-100 py-1">{{getMediaName}}</button>
          </label>
        </div>
        <div class="form-group">
          <button @click="upload()" class="btn btn-primary "><i></i>Upload</button>
        </div>
       </div>
       <modal-component ref="explorer" vWidth="1000" vHeight="500">
          <angel-explorer pickable="true" @onpick="onpickFile"/>
        </modal-component>
    </div>
</template>


<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { EpisodeData } from "@/services/hyouka-api";
import { CREATE_EPISODE } from "@/store/constant";
import { Prop } from "vue-property-decorator";
import ModalComponent from "@/components/commons/ModalComponent.vue";
import AngelExplorer from "@/components/file/AngelExplorer.vue";

@Component({
  components: {
    AngelExplorer,
    ModalComponent
  }
})
export default class Uploader extends Vue {
  newEpisode: EpisodeData = new EpisodeData({ file: "", name: "" });

  @Prop({ required: true })
  movieId: number;

  chooseFile(): void {
    let explorer = this.$refs.explorer as ModalComponent;
    explorer.show();
  }

  onpickFile(content) {
    this.newEpisode.file = content.path;
    let explorer = this.$refs.explorer as ModalComponent;
    explorer.hide();
  }

  upload(): void {
    this.$store
      .dispatch(CREATE_EPISODE, {
        episode: this.newEpisode,
        movieId: this.movieId
      })
      .then(() => {
        this.newEpisode.init({});
      });
  }

  close(): void {
    this.newEpisode.init({});
    this.$emit("click");
  }

  get getMediaName() {
    return this.newEpisode.file ? this.newEpisode.file : "SELECT FILE";
  }
}
</script>
