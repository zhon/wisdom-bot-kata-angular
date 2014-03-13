Wisdom Sharing Bot Kata
=======================

Kata for learning mockist/interaction/London style TDD in AngularJS

Setup
-----

You will need `node/npm`_ and `git`_ installed.

You will also need `Chrome`_ (`Firefox`_ will work with a bit of configuration).

.. code:: bash

    git clone https://github.com/zhon/wisdom-bot-kata-angular.git

    cd wisdom-bot-kata-angular/

`Grunt`_, `karma`_ and `bower`_ will be installed globally with the ``-g`` flag:

.. code:: bash

    npm -g install grunt-cli karma bower

The rest will be installed in the current directory by calling:

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


Introduction
------------

+-------------------------------------------+---------------------------------------------+
| I hear you want to try Mockist style TDD. | I do! I do!                                 |
+-------------------------------------------+---------------------------------------------+
| What do you want to build?                | A chat room with a wisdom bot in AngularJS. |
+-------------------------------------------+---------------------------------------------+
| We start by writing an acceptance test.   | Yes and for now they will be manual.        |
+-------------------------------------------+---------------------------------------------+
| Why not automate it?                      | I will, just not in this Kata.              |
+-------------------------------------------+---------------------------------------------+

Starting
--------

+-------------------------------------+----------------------------------------------------------------+
| What is the test for *Hello World*? | Manually by checking webpage ``build/index.html`` for "Hello". |
+-------------------------------------+----------------------------------------------------------------+
| How would you write *Hello World*.  | In ``src/app/chatroom/chatroom.tpl.html`` I write              |
|                                     |                                                                |
|                                     | .. code:: html                                                 |
|                                     |                                                                |
|                                     |     Hello World!                                               |
|                                     |                                                                |
+-------------------------------------+----------------------------------------------------------------+
| Should't "World" be a variable?     | Sure! I can do that with simple scope binding:                 |
|                                     |                                                                |
|                                     | ``src/app/chatroom/chatroom.tpl.html``                         |
|                                     |                                                                |
|                                     | .. code:: html                                                 |
|                                     |                                                                |
|                                     |   Hello {{user}}!                                              |
|                                     |                                                                |
|                                     |                                                                |
|                                     | ``src/app/chatroom/chatroom.js``                               |
|                                     |                                                                |
|                                     | .. code:: js                                                   |
|                                     |                                                                |
|                                     |   .controller( 'ChatroomCtrl', function ( $scope ) {           |
|                                     |     $scope.user = 'World';                                     |
|                                     |   })                                                           |
|                                     |                                                                |
+-------------------------------------+----------------------------------------------------------------+
| You didn't write a test and this is | I don't write tests for simple scope bindings. They            |
| a TDD kata.                         | couldn't possibly break.                                       |
+-------------------------------------+----------------------------------------------------------------+
| How are we going to get the user?   | The user will be entered in a form                             |
|                                     |                                                                |
|                                     | ``src/app/chatroom/chatroom.tpl.html``                         |
|                                     |                                                                |
|                                     | .. code:: html                                                 |
|                                     |                                                                |
|                                     |     <form>                                                     |
|                                     |       <label>Name:</label>                                     |
|                                     |       <input ng-model="user" />                                |
|                                     |     </form>                                                    |
|                                     |     <hr/>                                                      |
+-------------------------------------+----------------------------------------------------------------+
| We need to input our message.       | We will just **change** the form a little to get both the      |
|                                     | user and message.                                              |
|                                     |                                                                |
|                                     | ``src/app/chatroom/chatroom.tpl.html``                         |
|                                     |                                                                |
|                                     | .. code:: html                                                 |
|                                     |                                                                |
|                                     |     <form>                                                     |
|                                     |       <label>Name:</label>                                     |
|                                     |       <input ng-model="message.user" />                        |
|                                     |       <br />                                                   |
|                                     |       <label>Message:</label>                                  |
|                                     |       <input ng-model="message.text" />                        |
|                                     |     </form>                                                    |
|                                     |     <hr/>                                                      |
|                                     |                                                                |
|                                     | And to see it we will **replace** ``Hello {{user}}`` with      |
|                                     |                                                                |
|                                     | ``src/app/chatroom/chatroom.tpl.html``                         |
|                                     |                                                                |
|                                     | .. code:: html                                                 |
|                                     |                                                                |
|                                     |  <div class='chatbox'>                                         |
|                                     |    <ul>                                                        |
|                                     |     <li>                                                       |
|                                     |      <span class='user'>                                       |
|                                     |        {{message.user}}                                        |
|                                     |      </span>                                                   |
|                                     |      <span class='message'>                                    |
|                                     |          {{message.text}}                                      |
|                                     |        </span>                                                 |
|                                     |      </li>                                                     |
|                                     |    </ul>                                                       |
|                                     |  </div>                                                        |
+-------------------------------------+----------------------------------------------------------------+

Test: Message is Saved
----------------------

+-------------------------------------+----------------------------------------------------------------------+
| With the UI for entering a name and | We will store the message (user and text) in a message               |
| a message, what shall we do next?   | repository.                                                          |
+-------------------------------------+----------------------------------------------------------------------+
| Great! And...                       | First I write the skeleton of an angular the It starts with a        |
|                                     | ``describe`` **something** in this case a ``controller``.            |
|                                     |                                                                      |
|                                     | For ``controller`` tests we usually need ``scope``.                  |
|                                     |                                                                      |
|                                     | This is followed by a ``beforeEach`` which setup up the test for     |
|                                     | the ``module`` (``app.chatroom``) and injects the objects we need    |
|                                     | (``$rootScope`` and ``$controller``).                                |
|                                     |                                                                      |
|                                     | Next we have another ``describe`` with an ``it`` inside (the         |
|                                     | actual test).                                                        |
|                                     |                                                                      |
|                                     | ``src/app/chatroom/chatroom.test.js``                                |
|                                     |                                                                      |
|                                     | .. code:: js                                                         |
|                                     |                                                                      |
|                                     |   describe('chatroomController', function () {                       |
|                                     |     var scope  ;                                                     |
|                                     |                                                                      |
|                                     |     beforeEach(function () {                                         |
|                                     |       module("app.chatroom");                                        |
|                                     |                                                                      |
|                                     |       inject(function ( $rootScope,                                  |
|                                     |                         $controller,                                 |
|                                     |                       ) {                                            |
|                                     |       });                                                            |
|                                     |     });                                                              |
|                                     |                                                                      |
|                                     |     describe('when a message is published it', function () {         |
|                                     |                                                                      |
|                                     |       it ('posts to MessageRepository', function () {                |
|                                     |       });                                                            |
|                                     |                                                                      |
|                                     |     });                                                              |
|                                     |   });                                                                |
+-------------------------------------+----------------------------------------------------------------------+
| After template, then?               | I fill in the test. It requires a mock. I will set that up in the    |
|                                     | ``beforeEach`` as it will be used for mutiple tests.                 |
|                                     |                                                                      |
|                                     | The test is simple, assert when ``scope.publish`` is called, we post |
|                                     | the message to the ``MessageRepository``.                            |
|                                     |                                                                      |
|                                     | This is what the whole file looks like:                              |
|                                     |                                                                      |
|                                     | ``src/app/chatroom/chatroom.test.js``                                |
|                                     |                                                                      |
|                                     | .. code:: js                                                         |
|                                     |                                                                      |
|                                     |   describe('chatroomController', function () {                       |
|                                     |     var scope, mockMessageRepository;                                |
|                                     |                                                                      |
|                                     |     beforeEach(function () {                                         |
|                                     |       module("app.chatroom");                                        |
|                                     |                                                                      |
|                                     |       inject(function ( $rootScope,                                  |
|                                     |                         $controller,                                 |
|                                     |                         MessageRepository) {                         |
|                                     |         scope = $rootScope.$new();                                   |
|                                     |         mockMessageRepository = sinon.stub(MessageRepository);       |
|                                     |         $controller("ChatroomCtrl", { $scope: scope });              |
|                                     |       });                                                            |
|                                     |     });                                                              |
|                                     |                                                                      |
|                                     |     describe('when a message is published it', function () {         |
|                                     |                                                                      |
|                                     |       it ('posts to MessageRepository', function () {                |
|                                     |         scope.message = {                                            |
|                                     |           'user': 'RedQueen',                                        |
|                                     |           'text': 'Off with her head!'                               |
|                                     |         };                                                           |
|                                     |         scope.publish();                                             |
|                                     |         expect(                                                      |
|                                     |           mockMessageRepository.post.calledWith(scope.message)       |
|                                     |         ).toBeTruthy();                                              |
|                                     |       });                                                            |
|                                     |                                                                      |
|                                     |     });                                                              |
|                                     |   });                                                                |
+-------------------------------------+----------------------------------------------------------------------+
| I am getting an error when I run    | Yes, and that error is telling you to add method ``post`` to         |
| your test.                          | ``MessageRepository``                                                |
|                                     |                                                                      |
|                                     | ``src/app/chatroom/chatroom.js``                                     |
|                                     |                                                                      |
|                                     | .. code:: js                                                         |
|                                     |                                                                      |
|                                     |   .service( 'MessageRepository', function () {                       |
|                                     |     return {                                                         |
|                                     |       post: function () {                                            |
|                                     |       }                                                              |
|                                     |     }                                                                |
|                                     |   })                                                                 |
+-------------------------------------+----------------------------------------------------------------------+
| Now when you run the test what do   | An Error. It is telling me I need ``publish`` on ``ChatroomCtrl``    |
| you see?                            | ``$scope``                                                           |
|                                     |                                                                      |
|                                     | ``src/app/chatroom/chatroom.js``                                     |
|                                     |                                                                      |
|                                     | .. code:: js                                                         |
|                                     |                                                                      |
|                                     |   .controller( 'ChatroomCtrl', function ( $scope ) {                 |
|                                     |     $scope.publish = function () { };                                |
|                                     |   })                                                                 |
+-------------------------------------+----------------------------------------------------------------------+

Test: Message is Saved - Failing
--------------------------------

+--------------------------------------+-------------------------------------------------------+
| Now what do you see when running the | I see a **Failing** test.Yes! Making it pass is easy. |
| test?                                |                                                       |
+--------------------------------------+-------------------------------------------------------+

Test: Message is Saved - Passing
--------------------------------

 +------------------------------------+----------------------------------------------+
 | I look forward to seeing your code | No problem!  I will just add one line to the |
 |  passing and checked in.           | ``controller``.                              |
 |                                    |                                              |
 |                                    | ``src/app/chatroom/chatroom.js``             |
 |                                    |                                              |
 |                                    | .. code:: js                                 |
 |                                    |                                              |
 |                                    |     $scope.publish = function () {           |
 |                                    |       messageRepository.post(message);       |
 |                                    |     }                                        |
 +------------------------------------+----------------------------------------------+

 +------------------------------------+----------------------------------------------+
 |                                    |                                              |
 +------------------------------------+----------------------------------------------+


----

.. _node/npm: http://nodejs.org/
.. _git: http://git-scm.com/
.. _Chrome: https://www.google.com/intl/en/chrome/browser/
.. _Firefox: http://www.mozilla.org/en-US/firefox/new/
.. _Grunt: http://gruntjs.com/
.. _karma: https://github.com/karma-runner/karma
.. _bower: https://github.com/bower/bower
.. _seed project: https://github.com/ngbp/ngbp/tree/v0.3.1-release
