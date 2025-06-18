// backend communication

const matchScent = async (description) => {
  console.log('Matching scent for description:', description)
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        idx: 'scent-001',
        name: 'Ocean Breeze',
        description: 'A fresh scent with notes of sea salt and citrus'
      })
    }, 1000)
  })
}

const diffuseScent = async (scentId) => {
  console.log('Diffusing scent:', scentId)
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true })
    }, 500)
  })
}
