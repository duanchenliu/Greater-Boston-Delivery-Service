(function (jsPDFAPI) {
var font = 'undefined';
var callAddFont = function () {
this.addFileToVFS('chinese-normal.ttf', font);
this.addFont('chinese-normal.ttf', 'chinese', 'normal');
};
jsPDFAPI.events.push(['addFonts', callAddFont])
 })(jsPDF.API);