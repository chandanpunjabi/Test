/** created by Abhijit Muke
  *  14 Nov 2013
  *  SpacesLeft Model
 **/
Ext.define('ThisApp.model.NewEventsModel.SpacesLeftModel', {
	extend : 'Ext.data.Model',
     requires:[
                 'Ext.data.identifier.Uuid'
     ],
     config: {
         idProperty : 'id',
         identifier: {
             type: 'uuid',
              proxy: {
                         type: 'localstorage',
                         id: 'spacesLeftModelId'
                     }
         },

     fields : [
                {
                    name:'id',
                    type:'string'
                },
                {
                    name:'spacesValue',
                    type:'string'
                }
             ]

	 }

});