/** created by Pooja Zarkar
  *  30 Nov 2013
  *  EventsInvitedContacts Store
 **/
Ext.define('ThisApp.store.EventsInvitedContactsStore', {
    extend: 'Ext.data.Store',

	config: {
		model: 'ThisApp.model.EventsInvitedContactsModel',
        storeId: 'eventsInvitedContactsStore',
		autoLoad: true,
		autoSync: true,
		sorters :'isInvitedMembersSort'   /*** Added by Pooja and SL on 27 Dec. 2013 for sorting the InvitedMembers in event participants view page ***/
	}

});