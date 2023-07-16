<template>
  <v-layout v-if="loading || _release" column>

    <!-- Release Card -->
    <card v-bind="{loading}" class="mb-2" :release="_release"/>
    <v-card  v-if="franchises.length" flat color="transparent" class="mb-2">
      <v-card-title>Связанное</v-card-title>
      <v-list three-line>
        <template v-for="(item, index) in franchises">
          <v-list-item :link="true" @click="router().push('/release/' + release.id + '/' + release.names.en)" :disabled="release.id == releaseId"
                       v-for="(release, index) in item.releases"
                       :key="release.id"
          >
            <v-list-item-avatar>
              <v-img :src="release.poster"></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>
                <span>{{ release.names.ru }}</span>

                <v-chip
                  class="ma-2"
                  color="secondary"
                  text-color="white"
                >
                  {{ release.status }}
                </v-chip>
              </v-list-item-title>
              <v-list-item-subtitle v-html="release.type"></v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-card>

    <!-- Release Tabs -->
    <v-tabs v-if="!loading" v-model="tab" class="shrink mb-4" background-color="transparent">
      <v-tab>Эпизоды</v-tab>
      <v-tab>Комментарии</v-tab>
    </v-tabs>

    <!-- Release Components -->
    <component v-if="component" v-on="component.events" v-bind="component.props" :is="component.is"/>

  </v-layout>
</template>

<script>

import Card from '@components/release/card'
import Episodes from '@components/release/episodes'
import Comments from '@components/release/comments'

import { toVideo } from '@utils/router/views'
import { mapState } from 'vuex'
import router from '@router'

const props = {
  releaseId: {
    type: [String, Number],
    default: null
  },
  releaseName: {
    type: String,
    default: null
  }
}

export default {
  methods: {
    router () {
      return router
    }
  },
  props,
  name: 'Release.View',
  meta () {
    return { title: `Релиз [${this.releaseId}]: ${this.releaseName}` }
  },
  components: {
    Card,
    Episodes,
    Comments
  },

  async mounted () {
    try {
      let { franchises } = await fetch(`https://api.wwnd.space/v3/title?filter=franchises&playlist_type=array&id=${this.releaseId}`)
        .then(x => x.json())

      console.log(franchises)

      const ids = new Set([])
      for (const franchise of franchises) {
        for (const release of franchise.releases) {
          ids.add(release.id)
        }
      }

      console.log(ids)

      let additionalData = await fetch(
        `https://api.wwnd.space/v3/title/list?filter=status.string,id,type.full_string,string,names.ru,posters.medium&include=raw_poster&description_type=plain&playlist_type=object&id_list=${Array.from(ids)}`)
        .then(x => x.json())

      franchises = franchises.map(x => {
        x.releases = x.releases.sort(function(a, b) {
          return a.ordinal - b.ordinal;
        })

        x.releases = x.releases.map(x => {
          const { posters, type, status: { string: status } } = additionalData.find(release => release.id === x.id)
          x.poster = process.env.STATIC_ENDPOINT_URL + posters?.medium.url
          x.type = type?.full_string
          x.status = status
          return x
        })

        return x
      })
      this.franchises.push(...franchises)
    } catch (e) {
      console.log(e)
      this.$toasted.error('Ошибка загрузки связанного', { position: 'top' })
    }
  },

  data () {
    return {
      tab: 0,
      loading: false,
      franchises: []
    }
  },

  computed: {
    ...mapState('release', { _release: s => s.data }),

    /**
     * Get release episodes
     *
     * @return {array}
     */
    episodes () {
      return this.$__get(this._release, 'episodes') || []
    },

    /**
     * Get available components
     *
     * @return {array}
     */
    components () {
      return [
        {
          is: Episodes,
          props: {
            loading: this.loading,
            release: this._release,
            episodes: this.episodes,
          },
          events: { episode: episode => toVideo(this._release, episode) },
        },
        {
          is: Comments,
          props: { release: this._release }
        }
      ]
    },

    /**
     * Get active component
     *
     * @return {*}
     */
    component () {
      return this.components[this.tab] || null
    }

  },

  watch: {

    releaseId: {
      immediate: true,
      async handler (releaseId) {

        // Update if release data changed
        if (this._release === null || this._release.id !== parseInt(releaseId)) {

          // Get release data
          this.loading = true
          await this.$store.dispatchPromise('release/getRelease', releaseId)
          this.loading = false

        }
      }
    }
  }
}
</script>
