'use strict';

/**
 * Set Link header field with the given `links`.
 *
 * Examples:
 *
 *  res.links({
 *    next: 'http://api.example.com/users?page=2',
 *    last: 'http://api.example.com/users?page=5'
 *  });
 *
 * @param {Object} links
 * @return {ServerResponse}
 * @api public
 */

function makeLink(rel, ldo) {
  var i, key, keys, result;

  if (typeof ldo === 'string') {
    return '<' + ldo + '>; rel="' + rel + '"';
  }

  result = '<' + ldo.href + '>; rel="' + rel + '"';
  keys = Object.keys(ldo);

  for (i = 0; i < keys.length; i += 1) {
    key = keys[i];

    if (key !== 'href' && key !== 'rel') {
      result += '; ' + key + '="' + ldo[key] + '"';
    }
  }

  return result;
}

function addLinks(links) {
  /*jshint validthis:true */
  var arr, i, linkHeader, linkIndex, linkRels, rel;

  linkHeader = this.getHeader('Link') || '';
  linkRels = Object.keys(links);

  for (linkIndex = 0; linkIndex < linkRels.length; linkIndex += 1) {
    rel = linkRels[linkIndex];
    arr = links[rel];

    // Force to be an array
    if (!Array.isArray(arr)) {
      arr = [
        arr
      ];
    }

    for (i = 0; i < arr.length; i += 1) {
      if (linkHeader) {
        linkHeader += ', ';
      }

      linkHeader += makeLink(rel, arr[i]);
    }
  }

  return this.setHeader('Link', linkHeader);
}


module.exports = function () {
  return function (req, res, next) {
    res.links = addLinks.bind(res);
    next();
  };
};
