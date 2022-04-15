import { JetView } from "webix-jet";
import { statuses } from "../../models/statuses";


export default class DataTableView extends JetView {
	constructor(app, name, data) {
		super(app, name);
		this.tableData = data;
	}
	config() {
		return {
			rows: [
				{
					view: "datatable",
					localId: "tableWithData",
					autoConfig: true,
					editable: "text",
					editaction: "dblclick",
					select: true
				},
				{
					cols: [
						{
							view: "text",
							localId: "input_value",
							name: "Name"
						},
						{
							view: "button",
							value: "Add item",
							css: "webix_primary",
							click: () => this.addItem()
						},
						{
							view: "button",
							value: "Remove item",
							css: "webix_primary",
							click: () => this.removeItem()
						}
					]
				},
				{}
			]
		};
	}
	init(view) {
		view.queryView("datatable").parse(this.tableData);
	}

	addItem() {
		const input_value = this.$$("input_value");
		const table = this.$$("tableWithData");
		if (this.tableData === statuses && input_value.getValue()) {
			table.add({ "Name": input_value.getValue(), "Icon": "user" });
		} else if (input_value.getValue()) {
			table.add({ "Name": input_value.getValue() });
		}
		input_value.setValue("");
	}

	removeItem() {
		const table = this.$$("tableWithData");
		if (table.getSelectedId()) {
			table.remove(table.getSelectedId());
		}
	}
}