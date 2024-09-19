import { Forbidden } from '@feathersjs/errors'

/**
 * Restrict access to the owner of the record.
 *
 * This hook checks if the authenticated user is the owner of the record
 * they are trying to access or modify. If not, it throws a Forbidden error.
 *
 * @param {object} context - The hook context object.
 * @param {object} context.app - The Feathers application object.
 * @param {object} context.params - The parameters for the service method call.
 * @param {object} context.params.user - The authenticated user.
 * @param {string|number} context.id - The id of the record being accessed or modified.
 * @returns {Promise<object>} The context object.
 * @throws {Forbidden} If the user is not authenticated or not the owner of the record.
 */
export const restrictToOwner = async (context) => {
    const { app, params, id } = context;
    const { user } = params;

    if (!user) {
        throw new Forbidden('You are not allowed to perform this action.');
    }

    // Fetch the record to be updated
    const record = await app.service('user_item').get(id);

    // Check if the user_id matches
    if (record.user_id !== user.id) {
        throw new Forbidden('You are not allowed to perform this action.');
    }
    
    return context;
}