define([], function(){

    var events = {};

    return {
        on: function(eventType, fn, context){
            var obj = {fn: fn, context: context};

            if (! events[eventType]){
                events[eventType] = [obj];
                return;
            }

            events[eventType].push(obj);
        },

        off: function(eventType){
            delete events[eventType];
        },

        trigger: function(eventType){
            var args = Array.prototype.slice.call(arguments);
            args.shift();

            var targets = events[eventType];
            if (targets) targets.forEach(function(o){ o.fn.apply(o.context, args); });
        }
    };
});
