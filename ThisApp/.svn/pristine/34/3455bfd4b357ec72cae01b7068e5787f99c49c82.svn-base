/**created by Sandip Lipane
Date:23/12/2013
**/
Ext.define('ThisApp.view.WallNotificationSettingView', {
    extend:'Ext.Container',
    alias: 'widget.wallNotificationSettingView',
    xtype: 'wallNotificationSettingView',

    requires:[
         'Ext.form.Panel',
         'Ext.Panel',
         'Ext.Label',
         'Ext.Button'
    ],

    config: {
        record:'',
        eventsCurrentStoreId: '',
        id:'wallNotificationSettingViewId',
        name:'wallNotificationSettingView',
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

        var topToolBarPanel= ThisApp.util.CommonUtil.getTopToolBarPanel();
        var bottomBarPanel= ThisApp.util.CommonUtil.getBottomToolBarPanel();
        var backButton = Ext.ComponentQuery.query('button[name=backButton]')[0];
        backButton.action = 'onBackOfNotificationSettingButtonClick';
        var feedbackButton = Ext.ComponentQuery.query('button[name=feedbackButton]')[0];
        feedbackButton.setHidden(true);
        topToolBarPanel.setTitle("Wall Notification");
        var panelHeight = ThisApp.util.CommonUtil.getPanelHeight();
        var wallNotificationSettingMainPanel = ({
               xtype: 'formpanel',
               maxHeight:'100%',
               maxWidth:'100%',
               width:'100%',
               id: 'wallNotificationSettingViewPanelId',
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
                          height:  panelHeight,
                          width:'100%',
                          cls:'marginTop15pxCls',
                          layout:{
                                     type:'vbox',
                                     pack:'start',
                                     align:'center'
                          },
                          items:[
                               {
                                       xtype:'panel',
                                       width:'90%',
                                       layout:{
                                          type:'hbox',
                                          align:'center'
                                       },
                                       items:[
                                          {
                                               xtype:'label',
                                               width:'68%',
                                               cls:'textFieldCls',
                                               html:'Turn off notifications for this event'
                                          },
                                          {
                                              xtype:'panel',
                                              width:'32%',
                                              cls:'toggleButtonPanelCls',
                                              layout:{
                                                   type:'hbox',
                                                   pack:'end',
                                                   align:'right'
                                              },
                                              items:[
                                                   {
                                                       xtype:'togglefield',
                                                       name:'wallNotificationToggleBtn',
                                                       action:'onWallNotificationToggle'
                                                   }
                                              ]
                                          }
                                      ]
                               }
                          ]
                   },
                   {
                         xtype:'panel',
                         width:'100%',
                         layout: 'hbox',
                         name: 'wallNotificationSettingBottomPanel',
                         hidden: true,
                         items:[
                                    bottomBarPanel
                         ]
                   }

               ]

       });
       this.add([wallNotificationSettingMainPanel]);
    }
});