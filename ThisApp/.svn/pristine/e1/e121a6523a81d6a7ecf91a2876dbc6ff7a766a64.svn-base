/** Created by Vivek Sahu
 ** Date: 13/11/13
 **/

Ext.define('ThisApp.view.SettingsView', {
    extend:'Ext.Container',
    alias: 'widget.settingsView',
    xtype: 'settingsView',
    name:'settingsView',
    requires:[
         'Ext.form.Panel',
         'Ext.Panel',
         'Ext.Label',
         'Ext.field.Checkbox',
         'Ext.Button'
    ],

    config: {
        //id:'settingsViewId',
        layout: {
            type : 'fit',
            pack : 'center',
            align: 'center'
        }
    },

    initialize: function(){
       this.callParent(arguments);
       var windowHeight = ThisApp.util.GlobalUtil.getWindowHeight();
       var windowWidth = Ext.Viewport.getWindowWidth() ;
       ThisApp.util.CommonUtil.setCurrentView('ThisApp.view.SettingsView');

       var topToolBarPanel= ThisApp.util.CommonUtil.getTopToolBarPanel();
       var bottomBarPanel= ThisApp.util.CommonUtil.getBottomToolBarPanel();
       var backButton = Ext.ComponentQuery.query('button[name=backButton]')[0];
       backButton.setHidden(true);
       topToolBarPanel.setTitle("Settings");
       /**Changes By M 17 Dec 2013*/
       var panelHeight = ThisApp.util.CommonUtil.getPanelHeight();
       var settingsMainPanel = ({
               xtype: 'formpanel',
               maxHeight:'100%',
               maxWidth:'100%',
               width:'100%',
               scrollable:false,
               height:windowHeight*(1),
               baseCls:'bodyBackgroundGradient',
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
                          height:  panelHeight,  /**Changes By M 17 Dec 2013*/
                          scrollable:true,                  /* added by Pooja on 17 Dec */
                          width:'100%',
                          layout:{
                                     type:'vbox',
                                     pack:'start',
                                     align:'center'
                          },
                          items:[
                               /* changes by P on 20 Nov 2013 start */
                               {
                                   xtype:'panel',
                                   width:'90%',
                                   cls:'marginTop20pxCls',
                                   height:windowHeight*(0.06),
                                   layout:{
                                       type:'hbox',
                                       align:'center',
                                       pack:'center'
                                   },
                                   items:[
                                       {
                                           xtype:'panel',
                                           width:'70%',
                                           layout:{
                                                type:'hbox',
                                                pack:'start',
                                                align:'left'
                                           },
                                           items:[
                                               {
                                                   xtype:'label',
                                                   cls:'settingsViewLabelCls',
                                                   html:'Receive push notifications'
                                               }
                                           ]
                                       },
                                       {
                                           xtype:'panel',
                                           width:'30%',
                                           cls:'toggleButtonPanelCls',
                                           layout:{
                                                type:'hbox',
                                                pack:'end',
                                                align:'right'
                                           },
                                           items:[
                                               {
                                                   xtype: 'togglefield',
                                                   id: 'publishToTimelineEnabledId',
                                                   name: 'toggleFieldName'
                                               }

                                           ]
                                       }
                                   ]
                               },
                               /* changes by P on 20 Nov 2013 end */
                               {
                                      xtype:'panel',
                                      width:'90%',
                                      cls:'marginTop15Px',
                                      height:windowHeight*(0.08),                                               //changes by MR - 18Nov2013.
                                      layout:{
                                          type:'hbox',
                                          align:'start',
                                          pack:'start'
                                      },
                                      items:[
                                            {
                                                 xtype:'panel',
                                                 width:'100%',
                                                 items:[
                                                     {
                                                         xtype:'label',
                                                         cls:'settingsViewLabelCls',
                                                         html:'Invitations, cancellations and changes to time, date and location are mandatory.'
                                                     }
                                                 ]
                                            }
                                      ]
                               },
                               {
                                   xtype:'panel',
                                   width:'90%',
                                   height:windowHeight*(0.55),
                                   cls:'marginTop20pxCls',
                                   layout:{
                                      type:'vbox',
                                      align:'center',
                                      pack:'start'
                                   },
                                   items:[
                                      {
                                          xtype:'button',
                                          width:'100%',
                                          text:'Save',
                                          cls: 'settingsViewBtnCls',
                                          action:'onSaveClick'
                                      },
                                      {
                                          xtype:'button',
                                          width:'100%',
                                          text:'Delete Account',
                                          cls: 'settingsViewBtnCls marginTop20pxCls',
                                          action: 'onSettingsViewDeleteAccountBtnClick'
                                      },
                                      {
                                          xtype:'button',
                                          width:'100%',
                                          text:'Reset Password',
                                          cls: 'settingsViewBtnCls marginTop20pxCls',
                                          action:'onResetPasswordClick'
                                      },
                                      {
                                          xtype:'button',
                                          width:'100%',
                                          text:'Logout',
                                          cls: 'settingsViewBtnCls marginTop20pxCls',
                                          action:'onLogoutClick'
                                      },
                                      /* added by Pooja on 17 Dec start */
                                      {
                                          xtype:'button',
                                          width:'100%',
                                          text:'Update Contacts',
                                          cls: 'settingsViewBtnCls marginTop20pxCls',
                                          action:'onClickOfRefreshButtonNewEventThird'
                                      }
                                      /* added by Pooja on 17 Dec end */
                                   ]
                               },
                               /* added by Pooja on 17 Dec start */
                               {
                                   xtype:'spacer',
                                   width:'100%',
                                   height:50
                               }
                               /* added by Pooja on 17 Dec end */
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

       this.add([settingsMainPanel]);

    }

});