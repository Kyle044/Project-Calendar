const loggedReducer = (state = null, action) => {
  switch (action.type) {
    case "Login":
      return action.payload;
    default:
      return state;
  }
};

export default loggedReducer;
