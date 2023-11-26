import Vue from "vue";
import {Component} from "nuxt-property-decorator";

@Component
export default class PriceMixin extends Vue {
  numberWithSpaces(x: Number) {
    if (x === null || x === undefined || x <= 0) {
      return 0;
    }

    return parseFloat(x.toString()).toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  }

  formatPriceFeature(x: Number, br: boolean = false) {
    if (x === null || x === undefined || x <= 0) {
      return 0;
    }

    let value = x.toString().replace(/ /g, '');

    let formatNumber = Number(value).toFixed(0);

    if (Number(formatNumber) >= 1000000) {
      formatNumber = (Number(formatNumber) / 1000000).toFixed(2).toString()
        .replace('.', ',').replace(/0+$/g, '').replace(/,$/g, '')

      if (br) {
        return formatNumber + '<br> млн.'
      }

      return formatNumber + ' млн.'
    }

    if (Number(formatNumber) >= 1000) {
      formatNumber = (Number(formatNumber) / 1000).toFixed(2).toString()
        .replace('.', ',').replace(/0+$/g, '').replace(/,$/g, '')


      if (br) {
        return formatNumber + '<br> тыс.'
      }

      return formatNumber + ' тыс.'
    }

    return x.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  }
}
