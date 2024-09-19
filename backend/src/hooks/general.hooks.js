import { Forbidden } from '@feathersjs/errors'

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