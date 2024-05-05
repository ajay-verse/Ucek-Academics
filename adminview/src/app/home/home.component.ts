import { Component } from '@angular/core';
import { BackendService } from '../services/backend/backend.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css'],
})
export class HomeComponent {
	constructor(private router: Router, private bk: BackendService) {}

	queries: Number = 0;
	logins: Number = 0;
	global_queries: Number = 0;
	global_logins: Number = 0;
	notifications: any = [];
	email: any = {};
	query: Number = 0;

	class_name: String = '';
	changeClass() {
		if (this.class_name == '') {
			this.class_name = 'toggle-sidebar';
		} else {
			this.class_name = '';
		}
	}

	ngOnInit(): void {
		this.email = localStorage.getItem('email');
		if (!this.email) {
			this.router.navigateByUrl('/admin/login');
			return;
		}
		this.getNotifications();
		this.getTotalQuery();
	}

	getNotifications() {
		this.bk.post('/notification/get', { limit: 6 }).subscribe((data) => {
			console.log(data);
			this.notifications = data;
			for (var i = 0; i < data.length; i++) {
				if (data[i].file == null) {
					data[i].file = '#';
				}
				var file_base_url = this.bk._baseURL.replace(
					'api',
					data[i].file
				);
				data[i].file = file_base_url;
			}
		});
	}
	getTotalQuery() {
		this.bk
			.post('/admin/getTotalQuery', { exam_type: 'REG' })
			.subscribe((data) => {
				console.log(data.length);
				this.query = data.length;
				this.queries = data;
			});
	}

	goToHome() {
		this.router.navigateByUrl('/admin/home');
	}

	goToNotifications() {
		this.router.navigateByUrl('/admin/upload-notifications');
	}

	goToProfile() {
		this.router.navigateByUrl('/admin/profile');
	}
}
