import { decodeCartOpaqueId } from "../../xforms/id.js";

/**
 * @name Mutation/setPickupDetailsOnCart
 * @method
 * @memberof Cart/GraphQL
 * @summary resolver for the setPickupDetailsOnCart GraphQL mutation
 * @param {Object} parentResult - unusued
 * @param {Object} args.input - an object of all mutation arguments that were sent by the client
 * @param {Object} args.pickupDetails
 * @param {String} args.input.cartId - The cart to set shipping address on
 * @param {String} [args.input.cartToken] - The token for the cart, required if it is an anonymous cart
 * @param {String} [args.input.clientMutationId] - An optional string identifying the mutation call
 * @param {Object} context - an object containing the per-request state
 * @returns {Promise<Object>} SetPickupDetailsOnCartPayload
 */
export default async function setPickupDetailsOnCart(parentResult, { input }, context) {
    const { pickupDetails, cartId: opaqueCartId, cartToken, clientMutationId = null } = input;

    const cartId = decodeCartOpaqueId(opaqueCartId);

    const { cart } = await context.mutations.setPickupDetailsOnCart(context, {
        pickupDetails,
        cartId,
        cartToken
    });
    return {
        cart,
        clientMutationId
    }
}