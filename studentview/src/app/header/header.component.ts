import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css']
})
export class HeaderComponent {
	@Output() toggleEvent = new EventEmitter()

	constructor(private router: Router) { }

	user_data: any = null

	changeClass() {
		this.toggleEvent.emit()
	}

	ngOnInit(): void {
		this.user_data = localStorage.getItem("user_data")
		if (!this.user_data) {
			this.router.navigateByUrl('/login')
		}
		this.user_data = JSON.parse(this.user_data)
		this.user_data.picture = "http://127.0.0.1:3000/" + this.user_data.picture
	}

	goToHome() {
		this.router.navigateByUrl('/home')
	}

	goToNotifications() {
		this.router.navigateByUrl('/notifications')
	}

	goToProfile() {
		this.router.navigateByUrl('/profile')
	}
	logout() {
		localStorage.clear()
		this.router.navigateByUrl('/login')
	}

}
