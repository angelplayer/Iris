<template>
   <div id="myModal" class="ex-modal" :class="{'show': isShow}">
    <!-- Modal content -->
    <div class="ex-modal-content">
      <div class="ex-modal-header">
        <span @click="hide()" class="close">&times;</span>
        <h6 class="ex-modal-title">{{title}}</h6>
      </div>
      <div class="ex-modal-body">
        <img class="preview-img" :src="'http://localhost:5000/api/file?action=download&path=' + source" />
        <!-- TODO: Remove specific host -->
      </div>
    </div>
  </div>
</template>

<style>
/* The Modal (background) */
.show {
  display: block !important;
}
.ex-modal {
  display: none;
  position: fixed; /* Stay in place */
  z-index: 1500; /* Sit on top */
  padding-top: 100px; /* Location of the box */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0); /* Black w/ opacity */
}
.ex-modal-title {
  margin: 0;
}
/* Modal Content */
.ex-modal-content {
  position: relative;
  background-color: rgba(0, 0, 0);
  margin: auto;
  padding: 0;
  border: 1px solid #888;
  width: 65%;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  -webkit-animation-name: animatetop;
  -webkit-animation-duration: 0.4s;
  animation-name: animatetop;
  animation-duration: 0.4s;
}
.ex-modal-header {
  padding: 6px 16px;
  background-color: #1abcc2;
  color: white;
}
.ex-modal-body {
  padding: 0 0;
  width: auto;
  height: 100%;
  max-height: 600px;
  max-width: 1000px;
  overflow: auto;
}

/* Add Animation */
@-webkit-keyframes animatetop {
  from {
    top: -300px;
    opacity: 0;
  }
  to {
    top: 0;
    opacity: 1;
  }
}

@keyframes animatetop {
  from {
    top: -300px;
    opacity: 0;
  }
  to {
    top: 0;
    opacity: 1;
  }
}

/* The Close Button */
.close {
  color: white;
  float: right;
  font-size: 28px;
  margin-top: -5px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: #000;
  text-decoration: none;
  cursor: pointer;
}

.preview-img {
  max-width: 100%;
  max-height: 100%;
  display: block;
  margin: 0 auto;
}
</style>


<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";
import ModalComponent from "@/components/file/ModalComponent.vue";

@Component({
  components: {
    ModalComponent
  }
})
export default class ContentModal extends ModalComponent {
  source: string = "";

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
