import { createWorker } from 'tesseract.js'

const worker = createWorker();

const ocr = async (image) => {
    try {
      await worker.load()
      await worker.loadLanguage('eng')
      await worker.initialize('eng')
      const { data: { text } } = await worker.recognize(image)
      return text
    } catch (err) {
      console.log("a")
    }
}

export default ocr