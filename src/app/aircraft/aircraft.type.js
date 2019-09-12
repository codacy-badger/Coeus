const AircraftTypes = () => `
  type Aircraft {
    _id: String!
    registration: String!
    operator: String!
    manufacturer: String!
    model: String!
    msn: String!
    weightVariant: String!
    year: String!
    totalFlightCycle: Int
    totalFlightHour: Int
  }
  input AircraftInputType {
    registration: String!
  }
  type AircraftListType {
    totalCount: Int
    data: [Aircraft]
  }
  type Success {
    ok: Boolean!,
    message: String!
  }
  extend type Query {
    showSingleAircraft(id: ID!): Aircraft
    showAllAircrafts: AircraftListType
  }
  extend type Mutation {
    addAircraft(input: AircraftInputType!): Success!
    updateAircraft(id: ID!, input: AircraftInputType!): Success!
    deleteAircraft(id: ID!): Success!
  }
`;

module.exports = {
  AircraftTypes: AircraftTypes()
};