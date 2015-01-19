### Node XLIFF

This library provides a suite of utilities for interacting with XLIFF 2.x DOMs

The library tries to adhere to the [XLIFF specification](http://docs.oasis-open.org/xliff/xliff-core/v2.0/xliff-core-v2.0.html) as closely as possible
Specifically the [core section](http://docs.oasis-open.org/xliff/xliff-core/v2.0/os/xliff-core-v2.0-os.html#core).

### About the XLIFF specification

The XLIFF 1.2 and 2.0 specifications are quite different, so node-xliff currently supports basic document operations on both specifications. 


### Testing

To run the tests, do:
`jasmine-node --color --verbose --captureExceptions --autotest test/ --watch .`


### Browserify

browserify xliffCreator.js --standalone xliff-creator > dist/xliffBundle.js


