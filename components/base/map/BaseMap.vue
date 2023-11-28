<template>
  <div class="base-map" v-if="data">
    <no-ssr>
      <yandex-map
        :coords="data.coordinates"
        :zoom="zoom ? zoom: 16"
        @map-was-initialized="onLoading($event)" ref="map">
        <ymap-marker
          :showAllMarkers="true"
          :marker-id="data.id"
          :coords="data.coordinates"
          :icon="{
                  layout: 'default#image',
                  // imageHref: '/assets/images/pin.svg',
                  imageSize: size,
                  imageOffset: offset,
                }"
          cluster-name="1"
        />
      </yandex-map>
    </no-ssr>
  </div>
</template>

<script lang="ts">

import Vue from "vue"
// @ts-ignore
import { loadYmap } from 'vue-yandex-maps'
import { Component, mixins, Prop } from "nuxt-property-decorator"
import DetectorMixin from "~/mixins/detector"

@Component
export default class BaseMap extends mixins(DetectorMixin, Vue) {
  @Prop()
  data!: any

  @Prop()
  zoom?: number

  mapObject: any = null

  get size() {
    if (this.isMobile) {
      return [18, 22]
    }
    return [36, 42]
  }

  get offset() {
    if (this.isMobile) {
      return [-9, -11]
    }
    return [-18, -21]
  }

  onLoading(map: any) {
    const self = this;
    self.mapObject = map;
    setTimeout(() => {
      if (self.data.length > 1 && !self.zoom) {
        self.mapObject.setBounds(map.geoObjects.getBounds())
      }
    }, 500)
  }

  async mounted() {

  }
};
</script>

<style lang="scss">
@import "../../../assets/scss/helpers/variables";
@import "../../../assets/scss/helpers/mixins";

.base-map {
  margin: 0 auto;
  height: 100%;
  overflow: hidden;
}

.balloon {

}

.balloon__text {
  max-width: 270px;
  min-height: 84px;
  margin-bottom: 13px;
  padding-right: 42px;
  font-weight: 400;
  font-size: 16px;
  line-height: 120%;

  @media #{$phone} {
    min-height: auto;
    font-size: 14px;
  }
}

.balloon__bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.balloon__link {
  display: inline-flex;
  padding: 0;
  font-weight: 500;
  font-size: 12px;
  line-height: 15px;
  text-decoration-line: underline;
  color: #333332;
  border: 0;
  background: transparent;
}

</style>
