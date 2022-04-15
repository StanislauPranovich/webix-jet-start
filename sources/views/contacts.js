import { JetView } from "webix-jet";
import ContactsFormView from "./details/contactsForm";
import ContactsListView from "./details/contactsList";

export default class ContactsView extends JetView {
	config() {
		return {
			cols: [
				ContactsListView,
				ContactsFormView
			],
		};
	}
}