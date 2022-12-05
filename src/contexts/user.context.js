import { createContext, useEffect, useReducer } from "react";
import { createUserDocumentFromAuth, onAuthStateChangedListener} from "../utils/firebase/firebase.utils";
import { createAction } from "../utils/reducer/reducer.utils";

export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
})


export const USER_ACTION_TYPES = {
  SET_CURRENT_USER: "SET_CURRENT_USER",
}

const userReducer = (state, action) => {
  const { type, payload} = action;
  switch (type) {
    case USER_ACTION_TYPES.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: payload,
      }
    default: return state;
  }

}

const initialState = {
  currentUser: null,
}

export const UserProvider = ({children}) => {
  const [{ currentUser }, dispatch] = useReducer(userReducer, initialState );

  const setCurrentUser = (user) => dispatch(createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user))
  const value = { currentUser, setCurrentUser }

  useEffect(() => {
    return  onAuthStateChangedListener(user => {
      if (user) {
        createUserDocumentFromAuth(user);
      }
      setCurrentUser(user);
    });
  }, [])

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}