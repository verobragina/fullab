<template>
  <div class="base-gallery">
    <base-swiper class="base-gallery__swiper" ref="swiper" :gotoSlide="swiperIndex" @slideChange="setIndex"
                 :options="swiperOptions">
      <base-swiper-slide class="base-gallery__slide" v-for="(item, index) in data" :key="index">
        <img class="base-gallery__img" :src="item" alt="" aria-hidden="true" loading="lazy">
      </base-swiper-slide>
    </base-swiper>
    <div class="base-gallery__controls">
      <div class="container">
        <div class="base-gallery__control base-gallery__controls-prev">
          <base-svg icon="arrow-prev"/>
        </div>
        <div class="base-gallery__pagination swiper-pagination"></div>
        <div class="base-gallery__control base-gallery__controls-next">
          <base-svg icon="arrow-next"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, {ComponentOptions} from 'vue'
import {Component, Prop, Ref} from "nuxt-property-decorator";
import BaseSwiper from "~/components/base/swiper/BaseSwiper.vue";

@Component({
  components: {
    BaseSvg: () => import('~/components/base/svg/BaseSvg.vue'),
    BaseButton: () => import('~/components/base/button/BaseButton.vue'),
    BaseSwiper: () => import('~/components/base/swiper/BaseSwiper.vue'),
    BaseSwiperSlide: () => import('~/components/base/swiper/BaseSwiperSlide.vue'),
  },
})
export default class BaseGallery extends Vue implements ComponentOptions<Vue> {
  @Prop({default: 0})
  swiperIndex!: number

  @Prop()
  data!: Array<string>

  swiperOptions = {
    slidesPerView: 1,
    spaceBetween: 0,
    slidesPerGroup: 1,
    navigation: {
      nextEl: `.base-gallery__controls-next`,
      prevEl: `.base-gallery__controls-prev`,
    },
    pagination: {
      clickable: true,
      el: '.base-gallery .swiper-pagination'
    }
  }

  visible = false

  @Ref()
  swiper!: BaseSwiper

  setIndex() {
    this.$emit('change', this.swiper.swiper.activeIndex)
  }

}
</script>

<style lang="scss" scoped>
@import "../../../assets/scss/helpers/_variables.scss";
@import "../../../assets/scss/helpers/_mixins.scss";


.base-gallery {
  position: relative;
}

.base-gallery__slide {
  position: relative;
  z-index: 0;
  height: 560px;

  @media #{$tablet} {
    height: 430px;
  }

  @media #{$phone} {
    display: flex;
    align-items: flex-end;
    height: 300px;
  }
}

.base-gallery__img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}


.base-gallery__controls {
  position: absolute;
  bottom: 32px;
  left: 0;
  z-index: 2;
  width: 100%;

  @media #{$tablet} {
    bottom: 16px;
  }

  @media #{$phone} {

  }

  .container {
    display: flex;
    align-items: center;
    justify-content: space-between;

    @media #{$phone} {
      justify-content: center;
    }
  }
}

.base-gallery__control {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 48px;
  height: 48px;
  padding: 0;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.06);
  color: $blue;
  cursor: pointer;
  transition: $base-transition;

  @media #{$phone} {
    display: none;
  }

  @include hover {
    border: 2px solid $white;
  }

  svg {
    display: block;
    width: 24px;
    height: 24px;
  }
}

</style>
