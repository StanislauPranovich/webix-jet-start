import {JetView} from "webix-jet";

export default class ContactsFormView extends JetView {
	config() {
		return {
			view: "form",
			localId: "contactsForm",
			elements: [
				{
					view: "text",
					label: "Name",
					name: "name"
				},
				{
					view: "text",
					label: "Country",
					name: "country"
				},
				{
					cols: [
						{
							view: "button",
							value: "Save"
						},
						{
							view: "button",
							value: "Remove"
						}
					]
				},
				{}
			]
		};
	}
}
