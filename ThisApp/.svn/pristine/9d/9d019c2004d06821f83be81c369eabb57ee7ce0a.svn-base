/** Created by Vivek Sahu
 ** Date: 15/11/13
 **/
Ext.define('ThisApp.store.UserStore', {
    extend: 'Ext.data.Store',
	requires: "Ext.data.proxy.LocalStorage",
	config: {
		model: 'ThisApp.model.UserModel',
        storeId: 'userStore',
		autoLoad: true,
		autoSync: true ,

    	proxy: {
                type: 'localstorage'

        }
	}

});