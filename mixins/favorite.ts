import Vue from "vue";
import {Component} from "nuxt-property-decorator";

@Component
export default class FavoriteMixin extends Vue {
  get favorite() {
    return this.$store.state.favorite.data
  }

  get isFavoriteEmpty() {
    return this.$store.getters["favorite/isEmpty"]
  }

  isInFavorite(product: any) {
    return this.$store.getters["favorite/isInFavorite"](product.id)
  }

  async favoriteAdd(product: any) {
    await this.$store.dispatch('favorite/add', {productId: product.id, quantity: 1, uid: this.$store.state.userid})
    await this.$store.dispatch('favorite/init', this.$store.state.userid)
  }

  async favoriteRemove(product: any) {
    await this.$store.dispatch('favorite/remove', {productId: product.id, quantity: 1, uid: this.$store.state.userid})
    await this.$store.dispatch('favorite/init', this.$store.state.userid)
  }
}
