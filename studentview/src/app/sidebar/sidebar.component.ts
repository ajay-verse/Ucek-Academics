import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'app-sidebar',
	templateUrl: './sidebar.component.html',
	styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
	constructor(private router: Router) {}

	ngOnInit(): void {}

	goToHome() {
		this.router.navigateByUrl('/home');
	}

	goToLogin() {
		localStorage.clear();
		this.router.navigateByUrl('/login');
	}

	goToProfile() {
		this.router.navigateByUrl('/profile');
	}

	goToContact() {
		this.router.navigateByUrl('/contact');
	}

	goToMap() {
		this.router.navigateByUrl('/map');
	}

	goToResults() {
		this.router.navigateByUrl('/result');
	}

	goToHallTicket() {
		this.router.navigateByUrl('/downloadhallticket');
	}
	goToHallTicketStatus() {
		this.router.navigateByUrl('/hallticketStatus');
	}

	goToRevaluation() {
		this.router.navigateByUrl('/applyrevaluation');
	}

	goToCertificateStatus() {
		this.router.navigateByUrl('/certificatestatus');
	}

	goToRegister() {
		this.router.navigateByUrl('/register');
	}

	goToNewsFeed() {
		this.router.navigateByUrl('/newsfeed');
	}

	goToNotifications() {
		this.router.navigateByUrl('/notifications');
	}
	goToPayment() {
		this.router.navigateByUrl('/payment');
	}

	goToSemesterApplication() {
		this.router.navigateByUrl('/semesterapplication');
	}

	goToSupplySemesterApplication() {
		this.router.navigateByUrl('/supplysemesterapplication');
	}

	goToCertificateApplication() {
		this.router.navigateByUrl('/certificateapplication');
	}

	getAttendance() {
		this.router.navigateByUrl('/getAttendance');
	}
}
