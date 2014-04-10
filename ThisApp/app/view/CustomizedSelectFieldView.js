/* Created by Pooja
 * Date: 13 November 2013
*/
Ext.define("ThisApp.view.CustomizedSelectFieldView", {
    extend: "Ext.Panel",
    id:"customizedSelectField",
    alias:'widget.customizedSelectField',
    xtype: 'customizedSelectField',

    config:{
        cls:'customizedSelectFieldMainPanelCls',
        showAnimation: {                                                                        
            type: 'slide',
            duration: 500,
            direction:'left'
        },
        store:'',
        searchTerm:'',
        extraTerm:'',
        title:'',
        btnObject:'',
        view:'',
        formValues:'',
        formPanelName:''
    },

	initialize: function () {
	     this.callParent(arguments);
         var me = this;
	     var windowHeight = ThisApp.util.GlobalUtil.getWindowHeight();
         var windowWidth = Ext.Viewport.getWindowWidth() ;
         var searchTerm = me.getSearchTerm();
         var extraTerm = me.getExtraTerm();
         var customizedSelectFieldName = (me.getBtnObject()).id;
         var store = me.getStore();
         store.load({
             callback : function(records, operation, success) {
                 if(success){
                     Ext.Viewport.unmask();
                 }else{
                     Ext.Viewport.unmask();
                     var validationErrors = [];
                     validationErrors.push('Web Service Call Failed For Loading data!Please Reload Again');
                     ThisApp.util.CommonUtil.showErrors(validationErrors);
                 }
             }
         });

         var view = me.getView();
         var formValues = me.getFormValues();
         var formPanelName = me.getFormPanelName();
         var topToolBarPanel= ThisApp.util.CommonUtil.getTopToolBarPanel();
         var backButton = Ext.ComponentQuery.query('button[name=backButton]')[0];
         backButton.action ='customizedSelectFieldBackButtonAction';
         topToolBarPanel.setTitle("Select "+me.getTitle());

         var listTpl;
         if(extraTerm == ''){
            listTpl = new Ext.XTemplate('<tpl for=".">',
                '<div style="width:100%;padding:12px 8px;">',
                    '<div style="float:left;width:90%;">{[this.setText(values)]}</div>',    //changes by P on 20 Nov 2013
                    '</div>',
                '</tpl>',
                {
                    //changes by P on 20 Nov 2013
                    setText:function(values){
                        var searchText = values[''+searchTerm+''];
                        return Ext.String.ellipsis(searchText,30, true);
                    }
                }
            );
         }else{
            listTpl = new Ext.XTemplate('<tpl for=".">',
                '<div style="width:100%;padding:12px 8px;">',
                    '<div style="float:left;width:80%;">{[this.setText(values)]}</div>',    //changes by P on 20 Nov 2013
                        '<div style="float:left;width:10%;text-align:right;">+{'+extraTerm+'}</div>',
                    '</div>',
                '</tpl>',
                {
                    //changes by P on 20 Nov 2013
                    setText:function(values){
                        var searchText = values[''+searchTerm+''];
                        return Ext.String.ellipsis(searchText,30, true);
                    }
                }
            );
         }

         var mainPanel = Ext.create('Ext.form.Panel', {
                     id:'customizedSelectFieldMainPanel',
                     name:'customizedSelectFieldMainPanel',
                     maxHeight:'100%',
                     maxWidth:'100%',
                     width:'100%',
                     height: windowHeight*(0.95),
                     scrollable:false,
                     cls:'customizedSelectFieldMainPanelCls',
                     layout:{
                         type:'vbox',
                         pack:'center',
                         align:'center'
                     },
                     items:[
                        {
                            xtype : 'searchfield',
                            width : '90%',
                            name:'countrySearch',
                            clearIcon : false,
                            placeHolder : 'search...',
                            cls : 'customizedSelectSearchFieldCls marginTop10Px borderRadiusCls textCls',
                            inputCls:'customizedSelectSearchFieldInputCls',
                            listeners:{
                            	keyup : function(self){
                            	    ThisApp.util.CommonUtil.searchItem(self,searchTerm);
                            	},
                            	afterrender:function(self){
                                    self.focus();
                            	}
                            	
                            }
                        },
                        {
                            xtype:'list',
                            width:'90%',
                            id:'listView',
                            name:'listView',
                            cls:'customizedSelectFieldListCls',
                            selectedCls:'buttonMainCls',
                            height : windowHeight * (0.76),
                            itemTpl: listTpl,
                            store:store,
                            indexBar : true,
                            listeners:{
                            	itemtap:function(me, index, target, record, e){
                                     setTimeout(function(){
                                         if(Ext.os.name == "Android"){
                                              hideKeypad();
                                         }
                                         ThisApp.util.CommonUtil.setSelectedItem(record,customizedSelectFieldName,searchTerm,view,formValues,formPanelName);
                                     },500);

                            	}
                            }
                        }
                     ]
         });

         this.add([topToolBarPanel,mainPanel]);
    }

});
