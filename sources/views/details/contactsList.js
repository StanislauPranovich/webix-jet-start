import {JetView} from "webix-jet";

import contacts from "../../models/contacts";

export default class ContactsListView extends JetView {
	config() {
		return {
			view: "list",
			localId: "listOfContacts",
			template: "#Name#"
		};
	}

	init() {
		const listOfContacts = this.$getListOfContacts();
		listOfContacts.parse(contacts);
	}

	$getListOfContacts() {
		return this.$$("listOfContacts");
	}
}
