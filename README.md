![CF](http://i.imgur.com/7v5ASc8.png) LAB 05
=================================================

##  baldMap

### Author: GB, SB, JE, HN

### Links and Resources
* [repo](https://github.com/baldmap)
* [travis](https://www.travis-ci.com/baldmap/baldmap)

### Modules
#### `transform.js`
##### Exported Values and Methods

###### `transformGreyscale(bitmap)`
Takes in a bitmap object and uses it's color array to make alterations to the bitmap's buffer. It then calls a rewrite function to write over the original buffer with the new color array. 

###### `bar(array) -> array`
Usage Notes or examples

### Setup
#### Running the app
* `npm start`
* Endpoint: `/foo/bar/`
  * Returns a JSON object with abc in it.
* Endpoint: `/bing/zing/`
  * Returns a JSON object with xyz in it.
  
#### Tests
* How do you run tests?
* What assertions were made?
* What assertions need to be / should be made?
