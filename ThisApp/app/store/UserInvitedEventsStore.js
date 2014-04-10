 Ext.define('ThisApp.store.UserInvitedEventsStore', {
    extend: 'Ext.data.Store',
    requires: 'Ext.data.reader.Json',
	config: {
             storeId: 'userInvitedEventsStoreId',
             model:'ThisApp.model.EventsModel',
		     autoLoad: true,
	 	     autoSync: true
    }//end config

});//end define
