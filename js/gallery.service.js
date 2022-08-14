'use strict'
let gFilterBy = ''
const gImgs = [
    { id: 1, url: 'images/1.jpg', keywords: ['president', 'mean', 'trump'] },
    { id: 2, url: 'images/2.jpg', keywords: ['dog', 'cute'] },
    { id: 3, url: 'images/3.jpg', keywords: ['baby', 'dog', 'cute'] },
    { id: 4, url: 'images/4.jpg', keywords: ['cat', 'sleepy'] },
    { id: 5, url: 'images/5.jpg', keywords: ['baby', 'success'] },
    { id: 6, url: 'images/6.jpg', keywords: ['explain', 'history'] },
    { id: 7, url: 'images/7.jpg', keywords: ['baby', 'surprise'] },
    { id: 8, url: 'images/8.jpg', keywords: ['wonder', 'clown'] },
    { id: 9, url: 'images/9.jpg', keywords: ['baby', 'laugh', 'evil'] },
    { id: 10, url: 'images/10.jpg', keywords: ['president', 'laugh', 'obama'] },
    { id: 11, url: 'images/11.jpg', keywords: ['kissing'] },
    { id: 12, url: 'images/12.jpg', keywords: ['pointing', 'interesting'] },
    { id: 13, url: 'images/13.jpg', keywords: ['cheering', 'leonardo di caprio'] },
    { id: 14, url: 'images/14.jpg', keywords: ['serious', 'matrix', 'sunglasses'] },
    { id: 15, url: 'images/15.jpg', keywords: ['one does not', 'lord of the rings'] },
    { id: 16, url: 'images/16.jpg', keywords: ['laugh', 'star trek'] },
    { id: 17, url: 'images/17.jpg', keywords: ['putin', 'president', 'success'] },
    { id: 18, url: 'images/18.jpg', keywords: ['buzz', 'toy story'] },
    { id: 19, url: 'images/One-Does-Not-Simply.jpg', keywords: ['one does not', 'lord of the rings'] },
    { id: 20, url: 'images/Oprah-You-Get-A.jpg', keywords: ['one does not', 'lord of the rings'] },
    { id: 21, url: 'images/patrick.jpg', keywords: ['laugh', 'star trek'] }


]

function getImgs() {
    const filterBy = gFilterBy.toLowerCase()
    if (gFilterBy !== ''){
        return gImgs.filter((img) => img.keywords.some(keyword=> keyword.includes(filterBy)))
    }

    return gImgs
}
function getImgById(id) {
    return gImgs.find((img) => img.id === id)
}

function updateFilter(filterBy){
    gFilterBy = filterBy
}
