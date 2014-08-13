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
