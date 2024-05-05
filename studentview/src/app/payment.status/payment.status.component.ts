import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-payment.status',
  templateUrl: './payment.status.component.html',
  styleUrls: ['./payment.status.component.css']
})
export class PaymentStatusComponent {

	constructor(private aroute: ActivatedRoute) {}

	details: any = {}

	class_name: String = ''
	changeClass() {
		if (this.class_name == '') {
			this.class_name = 'toggle-sidebar'
		} else {
			this.class_name = ''
		}
	}

	ngOnInit() {
		this.aroute.queryParams.subscribe((param: Params) => {
			for (const key of ["status", "roll", "name", "email", "purpose", "amount", "payment_id"]) {
				this.details[key] = param[key]
			}
			console.log(this.details)
		})
	}

}
