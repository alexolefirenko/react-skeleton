import { types, getEnv } from 'mobx-state-tree'
import { ROUTER_INIT, ROUTER_LOCATION_CHANGE } from '../constants'
import Location, { ILocation } from '../models/Location'

export default types
    .model('RouterStore', {
        location: types.maybe(Location),
        state: types.maybe(types.enumeration('State', ['loading', 'loaded', 'fail']))
    })
    .actions(self => ({
        onStart: () => {
            self.state = 'loading'
        },
        onSuccess: () => {
            self.state = 'loaded'
        },
        onFail: () => {
            self.state = 'fail'
        },
        [ROUTER_INIT]: (location: ILocation) => {
            self.location = location
        },
        push: (to: ILocation) => {
            const { history } = getEnv(self)
            history.push(to)
        },
        replace: (to: ILocation) => {
            const { history } = getEnv(self)
            history.replace(to)
        },
        [ROUTER_LOCATION_CHANGE]: (location: ILocation) => {
            self.location = location
        }
    }))
