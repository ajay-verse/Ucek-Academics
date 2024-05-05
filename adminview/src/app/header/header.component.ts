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

	email: any = null

	changeClass() {
		this.toggleEvent.emit()
	}

	ngOnInit(): void {
		this.email = localStorage.getItem("email")
		if (!this.email) {
			this.router.navigateByUrl('/admin/login')
		}
	}

	goToHome() {
		this.router.navigateByUrl('/admin/home')
	}
	goToProfile() {
		this.router.navigateByUrl('/admin/profile')
	}
	logout() {
		localStorage.clear()
		this.router.navigateByUrl('/admin/login')
	}

}
