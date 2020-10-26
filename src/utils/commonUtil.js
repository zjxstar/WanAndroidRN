export function filterHtmlFromStr(str) {
    let content = str.replace(/<.+?>/g, '')
    content = content.replace(/&nbsp;/ig, '')
    content = content.replace(/&mdash;/ig, '—')
    content = content.replace(/&amp;amp;/ig, '&')
    return content
}

export function getToday() {
    let date = new Date()
    let year = date.getFullYear()
    let month = date.getMonth() + 1;
    if (month >= 1 && month <= 9) {
        month = "0" + month
    }
    let day = date.getDate()
    if (day >= 1 && day <= 9) {
        day = "0" + day
    }
    return year + "-" + month + "-" + day
}