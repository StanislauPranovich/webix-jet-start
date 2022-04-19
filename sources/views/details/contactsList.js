import {JetView} from "webix-jet";

import contacts from "../../models/contacts";
import countries from "../../models/countries";
import statuses from "../../models/statuses";
import users from "../../models/users";
import randomInteger from "../helpers/randomInteger";

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

	addItem() {
		contacts.add({
			Name: users.getItem(users.getIdByIndex(randomInteger(0, users.count() - 1))).name,
			Country: randomInteger(1, countries.count()),
			Status: randomInteger(1, statuses.count())
		});
	}

	init() {
		const listOfContacts = this.$getListOfContacts();
		const getIdFromURL = this.getParam("id");
		listOfContacts.parse(this.getContacts());
		this.on(listOfContacts, "onAfterSelect", (id) => {
			this.show(`contacts?id=${id}`);
		});
		if (getIdFromURL) {
			listOfContacts.select(getIdFromURL);
		}
		else {
			listOfContacts.select(listOfContacts.getFirstId());
		}
	}
}
