// method1
var EventEmitter = require('events').EventEmitter;

function Dog(name) {
    this.name = name;
}

Dog.prototype = Object.create(EventEmitter.prototype);


var simon = new Dog('simon');

simon.on('bark', function() {
    console.log(this.name + ' barked.');
});


sim.emit('bark');


// Node 内置模块 util 的 inherits 方法，提供了另一种继承 EventEmitter 的写法

var util = require('util');
var EventEmitter = require('events').EventEmitter;

var Radio = function(station) {
    var self = this;

    setTimeout(function() {
        self.emit('open', station);
    }, 0);

    setTimeout(function() {
        self.emit('close', station);
    }, 5000);

    this.on('newListener', function(listener) {
        console.log('Event Listener: ' + listener);
    });
}

util.inherits(Radio, EventEmitter);

module.exports = Radio;
