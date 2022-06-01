import _ from 'lodash'

export const sortedServices = (state) => {
    return _.orderBy(state.services, [service => service.name.toLowerCase()], ['asc'])
}

export const enabledServices = (state, getters) => {
    return getters.sortedServices.filter(service => state.enabledServiceKeys.includes(service.key))
}

export const disabledServices = (state, getters) => {
    return getters.sortedServices.filter(service => !state.enabledServiceKeys.includes(service.key))
}

export const servicesByCategory = (state, getters) => (category) => {
    return getters.sortedServices.filter(service => service.category === category)
}
