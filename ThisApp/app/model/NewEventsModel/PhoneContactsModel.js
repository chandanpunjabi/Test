/** created by Abhijit Muke
  *  15 Nov 2013
  *  PhoneContacts Model
 **/
Ext.define('ThisApp.model.NewEventsModel.PhoneContactsModel', {
	extend : 'Ext.data.Model',
    config : {

		fields: [
                {name: "displayName", type: "string"},
                {name: "phone_number", type: "string"},
                {name: "is_invited", type:"boolean"},
                {name: "is_admin", type:"boolean"},
                {name: "status", type: "string"},
                {name: "registerd_status", type:"int"},
                {name: "isSort", type:"int"}               //change by chetana 17dec 2013
            ]
	}

});