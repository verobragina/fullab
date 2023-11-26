<template>
  <main class="error-page">
    <div class="container">
      <h1 class="error-page__title">404</h1>
      <p class="error-page__subtitle">Страница не найдена</p>
      <div class="error-page__controls">
        <base-button raw-link="/" theme="green">На главную</base-button>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import Vue, {ComponentOptions} from "vue"
import {Component, mixins} from "nuxt-property-decorator"
import {BreadcrumbElement} from "~/models/breadcrumb"

@Component({
  components: {
    BaseSvg: () => import("../components/base/svg/BaseSvg.vue"),
    BaseButton: () => import("../components/base/button/BaseButton.vue"),
  },
})
export default class ErrorLayout extends mixins(Vue) implements ComponentOptions<Vue> {
  breadcrumbsList: Array<BreadcrumbElement> = [
    {
      title: "Главная",
      link: "/"
    },
    {
      title: "404"
    }
  ]

  async fetch () {
    //await this.$store.dispatch('main/getData')
  }

  mounted() {}
}
</script>

<style lang="scss" scoped>
@import "../assets/scss/helpers/_variables.scss";

.error-page {
  padding: 58px 0 96px;
}

.error-page__title {
  font-family: $font-family-secondary;
  margin-bottom: 20px;
  font-weight: 700;
  font-size: 100px;
  line-height: 88px;

  @media #{$tablet} {
    margin-bottom: 44px;
    font-weight: 700;
    font-size: 52px;
    line-height: 120%;
  }
}

.error-page__subtitle {
  margin-bottom: 24px;
  font-weight: 500;
  font-size: 44px;
  line-height: 120%;

  @media #{$tablet} {
    font-weight: 500;
    font-size: 24px;
    line-height: 30px;
  }
}

.error-page__text {
  max-width: 720px;
  margin-bottom: 24px;
  font-weight: 500;
  font-size: 24px;
  line-height: 32px;
  color: $blue;

  @media #{$tablet} {
    max-width: 540px;
    margin-bottom: 32px;
    font-size: 16px;
    line-height: 22px;
  }
}

.error-page__controls {
  display: flex;
  align-items: center;
  gap: 24px;
  margin-bottom: 106px;

  @media #{$tablet} {
    display: grid;
    grid-template-columns: 1fr 1fr;
    margin-bottom: 72px;
  }

  @media #{$phone} {
    grid-template-columns: 1fr;
    margin-bottom: 60px;
  }
}
</style>
