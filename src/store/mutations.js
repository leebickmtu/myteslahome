export const setEnabledServiceKeys = (state, payload) => {
    state.enabledServiceKeys = payload
}

export const addEnabledServiceKey = (state, payload) => {
    state.enabledServiceKeys.push(payload)
}

export const removeEnabledServiceKey = (state, payload) => {
    state.enabledServiceKeys = state.enabledServiceKeys.filter(k => k !== payload)
}
