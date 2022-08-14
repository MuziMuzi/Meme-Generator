'use strict'
const savedMemesStorageKey = 'savedMemesDB'
const lineSettings = {
    color: 'white',
    size: 40
}
const gSavedMemes = []


let gMeme


function setImg(imgId) {
    if (_LoadMemeFromStorage(`meme${imgId}`)) {
        gMeme = _LoadMemeFromStorage(`meme${imgId}`)

        return
    }
    gMeme = {
        selectedImgId: imgId,
        selectedLineIdx: 0,
        lines: [
            {
                txt: '',
                size: lineSettings.size,
                align: 'left',
                color: lineSettings.color,
                pos: null
            },
            {
                txt: '',
                size: lineSettings.size,
                align: 'left',
                color: lineSettings.color,
                pos: null
            }
        ]
    }
}

function makeShuffledMeme() {
    gMeme = {
        selectedImgId: getRandomInt(1, 18),
        selectedLineIdx: 0,
        lines: [
            {
                txt: makeRandomText(getRandomInt(0, 4)),
                size: getRandomInt(10, 50),
                align: 'left',
                color: getRandomColor(),
                pos: null
            },
            {
                txt: makeRandomText(getRandomInt(0, 4)),
                size: getRandomInt(10, 50),
                align: 'left',
                color: getRandomColor(),
                pos: null
            }
        ]
    }
}

function changeCurrLine(newLineIdx) {
    gMeme.selectedLineIdx = newLineIdx
}

function moveLine(dy) {
    getCurrLine().pos.y = dy
}

function doUploadImg(imgDataUrl, onSuccess) {

    const formData = new FormData()
    formData.append('img', imgDataUrl)

    fetch('//ca-upload.com/here/upload.php', {
            method: 'POST',
            body: formData
        })
        .then(res => res.text())
        .then((url) => {
            console.log('Got back live url:', url)
            onSuccess(url)
        })
        .catch((err) => {
            console.error(err)
        })
}

function checkLinesClick(clickedPos) {
    return gMeme.lines.findIndex((line) => (clickedPos <= line.pos.y && clickedPos >= line.pos.y - line.size))
}

function isCurrLineClicked(clickedPos) {
    return (clickedPos <= getCurrLine().pos.y && clickedPos >= getCurrLine().pos.y - getCurrLine().size)

}

function setLinesHeight() {
    linesPos.firstLine = { y: 70 }
    linesPos.secondLine = { y: getCanvasHeight() - 70 }
    linesPos.newLine = { y: getCanvasHeight() / 2 }
}

function deleteCurrLine() {
    gMeme.lines.splice(gMeme.selectedLineIdx, 1)
    if (gMeme.lines.length === 0) {
        addNewLine()
        gMeme.selectedLineIdx = 0

        return
    }

    if (gMeme.selectedLineIdx === 0) {
        if (gMeme.lines.length = 1) {
    
            return
        }
        gMeme.selectedLineIdx++
    } else gMeme.selectedLineIdx--
}

function addNewLine() {
    if (gMeme.lines.length >= 5) return
    gMeme.lines.push(_createNewLine())
    console.log(gMeme.lines)
    gMeme.selectedLineIdx = gMeme.lines.length - 1
}

function getCanvasHeight(){
    return gElCanvas.height
}
function moveLineByButtons() {
    gMeme.selectedLineIdx++
    if (gMeme.selectedLineIdx >= gMeme.lines.length) gMeme.selectedLineIdx = 0
}

function _LoadMemeFromStorage(memeName) {
    return loadFromStorage(memeName)
}

function saveCurrMeme(currMemeAsImgURL) {
    saveToStorage(`meme${gMeme.selectedImgId}`, gMeme)
    gMeme.newImageURL = currMemeAsImgURL
    gSavedMemes.push(gMeme)
    saveToStorage(savedMemesStorageKey,gSavedMemes)


}

function loadSavedMemes(){
    return loadFromStorage(savedMemesStorageKey)
}


function ChangeLineHeight(number) {
    getCurrLine().pos.y += number
}

function changeTextAlign(direction) {
    getCurrLine().align = direction
}

function changeColor(color) {
    getCurrLine().color = color
}

function changeTxtSize(number) {
    getCurrLine().size += number
}

function changeLineTxt(txt) {
    getCurrLine().txt = txt
}

function getMeme() {
    return gMeme
}

function getCurrLine() {
    return gMeme.lines[gMeme.selectedLineIdx]
}

function _createNewLine() {
    // const newLineHeight = getHeights().middleLine
    return {
        txt: '',
        size: lineSettings.size,
        align: 'left',
        color: lineSettings.color,
        pos: { y: getCanvasHeight() / 2 }
    }

}