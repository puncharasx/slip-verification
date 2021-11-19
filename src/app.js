import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import Multer from 'multer'

import scb from './services/scb'
import truewallet from './services/truewallet'

import validateBody from './middlewares/validate-body'

const app = express()

app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

const multer = Multer({
  storage: Multer.memoryStorage()
})

app.post('/api/scb', async (req, res) => {
    const { image } = req.body
    try {
      if (!image) {
        throw new Error('image is required')
      }
      const result = await scb(image)
      res.status(200).json({
        success: true,
        data: result.data,
      })
    } catch (err) {
      res.status(400).json({
        success: false,
        data: {
            message: 'ไม่สามารถตรวจสอบรายการได้'
        },
        err
      })
    }
})

app.post('/api/true-wallet', multer.single('file'), validateBody, async (req, res) => {
    try {
      const { file } = req
      const { imageUrl } = req.body
      let result
      if (imageUrl) result = await truewallet(imageUrl)
      if (file) result = await truewallet(file.buffer)
      res.status(200).json({
        success: true,
        data: {
          transRef: result,
          },
      })
    } catch (err) {
      res.status(400).json({
        success: false,
        data: {
          message: 'ไม่สามารถตรวจสอบรายการได้',
        },
       })
    }
})

export default app

