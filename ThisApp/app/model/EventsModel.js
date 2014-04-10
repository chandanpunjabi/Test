 /*
 Created by Avin
 Updated by Chandan
 Date: 25/11/2013
 */
 Ext.define('ThisApp.model.EventsModel', {
    extend: 'ThisApp.model.BaseModel',

    config: {
        fields: [
                {name: 'id',                            type: 'string'}, 
                {name: 'eventId',                       type: 'string'},
                {name: 'created_at',                    type: 'string'},
                {name: 'start_time',                    type: 'string'},
                {name: 'end_time',                      type: 'string'},
                {name: 'event_date',                    type: 'string'},
                {name: 'event_type_id',                 type: 'string'},
                {name: 'event_type',                    type: 'string'},
                {name: 'is_invitees_to_invite',         type: 'string'},
                {name: 'latitude',                      type: 'string'},
                {name: 'longitude',                     type: 'string'},
                {name: 'limit_capacity',                type: 'string'},
                {name: 'location',                      type: 'string'},
                {name: 'minimum_needed',                type: 'string'},
                {name: 'name',                          type: 'string'},
                {name: 'notes',                         type: 'string'},
                {name: 'space_left',                    type: 'string'},
                {name: 'reoccurring_duration',          type: 'string'},
                {name: 'reminder_duration',             type: 'string'},
                {name: 'current_participants',          type: 'string'},
                {name: 'user_id',                    	type: 'string'},
                {name: 'cancellation_before',           type: 'string'},
                {name: 'status',                    	type: 'string'},
                {name: 'is_admin',                      type: 'string'},
                {name: 'notification_status',           type: 'int'}
        ]
    },
    formatDate: function() {
        var eventDate = this.data.event_date;
        return Ext.Date.format(new Date(eventDate),'jS M');
    }
});
