import Vue from "vue";
import {Component} from "nuxt-property-decorator";
// @ts-ignore
import {UA} from "nuxt-user-agent/lib/plugin.template";

declare module 'vue/types/vue' {
  interface Vue {
    $ua: UA
  }
}

declare module '@nuxt/types' {
  interface NuxtAppOptions {
    $ua: UA
  }
}
declare module 'vuex/types/index' {
  interface Store<S> {
    $ua: UA
  }
}

@Component
export default class DetectorMixin extends Vue {
  get isMobileOnly() {
    return (this.$ua.isFromSmartphone() || this.$ua.isFromMobilephone())
  }

  get isMobile() {
    return (this.$ua.isFromSmartphone() || this.$ua.isFromMobilephone() || this.$ua.isFromTablet())
  }

  get isTablet() {
    return this.$ua.isFromTablet();
  }

  get isCrawler() {
    let isFromCrawler = this.$ua.isFromCrawler();
    // @ts-ignore
    if (this.$ua._ua.indexOf("Google Page Speed Insights") !== -1 || this.$ua._ua.indexOf("Chrome-Lighthouse") !== -1) {
      isFromCrawler = true;
    }
    return isFromCrawler;
  }
}
