<template>
  <div class="road-item" :class="itemClasses">
    <div class="road-item__info">
      <span class="road-item__name" v-html="item.name"></span>
      <p class="road-item__text" v-html="item.text"></p>
    </div>
    <div class="road-item__num" :class="{'road-item__num--centered': isPersonal}">
      <no-ssr>
        <span v-html="num" v-if="!isFinal"></span>
        <template v-else>
          <base-svg icon="check-result"/>
        </template>
      </no-ssr>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {Component, mixins, Prop} from "nuxt-property-decorator"
import PathMixin from "~/mixins/path";

@Component({
  components: {
    BaseSvg: () => import('~/components/base/svg/BaseSvg.vue'),
    BaseButton: () => import('~/components/base/button/BaseButton.vue'),
  },
})
export default class BlockMainRoad extends mixins(PathMixin, Vue) {
  @Prop({required: true})
  item!: any

  @Prop({required: true})
  num!: string

  @Prop({default: false})
  isFinal?: boolean

  @Prop({default: false})
  isPersonal?: boolean

  @Prop({default: false})
  isReversed?: boolean

  get itemClasses() {
    return {
      'road-item--reversed': this.isReversed,
      'road-item--final': this.isFinal,
      'road-item--personal': this.isPersonal,
    }
  }

}
</script>

<style lang="scss" scoped>
@import "../../../assets/scss/helpers/variables";
@import "../../../assets/scss/helpers/mixins";

.road-item {
  position: relative;
  display: grid;
  grid-template-columns: 1fr 94px;
  grid-column-gap: 20px;
  z-index: 1;

  &--reversed {
    grid-template-columns: 94px 1fr;

    .road-item__info {
      grid-column: 2/3;
      grid-row: 1/2;
    }

    .road-item__num {
      grid-column: 1/2;
      grid-row: 1/2;
    }
  }

  &--final {
    background-color: $green;
    padding: 23px 40px 23px 26px;
    grid-template-columns: 46px 1fr;
    grid-column-gap: 30px;
    align-items: center;
    margin-top: -40px;

    .road-item__info {
      grid-column: 2/3;
      grid-row: 1/2;
    }

    .road-item__name {
      color: $dark-blue;
    }

    .road-item__text {
      color: $dark-blue;
    }

    .road-item__num {
      grid-column: 1/2;
      grid-row: 1/2;
      background-color: unset;
      width: unset;
      height: unset;
    }

    @include tablet {
      grid-template-columns: 1fr 94px;
      margin-top: unset;
      margin-left: -36px;
      margin-right: -36px;
      padding: 36px;
    }

    @include phone {
      grid-template-columns: 1fr 40px!important;
      grid-column-gap: 10px !important;
      margin-left: -30px;
      margin-right: -30px;
      padding: 15px 30px;
    }
  }

  &--personal {
    align-items: center;
  }

  @include tablet {
    grid-template-columns: 1fr 94px;
    grid-column-gap: 40px;

    .road-item__info {
      grid-column: 1/2;
      grid-row: 1/2;
    }

    .road-item__num {
      grid-column: 2/3;
      grid-row: 1/2;
    }
  }

  @include phone {
    grid-template-columns: 1fr 50px;
  }
}

.road-item__info {
  display: flex;
  flex-direction: column;
  margin-top: -18px;

  @include phone {
    margin-top: -6px;
    gap: 3px;
  }
}

.road-item__name {
  display: block;
  font-family: $font-family-secondary;
  font-size: 54px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  text-transform: uppercase;
  color: $white;

  @include phone {
    font-size: 24px;
  }
}

.road-item__text {
  font-size: 20px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  color: $white;

  @include phone {
    font-size: 14px;
  }
}

.road-item__num {
  position: relative;
  width: 94px;
  height: 94px;
  background-color: $green;

  span {
    position: absolute;
    top: calc(50% - 5px);
    left: 50%;
    transform: translate(-50%, -50%);
    font-family: $font-family-secondary;
    font-size: 82px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    text-align: center;
    color: $white;
  }

  &--centered {
    span {
      top: calc(50% + 20px);
      font-size: 128px;

      @include phone {
        top: calc(50% + 8px);
        font-size: 64px;
      }
    }
  }

  svg {
    display: block;
    width: 46px;
    height: 46px;
    margin: 0 auto;
  }

  @include phone {
    width: 50px;
    height: 50px;

    span {
      font-size: 48px;
    }

    svg {
      width: 30px;
      height: 30px;
    }
  }
}

</style>
