/** created by Abhijit Muke
  *  18 Nov 2013
  *  ReoccurringDuration Model
 **/
Ext.define('ThisApp.model.NewEventsModel.ReoccurringDurationModel', {
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
                         id: 'reoccurringDurationModelId'
                     }
         },

     fields : [
                {
                    name:'id',
                    type:'string'
                },
                {
                    name:'reoccurring_duration',
                    type:'string'
                }
             ]

	 }

});