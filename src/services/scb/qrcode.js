import Jimp from 'jimp'
import qrCode from 'qrcode-reader'

const decode = async (img) => {
    try {
        const image = await Jimp.read(img)
        const qrcode = new qrCode()
        let result
        qrcode.callback = (err, value) => {
        if (err) {
            console.error(err)
        }
        result = value.result
        };
        qrcode.decode(image.bitmap)
        return result
    } catch (err) {
        console.log(err)
    }
}

export default decode