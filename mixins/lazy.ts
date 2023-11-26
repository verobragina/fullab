import Vue from "vue";
import {Component} from "nuxt-property-decorator";

@Component
export default class LazyMixin extends Vue {
  swiperTransitionStart(swiper: any, classNode: string) {
    if (swiper) {
      let node = document.querySelectorAll(classNode + ' .swiper-slide-visible');
      /** @ts-ignore */
      this.lazyLoadImage(node);

      node = document.querySelectorAll(classNode + ' .swiper-slide-active');
      /** @ts-ignore */
      this.lazyLoadImage(node);

      node = document.querySelectorAll(classNode + ' .swiper-slide-next');
      /** @ts-ignore */
      this.lazyLoadImage(node);
    }
  }

  lazyLoadImage(nodes: Array<any>) {
    if (nodes.length) {
      nodes.forEach((node) => {
        let media = node.querySelectorAll('[data-lazy]');
        /** @ts-ignore **/
        [...media].forEach(m => this.$lazyLoad(m))
      })
    }
  }
}
