import { JetView } from "webix-jet";
import { contacts } from "../../models/contacts";

export default class ContactsListView extends JetView {
	config() {
		return {
			view: "list",
			localId: "list_of_contacts",
			template: "#Name#",
		};
	}

	init() {
		const list_of_contacts = this.$getListOfContacts();
		list_of_contacts.parse(contacts);
	}

    $getListOfContacts() {
        return this.$$("list_of_contacts");
    }
}