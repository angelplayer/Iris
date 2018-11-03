<template>
   <div id="myModal" class="ex-modal" :class="{'show': isShow}">
    <!-- Modal content -->
    <div class="ex-modal-content">
      <div class="ex-modal-header">
        <span @click="hide()" class="close">&times;</span>
        <h6 class="ex-modal-title">{{title}}</h6>
      </div>
      <div class="ex-modal-body">
        <input placeholder="Folder name" class="control" type="text" v-model="name"/>
      </div>
      <div class="ex-modal-footer">
         <button @click="submit" class="button cool"><i class="fa fa-plus"></i> Create</button>
      </div>
    </div>
  </div>
</template>

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


<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import ModalComponent from "@/components/file/ModalComponent.vue";
import { FileService, ActionCommand } from "@/services/hyouka-api";
import { Prop } from "vue-property-decorator";

@Component
export default class CreateFolderModal extends ModalComponent {
  path: string = "";

  name: string = "";

  constructor() {
    super();
    this.isShow = false;
  }

  setPath(path: string) {
    this.path = path;
  }

  reset() {
    this.hide();
    this.path = "";
    this.name = "";
  }

  submit() {
    if (this.name === "") return;

    return new Promise((resolve, reject) => {
      return new FileService()
        .fileAction(
          new ActionCommand({
            action: "createFolder",
            newPath: this.path + this.name
          })
        )
        .then(envelope => {
          resolve(envelope.result);
        })
        .catch(e => reject(e))
        .finally(() => {
          this.$emit("submit");
          this.reset();
        });
    });
  }
}
</script>

