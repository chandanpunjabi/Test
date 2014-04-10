Ext.define('ThisApp.store.CountryStore', {
	extend: 'Ext.data.Store',
	//requires : "Ext.data.reader.Json",
	config:{
	    model:'ThisApp.model.CountryModel',
	    storeId:'countryStoreId',
	    autoLoad: false,
	    autoSync: false,
        proxy: {
            type: 'ajax',
            url:'',
            method: 'GET',
            reader: {
                type: 'json',
                rootProperty: 'countries'
            }
        },

        grouper: {
               groupFn: function(record) {
                   return record.get('country').toUpperCase();
               }
        }

    }
});
