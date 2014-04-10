/**created by chetana walunj
Date:13/11/2013
**/
Ext.define("ThisApp.view.widgets.DisplayMessageOverlay", {
	extend: 'Ext.Panel',
	alias: 'widget.displayMessageOverlay',

    config: {
           zIndex:13,
           modal: true,
           hideOnMaskTap: false,
           id:'displayMessageOverlayId',
           name:'displayMessageOverlay',        /* changes by P on 27 Dec 2013*/
           showAnimation: {
                        type: 'slide',
                        duration: 500,
                        direction:'down'
           },
           centered: true,
           width: Ext.os.deviceType == 'Phone' ? 270 : 270,
           baseCls:'alertLongListPopupCls'
    },

    initialize: function () {

        this.callParent(arguments);

        var windowHeight =Ext.Viewport.getWindowHeight() ;
        var windowWidth =Ext.Viewport.getWindowWidth() ;
        var topToolBarPanel= Ext.create('Ext.Toolbar',{
            width:'100%',
            docked: 'top',
            name: 'commonToolbar',
            cls: 'topToolBarPanelBgCls',
            layout:{
                type: 'vbox',
                pack:'center',
                align:'center'
            } ,
            items: [
            {
                 xtype:'panel',
                 width:'100%',
                 cls:'saveServiceTopLabelPanelCls',
                 layout:{
                     type:'vbox',
                     pack:'center',
                     align:'center'
                 },
                 items:[
                     {
                         xtype:'label',
                         name:'alertBoxTitle',
                         html:'<div class="h4 whiteFlat"><label>ThisApp</label></div>'
                     }

                 ]
            }
            ]

        });

        this.messagePanel = ({
            xtype:'panel',
            width:'100%',
            height:'30%',
            cls:'padding5pxCls',
            name:'errorMessagePanel',
            layout:{
                type:'vbox',
                align:'center',
                pack:'center'
            },
            items:[
            ]
        });
        var buttonPanel =({
            xtype:'panel',
            width:'100%',
            height:'30%',
            docked:'bottom',
            layout:{
                type:'hbox',
                align:'center',
                pack:'center'
            },
            items:[
                {
                    xtype:'button',
                    text:'Ok',
                    width:'40%',
                    cls:'buttonMainCls border',
                    handler: function(btn, e){
                      container = this.up('panel');
                      parentContainer = container.up('panel');
                      parentContainer.hide();
                      parentContainer.destroy();
                    }
                }
            ]
        });
       this.add([topToolBarPanel, this.messagePanel,buttonPanel]);
    },

    showErrorMessages: function(errors){
      var panel = this.down('panel[name=errorMessagePanel]');
      panel.add(ThisApp.util.CommonUtil.convertToErrorMessages(errors));
    }

});