import dotenv from 'dotenv'

dotenv.config()

const config = {
    server: {
        port: process.env.PORT || 8081
    },
    scb: {
        key: process.env.SCB_KEY,
        secret: process.env.SCB_SECRET
    }
} 

export default config