import {JetView} from "webix-jet";

import contacts from "../../models/contacts";
import countries from "../../models/countries";
import statuses from "../../models/statuses";

export default class ContactsFormView extends JetView {
	config() {
		const _ = this.app.getService("locale")._;
		return {
			view: "form",
			localId: "contactsForm",
			elements: [
				{
					view: "text",
					label: _("Name"),
					name: "Name"
				},
				{
					view: "combo",
					label: _("Country"),
					localId: "country",
					name: "Country",
					options: {
						view: "suggest",
						body: {
							view: "list",
							data: countries,
							template: "#Name#"
						}
					}
				},
				{
					view: "combo",
					label: _("Status"),
					name: "Status",
					options: {
						view: "suggest",
						body: {
							view: "list",
							data: statuses,
							template: "#Name#"
						}
					}
				},
				{
					cols: [
						{
							view: "button",
							value: _("Save"),
							click: () => this.saveItem()
						}
					]
				},
				{}
			]
		};
	}

	getContacts(id) {
		if (id) return contacts.getItem(id);
		return contacts;
	}

	saveItem() {
		const getFormValues = this.getRoot().getValues();
		if (this.$$("contactsForm").isDirty()) {
			contacts.updateItem(getFormValues.id, getFormValues);
			this.webix.message("Data saved!");
		}
	}

	init(view) {
		view.setValues(this.getContacts(this.getContacts().getFirstId()));
	}

	urlChange(view) {
		const urlId = this.getParam("id");
		if (urlId) {
			view.setValues(this.getContacts(urlId));
		}
	}
}
