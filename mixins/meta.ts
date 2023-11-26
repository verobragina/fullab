// @ts-ignore
import Vue from "vue";
import {Component} from "nuxt-property-decorator";

@Component
export default class MetaMixin extends Vue {
  getMetaTags(meta: any) {

    console.log(meta)

    const metaTag = []
    metaTag.push({hid: 'description', name: 'description', content: meta.description})

    if (meta.robots) {
      metaTag.push({hid: 'robots', name: 'robots', content: meta.robots})
    }

    if (meta.canonical) {
      metaTag.push({hid: 'canonical', rel: 'canonical', href: meta.canonical})
    }

    metaTag.push({hid: 'og:title', property: 'og:title', content: meta.title})
    metaTag.push({hid: 'og:description', property: 'og:description', content: meta.description})
    metaTag.push({hid: 'og:type', property: 'og:type', content: 'website'})
    metaTag.push({hid: 'og:locale', property: 'og:locale', content: 'ru_RU'})
    metaTag.push({hid: 'og:url', property: 'og:url', content: process.env.domain + this.$route.path})
    /** @ts-ignore */
    metaTag.push({hid: 'og:updated_time', property: 'og:updated_time', content: Math.round(new Date() / 1000)})

    metaTag.push({hid: 'twitter:title', property: 'twitter:title', content: meta.title})
    metaTag.push({hid: 'twitter:description', property: 'twitter:description', content: meta.description})
    metaTag.push({hid: 'twitter:card', property: 'twitter:card', content: 'summary'})
    metaTag.push({hid: 'twitter:url', property: 'twitter:url', content: process.env.domain + this.$route.path})

    return {
      title: meta.title,
      meta: metaTag
    }
  }
}
