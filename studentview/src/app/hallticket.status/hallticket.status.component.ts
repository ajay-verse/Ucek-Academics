import { Component } from '@angular/core';
import { BackendService } from '../services/backend/backend.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-hallticket.status',
	templateUrl: './hallticket.status.component.html',
	styleUrls: ['./hallticket.status.component.css'],
})
export class HallticketStatusComponent {
	constructor(private router: Router, private bk: BackendService) {}

	roll_no: String = '';
	certifcates: any = [];

	class_name: String = '';
	changeClass() {
		if (this.class_name == '') {
			this.class_name = 'toggle-sidebar';
		} else {
			this.class_name = '';
		}
	}

	ngOnInit() {
		this.roll_no = localStorage.getItem('roll') || '';
		if (!this.roll_no) {
			this.router.navigateByUrl('/login');
			return;
		}
		this.getHallTicket();
	}

	getHallTicket() {
		this.bk
			.post('/student/get-hallticket', { roll_no: this.roll_no })
			.subscribe((response) => {
				this.certifcates = response;
				console.log('Hall ticket response');
				console.log(response);
				console.log('Ended....');
			});
	}
}
