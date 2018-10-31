<template>
    <div class="elipse">
        <button class="elipse-btn" :class="button"><i :class="icon"></i>{{text}}</button>
        <div class="elipse-content">
            <a v-for="(item, index) in content" @click="handle(item)" :key="index">{{item.name}}</a>
        </div>
    </div>
</template>



<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";

@Component
export default class ElipseButton extends Vue {
  @Prop({ default: "" })
  text: string;
  @Prop()
  content: Array<{ name; handler }>;

  @Prop()
  button: string;
  @Prop()
  icon: string;

  @Prop()
  params: any;

    handle(target) {
        target.handle();
    }

}
</script>

<style scoped>
.elipse {
  position: relative;
  display: inline-block;
}

.elipse-content {
  display: none;
  position: absolute;
  right: 0;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
}
.elipse-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

.elipse-content a:hover {
  background-color: #f1f1f1;
}

.elipse:hover .elipse-content {
  display: block;
}

.elipse:hover .elipse-btn {
  background-color: #3e8e41;
}
</style>

