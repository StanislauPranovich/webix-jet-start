import {JetView} from "webix-jet";

import countries from "../models/countries";
import statuses from "../models/statuses";
import DataTableView from "./details/dataTableView";


export default class DataView extends JetView {
	config() {
		const _ = this.app.getService("locale")._;
		return {
			view: "tabview",
			css: "webix_shadow_medium",
			cells: [{
				body: {
					rows: [
						new DataTableView(this.app, countries)
					]
				},
				header: _("Countries")
			},
			{
				body: {
					rows: [
						new DataTableView(this.app, statuses)
					]
				},
				header: _("Statuses")
			}
			]
		};
	}
}
