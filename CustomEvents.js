var CustomEvents = function() {
    this._listener = {};
};

CustomEvents.prototype = {
    on: function(type, fn) {
        if(typeof type === 'string' && typeof fn === 'function') {
            if(!this._listener[type]) {
                this._listener[type] = [];
            }
            this._listener[type].push(fn);
            return this;
        }
    },
    emit: function(type) {
        var cbs = this._listener[thpe];
        if(type && cbs) {
            var args = [].slice.call(arguments),
                data = args.slice(1);
            for(var i=0, len=cbs.length; i<len; i++) {
                cbs[i].apply(this, data);
            }
        }
    },
    removeEvents: function(type, key) {
        var listeners = this._listener[type];
        delete listeners;
    }
}
