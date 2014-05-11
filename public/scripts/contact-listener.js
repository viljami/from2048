define([
    'lodash'
], function(
    _
){

    var isEighter = _.curry(function(original, pair){
        return original === pair[0] || original === pair[1];
    });

    var hasContact = function(box){
        return contactListener.contacts.filter(isEighter(box)).length > 0;
    };

    var contactListener = {
        contacts: [],

        reset: function(){ contactListener.contacts = []; },

        BeginContact: function(contact){
            var a = contact.m_fixtureA.GetBody().GetUserData(),
                b = contact.m_fixtureB.GetBody().GetUserData();

            if (! a.value || ! b.value) return;
            if (a.value !== b.value) return;
            if (hasContact(a) || hasContact(b)) return;

            contactListener.contacts.push([a, b]);
        },

        EndContact: function(){},
        PreSolve: function(){},
        PostSolve: function(){}
    };

    return contactListener;
});
