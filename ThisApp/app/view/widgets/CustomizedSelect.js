/** created by Pooja Zarkar
Date:27/11/2013
**/
Ext.define("ThisApp.view.widgets.CustomizedSelect", {
    extend: "Ext.field.Select",
    xtype: 'customizedSelect',

    requires:[
    ],
	config:{
        usePicker:true
	},
	initialize: function () {
	     this.callParent(arguments);
    },

   //Called when the internal store's data has changed for SelectField.
    onStoreDataChanged: function(store) {
        var me = this,
        initialConfig = me.getInitialConfig(),
        value = me.getValue();

        if (value || value === 0) {
            me.updateValue(me.applyValue(value));
        }

        if (me.getValue() === null) {
            if (initialConfig.hasOwnProperty('value')) {
                me.setValue(initialConfig.value);
            }

            if (me.getValue() === null && me.getPlaceHolder() == null) {
                if (store.getCount() > 0) {
                    me.setValue(store.getAt(0));
                }
            }
        }
    },

    //Shows the picker for the select field, whether that is a Ext.picker.Picker or a simple list.
    showPicker: function() {
       var store = this.getStore();
       if (!store || store.getCount() === 0) {
           return;
       }
       if (this.getReadOnly()) {
           return;
       }
       this.isFocused = true;
       if (this.getUsePicker()) {
           var picker = this.getPhonePicker(),
               name   = this.getName(),
               value  = {};

           if (!this.getPlaceHolder()) {
               value[name] = this.record.get(this.getValueField());
               picker.setValue(value);
           }
           if (!picker.getParent()) {
               Ext.Viewport.add(picker);
                picker.setValue(value);//Changes by Archana
           }
           picker.show();
       } else {
           var listPanel = this.getTabletPicker(),
               list = listPanel.down('list'),
               store = list.getStore(),
               index = store.find(this.getValueField(), this.getValue(), null, null, null, true),
               record = store.getAt((index == -1) ? 0 : index);

           if (!listPanel.getParent()) {
               Ext.Viewport.add(listPanel);
           }
           listPanel.showBy(this.getComponent());
           if (!this.getPlaceHolder()) {
               list.select(record, null, true);
           }
       }
    }

});
