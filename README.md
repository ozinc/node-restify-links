node-restify-links
==================

Middleware that adds the [res.links](http://expressjs.com/api#res.links) function from [Express](http://expressjs.com/) to Restify responses objects.


## Usage

Join the given links to populate the "Link" response header field.

```javascript
res.links({
    next: 'http://api.example.com/users?page=2',
    last: 'http://api.example.com/users?page=5'
});
```

yields:

```
Link: <http://api.example.com/users?page=2>; rel="next", 
      <http://api.example.com/users?page=5>; rel="last"
```

This library also works for link definition objects and arrays, allowing one to construct significantly more complex and descriptive link relations.  You can mix and match as needed, plus keep adding to the list of links.

```javascript
res.links({
    next: "http://api.example.com/users?page=2",
    self: "http://api.example.com/users",
    search: "http://api.example.com/users{?username,firstname,lastname}"
});
res.links({
    last: "http://api.example.com/users?page=5",
    stylesheet: {
        href: "http://static.example.com/ss.css",
        type: "text/css"
    },
    up: [
        "http://api.example.com/"
    ],
    service: [
        {
            href: "https://api.example.com/auth",
            method: "post",
            profile: "/schemas/auth",
            title: "auth"
        }
    ]
});
```

results in:

```
Link: <http://api.example.com/users>; rel="self",
      <http://api.example.com/users?page=2>; rel="next",
      <http://api.example.com/users{?username,firstname,lastname}>; rel="search",
      <http://api.example.com/users?page=5>; rel="last",
      <http://static.example.com/ss.css>; rel="stylesheet"; type="text/css",
      <http://api.example.com/>; rel="up",
      <https://api.example.com/auth>; rel="service"; method="post"; profile="/schemas/auth"; title="auth"
```

This greatly assists with working with REST level 3 (Hypermedia) APIs and making the resources self-describing.  In fact, the link definition objects are compatible with [JSON Schema for Hypermedia](http://json-schema.org/latest/json-schema-hypermedia.html#rfc.section.5) and [HAL Link Objects](https://tools.ietf.org/html/draft-kelly-json-hal-06#section-5).  It can use the `link-extension` part of the [Web Linking](https://tools.ietf.org/html/rfc5988#section-5) specification.
