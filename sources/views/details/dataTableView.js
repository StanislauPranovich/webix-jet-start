import { JetView } from "webix-jet";
import { statuses } from "../../models/statuses";


export default class DataTableView extends JetView {
	constructor(app, data) {
		super(app);
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

	$getInputValue() {
		return this.$$("input_value");
	}

	$getDataTable() {
		return this.$$("tableWithData");
	}

	init() {
		this.$getDataTable().parse(this.tableData);
	}

	addItem() {
		const inputValue = this.$getInputValue();
		const table = this.$getDataTable();
		const receivedValue = inputValue.getValue();
		const arrayOfTitles = this.getRoot().$view.innerText.split("\n")
		if (arrayOfTitles.indexOf("Icon") !== -1 && receivedValue) {
			table.add({ "Name": receivedValue, "Icon": "user" });
		} else if (receivedValue) {
			table.add({ "Name": receivedValue });
		}
		inputValue.setValue("");
	}

	removeItem() {
		const table = this.$getDataTable();
		if (table.getSelectedId()) {
			table.remove(table.getSelectedId());
		}
	}
}