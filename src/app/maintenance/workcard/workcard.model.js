import mongoose from 'mongoose'
import { v4 as uuid } from 'uuid'
import isMongoId from 'validator/lib/isMongoId'
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

export const WorkCardType = ['Non-Routine', 'MPD']

export const CardStatus = ['Open', 'Done', 'Closed', 'Deferred', 'Declined']

export const CardSource = [
  'Task Card',
  'Airworthiness Directive',
  'Service Bulletin',
  'Cocpit Log',
  'Cabin Log',
  'Finding',
  'Damage',
  'FOC'
]

export const StepStatus = [
  'Open',
  'In Progress',
  'Waiting',
  'Stopped',
  'Handover',
  'Done'
]

export const stepLogEvents = [
  'Done',
  'Handover',
  'Waiting for Material',
  'NDT Report',
  'Deviation',
  'Manufacturer Report',
  'Started',
  'Inspected',
	'Assingment',
]

export const stepTypes = [
  'Preliminary Inspection',
	'GVI Inspection',
	'DVI Inspection',
  'NDT Inspection',
  'Cleaning',
  'Material Prepearing',
  'Repair',
  'Changing',
  'Removing',
  'Installing',
	'Assingment',
]

const stepSchema = new Schema(
  {
    order: {
      type: Number
    },
    stepID: {
      type: String,
      default: uuid(),
      unique: true,
      required: true
    },
    stepStatus: {
      type: String,
      required: false,
      enum: StepStatus,
      default: StepStatus[0]
    },
		stepType: {
			type: String,
			required: false,
			enum: stepTypes,
			default: stepTypes[0]
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
    requiredTimeForStep: {
      type: Number
    },
    spendedTimeForStep: {
      type: Number
    },
    log: [
      {
        person: {
          type: ObjectId,
          ref: 'User',
          validate: {
            validator: userID => {
              return isMongoId(userID)
            },
            message: `User doesn't exist`
          }
        },
        eventDate: {
          type: Date
        },
        eventType: {
          type: String,
					enum: stepLogEvents,
					default: stepLogEvents[0]
        },
        subject: {
          type: String
        }
      }
    ],
    timesheet: [
      {
        person: {
          type: ObjectId,
          ref: 'User',
          validate: {
            validator: userID => {
              return isMongoId(userID)
            },
            message: `User doesn't exist`
          }
        },
        // TODO I dont know how but starting clock and some calculation must handle at front end.
        // There are some react job unf.
        startedAt: {
          type: Date
        },
        endedAt: {
          type: Date
        },
        spendedTime: {
          type: Number
        }
      }
    ],
    doneBy: {
      type: ObjectId,
      ref: 'User',
      validate: {
        validator: userID => {
          return isMongoId(userID)
        },
        message: `User doesn't exist`
      }
    },
    inspectedBy: {
      type: ObjectId,
      ref: 'User',
      validate: {
        validator: userID => {
          return isMongoId(userID)
        },
        message: `User doesn't exist`
      }
    }
  },
  {
    timestamps: {}
  }
)

const WorkCardSchema = new mongoose.Schema(
  {
    WCNumber: {
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
      enum: CardStatus,
      default: CardStatus[0]
    },
    source: {
      type: String,
      required: false,
      enum: CardSource,
      default: CardSource[0]
    },
    ataChapter: {
      type: String,
      required: false
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
          validator: userID => {
            return isMongoId(userID)
          },
          message: `User doesn't exist`
        }
      }
    ],
    requiredTotalTime: {
      type: String,
      required: false
    },
    spendedTotalTime: {
      type: String,
      required: false
    }
  },
  {
    timestamps: true
  }
)

WorkCardSchema.plugin(mongoosePaginate)

const WorkCard = mongoose.model('NRWI', WorkCardSchema)

export default WorkCard
