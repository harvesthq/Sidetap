#Sidetap

Sidetap is a simple mobile framework that uses a hidden side navigation. It was inspired by Sparrow, Facebook and a number of apps that use the same navigation style.

##Features

- **Side-navigation:** It's the whole reason we built Sidetap.
- **Lightweight:** Sidetap's JS weighs in at about 10k... uncompressed and unminified. With minification and gzip, you're looking at a 2k asset. Not bad.
- **Device Support:** Sidetap starts by delivering a solid baseline experience and only adds the bells and whistles for iOS 5+. This allows us to support tons of devices without maxing out file size.
- **Makes Choices For You:** Sidetap demands a very specific html structure. This lets you focus on content instead of worrying about containers.
- **Simple:** Sidetap doesn't try and do too much. Its game is animating between content panels and it tries not to do too much else.
  
##How to Use Sidetap

1. **Build the HTML Structure**
    
    Sidetap uses a very specific HTML structure which can be found in the [skelton.html](https://github.com/harvesthq/Sidetap/blob/master/src/skeleton.html) file

2. **Instantiate Sidetap**
    
    Create a reference to Sidetap from within your app.
    
    ``myapp.sidetap = new sidetap()``

3. **Call Animations**

    Any time you want to show a new section, you just tell Sidetap which content element to animate. Sidetap will take care of clearing the stage using whatever animation is appropriate for the situation.
    
    ```javascript
    myapp.sidetap.show_section(element, options)
    ```
    
    **Show_section options:**

    - callback: a function to fire when the switch is complete
    - animation: an animation style to use (ios 5+ only). Current animations are upfrombottom, downfromtop, infromright, infromleft

##Building Files Using Grunt

Sidetap's javascript and css are written using coffeescript and less respectively. Each of these file types must be compiled before they can be used by the browser. To do this easily, we're using the excellent [grunt build system](https://github.com/cowboy/grunt). To use the build system, you must first install [node](http://nodejs.org/) and [npm](http://npmjs.org/).

1. Install grunt: ``npm install -g grunt``
2. Install grunt-contrib: ``npm install grunt-contrib``
3. That's it.

There are a few available commands.

- ``grunt`` or ``grunt build``: build the css & js files
- ``grunt watch``: build the css & js files whenever the less or coffee files change

##Development Roadmap

As with any software project, there's always room for improvement. These are some of the things we'd like to get added to Sidetap in the future.

- More iOS-like header animations
- Better touch support
- Leaving side navigation open on larger screen devices (hello, iPad)
- Bringing polished version to more devices.