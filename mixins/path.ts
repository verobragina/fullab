import Vue from "vue";
import {Component} from "nuxt-property-decorator";

@Component
export default class PathMixin extends Vue {
  getApiPath (url: string){
    if (url) {
      const baseUrl = process.env.baseUrl
      if (baseUrl) {
        return baseUrl  + url
      } else {
        return `https://back.mustang.air-tech.agency${url}`
      }
    }
  }
}
