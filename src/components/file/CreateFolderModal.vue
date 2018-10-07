<template>
   <div class="card card-modal" :class="{'show animated flipInX': isShow}">
       <div class="card-header bg-danger">
           <p class="card-title">Create Folder <span @click="hide()" class="float-right"><i class="la la-close"></i></span></p>
       </div>
       <div class="card-body card-modal-content bg-light">
           <input placeholder="Folder name" class="form-control rounded-0" type="text" v-model="name"/>
       </div>
       <div class="card-footer">
           <button @click="submit" class="btn btn-info btn-sm"><i class="la la-plus"></i> Create</button>
       </div>
   </div>
</template>

<style scoped>
.card-modal {
  width: 260px !important;
  top: 20%;
  left: 50%;
}
</style>


<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import ModalComponent from "@/components/file/ModalComponent.vue";
import { FileService, ActionCommand } from "@/services/hyouka-api";
import { emit } from "cluster";
import { Prop } from "vue-property-decorator";

@Component
export default class CreateFolderModal extends ModalComponent {
  path: string = "";

  name: string = "";

  constructor() {
    super();
    this.isShow = true;
  }

  activated() {
    alert("a");
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

