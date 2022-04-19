import {JetView} from "webix-jet";

import contacts from "../../models/contacts";
import countries from "../../models/countries";
import statuses from "../../models/statuses";
import users from "../../models/users";

export default class ContactsListView extends JetView {
	config() {
		const _ = this.app.getService("locale")._;
		return {
			rows: [
				{
					view: "list",
					localId: "listOfContacts",
					template: "#Name# <span class='remove-btn'>X</span>",
					select: true,
					onClick: {
						"remove-btn": function (e, id) {
							contacts.remove(id);
							return false;
						}
					}
				},
				{
					view: "button",
					value: _("Add item"),
					click: () => this.addItem()
				}
			]

		};
	}

	$getListOfContacts() {
		return this.$$("listOfContacts");
	}

	getContacts(id) {
		if (id) return contacts.getItem(id);
		return contacts;
	}

	randomInteger(min, max) {
		let rand = min + Math.random() * (max + 1 - min);
		return Math.floor(rand);
	}

	addItem() {
		contacts.add({
			Name: users.getItem(users.getIdByIndex(this.randomInteger(0, users.count() - 1))).name,
			Country: this.randomInteger(1, countries.count()),
			Status: this.randomInteger(1, statuses.count())
		});
	}

	init() {
		const listOfContacts = this.$getListOfContacts();
		listOfContacts.parse(this.getContacts());
		this.on(listOfContacts, "onAfterSelect", (id) => {
			this.show(`contacts?id=${id}`);
		});
		if (this.getParam("id")) {
			listOfContacts.select(this.getParam("id"));
		}
		else {
			listOfContacts.select(listOfContacts.getFirstId());
		}
	}
}
