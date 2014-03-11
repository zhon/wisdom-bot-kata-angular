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

You will be editing ``src/app/chatroom/``

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

+-------------------------------------+---------------------------------------------------------------+
| What is the test for *Hello World*? | Check the webpage ``build/index.html`` for "Hello".           |
+-------------------------------------+---------------------------------------------------------------+
| It is time to write *Hello World*.  | In ``src/app/chatroom/chatroom.tpl.html`` I write             |
|                                     |                                                               |
|                                     | .. code:: html                                                |
|                                     |                                                               |
|                                     |     Hello World!                                              |
|                                     |                                                               |
+-------------------------------------+---------------------------------------------------------------+
| Should't "World" be a variable?     | Sure! I can do that with simple scope binding:                |
|                                     |                                                               |
|                                     | ``src/app/chatroom/chatroom.tpl.html``                        |
|                                     |                                                               |
|                                     | .. code:: html                                                |
|                                     |                                                               |
|                                     |   Hello {{user}}!                                             |
|                                     |                                                               |
|                                     |                                                               |
|                                     | ``src/app/chatroom/chatroom.js``                              |
|                                     |                                                               |
|                                     | .. code:: js                                                  |
|                                     |                                                               |
|                                     |   .controller( 'ChatroomCtrl', function ( $scope ) {          |
|                                     |     $scope.user = 'World';                                    |
|                                     |   })                                                          |
|                                     |                                                               |
+-------------------------------------+---------------------------------------------------------------+
| You didn't write a test and this is | I don't write tests for simple scope bindings. They           |
| a TDD kata.                         | couldn't possibly break.                                      |
+-------------------------------------+---------------------------------------------------------------+
| How are we going to get the user?   | The user will be entered in a form                            |
|                                     |                                                               |
|                                     | ``src/app/chatroom/chatroom.tpl.html``                        |
|                                     |                                                               |
|                                     | .. code:: html                                                |
|                                     |                                                               |
|                                     |     <form>                                                    |
|                                     |       <label>Name:</label>                                    |
|                                     |       <input ng-model="username" />                           |
|                                     |     </form>                                                   |
|                                     |     <hr/>                                                     |
+-------------------------------------+---------------------------------------------------------------+
| We need to input our message.       | We will just **change** the form a little to get both the     |
|                                     | username and message.                                         |
|                                     |                                                               |
|                                     | ``src/app/chatroom/chatroom.tpl.html``                        |
|                                     |                                                               |
|                                     | .. code:: html                                                |
|                                     |                                                               |
|                                     |     <form>                                                    |
|                                     |       <label>Name:</label>                                    |
|                                     |       <input ng-model="message.username" />                   |
|                                     |       <br />                                                  |
|                                     |       <label>Message:</label>                                 |
|                                     |       <input ng-model="message.text" />                       |
|                                     |     </form>                                                   |
|                                     |     <hr/>                                                     |
|                                     |                                                               |
|                                     | And to see it we will **replace** ``Hello {{username}}`` with |
|                                     |                                                               |
|                                     | ``src/app/chatroom/chatroom.tpl.html``                        |
|                                     |                                                               |
|                                     | .. code:: html                                                |
|                                     |                                                               |
|                                     |  <div class='chatbox'>                                        |
|                                     |    <ul>                                                       |
|                                     |     <li>                                                      |
|                                     |      <span class='username'>                                  |
|                                     |        {{message.username}}                                   |
|                                     |      </span>                                                  |
|                                     |      <span class='message'>                                   |
|                                     |          {{message.text}}                                     |
|                                     |        </span>                                                |
|                                     |      </li>                                                    |
|                                     |    </ul>                                                      |
|                                     |  </div>                                                       |
+-------------------------------------+---------------------------------------------------------------+

Test: Message is Saved
----------------------

+-------------------------------------+-------------------------------------------------------------------+
| With the UI for entering a name and | We will store the message (with the username and text) in a       |
| a message, what shall we do next?   | message repository.                                               |
+-------------------------------------+-------------------------------------------------------------------+
| Great! And...                       | First we write the test:                                          |
|                                     |                                                                   |
|                                     | ``src/app/chatroom/chatroom.test.js``                             |
|                                     |                                                                   |
|                                     | .. code:: js                                                      |
|                                     |                                                                   |
|                                     | describe('chatroomController', function () {                      |
|                                     |  var scope, controller, mockMessageRepository;                    |
|                                     |                                                                   |
|                                     |  beforeEach(function () {                                         |
|                                     |    module("app.chatroom");                                        |
|                                     |                                                                   |
|                                     |    inject(function ($rootScope, $controller, MessageRepository) { |
|                                     |      scope = $rootScope.$new();                                   |
|                                     |      mockMessageRepository = sinon.mock(MessageRepository);       |
|                                     |      controller = $controller("ChatroomCtrl", { $scope: scope }); |
|                                     |    });                                                            |
|                                     |  });                                                              |
|                                     |                                                                   |
|                                     |  describe('when a message is published it', function () {         |
|                                     |                                                                   |
|                                     |    it ('posts to MessageRepository', function () {                |
|                                     |      message = {                                                  |
|                                     |        'username': 'RedQueen',                                    |
|                                     |        'text': 'Off with her head!'                               |
|                                     |      };                                                           |
|                                     |      mockMessageRepository.expects("post").calledWith(message);   |
|                                     |      scope.publish();                                             |
|                                     |      mockMessageRepository.verify();                              |
|                                     |    });                                                            |
|                                     |                                                                   |
|                                     |  });                                                              |
|                                     |                                                                   |
|                                     | });                                                               |
+-------------------------------------+-------------------------------------------------------------------+
| I am getting an error when I run    | Yes, and that error is telling you to add method ``post`` to      |
|                                     | ``MessageRepository``                                             |
| your test.                          |                                                                   |
|                                     | ``src/app/chatroom/chatroom.js``                                  |
|                                     |                                                                   |
|                                     | .. code:: js                                                      |
|                                     |                                                                   |
|                                     |   .service( 'MessageRepository', function () {                    |
|                                     |     return {                                                      |
|                                     |       post: function () {                                         |
|                                     |       }                                                           |
|                                     |     }                                                             |
|                                     |   })                                                              |
+-------------------------------------+-------------------------------------------------------------------+
| Now when you run the test what do   | An Error. It is telling me I need ``publish`` on ``ChatroomCtrl`` |
|                                     | ``$scope``                                                        |
| you see?                            |                                                                   |
|                                     | ``src/app/chatroom/chatroom.js``                                  |
|                                     |                                                                   |
|                                     | .. code:: js                                                      |
|                                     |                                                                   |
|                                     |   .controller( 'ChatroomCtrl', function ( $scope ) {              |
|                                     |     $scope.publish = function () { };                             |
|                                     |   })                                                              |
+-------------------------------------+-------------------------------------------------------------------+

Test: Message is Saved - Failing
--------------------------------

+--------------------------------------+-------------------------------------------------------------------+
| Now what do you see when running the | Yeah! I see a **Failing** test.                                   |
| test?                                |                                                                   |
+--------------------------------------+-------------------------------------------------------------------+



----

.. _node/npm: http://nodejs.org/
.. _git: http://git-scm.com/
.. _Chrome: https://www.google.com/intl/en/chrome/browser/
.. _Firefox: http://www.mozilla.org/en-US/firefox/new/
.. _Grunt: http://gruntjs.com/
.. _karma: https://github.com/karma-runner/karma
.. _bower: https://github.com/bower/bower
.. _seed project: https://github.com/ngbp/ngbp/tree/v0.3.1-release
