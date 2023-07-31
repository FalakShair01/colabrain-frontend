// REQUEST TYPES
export const REQUEST_TYPE = {
    GET: 'GET',
    POST: 'POST',
    DELETE: 'DELETE',
    PUT: 'PUT',
    PATCH: 'PATCH'
};

export const API_CREATE_CHAT = {
    type: REQUEST_TYPE.POST,
    route: 'api/chats/create_new/'
};

export const API_GET_ALL_CHAT = {
    type: REQUEST_TYPE.GET,
    route: 'api/chats/all/'
};

export const API_CHAT_ADD_MESSAGE = {
    type: REQUEST_TYPE.POST,
    route: 'api/chats/add_message/'
};

export const API_GET_CHAT = {
    type: REQUEST_TYPE.GET,
    route: 'api/chats/'
};

export const API_DELETE_CHAT = {
    type: REQUEST_TYPE.DELETE,
    route: 'api/chats/delete/'
};
