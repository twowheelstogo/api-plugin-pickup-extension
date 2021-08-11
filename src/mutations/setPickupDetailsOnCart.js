import SimpleSchema from "simpl-schema";
import getCartById from "../util/getCartById.js";
import { PickupDetails } from "../simpleSchemas.js";
const inputSchema = new SimpleSchema({
    pickupDetails: PickupDetails,
    cartId: String,
    cartToken: {
        type: String,
        optional: true
    }
})
/**
 * @method setPickupDetailsOnCart
 * @summary Sets a pickupDetails data for all fulfillment groups on a cart that have
 * a type of "pickup"
 * @param {Object} context - an object containing the per-request state
 * @param {Object} input - Input (see SimpleSchema)
 * @returns {Promise<Object>} An object with a `cart` property containing the updated cart
 */
export default async function setPickupDetailsOnCart(context, input) {
    const cleanedInput = inputSchema.clean(input); // add default values and such
    inputSchema.validate(cleanedInput);

    const { pickupDetails, cartId, cartToken } = cleanedInput;

    const cart = await getCartById(context, cartId, { cartToken, throwIfNotFound: true });

    let didModify = false;
    const updatedFulfillmentGroups = (cart.shipping || []).map((group) => {
        if (group.type === "pickup") {
            didModify = true;
            return { ...group, pickupDetails };
        }
        return group;
    });

    if (!didModify) return { cart };

    const updatedCart = {
        ...cart,
        shipping: updatedFulfillmentGroups,
        updatedAt: new Date()
    };
    const savedCart = await context.mutations.saveCart(context, updatedCart);
    console.log("savedCart",savedCart)
    return { cart: savedCart };
}