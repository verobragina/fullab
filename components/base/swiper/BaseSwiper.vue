<template>
  <div class="swiper" :class="containerClass" :style="containerStyle">
    <slot name="parallax-bg"></slot>

    <slot name="custom"></slot>

    <div :class="classes.wrapperClass">
      <slot></slot>
    </div>

    <slot name="pagination">

    </slot>
    <slot name="button-prev"></slot>
    <slot name="button-next"></slot>
    <slot name="scrollbar"></slot>
  </div>
</template>

<script lang="ts">
// pollfill
import Vue, {ComponentOptions} from "vue";
import {Component, Prop, Watch} from "nuxt-property-decorator";
import Swiper from 'swiper';

if (typeof Object.assign != 'function') {
  Object.defineProperty(Object, 'assign', {
    value(target: any, varArgs: any) {
      if (target == null) {
        throw new TypeError('Cannot convert undefined or null to object')
      }
      const to = Object(target)
      for (let index = 1; index < arguments.length; index++) {
        const nextSource = arguments[index]
        if (nextSource != null) {
          for (const nextKey in nextSource) {
            if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
              to[nextKey] = nextSource[nextKey]
            }
          }
        }
      }
      return to
    },
    writable: true,
    configurable: true
  })
}

// as of swiper 4.0.7
// http://idangero.us/swiper/api/#events
const DEFAULT_EVENTS = [
  'beforeDestroy',
  'slideChange',
  'slideChangeTransitionStart',
  'slideChangeTransitionEnd',
  'slideNextTransitionStart',
  'slideNextTransitionEnd',
  'slidePrevTransitionStart',
  'slidePrevTransitionEnd',
  'transitionStart',
  'transitionEnd',
  'touchStart',
  'touchMove',
  'touchMoveOpposite',
  'sliderMove',
  'touchEnd',
  'click',
  'tap',
  'doubleTap',
  'imagesReady',
  'progress',
  'reachBeginning',
  'reachEnd',
  'fromEdge',
  'setTranslate',
  'setTransition',
  'resize'
]

@Component
export default class BaseSwiper extends Vue implements ComponentOptions<Vue> {
  @Prop({default: 0})
  gotoSlide!: number

  @Prop({
    default: () => {
    }
  })
  options!: any

  @Prop({
    default: () => {
    }
  })
  globalOptions!: object

  @Prop()
  containerClass?: string

  @Prop()
  containerStyle?: string

  swiper: any | null = null
  classes: Record<string, string> = {
    wrapperClass: 'swiper-wrapper'
  }

  @Watch('gotoSlide')
  goToSlideWatch(val: number) {
    if (this.swiper) {
      // @ts-ignore
      this.swiper.slideTo(val)
    }
  }

  mounted() {
    if (!this.swiper && process.client) {
      let setClassName = false
      for (const className in this.classes) {
        if (this.classes.hasOwnProperty(className)) {
          if (this.options[className]) {
            setClassName = true
            this.classes[className] = this.options[className]
          }
        }
      }
      setClassName ? this.$nextTick(this.mountInstance) : this.mountInstance()
    }
  }

  activated() {
    this.update()
  }

  updated() {
    this.update()
  }

  beforeDestroy() {
    this.$nextTick(function () {
      if (this.swiper) {
        // @ts-ignore
        this.swiper.destroy && this.swiper.destroy()
        // @ts-ignore
        delete this.swiper
      }
    })
  }

  update() {
    if (this.swiper) {
      // @ts-ignore
      this.swiper.update && this.swiper.update()
      // @ts-ignore
      this.swiper.navigation && this.swiper.navigation.update()
      // @ts-ignore
      this.swiper.pagination && this.swiper.pagination.render()
      // @ts-ignore
      this.swiper.pagination && this.swiper.pagination.update()
    }
  }

  mountInstance() {
    const swiperOptions = Object.assign({}, this.globalOptions, this.options)
    import('swiper').then((module) => {
      let Swiper = module.default
      Swiper.use([
        module.Controller,
        module.Mousewheel,
        module.Navigation,
        module.Pagination,
        module.Scrollbar,
        module.FreeMode,
        module.EffectFade,
        module.EffectCube,
        module.EffectCoverflow,
        module.Autoplay,
        module.Thumbs])
      // @ts-ignore
      this.swiper = new Swiper(this.$el, {
        ...swiperOptions,
      })
      this.bindEvents()
      this.$emit('ready', this.swiper)
    });
  }

  bindEvents() {
    DEFAULT_EVENTS.forEach(eventName => {
      // @ts-ignore
      this.swiper.on(eventName, () => {
        this.$emit(eventName, ...arguments)
        this.$emit(eventName.replace(/([A-Z])/g, '-$1').toLowerCase(), ...arguments)
      })
    })
  }
}
</script>

<style lang="scss">
@import "../../../assets/scss/helpers/_variables.scss";
@import "../../../assets/scss/helpers/_mixins.scss";
@import "../../../assets/scss/components/swiper";

</style>
