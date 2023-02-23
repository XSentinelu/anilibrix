<script>

import { AppKeyboardHandlerMixin } from '@mixins/app'

const props = {
  player: {
    type: Object,
    default: null
  }
}

export default {
  props,
  mixins: [AppKeyboardHandlerMixin],
  render: () => null,
  methods: {

    /**
     * Handler keyboard events
     *
     * @param e
     * @return {void}
     */
    handleKeyboardEvents: function (e) {

      // State
      if (e.which === 32) this.$emit('toggle:play') // Space -> play
      if (e.code === 'KeyF') this.$emit('toggle:fullscreen') // F -> fullscreen

      // Seek
      if (e.which === 39) this.forward() // right arrow -> forward
      if (e.which === 37) this.rewind() // left arrow -> rewind

      // Volume
      if (e.which === 38) {
        if (this.player.volume >= 0.95) {
          this.$emit('set:volume', 1)
        } else {
          const newVolume = this.player.volume + 0.05
          this.$emit('set:volume', newVolume)
        }
      } // up arrow -> inc vol
      if (e.which === 40) {
        if (this.player.volume <= 0.05) {
          this.$emit('set:volume', 0)
        } else {
          const newVolume = this.player.volume - 0.05
          this.$emit('set:volume', newVolume)
        }
      } // down arrow -> dec vol

      // Speed
      if (e.which === 190 && e.shiftKey) this.setSpeed(0.25) // shift + > -> add speed
      if (e.which === 188 && e.shiftKey) this.setSpeed(-0.25) // shift + < -> reduce speed

    },

    /**
     * Forward player
     * Check max duration at the end
     *
     * @return void
     */
    forward () {
      const current_time = this.player.currentTime
      const time = current_time + 10 >= this.player.duration ? this.player.duration - .1 : current_time + 10

      this.$emit('set:time', time)
    },

    /**
     * Rewind player
     *
     * @return void
     */
    rewind () {
      const current_time = this.player.currentTime
      const time = current_time - 10 < 0 ? 0 : current_time - 10

      this.$emit('set:time', time)
    },

    /**
     * Set speed
     *
     * @param shift
     */
    setSpeed (shift) {

      const player_speed = this.player.speed
      const updated_speed = player_speed + shift

      if (updated_speed >= 0.5 && updated_speed <= 2) {
        this.$emit('set:speed', updated_speed)
      }
    }

  }

}
</script>
