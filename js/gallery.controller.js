'use strict'


let gLoadedImgEvent
let gLoadedImg

function onInit() {
    initCanvas()
    renderGallery()
    resizeCanvas()
    window.addEventListener('resize', () => {
        resizeCanvas()
        renderMeme()
    })

}




function useUploadedImage(ev) {
    gLoadedImgEvent = ev
    const elMemeEditor = document.querySelector('.meme-editor')
    elMemeEditor.classList.add('show')
    const elInputImage = document.querySelector("#upload-input").files[0]
    const elImageName = document.querySelector('.image-name')
    elImageName.innerText = elInputImage.name
    setImg('custom')
    uploadImage(ev)
}

function uploadImage(ev) {

    const reader = new FileReader()

    reader.onload = (event) => {
        gLoadedImg = new Image()
        gLoadedImg.src = event.target.result
        gLoadedImg.onload = renderMeme.bind(null, gLoadedImg)
        
    }
    reader.readAsDataURL(ev.target.files[0])
}

function getLoadedImgEvent() {
    return gLoadedImgEvent
}
function getLoadedImg() {
    return gLoadedImg
}

function renderGallery() {
    const imgs = getImgs()
    const elGallery = document.querySelector('.meme-gallery')
    const strHTML = imgs.map((img, index) => { return `<img src="${img.url}" onclick="onImgSelect(${img.id})" class="img${index + 1}"></img>` })
    elGallery.innerHTML = strHTML.join('')
}

function onImgSelect(imgId) {
    const elMemeEditor = document.querySelector('.meme-editor')
    elMemeEditor.classList.add('show')
    setImg(imgId)
    resizeCanvas()
    renderMeme()
}
function openShuffledMeme() {
    const elMemeEditor = document.querySelector('.meme-editor')
    elMemeEditor.classList.add('show')
    makeShuffledMeme()
    resizeCanvas()
    renderMeme()
}
function filterGallery(elInput) {
    updateFilter(elInput.value)
    renderGallery()
}

function renderSavedMemes() {
    const memes = loadSavedMemes()

    const elGallery = document.querySelector('.meme-gallery')
    const strHTML = memes.map((meme, index) => {
        const img = new Image()
        img.src = memes.newImageURL
        return `<img src="http://ca-upload.com/here/serveForShare.php?id=62f8e004bf1b6"</img>`
    })
    elGallery.innerHTML = strHTML.join('')
    // onclick="onImgSelect(${meme.selectedImgId})" class="custom-img">
}

