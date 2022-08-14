'use strict'
const gLineStart = {}

let gIsGrabbed = false
let gElCanvas
let gCtx

function initCanvas() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    addListeners()
    setDefaultParams()

}

function resizeCanvas() {
    var elContainer = document.querySelector('.canvas-container')
    gElCanvas.width = elContainer.offsetWidth
    gElCanvas.height = elContainer.offsetWidth

}

function renderMeme() {
    const chosenMeme = getMeme()
    let image
    if (chosenMeme.selectedImgId === 'custom') {
        image = getLoadedImg()
    } else {

        image = document.querySelector(`.img${chosenMeme.selectedImgId}`)
    }


    adjustCanvasToImage(image)
    gCtx.drawImage(image, 0, 0, gElCanvas.width, gElCanvas.height)
    setDefaultParams()
    if (!chosenMeme.lines[0].pos && !chosenMeme.lines[1].pos) {
        chosenMeme.lines[0].pos = { y: 70 }
        chosenMeme.lines[1].pos = { y: gElCanvas.height - 40 }
    }


    chosenMeme.lines.forEach((line) => {
        printLine(line, line.pos)
    })
    renderTextInput()
    markCurrLine()
}

// function renderInputMeme(ev, meme) {

//     const reader = new FileReader()

//     reader.onload = (event) => {
//         var img = new Image()
//         img.src = event.target.result
//         img.onload = onImageReady.bind(null, img)
//         adjustCanvasToImage(img)
//         if (!meme.lines[0].pos && !meme.lines[1].pos || meme.lines[1].pos.y < 0) {
//             meme.lines[0].pos = { y: 70 }
//             meme.lines[1].pos = { y: gElCanvas.height - 40 }
//         }
//         gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
//         setDefaultParams()
//         meme.lines.forEach((line) => {
//             printLine(line, line.pos)
//         })
//         renderTextInput()
//         markCurrLine()
//     }
//     reader.readAsDataURL(ev.target.files[0])
// }

function adjustCanvasToImage(img) {
    if (img.naturalHeight > img.naturalWidth) {
        gElCanvas.width = (img.naturalWidth * gElCanvas.height) / img.naturalHeight
    } else {
        gElCanvas.height = (img.naturalHeight * gElCanvas.width) / img.naturalWidth
    }
}

function onDown(ev) {
    const pos = getEvPos(ev)

    if (checkLinesClick(pos) === -1) return

    if (isCurrLineClicked(pos)) {
        gIsGrabbed = true
        document.body.style.cursor = 'grabbing'
    } else {
        changeCurrLine(checkLinesClick(pos))
        renderMeme()
    }
}

function onMove(ev) {
    if (!gIsGrabbed) return
    const pos = getEvPos(ev)
    moveLine(pos)
    renderMeme()
}

function onUp() {
    gIsGrabbed = false
    document.body.style.cursor = 'unset'
}

function getEvPos(ev) {
    var pos = ev.offsetY
    const gTouchEvs = ['touchstart', 'touchmove', 'touchend']
    if (gTouchEvs.includes(ev.type)) {
        console.log(ev)
        ev.preventDefault()
        ev = ev.changedTouches[0]
        pos = ev.clientY - 117 // must get fixed in CR
    }
    return pos
}

function addListeners() {
    addMouseListeners()
    addTouchListeners()
}

function addMouseListeners() {
    gElCanvas.addEventListener('mousemove', onMove)
    gElCanvas.addEventListener('mousedown', onDown)
    gElCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
    gElCanvas.addEventListener('touchmove', onMove)
    gElCanvas.addEventListener('touchstart', onDown)
    gElCanvas.addEventListener('touchend', onUp)
}

function onSaveCurrMeme() {
    prepareMemeForDownload()
    saveCurrMeme(gElCanvas.toDataURL("image/jpeg"))
    prepareImageForSharing()
}

function prepareMemeForDownload() {
    const chosenMeme = getMeme()
    let image
    if (chosenMeme.selectedImgId === 'custom') {
        image = getLoadedImg()
    } else {
        image = document.querySelector(`.img${chosenMeme.selectedImgId}`)
    }
    adjustCanvasToImage(image)
    gCtx.drawImage(image, 0, 0, gElCanvas.width, gElCanvas.height, 0, 0, gElCanvas.width, gElCanvas.height)
    chosenMeme.lines.forEach((line) => { printLine(line, line.pos) })
}

function prepareImageForSharing() {
    const imgDataUrl = gElCanvas.toDataURL("image/jpeg")

    function onSuccess(uploadedImgUrl) {

        const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl)

        document.querySelector('.share-meme-btn').innerHTML = `
        <a class="btn" href="https://www.facebook.com/sharer/sharer.php?u=${encodedUploadedImgUrl}&t=${encodedUploadedImgUrl}" title="Share on Facebook" target="_blank" onclick="window.open('https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}'); return false;">
           Share   
        </a>`
    }
    doUploadImg(imgDataUrl, onSuccess)
}


function downloadCanvas(elLink) {
    prepareMemeForDownload()
    const data = gElCanvas.toDataURL("image/jpeg")
    elLink.href = data
    elLink.download = 'my-image.jpg'
}

function closeEditorModal() {
    const elMemeEditor = document.querySelector('.meme-editor')
    elMemeEditor.classList.remove('show')
}

function markCurrLine() {
    gCtx.beginPath()
    const line = getCurrLine()
    const startingX = 10
    const startingY = line.pos.y - line.size
    const length = line.size * 1.1
    const width = gElCanvas.width - 20
    gCtx.rect(startingX, startingY, width, length)
    gCtx.stroke()
    gCtx.closePath()
}

function renderTextInput() {
    const elTextInput = document.querySelector('[name=meme-text-input]')
    elTextInput.value = getCurrLine().txt
}

function printLine(line, { y }) {
    gCtx.textAlign = line.align
    gCtx.font = `${line.size}${gCtx.font.slice(2)} `
    gCtx.fillStyle = line.color
    gCtx.strokeText(line.txt, gLineStart[gCtx.textAlign], y)
    gCtx.fillText(line.txt, gLineStart[gCtx.textAlign], y)

}


function setDefaultParams() {
    gCtx.font = '40px impact'
    gCtx.strokeStyle = 'black'
    gCtx.lineWidth = 4
    gLineStart.left = 20
    gLineStart.right = gElCanvas.width - 20
    gLineStart.center = gElCanvas.width / 2
}

function onDeleteLine() {
    deleteCurrLine()
    renderMeme()
}

function onAddLine() {
    addNewLine()
    renderMeme()
}

function onChangeLineHeight(number) {
    ChangeLineHeight(number)
    renderMeme()
}

function onChangeTextAlign(direction) {
    changeTextAlign(direction)
    renderMeme()
}

function onMoveLineByButtons() {
    moveLineByButtons()
    renderTextInput()
    renderMeme()
}

function onColorChange({ value }) {
    changeColor(value)
    renderMeme()
}

function increaseFontSize() {
    changeTxtSize(10)
    renderMeme()
}

function decreaseFontSize() {
    changeTxtSize(-10)
    renderMeme()
}

function changeText({ value }) {
    changeLineTxt(value)
    renderMeme()
}

