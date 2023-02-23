import io from 'socket.io-client'

// Connect to the socket server using the default URL and reconnect option
const socket = io('/', { reconnect: true })

// When the socket connects, log a message with the socket id
socket.on('connect', () => {
    console.log('connected', socket.id)
})

// When the socket disconnects, log a message
socket.on('disconnect', () => {
    console.log('disconnected')
})

// Export the socket object for use in other modules
export default socket