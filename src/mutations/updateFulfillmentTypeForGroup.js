import SimpleSchema from "simpl-schema";
import getCartById from "../util/getCartById.js";

const inputSchema = new SimpleSchema({
    cartId: String,
    cartToken: {
        type: String,
        optional: true
    },
    fulfillmentGroupId: String,
    fulfillmentType: {
        type: String,
        allowedValues: ["pickup", "digital", "shipping"]
    }
})
/**
 * @method updateFulfillmentTypeForGroup
 * @summary Updates the fulfillment type for a fulfillment group
 * @param {Object} context -  an object containing the per-request state
 * @param {Object} input - an object of all mutation arguments that were sent by the client
 * @param {String} input.cartId - The ID of the cart to update fulfillment options for
 * @param {String} [input.cartToken] - The token for the cart, required if it is an anonymous cart
 * @param {String} input.fulfillmentGroupId - The group to update fulfillment options for
 * @param {FulfillmentType} input.fulfillmentType - The group to update fulfillment options for
 * @returns {Promise<Object>} An object with a `cart` property containing the updated cart
 */

export default async function updateFulfillmentTypeForGroup(context, input) {
    const cleanedInput = inputSchema.clean(input || {});
    inputSchema.validate(cleanedInput);

    const { cartId, cartToken, fulfillmentGroupId, fulfillmentType } = cleanedInput;

    const cart = await getCartById(context, cartId, { cartToken, throwIfNotFound: true });

    // This is done by `saveCart`, too, but we need to do it before every call to `getCommonOrderForCartGroup`
    // to avoid errors in the case where a product has been deleted since the last time this cart was saved.
    // This mutates that `cart` object.
    await context.mutations.removeMissingItemsFromCart(context, cart);
    
    const updatedCart = {
        ...cart,
        shipping: cart.shipping.map((group) => {
          if (group._id === fulfillmentGroupId) {
            if(fulfillmentType === "pickup") {
              delete group.address;
            }
            else {
              console.log("deleting pickup details")
              delete group.pickupDetails;
            }
            group.shipmentMethod = null;
            return {...group, type: fulfillmentType}
          }
  
          return group;
        }),
        updatedAt: new Date()
      };
      const savedCart = await context.mutations.saveCart(context, updatedCart);
  
      return { cart: savedCart };

}