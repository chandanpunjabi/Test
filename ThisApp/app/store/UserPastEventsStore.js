 Ext.define('ThisApp.store.UserPastEventsStore', {
    extend: 'Ext.data.Store',
    requires: 'Ext.data.reader.Json',
	config: {
             storeId: 'userPastEventsStoreId',
             model:'ThisApp.model.EventsModel',
		     autoLoad: true,
	 	     autoSync: true
    }//end config

});//end define
