

<template>
   <div class="card card-modal" :class="{'show animated jackInTheBox': isShow}">
       <div class="card-header bg-info">
           <p class="card-title">File Name <span @click="hide()" class="float-right"><i class="la la-close"></i></span></p>
       </div>
       <div class="card-body card-modal-content bg-light px-0 py-0">
            <img class="preview-img" :src="'http://localhost:5000/api/file?action=download&path=' + source" />
       </div>
   </div>
</template>


<style>
.card-modal {
  visibility: hidden;
  margin-top: 5%;
  margin-left: auto;
  margin-right: auto;
  position: fixed;
  top: 0;
  z-index: 1100;
  width: 100%;
  max-width: 800px;
}
.card-modal-content {
  max-height: 400px;
  display: flex;
}
.preview-img {
  height: 100%;
  width: auto;
  margin-left: auto;
  margin-right: auto;
}
.show {
  visibility: visible;
}
</style>


<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";

@Component
export default class ContentModal extends Vue {
  @Prop({ type: String, required: false })
  source: string;

  isShow: boolean = false;

  show(source?: string) {
    if (source) {
      this.source = source;
    }
    this.isShow = true;
  }

  hide() {
    this.isShow = false;
  }
}
</script>
