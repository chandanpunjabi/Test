/** Created by Saurabh Nath
  *  13 Nov 2013
  *  ContactsModel.js
 **/

Ext.define('ThisApp.model.ContactsModel', {
    extend: 'Ext.data.Model',
    requires:[
            'Ext.data.identifier.Uuid'
    ],
    config: {
        idProperty : 'id',
        identifier: {
            type: 'uuid',
            proxy: {
                type: 'localstorage',
                id: 'accountsModelId'
            }
        },
        fields: [
            {
                name: 'contactName',
                type: 'string'
            },
            {
                name: 'mobileNumber',
                type: 'string'
            }
        ]
    }
});