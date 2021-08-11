import pkg from "../package.json";
import mutations from "./mutations/index.js";
import schemas from "./schemas/index.js";
import resolvers from "./resolvers/index.js";
import startup from "./startup.js";

/**
 * @summary Import and call this function to add this plugin to your API.
 * @param {ReactionAPI} app The ReactionAPI instance
 * @returns {undefined}
 */
export default async function register(app) {
  await app.registerPlugin({
    label: "Pickup Extension",
    name: "pickup-extension",
    version: pkg.version,
    functionsByType:{
      startup: [startup]
    },
    graphQL: {
      resolvers,
      schemas
    },
    mutations
  });
}
