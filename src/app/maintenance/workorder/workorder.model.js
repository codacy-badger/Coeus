import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

const { Schema } = mongoose;
const { ObjectId } = Schema;

export const WorkOrderTypes = [
	'Line',
	'A Check',
	'B Check',
  'C Check',
  'D Check',
]

const WorkOrderSchema = new mongoose.Schema({
	wonumber: {
		type: String,
		required: true
	},
  aircraft: {
    type: ObjectId,
    ref: 'Aircraft'
  },
  type: {
    type: String,
    required: false,
    enum: WorkOrderTypes,
    default: WorkOrderTypes[0]
  },
  customer: {
    type: String,
    required: false
  }
},
{
  timestamps: true
})

WorkOrderSchema.plugin(mongoosePaginate)

const WorkOrder = mongoose.model('Workorder', WorkOrderSchema)


export default WorkOrder
