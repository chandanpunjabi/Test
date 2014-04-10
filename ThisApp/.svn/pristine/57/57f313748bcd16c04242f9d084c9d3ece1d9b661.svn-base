/** Created by Abhijit Muke
 ** Date: 18/11/13
 **/
Ext.define('ThisApp.store.NewEventsStore.EventStore', {
    extend: 'Ext.data.Store',
	requires: "Ext.data.proxy.LocalStorage",
	config: {
		model: 'ThisApp.model.NewEventsModel.EventModel',
        storeId: 'eventStoreId',
		autoLoad: true,
		autoSync: true ,

    	proxy: {
                type: 'localstorage'

        }



	}

});