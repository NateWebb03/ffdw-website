// ///////////////////////////////////////////////////////////////////// Imports
// -----------------------------------------------------------------------------
import GeneralSiteData from '@/content/pages/general.json'
import Settings from '@/content/data/settings.json'

// /////////////////////////////////////////////////////////////////////// State
// -----------------------------------------------------------------------------
const state = () => ({
  siteContent: {},
  modal: false,
  slateCollections: false,
  navigationOpen: false
})

// ///////////////////////////////////////////////////////////////////// Getters
// -----------------------------------------------------------------------------
const getters = {
  siteContent: state => state.siteContent,
  modal: state => state.modal,
  slateCollections: state => state.slateCollections,
  navigationOpen: state => state.navigationOpen
}

// ///////////////////////////////////////////////////////////////////// Actions
// -----------------------------------------------------------------------------
const actions = {
  // //////////////////////////////////////////////////////////////// clearStore
  clearStore ({ commit }) {
    commit('CLEAR_STORE')
  },
  // /////////////////////////////////////////////////////////////// getBaseData
  async getBaseData ({ commit }, payload) {
    const key = typeof payload === 'string' ? payload : payload.key
    let data = false
    switch (key) {
      case 'general': data = GeneralSiteData; break
      case 'settings': data = Settings; break
      default : data = payload.data; break
    }
    if (data) {
      await this.dispatch('global/setSiteContent', { key, data })
    }
  },
  // //////////////////////////////////////////////////////////// setSiteContent
  setSiteContent ({ commit }, payload) {
    commit('SET_SITE_CONTENT', payload)
  },
  // ////////////////////////////////////////////////////////////////// setModal
  setModal ({ commit }, payload) {
    commit('SET_MODAL', payload)
  },
  async getSlateVideos ({ commit }) {
    try {
      const response = await this.$axios.get('https://slate.host/api/v2/get', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: this.$config.slateKey
        }
      })
      const collections = response.data.collections
      commit('GET_SLATE_VIDEOS', collections)
    } catch (e) {
      console.log('========================================== [getSlateVideos]')
      console.log(e)
      return false
    }
  },
  // ///////////////////////////////////////////////////////// setNavigationOpen
  setNavigationOpen ({ commit }, toggle) {
    commit('SET_NAVIGATION_OPEN', toggle)
  }
}

// /////////////////////////////////////////////////////////////////// Mutations
// -----------------------------------------------------------------------------
const mutations = {
  CLEAR_STORE (state) {
    state.siteContent = {}
  },
  SET_SITE_CONTENT (state, payload) {
    state.siteContent[payload.key] = payload.data
  },
  SET_MODAL (state, payload) {
    state.modal = payload
  },
  GET_SLATE_VIDEOS (state, collections) {
    state.slateCollections = collections
  },
  SET_NAVIGATION_OPEN (state, toggle) {
    state.navigationOpen = toggle
  }
}

// ////////////////////////////////////////////////////////////////////// Export
// -----------------------------------------------------------------------------
export default {
  state,
  getters,
  actions,
  mutations
}
