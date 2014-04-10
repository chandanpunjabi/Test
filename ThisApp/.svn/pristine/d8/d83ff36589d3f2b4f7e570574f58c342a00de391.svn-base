/** Created by Vivek Sahu
 ** Date: 13/11/13
 **/

Ext.define('ThisApp.view.DeleteAccountView', {
    extend:'Ext.Container',
    alias: 'widget.deleteAccountView',
    xtype: 'deleteAccountView',

    requires:[
         'Ext.form.Panel',
         'Ext.Panel',
         'Ext.Label',
         'Ext.Button'
    ],

    config: {
        id:'deleteAccountViewId',
        layout: {
            type : 'fit',
            pack : 'center',
            align: 'center'
        }
    },

    initialize: function(){
       this.callParent(arguments);
       var windowHeight = ThisApp.util.GlobalUtil.getWindowHeight();
       var windowWidth =Ext.Viewport.getWindowWidth() ;

       var topToolBarPanel= ThisApp.util.CommonUtil.getTopToolBarPanel();
       var bottomBarPanel= ThisApp.util.CommonUtil.getBottomToolBarPanel();
       var backButton = Ext.ComponentQuery.query('button[name=backButton]')[0];
       backButton.action ='deleteAccountViewBackButtonClick';

       /**Changes By M 17 Dec 2013*/
       var panelHeight = ThisApp.util.CommonUtil.getPanelHeight();
       topToolBarPanel.setTitle("Delete Account");
       var deleteAccountMainPanel = ({
               xtype: 'formpanel',
               maxHeight:'100%',
               maxWidth:'100%',
               width:'100%',
               baseCls:'bodyBackgroundGradient',
               scrollable:false,
               height:windowHeight*(1),
               layout:{
                   type:'vbox',
                   align:'center',
                   pack:'start'
               },
               items:[
                   {
                          xtype:'panel',
                          width:'100%',
                          layout: 'hbox',
                          items:[
                                   topToolBarPanel
                          ]
                   },
                   {
                          xtype:'panel',
                          height: panelHeight,        /**Changes By M 17 Dec 2013*/
                          width:'100%',
                          layout:{
                                     type:'vbox',
                                     pack:'start',
                                     align:'center'
                          },
                          items:[

                               {
                                   xtype:'panel',
                                   width:'90%',
                                   cls:'marginTop20pxCls',
                                   height:windowHeight*(0.12),
                                   layout:{
                                       type:'hbox',
                                       align:'start',
                                       pack:'start'
                                   },
                                   items:[
                                       {
                                           xtype:'label',
                                           cls:'deleteAccountViewLabelCls',
                                           html:'Are you sure you want to delete your account?'
                                       }

                                   ]
                               },
                               {
                                   xtype:'panel',
                                   width:'90%',
                                   height:windowHeight*(0.20),
                                   layout:{
                                      type:'hbox',
                                      align:'start',
                                      pack:'start'
                                   },
                                   items:[
                                      {
                                          xtype:'label',
                                          cls:'deleteAccountViewLabelCls',
                                          html:'Please note, this will delete all your information permanently and free the number to be used again with a different account'
                                      }

                                   ]
                               },
                               {
                                   xtype:'panel',
                                   width:'90%',
                                   height:windowHeight*(0.12),
                                   layout:{
                                      type:'vbox',
                                      align:'start',
                                      pack:'start'
                                   },
                                   items:[
                                      {
                                          xtype:'button',
                                          width:'100%',
                                          text:'Delete Account',
                                          cls: 'buttonMainCls',
                                          height:40,
                                          action: 'deleteAccountBtnClick'

                                      }
                                   ]
                               }
                          ]
                   },
                   {
                         xtype:'panel',
                         width:'100%',
                         layout: 'hbox',
                         items:[
                                    bottomBarPanel
                         ]
                   }

               ]

       });

       this.add([deleteAccountMainPanel]);

    }

});