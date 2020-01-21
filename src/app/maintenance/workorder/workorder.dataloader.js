import DataLoader from 'dataloader'
import { mongooseLoader } from '@entria/graphql-mongoose-loader' // eslint-disable-line

import Workorder from './workorder.model'

export const getWorkorder = () =>
  new DataLoader(ids => mongooseLoader(Workorder, ids))
