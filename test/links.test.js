'use strict';

var assert = require('chai').assert;
var sinon = require('sinon');

describe('links#links', function() {
  //Create our middleware
  var links = require('./../lib/links')();

  it('should add links method to res object', function(done) {
    var res = {};

    assert.isNotFunction(!res.links);
    links(null, res, function() {
      assert.isFunction(res.links);
      done();
    });
  });

  it('links method should format header links correctly', function(done) {
    var res = {
      getHeader: sinon.stub().returns(null),
      setHeader: sinon.stub()
    };

    links(null, res, function() {
      var url = 'http://jonatan.nilsson.is';

      res.links({
        test: url
      });

      var args = res.setHeader.getCall(0).args;
      assert.equal(args[0], 'Link');
      assert.equal(args[1], '<' + url + '>; rel="test"');

      done();
    });
  });

  it('existing links should be kept and not overridden', function(done) {
    var prev = 'asdf';
    var res = {
      getHeader: sinon.stub().returns(prev),
      setHeader: sinon.stub()
    };

    links(null, res, function() {
      var url = 'http://jonatan.nilsson.is';

      res.links({
        test: url
      });

      var args = res.setHeader.getCall(0).args;
      assert.equal(args[0], 'Link');
      assert.equal(args[1], prev + ', <' + url + '>; rel="test"');

      done();
    });
  });
});
