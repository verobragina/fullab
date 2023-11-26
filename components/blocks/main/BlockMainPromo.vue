<template>
  <section class="main-promo" v-if="data">
    <div class="container">
      <div class="main-promo__inner">
        <h1 class="main-promo__title" v-html="data.name"/>
        <p class="main-promo__text" v-html="data.text"></p>
        <p class="main-promo__text visible-sm" v-html="data.textMobile"></p>
        <div class="main-promo__button hidden-sm">
          <base-button theme="green" @click="$modal.show('application-modal')">
            {{ data.button }}
          </base-button>
        </div>
        <p class="main-promo__subtext hidden-sm" v-html="data.subtext"></p>
      </div>
    </div>
    <div class="main-promo__picture">
      <picture>
        <source srcset="/assets/images/promo/bg_mobile.svg" media="(max-width: 1024px)">
        <img src="/assets/images/promo/bg.png" alt="Fullab">
      </picture>
    </div>
  </section>
</template>

<script lang="ts">
import Vue, {ComponentOptions} from 'vue'
import {Component, mixins, Prop} from "nuxt-property-decorator"
import {BannerElement} from "~/models/banner";
import PathMixin from "~/mixins/path";

@Component({
  components: {
    BaseSvg: () => import('~/components/base/svg/BaseSvg.vue'),
    BaseButton: () => import('~/components/base/button/BaseButton.vue'),
  },
})
export default class BlockMainPromo extends mixins(PathMixin, Vue) implements ComponentOptions<Vue> {
  @Prop({required: true})
  data!: BannerElement
}
</script>

<style lang="scss" scoped>
@import "../../../assets/scss/helpers/_variables.scss";
@import "../../../assets/scss/helpers/_mixins.scss";

.main-promo {
  position: relative;
  padding-top: 12px;
  padding-bottom: 24px;
  min-height: 890px;

  @include tablet {
    min-height: 650px;
  }

  @include phone {
    padding-top: 10px;
    min-height: 460px;
  }
}

.main-promo__title {
  font-family: $font-family-secondary;
  font-size: 92px;
  font-style: normal;
  font-weight: 600;
  line-height: 108%;
  color: $blue;

  @include tablet {
    font-size: 54px;
  }

  @include phone {
    font-size: 30px;
  }
}

.main-promo__picture {
  position: absolute;
  right: 0;
  bottom: -77px;
  width: 55.625vw;
  max-width: 801px;
  height: 67.083vw;
  max-height: 966px;
  z-index: -1;

  img {
    @include contain-img;

    @include phone {
      @include cover-img;
      object-position: top;
    }
  }

  @include phone {
    width: 100vw;
    height: 295px;
    max-width: unset;
    max-height: unset;
    right: unset;
    bottom: 0;
  }
}

.main-promo__inner {
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 794px;
  padding-top: 154px;

  @include tablet {
    padding-top: 50px;
  }

  @include phone {
    padding-top: 0;
  }
}

.main-promo__text {
  font-size: 32px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  max-width: 764px;
  margin: 44px 0 78px;

  @include tablet {
    font-size: 24px;
    margin: 44px 0 0;
    max-width: 500px;
  }

  @include phone {
    font-size: 14px;
    margin: 11px 0 0;
    max-width: unset;
  }
}

.main-promo__button {
  display: flex;
  justify-content: center;

  .button {
    width: fit-content;
  }
}

.main-promo__subtext {
  font-size: 34px;
  font-style: normal;
  font-weight: 500;
  line-height: 100%;
  letter-spacing: 0.17px;
  color: $green;
  margin-top: 58px;
}

</style>
