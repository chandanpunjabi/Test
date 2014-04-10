/**created by Vivek Rajput
    Date:26/11/2013
**/
Ext.define('ThisApp.controller.EventsController', {
    extend: 'Ext.app.Controller',

    config: {
                control: {

                          'list[action=listTapAction]':{
                          	itemtap : 'listTapAction'
                          }
                          
                }
    },

    /*
        Updated by: Vivek Rajput
        Date: 5 Dec 2013
        To Open wall click on events wall click
    */
    listTapAction : function( self, index, target, record, e, eOpts ){
            Ext.Viewport.mask({ xtype: 'loadmask' });
            var recordEventId = record.data.eventId;
            var wallImageEventId = e.target.id;
            var currentStoreId = self.getStore().getStoreId();
            var phoneContactsStore = Ext.getStore('phoneContactsStore');
            phoneContactsStore.filter('is_invited',true);           /* changes by P on 27 Dec 2013*/
            phoneContactsStore.each(function(record){
                record.set('is_invited',false);
                record.set('is_admin',false);
            });
            phoneContactsStore.clearFilter();
            if( wallImageEventId == recordEventId ){
                    this.openWallView( currentStoreId, record, this );
            }else{
                    //var store = Ext.getStore('phoneContactsStore');
                    //console.log("Store in else :", store);
                    //store.removeAll();
                    //store.getData().clear();
                    ThisApp.util.CommonUtil.setEventDetailViewData( currentStoreId, record );
            }
	},

     /*
        Created by: Vivek Rajput
        Date: 5 Dec 2013
        To Open wall click on events wall click
    */
	openWallView: function( eventsCurrentStoreId, record, self ){
	       /**Changes By M 24 Dec 2013**/
	       ThisApp.util.CommonUtil.onWallClick(eventsCurrentStoreId,record,self);
	}

});