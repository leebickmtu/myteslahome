export const saveEnabledServiceKeys = ({ state }) => {
    window.localStorage.setItem('enabledServiceKeys', JSON.stringify(state.enabledServiceKeys))
}

export const loadEnabledServiceKeys = ({ commit, state }) => {
    const storageData = window.localStorage.getItem('enabledServiceKeys')
    if (storageData != null) {
        const data = JSON.parse(storageData)
        commit('setEnabledServiceKeys', data)
    }
    else {
        const defaultKeys = state.services.filter(service => service.default).map(service => service.key)
        commit('setEnabledServiceKeys', defaultKeys)
    }
}

export const addEnabledServiceKey = ({ commit, dispatch }, payload) => {
    commit('addEnabledServiceKey', payload)
    dispatch('saveEnabledServiceKeys')
}

export const removeEnabledServiceKey = ({ commit, dispatch }, payload) => {
    commit('removeEnabledServiceKey', payload)
    dispatch('saveEnabledServiceKeys')
}
