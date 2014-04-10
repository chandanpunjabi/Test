/** created by Archana Mahajan
  *  2/12/2013
 **/
Ext.define('ThisApp.store.EventWallStore', {
    extend: 'Ext.data.Store',
    requires: "Ext.data.proxy.LocalStorage",

	config: {
		model: 'ThisApp.model.EventWallModel',
        storeId: 'eventWallStoreId',
        autoLoad: true,
        autoSync: true,
        proxy: {
            type: "localstorage"
        }
	}
});