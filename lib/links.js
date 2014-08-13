'use strict';

/**
 * Set Link header field with the given `links`.
 *
 * Examples:
 *
 *    res.links({
 *      next: 'http://api.example.com/users?page=2',
 *      last: 'http://api.example.com/users?page=5'
 *    });
 *
 * @param {Object} links
 * @return {ServerResponse}
 * @api public
 */

function addLinks (links) {
  /*jshint validthis:true */
  var link = this.getHeader('Link') || '';
  if (link) {
    link += ', ';
  }
  return this.setHeader('Link', link + Object.keys(links).map(function (rel) {
    return '<' + links[rel] + '>; rel="' + rel + '"';
  }).join(', '));
}


module.exports = function () {
  return function (req, res, next) {
    res.links = addLinks.bind(res);
    next();
  };
};
