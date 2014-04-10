/** created by Abhijit Muke
  *  14 Nov 2013
  *  Hours Model
 **/
Ext.define('ThisApp.model.NewEventsModel.HoursModel', {
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
                         id: 'hoursModelModelId'
                     }
         },

     fields : [
                {
                    name:'id',
                    type:'string'
                },
                {
                    name:'hoursValue',
                    type:'string'
                }
             ]

	 }

});