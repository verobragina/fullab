<template>
  <section class="main-action" v-if="data">
    <div class="container">
      <div class="main-action__inner">
        <p class="main-action__text" v-html="data.text"></p>
        <div class="main-action__button">
          <base-button theme="green" @click="$modal.show('application-modal')">
            {{ data.button }}
          </base-button>
        </div>
        <p class="main-action__text main-action__text--bold visible-sm" v-html="data.textMobile"></p>
      </div>
    </div>
  </section>
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
export default class BlockMainAction extends mixins(PathMixin, Vue) {
  @Prop({required: true})
  data!: any
}
</script>

<style lang="scss" scoped>
@import "../../../assets/scss/helpers/_variables.scss";
@import "../../../assets/scss/helpers/_mixins.scss";

.main-action {
  position: relative;
  padding: 70px 0;
  background-color: $blue;

  @include tablet {
    padding: 35px 0;
  }

  @include phone {
    padding: 30px 0;
  }
}

.main-action__inner {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: $grid-column-gap;
  align-items: center;
  padding: 0 100px;

  @include tablet {
    grid-template-columns: 1fr;
    grid-row-gap: 40px;
    padding: 0;
  }

  @include phone {
    grid-row-gap: $grid-column-gap;
  }
}

.main-action__text {
  font-size: 32px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  color: $white;

  &--bold {
    font-weight: 500;
  }

  @include tablet {
    font-size: 24px;
    text-align: center;
  }

  @include phone {
    font-size: 14px;
    text-align: center;
  }
}

.main-action__button {
  display: flex;
  justify-content: flex-end;

  .button {
    width: fit-content;
  }

  @include tablet {
    justify-content: center;
  }
}

</style>
