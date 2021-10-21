import app from './app'
import config from './config'

const PORT = config.server.port || 3000
const server = async () => {
    try {   
        await app.listen(PORT)
        console.log(`RUNNING ON PORT: ${PORT}`)
    } catch (err) {
        return err
    }
}

server()