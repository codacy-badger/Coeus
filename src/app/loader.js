import { getAircraft } from './aircraft/aircraft.dataloader'
import { getWorkcard } from './maintenance/workcard/workcard.dataloader'
import { getUser } from './main/user/user.dataloader'


const createLoaders = () => ({
  aircraft: getAircraft(),
  user: getUser(),
  workcard: getWorkcard()
})

export default createLoaders;
