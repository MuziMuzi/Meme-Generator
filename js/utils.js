'use strict'
function getRandomInt(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function makeRandomText(wordCount) {
    const words = ['LOL', 'FUNNY', 'OMG', 'MEME', 'BRO', 'CRAZY', 'DUDE', 'JEWS', 'BOMB', 'MONEY', 'VODKA', 'BECAUSE', 'WHY', 'NOT', 'WOW']
    let word = ''
    for (let i = 0; i < wordCount; i++) {
        word += ` ${words[getRandomInt(0, words.length - 1)]}`
    }
    return word
}   