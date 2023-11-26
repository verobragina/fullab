<template>
  <div class="base-collapse">
    <v-collapse-wrapper ref="wrapper">
      <button class="base-collapse__trigger"
              :class="{active : isClickCollapse}"
              @click="isClickCollapse=!isClickCollapse"
              v-collapse-toggle>
        <span v-html="item.name"
              class="base-collapse__title"
        />
      </button>
      <div class="base-collapse__content" v-collapse-content>
        <div class="base-collapse__inner" v-html="item.text"></div>
      </div>
    </v-collapse-wrapper>
  </div>

</template>

<script lang="ts">
import {Component, mixins, Prop} from "nuxt-property-decorator";
import Vue from "vue";
/** @ts-ignore */
import VueCollapse from 'vue2-collapse'
import {CollapseElement} from "~/models/collapse";

Vue.use(VueCollapse)

@Component({
  components: {
    VueCollapse,
    BaseSvg: () => import('../../../components/base/svg/BaseSvg.vue')
  }
})

export default class BaseCollapse extends mixins(Vue) {
  @Prop()
  item!: CollapseElement

  @Prop({default: false})
  initialOpen?: boolean

  isClickCollapse: boolean = false

  open() {
    if (this.$refs.wrapper) {
      /** @ts-ignore */
      this.$refs.wrapper.open()
    }
  }

  mounted() {
    if (this.initialOpen) {
      this.isClickCollapse = true
      this.open()
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../../assets/scss/helpers/_variables.scss";
@import "../../../assets/scss/helpers/_mixins.scss";

.base-collapse {
  position: relative;
  width: 100%;
  z-index: 0;
  margin-bottom: 0;
  transition: $base-transition;

  .v-collapse {
    width: 100%;
  }

  .v-collapse-content {
    overflow: hidden;
    position: relative;
    top: -1px;
    z-index: 2;
    transition: max-height 0.3s ease;
    max-height: 0;

    &-end {
      max-height: 1000px;
    }
  }

  .vc-collapse {
    width: 100%;

    &--active {
      border-bottom: none;
    }

    @media (max-width: 1023px) {
      width: 100%;
    }
  }
}

.base-collapse__trigger {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: $grid-column-gap;
  width: 100%;
  border: 0;
  padding: 0;
  background-color: transparent;
  font-family: $font-family-secondary;
  font-size: 32px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  text-transform: uppercase;
  color: $green;
  text-align: left;

  @include tablet {
    font-size: 24px;
  }

  @include phone {
    font-size: 16px;
  }

  &.active {
    &::after {
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='26' height='7' viewBox='0 0 26 7' fill='none'%3E%3Cg filter='url(%23filter0_d_517_687)'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M23.0918 4.54594H-4.32139e-05L-4.37196e-05 0.545942H23.0918L23.0918 4.54594Z' fill='%2304E586'/%3E%3C/g%3E%3Cdefs%3E%3Cfilter id='filter0_d_517_687' x='-6.10352e-05' y='0.545898' width='25.0919' height='6' filterUnits='userSpaceOnUse' color-interpolation-filters='sRGB'%3E%3CfeFlood flood-opacity='0' result='BackgroundImageFix'/%3E%3CfeColorMatrix in='SourceAlpha' type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0' result='hardAlpha'/%3E%3CfeOffset dx='2' dy='2'/%3E%3CfeComposite in2='hardAlpha' operator='out'/%3E%3CfeColorMatrix type='matrix' values='0 0 0 0 0.0941176 0 0 0 0 0.196078 0 0 0 0 0.356863 0 0 0 1 0'/%3E%3CfeBlend mode='normal' in2='BackgroundImageFix' result='effect1_dropShadow_517_687'/%3E%3CfeBlend mode='normal' in='SourceGraphic' in2='effect1_dropShadow_517_687' result='shape'/%3E%3C/filter%3E%3C/defs%3E%3C/svg%3E");
    }
  }

  &::after {
    content: "";
    display: block;
    flex-shrink: 0;
    width: 28px;
    height: 28px;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='27' height='27' viewBox='0 0 27 27' fill='none'%3E%3Cg clip-path='url(%23clip0_365_694)'%3E%3Cg filter='url(%23filter0_d_365_694)'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M15.5 11.5V1.9541H11.5V11.5H1.95407V15.5H11.5V25.046H15.5V15.5H25.046V11.5H15.5Z' fill='%2304E586'/%3E%3C/g%3E%3C/g%3E%3Cdefs%3E%3Cfilter id='filter0_d_365_694' x='1.95407' y='1.9541' width='25.0919' height='25.0919' filterUnits='userSpaceOnUse' color-interpolation-filters='sRGB'%3E%3CfeFlood flood-opacity='0' result='BackgroundImageFix'/%3E%3CfeColorMatrix in='SourceAlpha' type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0' result='hardAlpha'/%3E%3CfeOffset dx='2' dy='2'/%3E%3CfeComposite in2='hardAlpha' operator='out'/%3E%3CfeColorMatrix type='matrix' values='0 0 0 0 0.0941176 0 0 0 0 0.196078 0 0 0 0 0.356863 0 0 0 1 0'/%3E%3CfeBlend mode='normal' in2='BackgroundImageFix' result='effect1_dropShadow_365_694'/%3E%3CfeBlend mode='normal' in='SourceGraphic' in2='effect1_dropShadow_365_694' result='shape'/%3E%3C/filter%3E%3CclipPath id='clip0_365_694'%3E%3Crect width='27' height='27' fill='white'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E");
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
    transition: $base-transition;

    @include phone {
      width: 14px;
      height: 14px;
    }
  }
}

.base-collapse__inner {
  padding: 29px 0 0;
  font-family: $font-family-secondary;
  font-size: 32px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  text-transform: uppercase;
  text-align: end;
  color: $blue;
  margin-left: auto;
  max-width: 655px;

  @media #{$tablet} {
    font-size: 24px;
    padding-left: 0;
  }

  @media #{$phone} {
    padding: 12px 0 0;
    font-size: 14px;
  }

  p + p {
    margin-top: 20px;
  }

  ::v-deep ul {
    display: grid;
    grid-template-columns: 1fr;
    grid-row-gap: 25px;
    list-style-position: inside;
    list-style-type: square;

    & li {
      &::marker {
        font-size: 20px;
        text-align: center!important;

        @include phone {
          font-size: 14px;
        }
      }
    }

    @include phone {
      grid-row-gap: 12px;
    }
  }
}

</style>
