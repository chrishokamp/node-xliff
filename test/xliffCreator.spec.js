// parse raw text into sentences
var xliffCreator = require('../xliffCreator');

// function createXLIFF(sourceLang, targetLang, sourceText, targetText)
// targetText is likely to be null if we are creating the Xliff from scratch

describe('', function () {

  it('It should take raw text and create an XLIFF 2.0 DOM', function() {
    var sourceLang = 'en';
    var targetLang = 'de';
    var sourceText = 'This is sentence one. This is sentence two.';

    // example from XLIFF test suite
      // http://tools.oasis-open.org/version-control/browse/wsvn/xliff/trunk/xliff-20/test-suite/core/valid/sourceOnly.xlf
     var sampleXliff = '<?xml version="1.0"?>' +
       '<xliff xmlns="urn:oasis:names:tc:xliff:document:2.0" version="2.0" srcLang="en" trgLang="de">' +
        '<file id="f1">' +
          '<unit id="u0">' +
            '<segment>' +
              '<source>This is sentence one.</source>' +
              '<target/>' +
            '</segment>' +
          '</unit>' +
          '<unit id="u1">' +
           '<segment>' +
             '<source>This is sentence two.</source>' +
             '<target/>' +
           '</segment>' +
          '</unit>' +
        '</file>' +
       '</xliff>';

    var xliff = xliffCreator.createXlfFromSourceText(sourceLang, targetLang, sourceText);
    console.log(xliff);
    console.log(sampleXliff);
    expect(xliff).toEqual(sampleXliff);
  });

  it('Should be able to output the XLIFF DOM as a string', function() {


  });

});




