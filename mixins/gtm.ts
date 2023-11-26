// @ts-ignore
import Vue, {ComponentOptions} from "vue";
import {Component} from "nuxt-property-decorator";

@Component
export default class GtmMixin extends Vue implements ComponentOptions<Vue> {
  head () {
    let scripts = []

    let __dangerouslyDisableSanitizersByTagID = {}

    if (process.env.gtm) {
      scripts.push({
        type: 'text/javascript',
        hid: 'gtm-inject',
        innerHTML: `
          window.addEventListener('load', () => {
            setTimeout(() => {
              if (!window._gtm_inject) {
                return;
              }
              window._gtm_inject('${process.env.gtm}');
            }, 2000);
          });
          `
      })
      __dangerouslyDisableSanitizersByTagID = {
        'gtm-inject': ['innerHTML']
      }
    }

    return {
      script: scripts,
      __dangerouslyDisableSanitizersByTagID,
    }
  }
}
