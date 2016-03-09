function isFunction(fn) {
    return typeof fn === 'function';
}

function Deferred() {
    var status = 'pending',
        ret,
        that = {},
        events = (function() {
            var binds = {
                resolve: [],
                reject: [],
                notify: []
            };
            return {
                add: function(type, fn) {
                    binds[type].push(fn);
                },
                remove: function(type, fn) {
                    var index = binds[type].indexOf(fn);
                    if(index > -1) {
                        binds[type].splice(index, 1);
                    }
                },
                clear: function (type) {
                    binds[type].length = 0;
                },
                fire: function(type, args) {
                    binds[type].forEach(function(fn) {
                        fn.apply(null, args);
                    });
                },
                destroy: function () {
                    binds.resolve.length = 0;
                    binds.reject.length = 0;
                    binds.notify.length = 0;
                }
            }
        })();
    function bind(onResolved, onRejected, onProgressed) {
        if(isFunction(onResolved)) {
            if(status === 'resolved') {
                onResolved.apply(null, ret);
            } else if (status === 'pending') {
                events.add('resolve', onResolved);
            }
        }

        if(isFunction(onRejected)) {
            if(status === 'rejected') {
                onRejected.apply(null, ret);
            } else if(status === 'pending') {
                events.add('resolve', onRejected);
            }
        }

        if(isFunction(onProgressed)) {
            events.add('notify', onProgressed);
        }
    }
    that.all = function(onResolvedOrRejected) {
        bind(onResolvedOrRejected, onResolvedOrRejected);
        return that;
    };

    that.done = function(onResolved) {
        bind(onResolved);
        return that;
    };

    that.fail = function(onRejected) {
        bind(null, onRejected);
        return that;
    };

    that.progress = function(onProgressed) {
        bind(null, null, onProgressed);
        return that;
    };

    that.unProgress = function (onProgressed) {
        events.remove('notify', onProgressed);
        return that;
    };

    that.then = function (onResolved, onRejected, onProgressed) {
        bind(onResolved, onRejected, onProgressed);
        return that;
    };

    that.resolve = function () {
        if (status === 'pending') {
            status = 'resolved';
            ret = [].slice.call(arguments);
            events.fire('resolve', ret);
        }
        return that;
    };

    that.reject = function () {
        if (status === 'pending') {
            status = 'rejected';
            ret = [].slice.call(arguments);
            events.fire('reject', ret);
        }
        return that;
    };

    that.notify = function () {
        events.fire('notify', slice.call(arguments));
        return that;
    };

    return that;
}
