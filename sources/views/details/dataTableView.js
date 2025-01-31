import {JetView} from "webix-jet";

export default class DataTableView extends JetView {
	constructor(app, data) {
		super(app);
		this.tableData = data;
	}

	config() {
		const _ = this.app.getService("locale")._;
		return {
			rows: [
				{
					view: "datatable",
					localId: "tableView",
					autoConfig: true,
					editable: "text",
					editaction: "dblclick",
					select: true
				},
				{
					cols: [
						{
							view: "text",
							localId: "textView",
							name: "Name"
						},
						{
							view: "button",
							value: _("Add item"),
							css: "webix_primary",
							click: () => this.addItem()
						},
						{
							view: "button",
							value: _("Remove item"),
							css: "webix_primary",
							click: () => this.removeItem()
						}
					]
				},
				{}
			]
		};
	}

	$getTextView() {
		return this.$$("textView");
	}

	$getDataTable() {
		return this.$$("tableView");
	}

	init() {
		this.$getDataTable().parse(this.tableData);
	}

	addItem() {
		const input = this.$getTextView();
		const receivedValue = input.getValue();
		if (receivedValue.trim()) {
			this.tableData.add({Value: receivedValue, Name: receivedValue});
			input.setValue("");
		}
	}

	removeItem() {
		const table = this.$getDataTable();
		const receivedId = table.getSelectedId();
		if (receivedId) {
			this.tableData.remove(receivedId);
		}
	}
}
