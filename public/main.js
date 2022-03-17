const canvas = new fabric.Canvas('canvas')
const upload = document.getElementById('upload')
const download = document.getElementById('download')
const strokeWidth = 34
const circleColor = '#d976bf'
const downloadFilename = 'hopified.png'

loadFromUrl('./images/blank.png', false)

upload.addEventListener('change', function (event) {
  const file = event.target.files[0]
  const reader = new FileReader()
  reader.onload = function (file) {
    const data = file.target.result
    loadFromUrl(data, true)
    upload.value = ''
  }
  reader.readAsDataURL(file)
})

download.addEventListener('click', (event) => {
  event.preventDefault()
  downloadImage()
})

function loadFromUrl (url, confetti) {
  canvas.clear()
  fabric.Image.fromURL(url, (img) => {
    renderImage(img, confetti)
  })
}

function renderImage (img, confetti) {
  img.set({
    top: 0,
    left: 0
  })
  img.scaleToWidth(canvas.width)
  img.scaleToHeight(canvas.height)

  const circle = new fabric.Rect({
    top: 0,
    left: 0,
    width: canvas.width - strokeWidth,
    height: canvas.height - strokeWidth,
    fill: 'transparent',
    stroke: circleColor,
    strokeWidth: strokeWidth,
    rx: canvas.width / 2,
    ry: canvas.height / 2
  })

  circle.set('selectable', false)

  const group = new fabric.Group([
    img
  ], { left: 0, top: 0, width: canvas.width, height: canvas.height })

  const clipPath = new fabric.Group([
    new fabric.Circle({ top: 0, left: 0, radius: (canvas.width / 2) - 1 })
  ], { left: -(canvas.width / 2), top: -(canvas.height / 2) })

  group.clipPath = clipPath
  canvas.add(group).add(circle).renderAll().setActiveObject(img)
  if (confetti) {
    download.style.display = 'inline-block'
    showConfetti()
  }
}

function downloadImage () {
  const dataURL = canvas.toDataURL({
    width: canvas.width,
    height: canvas.height,
    left: 0,
    top: 0,
    format: 'png'
  })
  const link = document.createElement('a')
  link.download = downloadFilename
  link.href = dataURL
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

function showConfetti() {
  const jsConfetti = new JSConfetti()
  jsConfetti.addConfetti({
    emojis: [
      '🐰',
      '🐇',
      '🌈',
      //'💕',
      //'🌸',
      '🪷',
      //'🤘',
      '🎉',
      '🎊',
    ]
  })
}
