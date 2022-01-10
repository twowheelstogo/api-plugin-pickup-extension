import SimpleSchema from "simpl-schema";

/**
 * @name PickupDetails
 * @memberof Schemas
 * @type {SimpleSchema}
 * @property {String} datetime
 * @property {String} location
 */
export const PickupDetails = new SimpleSchema({
  datetime: {
    type: String,
    optional: true,
  },
  location: {
    type: String,
    optional: true,
  },
  branch: {
    type: String,
    optional: true,
  },
  branchId: {
    type: String,
    optional: true,
  },
});
