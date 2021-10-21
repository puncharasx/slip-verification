import ocr from './ocr'

const truewallet = async (image) => {
    try {
        const result = await ocr(image)
        return result.match(/\d{13,15}/g)[0]
    } catch (err) {
        throw err
    }
}

export default truewallet