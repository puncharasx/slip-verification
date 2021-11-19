import NodeCache from 'node-cache'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'
import qrcode from './qrcode'
import config from '../../config'

const nodeCache = new NodeCache()

const BankingService = {
  scb:  async (image) => {
      // CHECK TOKEN
      if (nodeCache.get('token') === undefined) {
        const { data } = await axios({
          method: 'POST',
          headers: {
            resourceOwnerID: config.scb.key,
            requestUID: uuidv4(),
          },
          data: {
            applicationKey: config.scb.key,
            applicationSecret: config.scb.secret,
          },
          url: `https://api-sandbox.partners.scb/partners/sandbox/v1/oauth/token`,
        })
        // SET TOKEN
        nodeCache.set('token',data.data.accessToken, 14400)
      }
      const decodeQR = await qrcode(image)
      const resultQR = decodeQR.slice(8,31)
      const transactions = await axios({
        method: 'GET',
        headers: {
          authorization: `Bearer ${nodeCache.get('token')}`,
          resourceOwnerID: config.scb.key,
          requestUID: uuidv4(),
        },
        url: `https://api-sandbox.partners.scb/partners/sandbox/v1/payment/billpayment/transactions/${resultQR}?sendingBank=014`,
      })
      return transactions.data
  },
  slip: async (image) => {
    const decodeQR = await qrcode(image)
    return decodeQR
  }
}

export default BankingService