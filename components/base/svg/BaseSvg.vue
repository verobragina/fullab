<template>
  <svg-icon v-if="icon" :name="icon" width="24" height="24" />
</template>

<script lang="ts">
import Vue from "vue";
import {Component, Prop} from "nuxt-property-decorator";

@Component
export default class BaseSvg extends Vue {
  @Prop({required: true})
  icon!: string
}
</script>

<style lang="scss">

.base-icon {
  display: block;
}
</style>
