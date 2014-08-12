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
  var link = this.get('Link') || '';
  if (link) { link += ', '; }
  return this.set('Link', link + Object.keys(links).map(function (rel) {
    return '<' + links[rel] + '>; rel="' + rel + '"';
  }).join(', '));
};


module.exports = function () {
  return function (req, res, next) {
    res.links = addLinks;
    next();
  }
};
