const WorkcardTypes = () => `
  type Workcard {
    _id: String
    workCardID: String
    workOrder: String
    aircraft: Aircraft
    status: String
    department: [String]
    description: String
    reference: String
    subject: String
  }
  input WorkcardInputType {
    registration: String!
  }
  type WorkcardListType {
    totalCount: Int
    totalOpen: Int
    data: [Workcard]
  }
  type WorkcardSuccess {
    ok: Boolean!,
    message: String!
  }
  extend type Query {
    getWorkcard(id: String): Workcard
    getWorkcardsByWorkorder: WorkcardListType
    testWorkcardSystem: WorkcardSuccess!
  }
`

module.exports = {
  WorkcardTypes: WorkcardTypes()
}
