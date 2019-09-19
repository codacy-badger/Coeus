import { getAircraft } from './aircraft/aircraft.dataloader'

const createLoaders = () => ({
	aircraft: getAircraft(),
})

export default createLoaders;