TweetGap
========

Author
------

Michael Brooks

- [michael.brooks@nitobi.com](mailto:michael.brooks@nitobi.com)
- [@mwbrooks](http://www.twitter.com/mwbrooks)
- [github.com/mwbrooks](http://www.github.com/mwbrooks)

API References
--------------

- [Twitter Search API Docs](http://dev.twitter.com/doc/get/search)
- [Twitter Search API Example](http://search.twitter.com/search.json?q=lion)

Desktop Development
-------------------

Open `www/index.html` in a Desktop Webkit browser (Safari, Chrome, etc)

PhoneGap JavaScript API is stubbed out in `www/phonegap.js`.
When the application is uploaded to the build server, `www/phonegap.js`
will be replaced by the platform-specific version.

Build Server
------------

1. Compress all files in `www`.
2. Create an application on the build server.
3. Upload the compressed archive.
4. If you check _Debug_ then you can use the Weinre WebInspector built into the build server.