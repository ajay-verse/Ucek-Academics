import { Component } from '@angular/core';
import { BackendService } from '../services/backend/backend.service';

@Component({
	selector: 'app-delete.notification',
	templateUrl: './delete.notification.component.html',
	styleUrls: ['./delete.notification.component.css'],
})
export class DeleteNotificationComponent {
	constructor(private bk: BackendService) {}

	year_map = new Map([
		[0, 'All years'],
		[1, '1st year'],
		[2, '2nd year'],
		[3, '3rd year'],
		[4, '4th year'],
	]);

	branch_map = new Map([
		[0, 'All branches'],
		[1, 'Civil'],
		[2, 'EEE'],
		[3, 'Mech'],
		[4, 'ECE'],
		[5, 'CSE'],
		[6, 'CHE'],
		[7, 'PET'],
	]);

	notifications: any = [];

	class_name: String = '';
	changeClass() {
		if (this.class_name == '') {
			this.class_name = 'toggle-sidebar';
		} else {
			this.class_name = '';
		}
	}

	ngOnInit(): void {
		this.getNotifications();
	}

	getNotifications() {
		this.bk
			.post('/notification/get', { year: 0, branch: 0 })
			.subscribe((data) => {
				this.notifications = data;
				this.notifications.sort();
				this.notifications.reverse();
				console.log(this.notifications);
			});
	}

	deleteNotification(_id: any) {
		console.log(_id);
		this.bk.post('/notification/delete', { _id: _id }).subscribe((data) => {
			console.log(data);
			location.reload();
		});
	}
}
