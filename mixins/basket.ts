import Vue from "vue";
import {Component} from "nuxt-property-decorator";

@Component
export default class BasketMixin extends Vue {
  get basket() {
    return this.$store.state.basket.data
  }

  get isBasketEmpty() {
    return this.$store.getters["basket/isEmpty"]
  }

  productQuantity(product: any) {
    return this.$store.getters["basket/quantity"](product.id)
  }

  basketForProduct(product: any) {
    return this.$store.getters["basket/productBasket"](product.id)
  }

  currentBasketId(product: any) {
    return this.$store.getters["basket/basketId"](product.id)
  }

  isInBasket(product: any) {
    return this.$store.getters["basket/isInBasket"](product.id)
  }

  async basketAdd(product: any) {
    await this.$store.dispatch('basket/add', {
      productId: product.id,
      quantity: 1,
      uid: this.$store.state.userid
    })
    await this.$store.dispatch('basket/init', this.$store.state.userid)
  }

  async basketSet(product: any, id: number, quantity: number) {
    await this.$store.dispatch('basket/set', {
      productId: product.id,
      quantity: quantity,
      basketId: id,
      uid: this.$store.state.userid
    })
    await this.$store.dispatch('basket/init', this.$store.state.userid)
  }

  async basketUpdate(product: any, id: number, quantity: number, color: number | null = null, coloring: boolean = false) {
    await this.$store.dispatch('basket/update', {
      productId: product.id,
      quantity: quantity,
      basketId: id,
      color: color,
      coloring: coloring,
      uid: this.$store.state.userid
    })
    await this.$store.dispatch('basket/init', this.$store.state.userid)
  }

  async basketRemove(product: any, id: number) {
    await this.$store.dispatch('basket/remove', {
      productId: product.id,
      basketId: id,
      uid: this.$store.state.userid
    })
    await this.$store.dispatch('basket/init', this.$store.state.userid)
  }
}
