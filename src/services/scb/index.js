import NodeCache from 'node-cache'
import axios from 'axios'
import qrcode from './qrcode'
import config from '../../config'

const nodeCache = new NodeCache()

const scb = async (image) => {
  try {
    if (nodeCache.get('token') === undefined) {
      const { data } = await axios({
        method: 'POST',
        headers: {
          resourceOwnerID: config.scb.key,
          requestUID: 'asdasdasas',
        },
        data: {
          applicationKey: config.scb.key,
          applicationSecret: config.scb.secret,
        },
        url: `https://api-sandbox.partners.scb/partners/sandbox/v1/oauth/token`,
      })
      nodeCache.set('token',data.data.accessToken)
    }
    const decodeQR = await qrcode(image)
    const resultQR = decodeQR.slice(8,31)
    const transactions = await axios({
      method: 'GET',
      headers: {
        authorization: `Bearer ${nodeCache.get('token')}`,
        resourceOwnerID: config.scb.key,
        requestUID: 'asdasdasas',
      },
      url: `https://api-sandbox.partners.scb/partners/sandbox/v1/payment/billpayment/transactions/${resultQR}?sendingBank=014`,
    })
    return transactions.data
  } catch (err) {
    throw err
  }
}

export default scb