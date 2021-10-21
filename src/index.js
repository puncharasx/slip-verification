import Jimp from 'jimp'
import qrCode from 'qrcode-reader'

const buffer = 'https://scontent.fbkk23-1.fna.fbcdn.net/v/t1.15752-9/245516064_3079725812348931_502861044949569176_n.jpg?_nc_cat=111&ccb=1-5&_nc_sid=ae9488&_nc_ohc=FD-DAju0uq0AX9C7vmp&_nc_ht=scontent.fbkk23-1.fna&oh=be727693fb2a678e8c942cf6b866184e&oe=6196D79A'

const ff = async () => {
  try {
    const image = await Jimp.read(buffer)
    const qrcode = new qrCode();
    qrcode.callback = (err, value) => {
      if (err) {
          console.error(err);
      }
      console.log(value.result);
    };
    qrcode.decode(image.bitmap);
  } catch (err) {
    console.log(err)
  }
}

ff()
