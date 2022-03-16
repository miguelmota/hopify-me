const canvas = new fabric.Canvas('canvas')
const upload = document.getElementById('upload')
const download = document.getElementById('download')
const strokeWidth = 50
const circleColor = '#ff89e1'
const downloadFilename = 'hoptimistic.png'

loadFromUrl('./images/default.png')

upload.addEventListener('change', function (event) {
  const file = event.target.files[0]
  const reader = new FileReader()
  reader.onload = function (file) {
    const data = file.target.result
    loadFromUrl(data)
    upload.value = ''
  }
  reader.readAsDataURL(file)
})

download.addEventListener('click', (event) => {
  event.preventDefault()
  downloadImage()
})

function loadFromUrl (url) {
  fabric.Image.fromURL(url, (img) => {
    renderImage(img)
  })
}

function renderImage (img) {
  img.set({
    top: 0,
    left: 0
  })
  img.scaleToWidth(canvas.width)
  img.scaleToHeight(canvas.height)
  const clipPath = new fabric.Group([
    new fabric.Circle({ top: 0, left: 0, radius: canvas.width / 2 })
  ], { left: -(canvas.width / 2), top: -(canvas.height / 2) })

  const rect = new fabric.Rect({
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

  const group = new fabric.Group([
    img,
    rect
  ], { left: 0, top: 0 })
  group.clipPath = clipPath
  canvas.add(group).renderAll().setActiveObject(img)
  download.style.display = 'inline-block'
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
