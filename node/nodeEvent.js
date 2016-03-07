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
