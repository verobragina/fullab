import Vue from "vue";
import {Component} from "nuxt-property-decorator";

@Component
export default class ScrollMixin extends Vue {
  scrollTo(classOnPage: string) {
    if (process.client) {
      const el = document.getElementById(classOnPage);
      if (el) {
        el.scrollIntoView({block: "center", behavior: "smooth"});
        return true;
      }
    }
  }
}
