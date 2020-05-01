import Vue from 'vue'
import Router from 'vue-router'

import blank from './blank'
import video from './video'
import release from './release'
import releases from './releases'

Vue.use(Router);

export default new Router({
  routes: [].concat(
    blank,
    video,
    release,
    releases,
  )
})
