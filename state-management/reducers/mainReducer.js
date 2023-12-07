import { GET_ALL_CHATS, GET_ALL_CONTACTS, GET_ALL_USERS, GET_USER_DETAILS } from "../types/types";
const initialState = {
  get_user_details: null,
  get_all_chats: null,
  get_all_contacts: null,
  get_all_users: null
};

const mainReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_DETAILS:
      return {
        ...state,
        get_user_details: action.payload,
      };
    case GET_ALL_CHATS:
      return {
        ...state,
        get_all_chats: action.payload,
      };
    case GET_ALL_USERS:
      return {
        ...state,
        get_all_users: action.payload,
      };
    case GET_ALL_CONTACTS:
      return {
        ...state,
        get_all_contacts: action.payload,
      };
    default:
      return state;
  }
};
export default mainReducer;
