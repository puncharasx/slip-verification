import express from 'express'
import cors from 'cors'
import morgan from 'morgan'

import scb from './services/scb'
import truewallet from './services/truewallet'

const app = express()

app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

app.post('/api/scb', async (req, res, next) => {
    const { image } = req.body
    try {
        const result = await scb(image)
        res.status(200).json({
            success: true,
            data: result.data,
        })
    } catch (err) {
        res.status(401).json({
            success: false,
            data: 'ไม่สามารถตรวจสอบรายการได้'
        })
    }
})

app.post('/api/true-wallet', async (req, res, next) => {
    const { image } = req.body
    try {
        const result = await truewallet(image)
        res.status(200).json({
            success: true,
            data: {
                ref: result,
            },
        })
    } catch (err) {
        res.status(401).json({
            success: false,
            data: 'ไม่สามารถตรวจสอบรายการได้',
            err,
        })
    }
})

export default app

