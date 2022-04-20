import { JetView } from "webix-jet";

import contacts from "../../models/contacts";
import countries from "../../models/countries";
import countriesList from "../../models/countriesList";
import statuses from "../../models/statuses";
import statusesList from "../../models/statusesList";
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
					template: "#FirstName# <span class='remove-btn'>X</span>",
					select: true,
					onClick: {
						"remove-btn": (e, id) => {
							contacts.remove(id);
							if (this.$getListOfContacts().count() !== 0) {
								this.$getListOfContacts().select(this.$getListOfContacts().getFirstId());
							} else {
								this.show("contacts")
							}
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
			FirstName: users.getItem(users.getIdByIndex(randomInteger(0, users.count() - 1))).name,
			Address: randomInteger(1, countriesList.count()),
			StatusID: randomInteger(1, statusesList.count())
		});
		countries.add({
			Name: countriesList.getItem(countriesList.getIdByIndex(randomInteger(0, countriesList.count() - 1))).name,
		})
		statuses.add({
			Value: statusesList.getItem(statusesList.getIdByIndex(randomInteger(0, statusesList.count() - 1))).Value,
		})
	}

	init() {
		const listOfContacts = this.$getListOfContacts();
		const contactId = this.getParam("id");
		listOfContacts.sync(this.getContacts());
		this.on(listOfContacts, "onAfterSelect", (id) => {
			this.show(`contacts?id=${id}`);
		});
		this.getContacts().waitData.then(() => {
			if (contactId) {
				listOfContacts.select(contactId);
			}
			else {
				listOfContacts.select(listOfContacts.getFirstId());
			}
		})
	}
	urlChange() {
		const contactId = this.getParam("id");
		if (contactId === undefined) {
			this.$getListOfContacts().unselectAll();
		}
	}
}
