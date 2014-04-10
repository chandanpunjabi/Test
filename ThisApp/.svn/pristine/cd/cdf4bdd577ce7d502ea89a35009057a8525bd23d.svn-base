/** created by Abhijit Muke
  *  15 Nov 2013
  *  PhoneContact Store
 **/
Ext.define('ThisApp.store.NewEventsStore.PhoneContactStore', {
    extend: 'Ext.data.Store',

    requires: "Ext.data.proxy.LocalStorage",

	config: {
		model: 'ThisApp.model.NewEventsModel.PhoneContactsModel',
        storeId: 'phoneContactsStore',
		autoLoad: true,               // changes by Pooja on 18 Dec 2013
		autoSync: true,               // changes by Pooja on 18 Dec 2013
		sorters :'isSort',            //change by chetana 17dec 2013

		grouper:{
           groupFn: function(record) {
                if(record.get('displayName')[0] != undefined){
                        return record.get('displayName')[0].toUpperCase();
                }
           }
        },

        proxy: {
            type: "localstorage"      // changes by Pooja on 13 Dec 2013
        }

	}

});