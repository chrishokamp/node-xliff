var cheerio = require('cheerio');

var xliffCreator = {
  parsers: {}
};

// PARSING
// Splits sentences based upon punctutation
var senSplitter = new RegExp(".{0,}?(?:\\.|!|\\?)(?:(?=\\ [A-Z0-9])|$)", "g");
xliffCreator.parsers.splitSentences = function(text) {
  return text.trim().match(senSplitter).map(function(sen) {
    return sen.trim();
  });
};

xliffCreator.parsers.splitLines = function(text) {
  return text.trim().split('\n').map(function(sen) {
    return sen.trim();
  });
};

// END PARSING

// Creating XLIFF Documents from monolingual strings
// - these functions handle the usecase where user has a rawtext file of strings that they want to translate

// The skeleton for an Xliff2 document
// note that the file id is hard-coded here
var xliff2Skeleton = '<?xml version="1.0"?>' +
                    '<xliff xmlns="urn:oasis:names:tc:xliff:document:2.0" version="2.0">' +
                      '<file id="f1">' +
                      '</file>' +
                    '</xliff>';

var xliff2UnitTemplate = '<unit>' +
                      '<segment>' +
                        '<source/>' +
                        '<target></target>' +
                      '</segment>' +
                     '</unit>';

// The skeleton for an Xliff1 document
// note that the file id is hard-coded here
var xliff1Skeleton = '<?xml version="1.0"?>' +
  '<xliff version="1.2">' +
  '<file id="f1">' +
  '<body></body>' +
  '</file>' +
  '</xliff>';

var xliff1TransUnitTemplate = '<trans-unit >' +
  '<source/>' +
  '<target/>' +
  '</trans-unit>';


xliffCreator.createXlf2FromSourceText = function(sourceLang, targetLang, sourceSens) {

  // create a new XLIFF Skeleton
  var $xliff = cheerio.load(xliff2Skeleton, {
    xmlMode            : true,
    decodeEntities     : true,
    normalizeWhitespace: true
  });

  // set srcLang and trgLang attrs
  $xliff('xliff').attr('srcLang', sourceLang);
  $xliff('xliff').attr('trgLang', targetLang);

  for (senIdx in sourceSens) {
    var $newUnit = cheerio.load(xliff2UnitTemplate, {
      xmlMode            : true,
      decodeEntities     : true,
      normalizeWhitespace: true
    });

    // <unit> elements must have an id
    $newUnit('unit').attr('id', 'u' + senIdx);
    // set the source text of this element
    $newUnit('source').text(sourceSens[senIdx]);
    $xliff('file').append($newUnit.xml());
  }

  return $xliff.xml();
}

// Create an XLIFF 1.2 file from source text
xliffCreator.createXlf1FromSourceText = function(sourceLang, targetLang, sourceSens) {

  // create a new XLIFF Skeleton
  var $xliff = cheerio.load(xliff1Skeleton, {
    xmlMode            : true,
    decodeEntities     : true,
    normalizeWhitespace: true
  });

  // set srcLang and trgLang attrs
  $xliff('file').attr('source-language', sourceLang);
  $xliff('file').attr('target-language', targetLang);

  for (senIdx in sourceSens) {
    var $newUnit = cheerio.load(xliff1TransUnitTemplate, {
      xmlMode            : true,
      decodeEntities     : true,
      normalizeWhitespace: true
    });

    // <unit> elements must have an id
    $newUnit('trans-unit').attr('id', 'tu' + senIdx);
    // set the source text of this element
    $newUnit('source').text(sourceSens[senIdx]);
    $xliff('body').append($newUnit.xml());
  }

  return $xliff.xml();
}

module.exports = xliffCreator;
