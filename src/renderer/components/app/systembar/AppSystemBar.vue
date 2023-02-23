<template>
  <v-layout
    v-if="is_fullscreen === false"
    align-center
    class="black system-bar white--text px-2"
    :class="{'is-mac--fullscreen': this.isMacOnFullscreen, 'right': this.appbarRight}"
    @dblclick="() => maximizeApp()">

    <template v-if="!this.isMac">
      <v-spacer v-if="this.isWindows"/>
      <template v-for="(control, k) in controls">
        <v-btn icon small class="system-bar__button" :key="k" @click="control.action">
          <v-icon small color="grey">{{ control.icon }}</v-icon>
        </v-btn>
      </template>
    </template>

  </v-layout>
</template>

<script>

import { AppPlatformMixin } from '@mixins/app'
import { mapState } from 'vuex'

export default {
  mixins: [AppPlatformMixin],
  computed: {
    ...mapState('app/settings/system', {
      appbarRight: s => s.appbar_right
    }),
    /**
     * Get controls
     *
     * @return Array
     */
    controls () {
      return [
        {
          icon: 'mdi-minus',
          sort: this.isMac ? 1 : 2,
          action: () => this.minimizeApp(),
        },
        {
          icon: 'mdi-window-maximize',
          action: () => this.maximizeApp(),
          sort: this.isMac ? 2 : 1
        },
        {
          icon: 'mdi-close',
          action: () => this.closeApp(),
          sort: this.isMac ? 0 : 0
        },
      ].sort((a, b) => a.sort - b.sort)
    }

  },

  methods: {

    /**
     * Close app
     *
     * @return void
     */
    closeApp () {
      require('@electron/remote').app.quit()
    },

    /**
     * Minimize app
     *
     * @return void
     */
    minimizeApp () {
      require('@electron/remote').getCurrentWindow().minimize()
    },

    /**
     * Maximize app
     *
     * @return void
     */
    maximizeApp () {

      const window = require('@electron/remote').getCurrentWindow()

      window.isMaximized()
        ? window.unmaximize()
        : window.maximize()
    }
  }

}
</script>

<style lang="scss" scoped>

.system-bar {
  top: 0;
  height: 40px;
  width: 100%;
  z-index: 10;
  display: flex;
  flex-direction: row;
  position: fixed;
  -webkit-app-region: drag;

  &__button {
    -webkit-app-region: no-drag;
  }

  &.is-mac--fullscreen {
    display: none;
  }

  &.right {
    flex-direction: row-reverse;
  }
}

</style>
