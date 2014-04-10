/**created by chetana walunj
Date:14/11/2013
**/
Ext.define('ThisApp.store.NewEventsStore.EventTypeStore', {
	extend: 'Ext.data.Store',
	config:{
        model:'ThisApp.model.NewEventsModel.EventTypeModel',
        storeId:'eventTypeStoreId',
        autoLoad : false,
        autoSync: false,
        proxy: {
            type: 'ajax',
            url:'',
            method: 'GET',
            reader: {
                type: 'json',
                rootProperty: 'event_types'
            }
        },

        grouper: {
               groupFn: function(record) {
                   return record.get('event_type').toUpperCase();
               }
        },
        listeners:{
        	 load:function(self){
             	console.log('Inside Store ',self);
             	var other_record =  this.findRecord('event_type','OTHER');
             	console.log('record ',this.findRecord('event_type','OTHER'));
             	    if(other_record !=null)	
             	    	this.remove(other_record);
             }
        }
       
    }
});
