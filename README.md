#Sidetap

We built Sidetap to be an easy-to-use implementation of the side navigation pattern popularized by apps like Sparrow and Facebook. It solves many common mobile development problems right out of the box. Here are some of the specific things we like about it:

- **Lightweight**: Sidetap only weighs 2k when minifyied and gzipped!
- **Device Support**: Sidetap aims to always deliver the best possible experience for all devices by starting with a basic experience and progressively enhancing it for more capable devices.
- **Less Decisions to Make**: By embracing convention over configuration, Sidetap let’s you start building your mobile interfaces right away.
- **Simple**: Sidetap provides a flexible foundation for navigating between content panels on mobile devices using an easy-to-use syntax.

[See it in action](http://harvesthq.github.com/Sidetap/demo/stonehenge/index.html).

##How to Use Sidetap

1. **Build the HTML Structure**
    
    Sidetap uses a very specific HTML structure which can be found in the [skelton.html](https://github.com/harvesthq/Sidetap/blob/master/src/skeleton.html) file

2. **Instantiate Sidetap**
    
    Create a reference to Sidetap from within your app.
    
    ``var my_sidetap = new sidetap();``

3. **Call Animations**

    Any time you want to show a new section, you just tell Sidetap which content element to animate. Sidetap will take care of clearing the stage using whatever animation is appropriate for the situation.
    
    ```javascript
    my_sidetap.show_section(element, options);
    ```
    
    **show_section options:**  
    ``callback``: a function to fire when the switch is complete  
    ``animation``: an animation style to use (ios 5+ only). Current animations are upfrombottom, downfromtop, infromright, infromleft

##Dependency

Requires jQuery (only tested with 1.7.2) or Zepto.js.

##Building Files Using Grunt

Sidetap's javascript and css are written using coffeescript and less respectively. Each of these file types must be compiled before they can be used by the browser. To do this easily, we're using the excellent [grunt build system](https://github.com/cowboy/grunt). To use the build system, you must first install [node](http://nodejs.org/) and [npm](http://npmjs.org/).

1. Install grunt: ``npm install -g grunt``
2. Install grunt-contrib: ``npm install grunt-contrib``
3. That's it.

There are a few available commands.

- ``grunt`` or ``grunt build``: build the css & js files
- ``grunt watch``: build the css & js files whenever the less or coffee files change

##Reporting Issues & Contributing

We welcome your input, but strongly encourage you to read Nicolas Gallagher's excellent [issue guidelines](https://github.com/necolas/issue-guidelines/blob/master/README.md) before filing an issue or opening a pull request. While these are guidelines are his projects specifically, they would serve as an excellent guide for contributing to any open source project.

##Development Roadmap

As with any software project, there's always room for improvement. These are some of the things we'd like to get added to Sidetap in the future.

- More iOS-like header animations
- Better touch support
- Leaving side navigation open on larger screen devices (hello, iPad)
- Bringing polished version to more devices.