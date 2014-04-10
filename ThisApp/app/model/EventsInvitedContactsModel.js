Ext.define('ThisApp.model.EventsInvitedContactsModel', {
    extend: 'ThisApp.model.BaseModel',

    config: {
            fields: [
                     {name: "id", type: "string"},
                     {name: "contact_name", type: "string"},
                     {name: "phone_number", type: "string"},            //changes by Pooja on 18 Dec 2013
                     {name: "is_invited", type:"boolean"},
                     {name: "is_admin", type:"boolean"},
                     {name: "status", type:"string"},
                     {name: "registerd_status", type:"int"},
                     {name: "wall_notification_status", type:"boolean", mapping:"notification_status"},      //changes by Pooja on 19 Dec 2013
                     {name: "isInvitedMembersSort", type:"int"}              /*** Added by Pooja and SL on 3 Jan 2014 for sorting the InvitedMembers in event participants view page ***/
            ]
    }
});


