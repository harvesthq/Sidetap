#Sidetap

We're working on it!

##Building Files Using Grunt

Sidetap's javascript and css are written using coffeescript and less respectively. Each of these file types must be compiled before they can be used by the browser. To do this easily, we're using the excellent [grunt build system](https://github.com/cowboy/grunt). To use the build system, you must first install [node](http://nodejs.org/) and [npm](http://npmjs.org/).

1. Install grunt: ``npm install grunt``
2. Install grunt-contrib: ``npm install grunt-contrib``
3. That's it.

There are a few available commands.

- ``grunt`` or ``grunt build``: build the css & js files
- ``grunt watch``: build the css & js files whenever the less or coffee files change
