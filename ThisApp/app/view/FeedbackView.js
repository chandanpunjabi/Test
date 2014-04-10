/**created by Sandip Lipane
Date:6/12/2013
**/
Ext.define('ThisApp.view.FeedbackView', {
    extend:'Ext.Container',
    alias: 'widget.feedbackView',
    xtype: 'feedbackView',

    requires:[
         'Ext.form.Panel',
         'Ext.Panel',
         'Ext.Label',
         'Ext.Button'
    ],

    config: {
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


        var windowHeight = ThisApp.util.GlobalUtil.getWindowHeight();
        var windowWidth = Ext.Viewport.getWindowWidth() ;

        var topToolBarPanel= ThisApp.util.CommonUtil.getTopToolBarPanel();
        var bottomBarPanel= ThisApp.util.CommonUtil.getBottomToolBarPanel();
        var backButton = Ext.ComponentQuery.query('button[name=backButton]')[0];
        backButton.setHidden(true);

        //Changes by MJ- 12Dec2013.
        var feedbackButton = Ext.ComponentQuery.query('button[name=feedbackButton]')[0];
        feedbackButton.setHidden(true);

        //backButton.action = 'onFeedBackBtnClick';
        topToolBarPanel.setTitle("Feedback");
        /**Changes By M 17 Dec 2013*/
         var panelHeight = ThisApp.util.CommonUtil.getPanelHeight();
        var feedbackMainPanel = ({
               xtype: 'formpanel',
               maxHeight:'100%',
               maxWidth:'100%',
               width:'100%',
               id: 'feedbackViewPanelId',
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
                          height:  panelHeight,       /**Changes By M 17 Dec 2013*/
                          //scrollable:true,
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
                                       cls:'marginTop15pxCls',
                                       width:'90%',
                                       layout:{
                                           type:'vbox'
                                       },
                                       items:[
                                                 {
                                                         xtype: 'textareafield',
                                                         baseCls:'textFieldCls',
                                                         cls:'marginTop15pxCls border',
                                                         name:'feedbackMessageTextArea',
                                                         width:'100%',
                                                         id:'feedbackMessageTextAreaId',
                                                         clearIcon:false,
                                                         maxLength:1000,
                                                         action:'hideBottomBar'
                                                 }
                                       ]
                               },

                               {
                                       xtype:'button',
                                       cls:'cursorPointerCls border buttonMainCls marginTop15Px',
                                       width:'90%',
                                       height:40,
                                       text:'Submit',
                                       action:'onFeedBackClick'
                               }
                          ]
                   },
                   {
                         xtype:'panel',
                         width:'100%',
                         layout: 'hbox',
                         name: 'feedbackBottomPanel',
                         items:[
                                    bottomBarPanel
                         ]
                   }

               ]

       });
       this.add([feedbackMainPanel]);
    }
});