/**
 * 将字符串中的html标签转义
 * @param {String} str 待处理字符串
 */
export function filterHtmlFromStr(str) {
    let content = str.replace(/<.+?>/g, '')
    content = content.replace(/&nbsp;/ig, '')
    content = content.replace(/&mdash;/ig, '—')
    content = content.replace(/&amp;amp;/ig, '&')
    content = content.replace(/&amp;/ig, '&')
    content = content.replace(/&ldquo;/ig, '“')
    content = content.replace(/&rdquo;/ig, '”')
    return content
}

/**
 * 获取今天的日期，格式：yyyy-MM-DD
 */
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