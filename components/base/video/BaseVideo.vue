<template>
  <div class="base-video">
    <div class="base-video__card" :style="`background-image: url('${getApiPath(item.picture)}')`">
      <button class="base-video__btn" type="button" aria-label="Открыть видео" @click="$modal.show('video-modal')">
        <base-svg icon="play"/>
      </button>
    </div>
    <BaseModal name="video-modal" :isFull="true">
      <div class="base-video__modal">
        <video-player :src="item.link" v-if="item.link"/>
        <video-player :src="getApiPath(item.videoMp4)" v-else-if="item.videoMp4"/>
      </div>
    </BaseModal>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {Component, mixins, Prop} from "nuxt-property-decorator";
import {VideoElement} from "~/models/video";

//@ts-ignore

import VideoPlayer from 'nuxt-video-player'
import PathMixin from "~/mixins/path"
require('nuxt-video-player/src/assets/css/main.css')

@Component({
  components: {
    BaseSvg: () => import('~/components/base/svg/BaseSvg.vue'),
    BaseButton: () => import('~/components/base/button/BaseButton.vue'),
    BaseModal: () => import('~/components/base/modal/BaseModal.vue'),
    VideoPlayer
  },
})
export default class BaseVideo extends mixins(PathMixin, Vue)  {
  @Prop()
  item!: VideoElement
}
</script>

<style lang="scss" scoped>
@import "../../../assets/scss/helpers/_variables.scss";
@import "../../../assets/scss/helpers/_mixins.scss";

.base-video {
  width: 100%;
  height: 100%;
  min-height: 400px;
  display: flex;

  @media #{$tablet} {
    min-height: 336px;
  }

  @media #{$phone} {
    min-height: 240px;
  }
}

.base-video__card {
  position: relative;
  z-index: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  border-radius: 6px;
  overflow: hidden;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.2);
  }
}

.base-video__btn {
  display: block;
  padding: 0;
  border: 0;
  background: transparent;

  svg {
    display: block;
    width: 220px;
    height: 220px;

    @media #{$phone} {
      width: 165px;
      height: 165px;
    }
  }
}

.base-video__modal {
  width: 100%;
  max-width: 1143px;
  border-radius: 12px;
  overflow: hidden;
  margin: 0 auto;
}

</style>
