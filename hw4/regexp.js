function singleToDoubleQuote(str) {
    return str.replace(/'/g,'"');
}

function ignoreApostropheReplace(str) {
    return str.replace(/( ')/g,' "').
    replace(/('\n)/g,' "\n').
    replace(/(`)$/g,' "');
}
