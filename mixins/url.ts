import Vue from "vue";
// noinspection ES6UnusedImports
import {RawLocation} from 'vue-router'
import {Component} from "nuxt-property-decorator";

declare module 'vue-router' {
  interface Location {
    to?: string
  }
}

@Component
export default class UrlMixin extends Vue {
  isAbsoluteUrl(url: RawLocation) {
    if (process.env.absolutePath || process.env.absolutePath !== 'false') {
      if (typeof url === 'string') {
        return true
      }

      if (typeof url === 'object' && url.to) {
        return true
      }
    }
    return false
  }

  changeUrl(url: RawLocation) {
    if (this.isAbsoluteUrl(url)) {
      window.location.href = this.absoluteUrl(url) as string;
    } else {
      this.$router.push(this.absoluteUrl(url))
    }
  }

  absoluteUrl(url: RawLocation): RawLocation {
    if (process.env.absolutePath || process.env.absolutePath !== 'false') {
      if (typeof url === 'string') {
        return this.makeAbsolute(url);
      }

      if (typeof url === 'object' && url.to) {
        return this.makeAbsolute(url.to);
      }
    }

    if (typeof url === 'string') {
      return url
    }

    if (typeof url === 'object' && url.to) {
      return url
    }

    return url
  }

  makeAbsolute(value: RawLocation): RawLocation {
    if (!value) return value
    if (!process.env.absolutePath) return value
    if (process.env.absolutePath === "false") return value

    if (typeof value === 'string' && value.indexOf('http') === 0) {
      return value;
    }

    return process.env.absolutePath + value
  }
}
