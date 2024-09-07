class FormatImageData {
  constructor(imageData) {
    let setImageData = function () {
      const imageFormData = new FormData()
      for (let key of Object.keys(imageData['mobile_thumbnail'])) {
        if (key !== 'length') {
          imageFormData['files'] = imageData['mobile_thumbnail']
        }
      }
      const { platform, type, id, unique_key } = imageData
      imageFormData.append('platform', platform)
      imageFormData.append('type', type)
      imageFormData.append('id', id)
      // imageFormData.append('file', imageData['mobile_thumbnail'][0])
      imageFormData.append('file', imageData[unique_key][0])
      return imageFormData()
    }
    this.formatImageData = function (values) {
      return setImageData()
    }
  }
}

export function formatImageData(imagesData) {
  // expects an array, loop and check using FormatImageData
  try {
  } catch (error) {}
}
