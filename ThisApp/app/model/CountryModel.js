Ext.define('ThisApp.model.CountryModel',{
	extend : 'Ext.data.Model',
    config :{
        fields: [
                { name: 'country', type: 'string' },
                { name: 'country_code', type: 'string' },
                { name: 'id', type: 'string' }
        ]
	}
	
});