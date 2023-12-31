<template>
  <ul v-if="!noLiSurround" :class="containerClass">
    <li v-if="firstLastButton" :class="[pageClass, firstPageSelected() ? disabledClass : '']">
      <a
        :href="pageLink(1)"
        :class="pageLinkClass"
        :tabindex="firstPageSelected() ? -1 : 0"
        @click.prevent="selectFirstPage()"
        @keyup.enter="selectFirstPage()"
        v-html="firstButtonText"
      />
    </li>

    <li v-if="!(firstPageSelected() && hidePrevNext)" :class="[prevClass, firstPageSelected() ? disabledClass : '']">
      <a
        :href="pageLink(selected - 1)"
        :class="prevLinkClass"
        :tabindex="firstPageSelected() ? -1 : 0"
        @click.prevent="prevPage()"
        @keyup.enter="prevPage()"
        v-html="prevText"
      />
    </li>

    <li v-for="(page, index) in pages" :key="index" :class="[pageClass, page.selected ? activeClass : '', page.disabled ? disabledClass : '', page.breakView ? breakViewClass: '']">
      <a v-if="page.breakView" :class="[pageLinkClass, breakViewLinkClass]" tabindex="0"><slot name="breakViewContent">{{ breakViewText }}</slot></a>
      <a v-else-if="page.disabled" :class="pageLinkClass" tabindex="0">{{ page.content }}</a>
      <a
        v-else
        :href="pageLink(page.index + 1)"
        :class="pageLinkClass"
        tabindex="0"
        @click.prevent="handlePageSelected(page.index + 1)"
        @keyup.enter="handlePageSelected(page.index + 1)"
      >{{ page.content }}</a>
    </li>

    <li v-if="!(lastPageSelected() && hidePrevNext)" :class="[nextClass, lastPageSelected() ? disabledClass : '']">
      <a
        :href="pageLink(selected + 1)"
        :class="nextLinkClass"
        :tabindex="lastPageSelected() ? -1 : 0"
        @click.prevent="nextPage()"
        @keyup.enter="nextPage()"
        v-html="nextText"
      />
    </li>

    <li v-if="firstLastButton" :class="[pageClass, lastPageSelected() ? disabledClass : '']">
      <a
        :href="pageLink(pageCount)"
        :class="pageLinkClass"
        :tabindex="lastPageSelected() ? -1 : 0"
        @click.prevent="selectLastPage()"
        @keyup.enter="selectLastPage()"
        v-html="lastButtonText"
      />
    </li>
  </ul>

  <div v-else :class="containerClass">
    <a
      v-if="firstLastButton"
      :href="pageLink(1)"
      :class="[pageLinkClass, firstPageSelected() ? disabledClass : '']"
      tabindex="0"
      @click.prevent="selectFirstPage()"
      @keyup.enter="selectFirstPage()"
      v-html="firstButtonText"
    />
    <a
      v-if="!(firstPageSelected() && hidePrevNext)"
      :href="pageLink(selected - 1)"
      :class="[prevLinkClass, firstPageSelected() ? disabledClass : '']"
      tabindex="0"
      @click.prevent="prevPage()"
      @keyup.enter="prevPage()"
      v-html="prevText"
    />
    <template v-for="(page, index) in pages">
      <a v-if="page.breakView" :key="index" :class="[pageLinkClass, breakViewLinkClass, page.disabled ? disabledClass : '']" tabindex="0"><slot name="breakViewContent">{{ breakViewText }}</slot></a>
      <a v-else-if="page.disabled" :key="index" :class="[pageLinkClass, page.selected ? activeClass : '', disabledClass]" tabindex="0">{{ page.content }}</a>
      <a
        v-else
        :key="index"
        :href="pageLink(page.index + 1)"
        :class="[pageLinkClass, page.selected ? activeClass : '']"
        tabindex="0"
        @click.prevent="handlePageSelected(page.index + 1)"
        @keyup.enter="handlePageSelected(page.index + 1)"
      >{{ page.content }}</a>
    </template>
    <a
      v-if="!(lastPageSelected() && hidePrevNext)"
      :href="pageLink(selected + 1)"
      :class="[nextLinkClass, lastPageSelected() ? disabledClass : '']"
      tabindex="0"
      @click.prevent="nextPage()"
      @keyup.enter="nextPage()"
      v-html="nextText"
    />
    <a
      v-if="firstLastButton"
      :href="pageLink(pageCount)"
      :class="[pageLinkClass, lastPageSelected() ? disabledClass : '']"
      tabindex="0"
      @click.prevent="selectLastPage()"
      @keyup.enter="selectLastPage()"
      v-html="lastButtonText"
    />
  </div>
</template>

<script>
import _cloneDeep from 'lodash/cloneDeep'

export default {
  props: {
    value: {
      type: Number
    },
    pageCount: {
      type: Number,
      required: true
    },
    forcePage: {
      type: Number
    },
    clickHandler: {
      type: Function,
      default: () => { }
    },
    pageRange: {
      type: Number,
      default: 3
    },
    marginPages: {
      type: Number,
      default: 1
    },
    prevText: {
      type: String,
      default: 'Prev'
    },
    nextText: {
      type: String,
      default: 'Next'
    },
    breakViewText: {
      type: String,
      default: '…'
    },
    containerClass: {
      type: String
    },
    pageClass: {
      type: String
    },
    pageLinkClass: {
      type: String
    },
    prevClass: {
      type: String
    },
    prevLinkClass: {
      type: String
    },
    nextClass: {
      type: String
    },
    nextLinkClass: {
      type: String
    },
    breakViewClass: {
      type: String
    },
    breakViewLinkClass: {
      type: String
    },
    activeClass: {
      type: String,
      default: 'active'
    },
    disabledClass: {
      type: String,
      default: 'disabled'
    },
    noLiSurround: {
      type: Boolean,
      default: false
    },
    firstLastButton: {
      type: Boolean,
      default: false
    },
    firstButtonText: {
      type: String,
      default: 'First'
    },
    lastButtonText: {
      type: String,
      default: 'Last'
    },
    hidePrevNext: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      innerValue: 1
    }
  },
  computed: {
    selected: {
      get () {
        return this.value || this.innerValue
      },
      set (newValue) {
        this.innerValue = newValue
      }
    },
    pages () {
      const items = {}
      if (this.pageCount <= this.pageRange) {
        for (let index = 0; index < this.pageCount; index++) {
          const page = {
            index,
            content: index + 1,
            selected: index === (this.selected - 1)
          }
          items[index] = page
        }
      } else {
        const halfPageRange = Math.floor(this.pageRange / 2)

        const setPageItem = (index) => {
          const page = {
            index,
            content: index + 1,
            selected: index === (this.selected - 1)
          }

          items[index] = page
        }

        const setBreakView = (index) => {
          const breakView = {
            disabled: true,
            breakView: true
          }

          items[index] = breakView
        }

        // 1st - loop thru low end of margin pages
        for (let i = 0; i < this.marginPages; i++) {
          setPageItem(i)
        }

        // 2nd - loop thru selected range
        let selectedRangeLow = 0
        if (this.selected - halfPageRange > 0) {
          selectedRangeLow = this.selected - 1 - halfPageRange
        }

        let selectedRangeHigh = selectedRangeLow + this.pageRange - 1
        if (selectedRangeHigh >= this.pageCount) {
          selectedRangeHigh = this.pageCount - 1
          selectedRangeLow = selectedRangeHigh - this.pageRange + 1
        }

        for (let i = selectedRangeLow; i <= selectedRangeHigh && i <= this.pageCount - 1; i++) {
          setPageItem(i)
        }

        // Check if there is breakView in the left of selected range
        if (selectedRangeLow > this.marginPages) {
          setBreakView(selectedRangeLow - 1)
        }

        // Check if there is breakView in the right of selected range
        if (selectedRangeHigh + 1 < this.pageCount - this.marginPages) {
          setBreakView(selectedRangeHigh + 1)
        }

        // 3rd - loop thru high end of margin pages
        for (let i = this.pageCount - 1; i >= this.pageCount - this.marginPages; i--) {
          setPageItem(i)
        }
      }
      return items
    }
  },
  beforeUpdate () {
    if (this.forcePage === undefined) { return }
    if (this.forcePage !== this.selected) {
      this.selected = this.forcePage
    }
  },
  methods: {
    handlePageSelected (selected) {
      if (this.selected === selected) { return }

      this.innerValue = selected
      this.$emit('input', selected)
      this.clickHandler(selected)
    },
    prevPage () {
      if (this.selected <= 1) { return }

      this.handlePageSelected(this.selected - 1)
    },
    nextPage () {
      if (this.selected >= this.pageCount) { return }

      this.handlePageSelected(this.selected + 1)
    },
    firstPageSelected () {
      return this.selected === 1
    },
    lastPageSelected () {
      return (this.selected === this.pageCount) || (this.pageCount === 0)
    },
    selectFirstPage () {
      if (this.selected <= 1) { return }

      this.handlePageSelected(1)
    },
    selectLastPage () {
      if (this.selected >= this.pageCount) { return }

      this.handlePageSelected(this.pageCount)
    },
    pageLink (page) {
      const pageRoute = {
        name: this.$route.name,
        params: _cloneDeep(this.$route.params),
        query: _cloneDeep(this.$route.query)
      }

      if (page > 1) {
        pageRoute.query.page = page
      } else if (pageRoute.query.page) {
        delete pageRoute.query.page
      }

      return this.$router.resolve(
        pageRoute
      ).href
    }
  }
}
</script>

<style lang="css" scoped>
a {
  cursor: pointer;
}
</style>
