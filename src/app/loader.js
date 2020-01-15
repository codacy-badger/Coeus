import { getAircraft } from './aircraft/aircraft.dataloader'
import { getUser } from './main/user/user.dataloader'

const createLoaders = () => ({
  aircraft: getAircraft(),
  user: getUser()
})

export default createLoaders;
