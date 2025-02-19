/* eslint-disable no-unused-vars */
/**
 * Access nested object variable from string
 * by Ray Bellis 
 * https://stackoverflow.com/a/6491621/23494595
 * @param {Object} o 
 * @param {String} s 
 * @returns 
 */
function byString(o, s) {
    s = s.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
    s = s.replace(/^\./, '');           // strip a leading dot
    var a = s.split('.');
    for (var i = 0, n = a.length; i < n; ++i) {
        var k = a[i];
        if (k in o) {
            o = o[k];
        } else {
            return;
        }
    }
    return o;
}