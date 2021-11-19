import ocr from './ocr'

const truewallet = async (image) => {
  const result = await ocr(image)
  return result.match(/\d{13,15}/g)[0]
}

export default truewallet