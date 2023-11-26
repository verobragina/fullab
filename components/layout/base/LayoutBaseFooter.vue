<template>
  <footer class="page__footer footer">
    <div class="container">
      <div class="footer__inner">
        <div class="footer__top">
          <nuxt-link to="/" class="footer__logo">
            <base-svg icon="logo-lg"/>
          </nuxt-link>
          <div class="footer__socials">
            <a class="footer__socials-item" :href="item.link" v-for="item in $store.state.base.socials">
              <base-svg :icon="item.code"/>
            </a>
          </div>
        </div>
        <a href="#" class="footer__link">
          <span>made by Advanced Solutions</span>
        </a>
      </div>
    </div>
  </footer>
</template>

<script lang="ts">
import Vue from 'vue'
import {Component, mixins} from "nuxt-property-decorator";
import DetectorMixin from "../../../mixins/detector";
import {SocialsElement} from "~/models/socials";

@Component({
  components: {
    BaseSvg: () => import('~/components/base/svg/BaseSvg.vue'),
    BaseButton: () => import('~/components/base/button/BaseButton.vue'),
  },
})
export default class LayoutBaseFooter extends mixins(DetectorMixin, Vue) {
  socials: Array<SocialsElement> = [{"code": "vk", "link": "#"}, {"code": "wa", "link": "#"}, {
    "code": "tg",
    "link": "#"
  }]

}
</script>

<style lang="scss" scoped>
@import "../../../assets/scss/helpers/_variables.scss";
@import "../../../assets/scss/helpers/_mixins.scss";

.footer {
  padding: 78px 0;
  background-color: $blue;

  @include tablet {
    padding: 40px 0;
  }

  @include phone {
    padding: 20px 0 40px;
  }
}

.footer__inner {
  display: grid;
  grid-template-columns: 1fr;
  grid-row-gap: 6px;

  @include tablet {
    grid-row-gap: 40px;
  }

  @include phone {
    grid-row-gap: 20px;
  }
}

.footer__top {
  display: grid;
  grid-template-columns: 320px 1fr;
  grid-column-gap: $grid-column-gap;
  align-items: center;

  @include tablet {
    grid-template-columns: 1fr;
    grid-row-gap: 40px;
    justify-items: center;
  }

  @include phone {
    grid-row-gap: 20px;
  }
}

.footer__logo {
  display: block;
  width: 320px;
  height: 124px;

  svg {
    width: 100%;
    height: 100%;
  }

  @include tablet {
    width: 180px;
    height: 72px;
  }

  @include phone {
    width: 122px;
    height: 47px;
  }
}

.footer__socials {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 50px;

  @include tablet {
    gap: 40px;
    justify-content: center;
  }
}

.footer__socials-item {
  display: block;
  width: 62px;
  height: 62px;
  color: $white;
  transition: $base-transition;

  svg {
    width: 100%;
    height: 100%;
  }

  @include hover {
    color: $green;
  }

  @include tablet {
    width: 33px;
    height: 33px;
  }
}

.footer__link {
  display: block;
  text-align: center;
  font-family: $font-family-secondary;
  font-size: 36px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  color: $white;
  transition: $base-transition;

  @include hover {
    color: $green;
  }

  @include tablet {
    font-size: 24px;
  }

  @include phone {
    font-size: 14px;
  }
}

</style>
