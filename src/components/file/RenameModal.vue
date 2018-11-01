<template>
   <div id="myModal" class="ex-modal" :class="{'show': isShow}">
    <!-- Modal content -->
    <div class="ex-modal-content">
      <div class="ex-modal-header">
        <span @click="hide()" class="close">&times;</span>
        <h6 class="ex-modal-title">Rename</h6>
      </div>
      <div class="ex-modal-body">
        <input class="control" type="text" v-model="itemName"/>
      </div>
      <div class="ex-modal-footer">
         <button @click="submit" class="button cool"><i class="fa fa-plus"></i>Save Change</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import ModalComponent from "@/components/file/ModalComponent.vue";
import Component from "vue-class-component";
import { FileService, ActionCommand } from "@/services/hyouka-api";

@Component
export default class RenameModal extends ModalComponent {
  oldName: string;
  itemName: string;
  currentPath = null;

  constructor() {
    super();
    this.isShow = false;
  }

  rename(currentPath, fileName) {
    this.currentPath = currentPath;
    this.oldName = fileName;
    this.itemName = this.oldName;
  }

  reset() {
    this.hide();
    this.oldName = "";
    this.itemName = "";
    this.currentPath = null;
  }

  submit() {
    new FileService()
      .fileAction(
        new ActionCommand({
          action: "rename",
          item: this.currentPath + this.oldName,
          newItemPath: this.currentPath + this.itemName
        })
      )
      .then(e => {
        this.$emit("submit", e.result);
      })
      .catch(e => console.log(e))
      .finally(() => {
        this.reset();
      });
  }
}
</script>
