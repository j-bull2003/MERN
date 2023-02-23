// Creates an action to log in a user with provided user object
const loginUser = (user) => {
    return {
        type: "LOGIN_USER",
        user
    }
}

// Creates an action to remove the current user
const removeUser = () => {
    return {
        type: "REMOVE_USER"
    }
}

// Exporting the two actions as named exports
export {
    loginUser,
    removeUser
}