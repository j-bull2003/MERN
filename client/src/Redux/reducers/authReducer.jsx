// This function takes in the current state and an action to be performed on the state
const reducer = (state = {}, action) => {
    // This switch statement checks the type of the action and performs the corresponding operation
    switch (action.type) {
        // If the action is to login the user, update the state with the new user
        case "LOGIN_USER": {
            return { ...state, user: action.user }
        }
        // If the action is to remove the user, set the user to null
        case "REMOVE_USER": {
            return { ...state, user: null }
        }
        // If the action is not recognized, return the current state
        default: {
            return state
        }
    }
}

// Export the reducer as a default
export default reducer