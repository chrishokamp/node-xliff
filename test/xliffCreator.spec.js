// parse raw text into sentences
var xliffCreator = require('../xliffCreator');

describe('xliffCreator', function () {
  var sampleXliff2_point_0, sampleXliff1_point_2;

  beforeEach(function() {
    // example from XLIFF test suite
    // http://tools.oasis-open.org/version-control/browse/wsvn/xliff/trunk/xliff-20/test-suite/core/valid/sourceOnly.xlf
    sampleXliff2_point_0 = '<?xml version="1.0"?>' +
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


    // english - japanese example from wikipedia - http://en.wikipedia.org/wiki/XLIFF#Description_.28XLIFF_1.2.29
    sampleXliff1_point_2 = '<?xml version="1.0"?>' +
    '<xliff version="1.2">' +
    '<file id="f1" ' +
    'source-language="en-US" target-language="de-DE"' +
    '>' +
    '<body>' +
    '<trans-unit id="tu0">' +
    '<source>This is sentence one.</source>' +
    '<target/>' +
    '</trans-unit>' +
    '<trans-unit id="tu1">' +
    '<source>This is sentence two.</source>' +
    '<target/>' +
    '</trans-unit>' +
    '</body>' +
    '</file>' +
    '</xliff>';
  });

  describe('Sentence parsing tests', function () {

    it('It should be able to split sentences based on punctuation', function() {
      var sourceText = 'This is sentence one. This is sentence two.';
      var sens = xliffCreator.parsers.splitSentences(sourceText);
      expect(sens).toEqual(['This is sentence one.', 'This is sentence two.']);
    });

    it('should be able to create an XLIFF from a file of source lines', function() {
      var sourceText = 'This is sentence one.\nThis is sentence two.';
      var sens = xliffCreator.parsers.splitLines(sourceText);
      expect(sens).toEqual(['This is sentence one.', 'This is sentence two.']);
    });

  });

  describe('Creating Xliff 1.2 and 2.0 files from raw text', function () {

    it('Should be able to take raw text and create an XLIFF 1.2 DOM', function() {
      var sourceLang = 'en-US';
      var targetLang = 'de-DE';
      var sourceText = 'This is sentence one. This is sentence two.';

      var xliff = xliffCreator.createXlf1FromSourceText(sourceLang, targetLang, xliffCreator.parsers.splitSentences(sourceText));
      expect(xliff).toEqual(sampleXliff1_point_2);
    });

    it('It should take raw text and create an XLIFF 2.0 DOM', function() {
      var sourceLang = 'en';
      var targetLang = 'de';
      var sourceText = 'This is sentence one. This is sentence two.';

      var xliff = xliffCreator.createXlf2FromSourceText(sourceLang, targetLang, xliffCreator.parsers.splitSentences(sourceText));
      expect(xliff).toEqual(sampleXliff2_point_0);
    });


  });
});
