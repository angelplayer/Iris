<template>
    <div class="x-block text-center" :style="{display: loading? 'block': 'none'}">
        <div class="center">
            <i class="la la-circle-o-notch spin"></i>
            <h5 class="my-4 text-muted">Loading ...</h5>
        </div>
    </div>
</template>

<style scoped>
.x-block {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
  background: rgba(255, 255, 255, 1);
  z-index: 1500;
}

.center {
  margin-top: 40vh;
  font-size: 40px;
}

.spin {
  animation-name: spin;
  animation-duration: 600ms;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  -moz-animation-name: spin;
  -moz-animation-duration: 600ms;
  -moz-animation-iteration-count: infinite;
  -moz-animation-timing-function: linear;
  -ms-animation-name: spin;
  -ms-animation-duration: 600ms;
  -ms-animation-iteration-count: infinite;
  -ms-animation-timing-function: linear;
}

@-moz-keyframes spin {
  from {
    -moz-transform: rotate(0deg);
  }
  to {
    -moz-transform: rotate(360deg);
  }
}
@-webkit-keyframes spin {
  from {
    -webkit-transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(360deg);
  }
}
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>


<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { getters } from "@/store/app-state";
import { State } from "vuex-class";
import { Prop } from "vue-property-decorator";

@Component
export default class Loading extends Vue {
  @Prop()
  loading: boolean;
}
</script>

