<template>
       <div id="myModal" class="ex-modal" :class="{'show': isShow}">
    <!-- Modal content -->
    <div class="ex-modal-content">
      <div class="ex-modal-header">
        <span @click="hide()" class="close">&times;</span>
        <h6 class="ex-modal-title">New Folder</h6>
      </div>
      <div class="ex-modal-body">
        <input multiple ref="fileInput" @change="addFileToUpload($event)" type="file" placeholder="Folder name" class="control"/>
      </div>
      <div class="ex-modal-footer">
         <button @click="submit" class="button cool"><i class="fa fa-plus"></i> Create</button>
      </div>
    </div>
  </div>
</template>


<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import ModalComponent from "@/components/file/ModalComponent.vue";
import { EventEmitter } from "events";
import { FileService, FileUploadModel } from "@/services/hyouka-api";

@Component
export default class UploadFileModal extends ModalComponent {
  currentPath: string;
  files: FormData;

  constructor() {
    super();
    this.files = new FormData();
    console.log(this.files);
  }

  setPath(path: string) {
    this.currentPath = path;
  }

  addFileToUpload(event: Event) {
    let elem = event.target as HTMLInputElement;
    for (let i = 0; i < elem.files.length; i++) {
      this.files.append(`file-${i}`, elem.files[i]);
    }
  }

  submit() {
    let m = new FileUploadModel();
    m.destination = "/";
    new FileService().upload();
  }
}
</script>



<style scoped>
/* The Modal (background) */
.show {
  display: block !important;
}
.ex-modal {
  display: none;
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  padding-top: 100px; /* Location of the box */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
}
.ex-modal-title {
  margin: 0;
}
/* Modal Content */
.ex-modal-content {
  position: relative;
  background-color: #fefefe;
  margin: auto;
  padding: 0;
  border: 1px solid #888;
  width: 40%;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  -webkit-animation-name: animatetop;
  -webkit-animation-duration: 0.4s;
  animation-name: animatetop;
  animation-duration: 0.4s;
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

.ex-modal-header {
  padding: 6px 16px;
  background-color: #1abcc2;
  color: white;
}

.ex-modal-body {
  padding: 5px 16px;
}

.ex-modal-footer {
  padding: 5px 16px;
  /* background-color: #5cb85c; */
  color: white;
}
</style>