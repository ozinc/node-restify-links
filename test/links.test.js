'use strict';

var assert = require('chai').assert;
var sinon = require('sinon');

function checkGenerator(links, prev, input, expected) {
    var res;

    res = {
        getHeader: sinon.stub().returns(prev),
        setHeader: sinon.stub()
    };

    return function (done) {
        links(null, res, function () {
            var args;

            res.links(input);
            args = res.setHeader.getCall(0).args;
            assert.equal(args[0], 'Link');
            assert.equal(args[1], expected);
            done();
        });
    };
}


describe('links#links', function () {
    //Create our middleware
    var links = require('./../lib/links')();

    it('adds links method to res object', function (done) {
        var res = {};

        assert.isNotFunction(!res.links);
        links(null, res, function() {
            assert.isFunction(res.links);
            done();
        });
    });

    it('formats header links correctly', checkGenerator(links, null, {
        test: 'http://jonatan.nilsson.is'
    }, '<http://jonatan.nilsson.is>; rel="test"'));

    it('preserves existing links', checkGenerator(links, 'previous', {
        test: 'http://jonatan.nilsson.is'
    }, 'previous, <http://jonatan.nilsson.is>; rel="test"'));

    it('works with an array', checkGenerator(links, 'something', {
        up: [
            'aaaa',
            'bbbb'
        ]
    }, 'something, <aaaa>; rel="up", <bbbb>; rel="up"'));

    it('converts objects', checkGenerator(links, 'flowers', {
        obj: {
            href: 'required',
            rel: 'IGNORED!',
            something: 'blah'
        }
    }, 'flowers, <required>; rel="obj"; something="blah"'));

    it('converts mixed input', checkGenerator(links, null, {
        one: 'one',
        two: [
            'two-1',
            {
                href: 'two-2',
                good: 'yes'
            }
        ],
        three: {
            href: 'three',
            profile: '/#three'
        }
    }, '<one>; rel="one", <two-1>; rel="two", <two-2>; rel="two"; good="yes", <three>; rel="three"; profile="/#three"'));
});
