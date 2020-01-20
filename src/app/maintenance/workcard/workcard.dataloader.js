import DataLoader from 'dataloader'
import { mongooseLoader } from '@entria/graphql-mongoose-loader' // eslint-disable-line

import Workcard from './workcard.model'

export const getWorkcard = () =>
  new DataLoader(ids => mongooseLoader(Workcard, ids))
