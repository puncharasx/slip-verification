export default (req, res, next) => {
  const { imageUrl } = req.body
  const { file } = req
  if (!imageUrl && !file) {
    return res.status(400).json({
      status: 400,
      message: 'file or imageUrl is required',
      })
  }
  if (imageUrl && file) {
    return res.status(400).json({
      status: 400,
      message: 'Please select file or imageUrl',
      })
  }
  next()
}