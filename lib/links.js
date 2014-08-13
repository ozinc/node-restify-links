'use strict';

module.exports = function() {
  return function (req, res, next) {
    res.links = function(links) {
      var link = this.getHeader('Link') || '';
      if (link) {
        link += ', ';
      }
      return this.setHeader('Link', link + Object.keys(links).map(function(rel) {
        return '<' + links[rel] + '>; rel="' + rel + '"';
      }).join(', '));
    }.bind(res);
    next();
  };
};
