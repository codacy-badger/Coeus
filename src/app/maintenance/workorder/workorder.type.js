const WorkorderTypes = () => `
  type Workorder {
    _id: String
    wonumber: String
    aircraft: Aircraft
    type: String
    letterCheckID: String
    package: [Workcard]
    customer: String
  }
  input WorkorderInputType {
    wonumber: String!
  }
  type WorkorderListType {
    totalCount: Int
    totalOpen: Int
    data: [Workorder]
  }
  type WorkorderSuccess {
    ok: Boolean!,
    message: String!
  }
  extend type Query {
    getWorkorder(id: String): Workorder
    getWorkordersByAircraft: WorkorderListType
    testWorkorderSystem: WorkorderSuccess!
  }
`

module.exports = {
  WorkorderTypes: WorkorderTypes()
}
