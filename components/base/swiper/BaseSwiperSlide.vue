<template>
  <div :class="slideClass">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import Vue, {ComponentOptions} from "vue";
import {Component} from "nuxt-property-decorator";

@Component
export default class BaseSwiperSlide extends Vue implements ComponentOptions<Vue> {
  slideClass = 'swiper-slide'

  mounted() {
    this.update()
    // @ts-ignore
    if (this.$parent && this.$parent.options && this.$parent.options.slideClass) {
      // @ts-ignore
      this.slideClass = this.$parent.options.slideClass
    }
  }

  activated() {
    this.update()
  }

  updated() {
    this.update()
  }

  update() {
    // @ts-ignore
    if (this.$parent && this.$parent.swiper) {
      // @ts-ignore
      this.$parent.update()
    }
  }
}
</script>

<style lang="scss" scoped>
.swiper-slide {
  background-size: cover;
}
</style>
