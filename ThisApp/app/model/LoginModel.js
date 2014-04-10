Ext.define('ThisApp.model.LoginModel', {
    extend: 'ThisApp.model.BaseModel',

    config: {
            fields: [
                     {name: 'userId', type: 'string'},
                     {name: 'phone_number', type: 'string'},
                     {name: 'password', type: 'string'}
            ]
    }
});


