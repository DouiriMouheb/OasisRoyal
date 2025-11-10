// @desc    Upload image to Cloudinary
// @route   POST /api/upload
// @access  Private/Admin
export const uploadImage = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded'
      })
    }

    res.json({
      success: true,
      data: {
        url: req.file.path,
        publicId: req.file.filename
      },
      message: 'Image uploaded successfully'
    })
  } catch (error) {
    next(error)
  }
}
