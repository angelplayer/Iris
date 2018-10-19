<template>
   <nav aria-label="breadcrumb bg-none my-0">
        <ol class="breadcrumb bg-none my-0">
            <li v-for="(item, index) in data" :key="index" class="breadcrumb-item">
                <a @click.prevent="navigateTo(index)" href="#">{{item}}</a>
            </li>
        </ol>
        {{currentUrl}}
    </nav>
</template>



<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";

@Component
export default class Breadcrum extends Vue {
  @Prop()
  data: Array<string>;

  navigateTo(breadcrumIndex) {
    this.$emit("navigate", breadcrumIndex);
  }
}
</script>
