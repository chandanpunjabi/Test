Ext.define("ThisApp.view.ForgotPasswordView", {
     extend: "Ext.Container",
     alias: "widget.forgotPasswordView",
     name:'forgotPasswordView',
     requires: [
               'Ext.Panel',
               'Ext.Button'
    ],
    config: {
             layout:{
                    type:'card',
                    pack:'center',
                    align:'center'
             },
             filterOnBeer: null
    },

    initialize: function () {
             var windowHeight = ThisApp.util.GlobalUtil.getWindowHeight();
             var windowWidth = Ext.Viewport.getWindowWidth() ;

             var topToolBarPanel= ThisApp.util.CommonUtil.getTopToolBarPanel();
             var bottomBarPanel= ThisApp.util.CommonUtil.getBottomToolBarPanel();
             topToolBarPanel.setTitle("Forgot Password");
             var backButton = Ext.ComponentQuery.query('button[name=backButton]')[0];
             backButton.action = 'backToLoginAction';
             var feedbackButton = Ext.ComponentQuery.query('button[name=feedbackButton]')[0];
             feedbackButton.setHidden(true);

            var store = Ext.getStore('CountryStore');
             var listTpl = new Ext.XTemplate('<tpl for=".">',
                     '<div>',
                         '<div>{country}</div>',
                     '</div>',
                     '</tpl>'
             );
             var mainPanel = {
                                 xtype:'formpanel',
                                 name:'forgotPassForm',
                                 maxHeight:'100%',
                                 maxWidth:'100%',
                                 width:'100%',
                                 baseCls:'bodyBackgroundGradient',
                                 scrollable:false,
                                 height: windowHeight*(0.95),
                                 layout:{
                                            type:'vbox'
                                 },
                                 items:[
									
									{
										xtype:'label',
										width:'90%',
										align:'center',
										html:'Please enter the number of the account you would like to reset the password of',
										cls:'resetDetailCls'
									},
									{
					                    xtype:'panel',
					                    width:'100%',
					                    cls:'marginLeft4Px customizedButtonPanelCls',
					                    layout:{
					                        type:'hbox',
					                        align:'center',
					                        pack:'center'
					                    },
					                    items:[
				                           {
				                               xtype:'button',
				                               width:'90%',
				                               height:40,
				                               name:'country',
				                               id:'country',
				                               text:'Country',
				                               cls:'customizedFieldButtonCls border',
				                               style:'margin-top:10px !important',
				                               iconCls: 'customizedFieldButtonIconCls',
				                               listeners:{
					                            	tap:function(self){
					                            	     if(Ext.os.name == "Android"){
					                            	         hideKeypad();
					                            	     }
					                            		 var formValues = Ext.ComponentQuery.query('formpanel[name=forgotPassForm]')[0].getValues();
					                                     var store = ThisApp.util.CommonUtil.loadDataInStore(ThisApp.util.GlobalUtil.getCountry(),Ext.getStore('countryStoreId'));
					                                     ThisApp.util.CommonUtil.openListView(self,store,'country','country_code','Country','ThisApp.view.ForgotPasswordView',formValues,'forgotPassForm');
					                            	}
					                            }
				                               
				                           },
					                        {
					                            xtype:'label',
					                            html:'*',
					                            cls:'starLabelCls'
					                        }
					                    ]
					                },
					                {
					                    xtype:'panel',
					                    width:'100%',
					                    layout:{
					                        type:'hbox',
					                        align:'center',
					                        pack:'center'
					                    },
					                    items:[
				                           {
							                	xtype:'textfield',
							                	maxLength: 10,
							                	width:'90%',
							                	cls:'borderRadiusCls loginViewTextFieldCls border countryFldCls',
							                	id:'phoneNumberFld',
							                	name:'phoneNumberFld',
							                	component:{
							                		type:'tel'
							                	},
							                	action: 'pressNumbersOnly',
							                	placeHolder:'Phone Number',
							                	clearIcon:false,
							                	listeners:{
                                                      keyup:function(e, eO, eOpts){
                                                          ThisApp.util.CommonUtil.numbersOnly(e, eO, eOpts);
                                                      },
                                                      focus : function(self,e,eOpts){
  							                			self.setValue('');
  							                		}
                                                  }  
							                	
				                           	},
					                        {
					                            xtype:'label',
					                            html:'*',
					                            cls:'starLabelCls'
					                        }
					                    ]
					                },
									{
					                	xtype:'button',
					                	width:'90%',
					                	align:'center',
					                	height:'40px',
					                	html:'Send Verification Code',
					                	action:'sendCodeAction',
					                	cls:'sendBtnCls buttonMainCls border'
					                },
					                {
										xtype:'label',
										width:'80%',
										align:'center',
										html:'If you would like to change your number, please delete your account and create a new account',
										cls:'resetLabelCls'
									}
					                
									

                                 ]
                              }
             this.add([topToolBarPanel, mainPanel]);
    },
    onSearchKeyUp: function(field) {
        //get the store and the value of the field
    	Ext.getCmp('searchList').show();
        var value = field.getValue(),
            store = Ext.getStore('CountryStore');

        //first clear any current filters on the store. If there is a new value, then suppress the refresh event
        store.clearFilter(!!value);

        //check if a value is set first, as if it isnt we dont have to do anything
        if (value) {
            //the user could have entered spaces, so we must split them so we can loop through them all
            var searches = value.split(','),
                regexps = [],
                i, regex;

            //loop them all
            for (i = 0; i < searches.length; i++) {
                //if it is nothing, continue
                if (!searches[i]) continue;

                regex = searches[i].trim();
                //regex = regex.replace(/^/, "\\$&");

                //if found, create a new regular expression which is case insenstive
                regexps.push(new RegExp("^" + regex.trim(), 'i'));
            }

            //now filter the store by passing a method
            //the passed method will be called for each record in the store
            store.filter(function(record) {
                var matched = [];

                //loop through each of the regular expressions
                for (i = 0; i < regexps.length; i++) {
                    var search = regexps[i],
                        didMatch = search.test(record.get('country'));

                    //if it matched the first or last name, push it into the matches array
                    matched.push(didMatch);
                }

                return (regexps.length && matched.indexOf(true) !== -1);
            });
        }
    },
    /**
     * Called when the user taps on the clear icon in the search field.
     * It simply removes the filter form the store
     */
    onSearchClearIconTap: function() {
        //call the clearFilter method on the store instance
        var store = Ext.getStore('CountryStore');
        store.clearFilter();
    }
 });