<template>
  <transition name="show-overlay"
    @before-enter="beforeOpen"
    @after-enter="afterOpen"
    @after-leave="afterClose"
  >
    <section class="mtc_overlay mtc_overlay__window"
      v-if="isVisible"
      aria-modal="true"
      :aria-label="title"
    >
      <div class="mtc_overlay__shadow"
        @click.prevent="closeOverlay"></div> <!-- .mtc_overlay__shadow -->
      <div class="mtc_overlay__container" ref="overlayContainer">
        <button class="mtc_overlay__close-button"
          @click.prevent="closeOverlay">
            <span>Close</span>
            <slot name="icon">
                <div class="mtc_overlay__close-button-icon">
                    &times;
                </div> <!-- .icon -->
            </slot>
        </button>

        <div class="mtc_overlay__inner">
            <slot></slot>
        </div> <!-- .mtc_overlay__inner -->
      </div> <!-- .mtc_overlay__container -->
    </section>
  </transition>
</template>

<script>
export default {
  name: 'mtcOverlay',
  props: {
    isVisible: {
      type: Boolean,
      default: false
    },
    title: { // used for aria-label
      type: String,
      default: ''
    }
  },

  data () {
    return {
      scrollTopBeforeOpen: null
    }
  },

  methods: {
    closeOverlay () {
      this.$emit('closeOverlay')
    },

    beforeOpen () {
      const html = document.getElementsByTagName('html')[0]
      const body = document.getElementsByTagName('body')[0]
      const siteWrapper = document.getElementsByClassName('siteWrapper')[0]

      // if the siteWrapper exists
      if (siteWrapper !== undefined) {
        // if opening then get the scroll position and remove scrollBehavior
        this.scrollTopBeforeOpen = body.scrollTop || html.scrollTop
        html.style.scrollBehavior = 'unset'

        // position the browser and add overflow hidden
        html.style.overflow = 'hidden'
        html.scrollTop = 0
        body.scrollTop = 0
        siteWrapper.style.position = 'relative'
        siteWrapper.style.top = -this.scrollTopBeforeOpen + 'px'
        body.classList.add('mtcOverlayOpen')
      }

      // add esc key event listener
      document.addEventListener('keydown', this.escClose)

      // then emit an event
      this.$emit('beforeOpen')
    },

    afterOpen () {
      // set focus on first focusable element
      this.$nextTick(() => {
        const overlayContainer = this.$refs.overlayContainer
        const focusable = overlayContainer.querySelectorAll(' a, button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')[0]

        if (focusable !== undefined) {
          focusable.focus()
          focusable.blur()
        }
      })

      // then emit an event
      this.$emit('afterOpen')
    },

    afterClose () {
      const html = document.getElementsByTagName('html')[0]
      const body = document.getElementsByTagName('body')[0]
      const siteWrapper = document.getElementsByClassName('siteWrapper')[0]

      // if the siteWrapper exists
      if (siteWrapper !== undefined) {
        // position the browser and add overflow hidden
        html.style.overflow = null
        html.scrollTop = this.scrollTopBeforeOpen
        body.scrollTop = this.scrollTopBeforeOpen
        siteWrapper.style.position = null
        siteWrapper.style.top = null
        body.classList.add('mtcOverlayOpen')

        /* if closing wait for scroll values to change then
       * remove the 'unset' value added on open
       */
        body.classList.remove('mtcOverlayOpen')
        html.style.scrollBehavior = null
      }

      // remove esc key event listener
      document.removeEventListener('keydown', this.escClose)

      // then emit an event
      this.$emit('afterClose')
    },

    escClose (e) {
      if (e.key === 'Escape') {
        this.$emit('closeOverlay')
      }
    }
  }
}
</script>

<style>
.mtc_overlay__window {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  z-index: 10000;
  opacity: 1;
  transition: opacity .2s ease 0s;
}

.mtc_overlay__shadow {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, .8);
  z-index: 1;
}

/* transitions */
.show-overlay-enter-active, .show-overlay-leave-active {
  opacity: 1;
}

.show-overlay-enter, .show-overlay-leave-to {
  opacity: 0;
}

.mtc_overlay__container {
  position: relative;
  display: flex;
  width: 100%;
  max-width: 1380px;
  max-height: calc(100vh - 4rem);
  background: #fff;
  border-radius: 1rem;
  z-index: 2;
}

.mtc_overlay__inner {
  flex: 1 1 auto;
  display: flex;
  position: relative;
  padding: 4rem 1rem;
}

.mtc_overlay__close-button {
  position: absolute;
  top: 0;
  right: 0;
  background: none;
  border: 0;
  margin: 0;
  padding: 1rem;
  font-size: 2rem;
  cursor: pointer;
  transition: color .3s ease-in-out;
  z-index: 1;
}

.mtc_overlay__close-button:hover, .mtc_overlay__close-button:focus {
  color: #0f55c4;
}

.mtc_overlay__close-button:focus {
  outline: 2px solid #6495ed;
}

.mtc_overlay__close-button-icon {
  line-height: 1;
  font-size: 1em;
}

/* hide span visually, show to screen readers */
.mtc_overlay__close-button span {
  position: absolute !important;
  clip: rect(1px, 1px, 1px, 1px) !important;
  overflow: hidden !important;
  height: 1px !important;
  width: 1px !important;
  word-wrap: normal !important;
  margin: 0 !important;
}
</style>
