import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'
import db from '~/middleware/db'

const { Schema } = mongoose
const { ObjectId } = Schema

export const AircraftManufacturers = [
  'Airbus',
  'Boeing',
  'Embarer',
  'Bombardier'
]

export const NRWIStatus = ['Open', 'Done', 'Closed', 'Deferred', 'Declined']

export const StepStatus = ['Open', 'In Progress', 'Waiting', 'Stopped', 'Handover', 'Done']

export const NRWISource = [
  'Task Card',
  'Airworthiness Directive',
  'Service Bulletin',
  'Cocpit Log',
  'Cabin Log',
  'Finding',
  'Damage',
  'FOC'
]

const stepSchema = new Schema(
  {
		status: {
			type: String,
			required: false,
			enum: StepStatus,
			default: StepStatus[0]
		},
    department: {
      type: String
    },
    description: {
      type: String
    },
		reference: {
			type: String
		},
    deviation: {
      type: String
    },
    requiredTime: {
      type: String
    },
    doneBy: {
      type: ObjectId,
      ref: 'User',
      validate: {
        isAsync: true,
        validator: userID => {
          return db.checkItemIsExist(mongoose.model('User'), userID)
        },
        message: `User doesn't exist`
      }
    },
		inspectedBy: {
			type: ObjectId,
			ref: 'User',
			validate: {
				isAsync: true,
				validator: userID => {
					// we gonna check if mechanic has inspection clerance later eg. closing step mutation
					// search and find it. Truth is out of there...
					return db.checkItemIsExist(mongoose.model('User'), userID)
				},
				message: `User doesn't exist`
			}
		}
  },
  {
    timestamps: {}
  }
)

const NonRoutineWorkItemSchema = new mongoose.Schema(
  {
    NRWINumber: {
      type: String,
      required: true
    },
    workOrder: {
      type: ObjectId,
      ref: 'WorkOrder'
    },
    aircraft: {
      type: ObjectId,
      ref: 'Aircraft'
    },
    status: {
      type: String,
      required: false,
      enum: NRWIStatus,
      default: NRWIStatus[0]
    },
    source: {
      type: String,
      required: false,
      enum: NRWISource,
      default: NRWISource[0]
    },
    ataChapter: {
      type: String,
      required: false
    },
    manufacturer: {
      type: String,
      required: false,
      enum: AircraftManufacturers,
      default: AircraftManufacturers[0]
    },
    model: {
      type: String,
      required: true
    },
    subject: {
      type: String,
      required: true
    },
    steps: [stepSchema],
    personals: [
      {
        type: ObjectId,
        ref: 'User',
        validate: {
          isAsync: true,
          validator: userID => {
            return db.checkItemIsExist(mongoose.model('User'), userID)
          },
          message: `User doesn't exist`
        }
      }
    ]
  },
  {
    timestamps: true
  }
)

NonRoutineWorkItemSchema.plugin(mongoosePaginate)

const NRWI = mongoose.model('NRWI', NonRoutineWorkItemSchema)

export default NRWI
