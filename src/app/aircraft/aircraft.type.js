const AircraftTypes = () => `
  type Aircraft {
      _id: String!
      registration: String!
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
    showAircraft(id: ID!): Aircraft
    showAllAircrafts(id: ID!): Aircraft
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