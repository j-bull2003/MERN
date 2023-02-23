// Declare a variable called apiUrl
let apiUrl

// If the Node environment is set to "development"
if (process.env.NODE_ENV === 'development') {
    apiUrl = `http://localhost:3000`
}

// If the Node environment is set to anything else (i.e. production)
else {
    apiUrl = `https://loose-popcorn-production.up.railway.app`
}

export default apiUrl