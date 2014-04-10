/**created by chetana walunj
Date:13/11/2013
**/

Ext.define("ThisApp.view.widgets.HourMinutePickerField", {
    extend: 'Ext.field.Text',
        xtype: 'hourMinutePickerField',
        requires: [
            'ThisApp.view.widgets.HourMinutePicker',
            'Ext.DateExtras'
        ],

	 /**
         * @event change
         * Fires when a date is selected
         * @param {Ext.ux.field.DateTimePicker} this
         * @param {Date} date The new date
         */

        config: {
            ui: 'select',

            /**
             * @cfg {Object/Ext.ux.picker.DateTime} picker
             * An object that is used when creating the internal {@link Ext.ux.picker.DateTime} component or a direct instance of {@link Ext.ux.picker.DateTime}
             * Defaults to true
             * @accessor
             */
            picker: true,

            /**
             * @cfg {Boolean}
             * @hide
             * @accessor
             */
            clearIcon: false,

            /**
             * @cfg {Object/Date} value
             * Default value for the field and the internal {@link Ext.ux.picker.DateTime} component. Accepts an object of 'year',
             * 'month' and 'day' values, all of which should be numbers, or a {@link Date}.
             *
             * Example: {year: 1989, day: 1, month: 5} = 1st May 1989 or new Date()
             * @accessor
             */

            /**
             * @cfg {Boolean} destroyPickerOnHide
             * Whether or not to destroy the picker widget on hide. This save memory if it's not used frequently,
             * but increase delay time on the next show due to re-instantiation. Defaults to false
             * @accessor
             */
            destroyPickerOnHide: false,

            /**
             * @cfg {String} dateTimeFormat The format to be used when displaying the date in this field.
             * Accepts any valid datetime format. You can view formats over in the {@link Ext.Date} documentation.
             * Defaults to `Ext.util.Format.defaultDateFormat`.
             */
            dateTimeFormat: 'm/d/Y h:i:A',
            /**
             * @cfg {Object}
             * @hide
             */
            component: {
                useMask: true
            }
        },

        initialize: function() {
            this.callParent();

            this.getComponent().on({
                scope: this,

                masktap: 'onMaskTap'
            });

            this.getComponent().input.dom.disabled = true;
        },

        syncEmptyCls: Ext.emptyFn,

        applyValue: function(value) {
            if (!Ext.isDate(value) && !Ext.isObject(value)) {
                value = null;
            }

            if (Ext.isObject(value)) {

                value = new Date(value.year, value.month - 1, value.day,value.hour,value.minute,value.seconds);
            }

            return value;
        },

        updateValue: function(newValue) {
            var picker = this._picker;
            if (picker && picker.isPicker) {
                picker.setValue(newValue);
            }

            // Ext.Date.format expects a Date
            if (newValue !== null) {
                this.getComponent().setValue(Ext.Date.format(newValue, this.getDateTimeFormat() || Ext.util.Format.defaultDateFormat));
            } else {
                this.getComponent().setValue('');
            }

            if (this._picker && this._picker instanceof ThisApp.view.widgets.HourMinutePicker) {
                this._picker.setValue(newValue);
            }
        },

        /**
         * Updates the date format in the field.
         * @private
         */
        updateDateFormat: function(newDateFormat, oldDateFormat) {
            var value = this.getValue();
            if (newDateFormat != oldDateFormat && Ext.isDate(value) && this._picker && this._picker instanceof ThisApp.view.widgets.HourMinutePicker) {
                this.getComponent().setValue(Ext.Date.format(value, newDateFormat || Ext.util.Format.defaultDateFormat));
            }
        },

        /**
         * Returns the {@link Date} value of this field.
         * If you wanted a formated date
         * @return {Date} The date selected
         */
         /*** modified By Sandip Lipane on 6 dec. 2013 to eliminate the picker cancel click issue ***/
        getValue: function() {
            if (this._picker && this._picker instanceof ThisApp.view.widgets.HourMinutePicker) {
                if(this._picker._value.hour == null || this._picker._value.minute == null ){
                     /*Changes by sandip for validation*/
                     return null;
                }else{
                      return this._picker.getValue();
                }
            }
            return this._value;
        },

        /**
         * Returns the value of the field formatted using the specified format. If it is not specified, it will default to
         * {@link #dateFormat} and then {@link Ext.util.Format#defaultDateFormat}.
         * @param {String} format The format to be returned
         * @return {String} The formatted date
         */
        getFormattedValue: function(format) {
            var value = this.getValue();
           // ThisApp.util.GlobalUtil.logMessage(this.getDateTimeFormat(),"format");
            return (Ext.isDate(value)) ? Ext.Date.format(value, format || this.getDateTimeFormat() || Ext.util.Format.defaultDateFormat) : value;
        },

        applyPicker: function(picker, pickerInstance) {
            if (pickerInstance && pickerInstance.isPicker) {
                picker = pickerInstance.setConfig(picker);
            }

            return picker;
        },

        getPicker: function() {
            var picker = this._picker,
                value = this.getValue();

            if (picker && !picker.isPicker) {
                picker = Ext.factory(picker, ThisApp.view.widgets.HourMinutePicker);
                picker.on({
                    scope: this,
                    //cancel: 'onPickerCancel',
                    change: 'onPickerChange',
                    hide  : 'onPickerHide'
                });

                if (value !== null) {
                    picker.setValue(value);
                }
                Ext.Viewport.add(picker);
                this._picker = picker;
            }

            return picker;
        },

        /**
         * @private
         * Listener to the tap event of the mask element. Shows the internal DatePicker component when the button has been tapped.
         */
        onMaskTap: function() {
            if (this.getDisabled()) {
                return false;
            }

            if (this.getReadOnly()) {
                return false;
            }
            this.getPicker().show();

            return false;
        },

        /**
         * @private
         * Revert internal date so field won't appear changed
         */
        onPickerCancel: function(picker, options) {
            this._picker = this._picker.config;
            picker.destroy();
            return true;
        },

        /**
         * Called when the picker changes its value
         * @param {Ext.ux.picker.DateTime} picker The date picker
         * @param {Object} value The new value from the date picker
         * @private
         */
        onPickerChange: function(picker, value) {
            var me = this;
            me.setValue(value);
            me.fireEvent('change', me, me.getValue());
        },

        /**
         * Destroys the picker when it is hidden, if
         * {@link Ext.ux.field.DateTimePicker#destroyPickerOnHide destroyPickerOnHide} is set to true
         * @private
         */
        onPickerHide: function() {
            var picker = this.getPicker();
            if (this.getDestroyPickerOnHide() && picker) {
                picker.destroy();
                this._picker = true;
            }
        },

        reset: function() {
            this.setValue(this.originalValue);
        },

        // @private
        destroy: function() {
            var picker = this.getPicker();

            if (picker && picker.isPicker) {
                picker.destroy();
            }

            this.callParent(arguments);
        }
        //<deprecated product=touch since=2.0>
    }, function() {
        this.override({
            getValue: function(format) {
                if (format) {
                    //<debug warn>
                    Ext.Logger.deprecate("format argument of the getValue method is deprecated, please use getFormattedValue instead", this);
                    //</debug>
                    return this.getFormattedValue(format);
                }
                return this.callOverridden();
            }
        });

        /**
         * @method getDatePicker
         * @inheritdoc Ext.ux.field.DateTimePicker#getPicker
         * @deprecated 2.0.0 Please use #getPicker instead
         */
        Ext.deprecateMethod(this, 'getDatePicker', 'getPicker');
        //</deprecated>

});
