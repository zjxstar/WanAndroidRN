export function filterHtmlFromStr(str) {
    let content = str.replace(/<.+?>/g, '')
    content = content.replace(/&nbsp;/ig, '')
    content = content.replace(/&mdash;/ig, '—')
    return content
}