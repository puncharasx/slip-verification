import { createWorker } from 'tesseract.js'

const worker = createWorker();

const ocr = async (image) => {
    await worker.load()
    await worker.loadLanguage('eng')
    await worker.initialize('eng')
    const { data: { text } } = await worker.recognize(image)
    return text
}

export default ocr