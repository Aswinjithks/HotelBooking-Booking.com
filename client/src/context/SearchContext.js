import { createContext, useReducer } from "react";

const INITIAL_STATES = {
  city: undefined,
  date: [],
  options: {
    adult: undefined,
    children: undefined,
    room: undefined,
  },
};

export const SerachContext = createContext(INITIAL_STATES);

const SerarchReducer = (state, action) => {
  switch (action.type) {
    case "NEW_SERACH":
      return action.payload;
    case "RESET_SEARCH":
      return INITIAL_STATES;
    default:
      return state;
  }
};

export const SearchCotextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(SerarchReducer, INITIAL_STATES);

  return (
    <SerachContext.Provider
      value={{
        city: state.city,
        date: state.date,
        options: state.options,
        dispatch,
      }}
    >
      {children}
    </SerachContext.Provider>
  );
};
