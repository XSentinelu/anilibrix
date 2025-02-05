const SET_ADS = 'SET_ADS'
const SET_UPDATES = 'SET_UPDATES'
const TOGGLE_DEVTOOLS = 'TOGGLE_DEVTOOLS'
const SET_ADS_MAXIMUM = 'SET_ADS_MAXIMUM'
const SET_UPDATES_TIMEOUT = 'SET_UPDATES_TIMEOUT'
const SET_SYSTEM_NOTIFICATIONS = 'SET_SYSTEM_NOTIFICATIONS'
const SET_APPBAR_RIGHT = 'SET_APPBAR_RIGHT';
const SET_FILTER_NOTIFY = 'SET_FILTER_NOTIFY';
const SET_API_ENDPOINT = 'SET_API_ENDPOINT'
const SET_API_STATIC_ENDPOINT = 'SET_API_STATIC_ENDPOINT'
export default {
  namespaced: true,
  state: {
    ads: {
      enabled: true,
      maximum: false
    },
    ads__maximum: false,
    appbar_right: false,
    filter_notify: false,
    devtools: false,
    updates: {
      enabled: true,
      timeout: 10
    },
    api: {
      endpoint: process.env.API_ENDPOINT_URL,
      static_endpoint: process.env.STATIC_ENDPOINT_URL
    },
    notifications: {
      system: true
    }
  },

  mutations: {
    [SET_API_ENDPOINT]: (s, state) => (s.api.endpoint = state),
    [SET_API_STATIC_ENDPOINT]: (s, state) => (s.api.static_endpoint = state),
    /**
     * Set updates state
     *
     * @param s
     * @param state
     * @return {*}
     */
    [SET_UPDATES]: (s, state) => (s.updates.enabled = state),
    /**
     * Set updates timeout
     *
     * @param s
     * @param timeout
     * @return {*}
     */
    [SET_UPDATES_TIMEOUT]: (s, timeout) => (s.updates.timeout = timeout),

    /**
     * Set system notifications
     *
     * @param s
     * @param state
     * @return {*}
     */
    [SET_SYSTEM_NOTIFICATIONS]: (s, state) => (s.notifications.system = state),

    /**
     * Toggle devtools
     *
     * @param s
     * @return {boolean}
     */
    [TOGGLE_DEVTOOLS]: s => (s.devtools = !s.devtools),

    /**
     * Set ads
     *
     * @param s
     * @param state
     * @return {*}
     */
    [SET_ADS]: (s, state) => (s.ads.enabled = state),

    /**
     * Set appbar inverse
     *
     * @param s
     * @param appbar_right
     */
    // eslint-disable-next-line camelcase
    [SET_APPBAR_RIGHT]: (s, appbar_right) => (s.appbar_right = appbar_right),

    /**
     * Set filter notify
     *
     * @param s
     * @param filter_notify
     */
    // eslint-disable-next-line camelcase
    [SET_FILTER_NOTIFY]: (s, filter_notify) => (s.filter_notify = filter_notify),

    /**
     * Set ads maximum
     *
     * @param s
     * @param state
     * @return {*}
     */
    [SET_ADS_MAXIMUM]: (s, state) => (s.ads.maximum = state)

  },

  actions: {

    /**
     * Set updates state
     *
     * @param commit
     * @param state
     * @return {*}
     */
    setUpdates: ({ commit }, state) => commit(SET_UPDATES, state),

    /**
     * Set updates state
     *
     * @param commit
     * @param state
     * @return {*}
     */
    setAPIEndpoint: ({ commit }, state) => commit(SET_API_ENDPOINT, state),
    setAPIStaticEndpoint: ({ commit }, state) => commit(SET_API_STATIC_ENDPOINT, state),

    /**
     * Set updates timeout
     *
     * @param commit
     * @param timeout
     * @return {*}
     */
    setUpdatesTimeout: ({ commit }, timeout) => commit(SET_UPDATES_TIMEOUT, timeout),

    /**
     * Set system notifications
     *
     * @param commit
     * @param state
     * @return {*}
     */
    setSystemNotifications: ({ commit }, state) => commit(SET_SYSTEM_NOTIFICATIONS, state),

    /**
     * Toggle devtools
     *
     * @param commit
     * @return {*}
     */
    toggleDevtools: ({ commit }) => commit(TOGGLE_DEVTOOLS),

    /**
     * Set ads
     *
     * @param commit
     * @param state
     * @return {*}
     */
    setAds: ({ commit }, state) => commit(SET_ADS, state),

    /**
     * Set ads maximum
     *
     * @param commit
     * @param state
     * @return {*}
     */
    setAdsMaximum: ({ commit }, state) => commit(SET_ADS_MAXIMUM, state),

    /**
     * Set appbar to right side
     *
     * @param commit
     * @param appbar_right
     */
    // eslint-disable-next-line camelcase
    setAppbarRight: ({ commit }, appbar_right) => commit(SET_APPBAR_RIGHT, appbar_right),

    /**
     * Set filter notify
     *
     * @param commit
     * @param filter_notify
     */
    // eslint-disable-next-line camelcase
    setFilterNotify: ({ commit }, filter_notify) => commit(SET_FILTER_NOTIFY, filter_notify)
  }
}
