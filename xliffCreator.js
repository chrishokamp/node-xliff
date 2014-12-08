var cheerio = require('cheerio');

//$('h2.title').text('Hello there!');
//$('h2').addClass('welcome');

var senSplitter = new RegExp(".{0,}?(?:\\.|!|\\?)(?:(?=\\ [A-Z0-9])|$)", "g");
var splitSentences = function(text) {
  return text.match(senSplitter).map(function(sen) {
    return sen.trim();
  });
}

// note that the file id is hard-coded here

var xliffSkeleton = '<?xml version="1.0"?>' +
                    '<xliff xmlns="urn:oasis:names:tc:xliff:document:2.0" version="2.0">' +
                      '<file id="f1">' +
                      '</file>' +
                    '</xliff>';

var unitTemplate = '<unit >' +
                      '<segment>' +
                        '<source></source>' +
                        '<target></target>' +
                      '</segment>' +
                     '</unit>';

module.exports.createXlfFromSourceText = function(sourceLang, targetLang, sourceText) {

  // create a new XLIFF Skeleton
  var $xliff = cheerio.load(xliffSkeleton, {
    xmlMode            : true,
    decodeEntities     : true,
    normalizeWhitespace: true
  });

  // set srcLang and trgLang attrs
  $xliff('xliff').attr('srcLang', sourceLang);
  $xliff('xliff').attr('trgLang', targetLang);
  var sourceSens = splitSentences(sourceText);

  for (senIdx in sourceSens) {
    var $newUnit = cheerio.load(unitTemplate, {
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

