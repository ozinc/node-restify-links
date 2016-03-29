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

function addLinks(links) {
  /*jshint validthis:true */
  var linkHeader;

  linkHeader = this.getHeader('Link') || '';

  Object.keys(links).map(function (rel) {
    // Force to be an array
    [].concat(links[rel]).forEach(function (ldo) {
      if (linkHeader) {
        linkHeader += ', ';
      }

      if (typeof ldo === 'string') {
        linkHeader += '<' + ldo + '>; rel="' + rel + '"';
      } else {
        linkHeader += '<' + ldo.href + '>; rel="' + rel + '"';
        Object.keys(ldo).forEach(function (key) {
          if (key !== 'href' && key !== 'rel') {
            linkHeader += '; ' + key + '="' + ldo[key] + '"';
          }
        });
      }
    });
  });

  return this.setHeader('Link', linkHeader);
}


module.exports = function () {
  return function (req, res, next) {
    res.links = addLinks.bind(res);
    next();
  };
};
