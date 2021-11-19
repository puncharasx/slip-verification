export default (req, res, next) => {
  const { image } = req.body
  if (!image) {
    return res.status(400).json({
      status: 400,
      message: 'image is required',
      })
  }
  next()
}