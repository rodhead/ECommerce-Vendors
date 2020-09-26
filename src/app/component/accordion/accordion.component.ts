import { Component, OnInit } from '@angular/core';
import { NgbPanelChangeEvent } from '@ng-bootstrap/ng-bootstrap';


@Component({
	selector: 'app-ngbd-accordion-basic',
	templateUrl: 'accordion.component.html'
})
export class NgbdAccordionBasicComponent implements OnInit{
	dtOptions: any = {};
	rows = [
		{name: 'Austin', gender: 'Male', company: 'Swimlane'},
		{name: 'Dany', gender: 'Male', company: 'KFC'},
		{name: 'Molly', gender: 'Female', company: 'Burger King'}
	  ];
	  columns = [{ prop: 'name' }, { name: 'Gender' }, { name: 'Company' }];
	beforeChange($event: NgbPanelChangeEvent) {
		if ($event.panelId === 'preventchange-2') {
			$event.preventDefault();
		}

		if ($event.panelId === 'preventchange-3' && $event.nextState === false) {
			$event.preventDefault();
		}
	}

	ngOnInit(): void {
		this.dtOptions = {
		  pagingType: 'full_numbers'
		};
	  }

	disabled = false;
}
