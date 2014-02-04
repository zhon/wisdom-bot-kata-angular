Wisdom Sharing Bot Kata
=======================

Kata for learning mockist/interaction/London style TDD in AngularJS

Setup
-----

You will need `node/npm`_ and `git`_ installed.

You will also need `Chrome`_ (`Firefox`_ will work with a bit of
configuration).

.. code:: bash

    git clone https://github.com/zhon/wisdom-bot-kata-angular.git

    cd wisdom-bot-kata-angular/

`Grunt`_, `karma`_ and `bower`_ should be installed globally:

.. code:: bash

    npm -g install grunt-cli karma bower

The rest locally:

.. code:: bash

    npm install
    bower install

You will be editing ``src/app/home/``

To run the tests and the build

.. code:: bash

    grunt watch

To view your work load ``wisdom-bot-kata-angular/build/index.html`` into
your browser.

For more information take a look at the `seed project`_

Finish your **setup** by calling

.. code:: bash

    git checkout setup

Introduction
------------

+---------------------------------------------+----------------------------------------+
| I hear you want to try Mockist style TDD.   | I do! I do!                            |
+---------------------------------------------+----------------------------------------+
| What do you want to build?                  | A wisdom sharing bot in AngularJS.     |
+---------------------------------------------+----------------------------------------+
| We start by writing an acceptance test.     | Yes and for now they will be manual.   |
+---------------------------------------------+----------------------------------------+
| Why not automate it?                        | I will, just not in this Kata.         |
+---------------------------------------------+----------------------------------------+

Starting
--------

+-------------------------------------+-------------------------------------------------------+
| What is the test for *Hello World*? | Check the browser for *Hello* as *world* will change. |
+-------------------------------------+-------------------------------------------------------+
| It is time to write *Hello World*.  | In ``src/app/home`` I write                           |
|                                     | .. code:: html                                        |
|                                     |                                                       |
|                                     |     Hello World!                                      |
|                                     |                                                       |
+-------------------------------------+-------------------------------------------------------+


----

.. _node/npm: http://nodejs.org/
.. _git: http://git-scm.com/
.. _Chrome: https://www.google.com/intl/en/chrome/browser/
.. _Firefox: http://www.mozilla.org/en-US/firefox/new/
.. _Grunt: http://gruntjs.com/
.. _karma: https://github.com/karma-runner/karma
.. _bower: https://github.com/bower/bower
.. _seed project: https://github.com/ngbp/ngbp/tree/v0.3.1-release
