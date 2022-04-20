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
					name: "FirstName"
				},
				{
					view: "combo",
					label: _("Country"),
					localId: "country",
					name: "Address",
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
					name: "StatusID",
					options: {
						view: "suggest",
						body: {
							view: "list",
							data: statuses,
							template: "#Value#"
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

	$getContactsForm() {
		return this.$$("contactsForm");
	}

	saveItem() {
		const getFormValues = this.$getContactsForm().getValues();
		if (this.$getContactsForm().isDirty()) {
			contacts.updateItem(getFormValues.id, getFormValues);
			this.webix.message("Data saved!");
		}
	}

	urlChange() {
		const urlId = this.getParam("id");
		this.getContacts().waitData.then(() => {
			if (urlId) {
				this.$getContactsForm().setValues(this.getContacts(urlId));
			}
			else {
				this.$getContactsForm().clear();
			}
		});
	}
}
