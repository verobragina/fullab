<template>
  <section class="main-road" v-if="data">
    <div class="container">
      <div class="main-road__inner">
        <ul class="main-road__list">
          <li class="main-road__list-item"
              :class="[{[`main-road__list-item--reversed-${index + 1}`]: index + 1 === 3 || index + 1 === 4}]"
              :data-item="index + 1"
              v-for="(item, index) in data.list">
            <BlockRoadItem :item="item"
                           :num="item.isFinal ? 'check-result' : item.num"
                           :is-reversed="item.num === 2 || item.num === 3"
                           :is-final="item.isFinal"/>
          </li>
        </ul>
        <div class="main-road__bottom">
          <BlockRoadItem :item="data.personalRoad" num="*"
                         :is-reversed="true"
                         :is-personal="true"/>
          <div class="main-road__button">
            <base-button theme="green" @click="$modal.show('application-modal')">
              {{ data.button }}
            </base-button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import {Component, mixins, Prop} from "nuxt-property-decorator"
import PathMixin from "~/mixins/path";
import BlockRoadItem from "~/components/blocks/road/BlockRoadItem.vue";

@Component({
  components: {
    BlockRoadItem,
    BaseSvg: () => import('~/components/base/svg/BaseSvg.vue'),
    BaseButton: () => import('~/components/base/button/BaseButton.vue'),
  },
})
export default class BlockMainRoad extends mixins(PathMixin, Vue) {
  @Prop({required: true})
  data!: any
}
</script>

<style lang="scss" scoped>
@import "../../../assets/scss/helpers/_variables.scss";
@import "../../../assets/scss/helpers/_mixins.scss";

.main-road {
  position: relative;
  padding: 90px 0 130px;
  background-color: $blue;

  @include tablet {
    padding: 70px 0;
  }

  @include phone {
    padding: 30px 0;
  }
}

.main-road__inner {
  padding: 0 110px;

  @media (max-width: 1199px) {
    padding: 0;
  }
}

.main-road__list {
  @include list-reset;
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 24%;
  grid-row-gap: 60px;

  @media (max-width: 1199px) {
    grid-column-gap: 15%;
  }

  @include tablet {
    grid-template-columns: 1fr;
    grid-row-gap: 40px;
    grid-column-gap: unset;

    &:before {
      content: "";
      position: absolute;
      top: 0;
      right: 45px;
      width: 4px;
      height: calc(100% + 90px);
      border-right: 4px dashed $green;
    }
  }

  @include phone {
    grid-row-gap: 20px;

    &:before {
      content: "";
      position: absolute;
      top: 0;
      right: 23px;
      width: 2px;
      height: calc(100% + 70px);
      border-right: 2px dashed $green;
    }
  }
}

.main-road__list-item {
  position: relative;

  &--reversed-3 {
    grid-column: 2/3;
    grid-row: 2/3;

    @include tablet {
      grid-column: unset;
      grid-row: unset;
    }
  }

  &--reversed-4 {
    grid-column: 1/2;
    grid-row: 2/3;

    @include tablet {
      grid-column: unset;
      grid-row: unset;
    }
  }

  &[data-item='1'],
  &[data-item='4'],
  &[data-item='5'] {
    &:before {
      content: "";
      position: absolute;
      top: 45px;
      right: 0;
      transform: translateX(100%);
      width: 20vw;
      max-width: 320px;
      min-width: 0;
      height: 4px;
      border-bottom: 4px dashed $green;

      @media (max-width: 1199px) {
        width: 15vw;
      }

      @include tablet {
        display: none;
      }
    }
  }

  &[data-item='2'] {
    &:before {
      content: "";
      position: absolute;
      top: 0;
      left: 45px;
      width: 4px;
      height: 230px;
      border-right: 4px dashed $green;

      @include tablet {
        display: none;
      }
    }
  }

  &[data-item='4'] {
    &:after {
      content: "";
      position: absolute;
      top: 0;
      right: 45px;
      width: 4px;
      height: 350px;
      border-right: 4px dashed $green;

      @include tablet {
        display: none;
      }
    }
  }
}

.main-road__bottom {
  display: grid;
  grid-template-columns: 1fr max-content;
  grid-column-gap: 8%;
  align-items: center;
  margin-top: 68px;

  @include tablet {
    grid-template-columns: 1fr;
    grid-column-gap: unset;
    grid-row-gap: 40px;
    margin-top: 40px;
  }

  @include phone {
    margin-top: 20px;
  }
}

.main-road__button {
  .button {
    width: fit-content;
  }

  @include tablet {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

</style>
