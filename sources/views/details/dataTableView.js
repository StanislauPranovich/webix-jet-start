import { JetView } from "webix-jet";
import { statuses } from "../../models/statuses";


export default class DataTableView extends JetView {
	constructor(app, {}, data) {
		super(app, {});
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
		const input_value = this.$getInputValue();
		const table = this.$getDataTable();
		const receivedValue = input_value.getValue();
		if (this.tableData === statuses && receivedValue) {
			table.add({ "Name": input_value.getValue(), "Icon": "user" });
		} else if (receivedValue) {
			table.add({ "Name": input_value.getValue() });
		}
		input_value.setValue("");
	}

	removeItem() {
		const table = this.$getDataTable();
		if (table.getSelectedId()) {
			table.remove(table.getSelectedId());
		}
	}
}