import Vue from "vue";
import {Component} from "nuxt-property-decorator";

@Component
export default class RecaptchaMixin extends Vue {
  async recaptchaToken() {
    try {
      return await this.$recaptcha.execute('login')
    } catch (error) {
      // console.log(error)
    }
    return null
  }
}
