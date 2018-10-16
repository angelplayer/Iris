<template>
       <div id="myModal" class="ex-modal" :class="{'show': isShow}">
    <!-- Modal content -->
    <div class="ex-modal-content">
      <div class="ex-modal-header">
        <span @click="hide()" class="close">&times;</span>
        <h6 class="ex-modal-title">New Folder</h6>
      </div>
      <div class="ex-modal-body">
        <div class="file-list">
          <ul class="list-group list-group-flush w-100">
          <li class="list-group-item" v-for="(item, index) in files" :key="index">
            <span class="fa fa-file fa-2x"></span>
            <span class="pl-3">{{item.name}}</span>
          </li>
        </ul>
        </div>
        <div class="input-box">
          <label class="input-box-text">Attach files</label>
          <input multiple ref="fileInput" @change="addFileToUpload($event)" type="file" placeholder="Folder name" class="file-input"/>
        </div>
      </div>
      <div class="ex-modal-footer">
         <button @click="submit" class="button cool"><i class="fa fa-plus"></i>Upload</button>
      </div>
    </div>
  </div>
</template>


<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import ModalComponent from "@/components/file/ModalComponent.vue";
import { EventEmitter } from "events";
import { FileService, FileParameter } from "@/services/hyouka-api";
import { resolve } from "url";

@Component
export default class UploadFileModal extends ModalComponent {
  currentPath: string;
  files: Array<File>;

  constructor() {
    super();
    this.files = new Array<File>(0);
  }

  setPath(path: string) {
    this.currentPath = path;
  }

  addFileToUpload(event: Event) {
    let elem = event.target as HTMLInputElement;

    return new Promise((resolve, reject) => {
      for (let index = 0; index < elem.files.length; index++) {
        this.files.push(elem.files.item(index));
      }
      resolve();
    }).then(() => {
      elem.value = null;
    });
  }

  submit() {
    var files = this.files.map((file, index) => {
      return <FileParameter>{ fileName: file.name, data: file };
    });

    return new Promise((resovle, reject) => {
      return new FileService()
        .upload(this.currentPath, files)
        .then(envelope => resovle(envelope.result))
        .catch(e => reject(e))
        .finally(() => {
          this.$emit("submit");

          this.files = [];
          this.hide();
        });
    });
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
.input-box {
  position: relative;
  width: 100%;
  height: 50px;
  background-color: rgba(100, 148, 237, 0.2);
  border: 1px dashed gray;
}
.input-box-text {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100;
  text-align: center;
  margin: 0;
  padding: 15px 0;
}
.file-input {
  position: absolute;
  opacity: 0;
  width: 100%;
  height: 100%;
  z-index: 110;
  top: 0;
  left: 0;
}

.file-list {
  max-height: 300px;
  overflow-y: auto;
}

.list-group-item {
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