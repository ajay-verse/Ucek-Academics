import { Component } from '@angular/core';
import { BackendService } from '../services/backend/backend.service';

@Component({
	selector: 'app-notifications',
	templateUrl: './notifications.component.html',
	styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent {

	constructor(private bk: BackendService) { }

	year_map = new Map([
		[0, 'All years'],
		[1, '1st year'],
		[2, '2nd year'],
		[3, '3rd year'],
		[4, '4th year']
	])

	branch_map = new Map([
		[0, 'All branches'],
		[1, 'Civil'],
		[2, 'EEE'],
		[3, 'Mech'],
		[4, 'ECE'],
		[5, 'CSE'],
		[6, 'CHE'],
		[7, 'PET']
	])

	year: number = 0
	branch: number = 0
	notifications: any = []

	class_name: String = ''
	changeClass() {
		if (this.class_name == '') {
			this.class_name = 'toggle-sidebar'
		} else {
			this.class_name = ''
		}
	}

	ngOnInit(): void {
		this.getNotifications()
	}

	getNotifications() {
		this.bk.post('/notification/get', { year: 0, branch: 0 }).subscribe(data => {
			this.notifications = data
			this.notifications.sort()
			this.notifications.reverse()
			console.log(this.notifications)
		})
	}


}
