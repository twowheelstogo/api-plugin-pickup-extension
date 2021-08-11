import { PickupDetails } from "./simpleSchemas.js";
/**
 * @summary Called on startup
 * @param {Object} context Startup context
 * @returns {undefined}
 */
export default async function cartStartup(context) {
    context.simpleSchemas.Shipment.extend({
        "type": {
            type: String,
            allowedValues: ["pickup", "shipping", "digital"]
        },
        "pickupDetails": {
            type: PickupDetails,
            optional: true
        }
    });
    context.simpleSchemas.orderFulfillmentGroupInputSchema.extend({
        "type": {
            type: String,
            allowedValues: ["pickup", "shipping", "digital"]
        },
    });
    context.simpleSchemas.OrderFulfillmentGroup.extend({
        "type": {
            type: String,
            allowedValues: ["pickup", "shipping", "digital"]
        },
        "pickupDetails": {
            type: PickupDetails,
            optional: true
        }
    })
}