import Vue from "vue";
import {Component} from "nuxt-property-decorator";

@Component
export default class DeclensionMixin extends Vue {
  declension(forms: Array<any>, val: any) {
    const cases = [ 2, 0, 1, 1, 1, 2 ];
    return forms[(val % 100 > 4 && val % 100 < 20) ? 2 : cases[(val % 10 < 5) ? val % 10 : 5]];
  }

  declensionResults(count: Number) {
    return this.declension([ 'результат', 'результата', 'результатов' ], count);
  }
}
