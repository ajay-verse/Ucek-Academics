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
		this.router.navigateByUrl('/admin/home');
	}

	goToLogin() {
		localStorage.clear();
		this.router.navigateByUrl('/admin/login');
	}

	goToProfile() {
		this.router.navigateByUrl('/admin/profile');
	}

	goToContact() {
		this.router.navigateByUrl('/admin/contact');
	}
	goToQuery() {
		this.router.navigateByUrl('/admin/query');
	}

	goToNotifications() {
		this.router.navigateByUrl('/admin/upload-notifications');
	}

	goToDeleteNotifications() {
		this.router.navigateByUrl('/admin/delete-notifications');
		// console.log('Hello');
	}

	goToUpdateRegulation() {
		this.router.navigateByUrl('/admin/update-regulation');
	}

	goToUploadResults() {
		this.router.navigateByUrl('/admin/upload-results');
	}

	goToUploadSupplyResults() {
		this.router.navigateByUrl('/admin/upload-supplyresults');
	}

	goToApproveHalltickets() {
		this.router.navigateByUrl('/admin/approve-hallticket');
	}

	getRecordAttendance() {
		this.router.navigateByUrl('/admin/record-attendance');
	}

	goToUploadResultsCsv() {
		this.router.navigateByUrl('/admin/upload-results-csv');
	}

	goToSemesterApplication() {
		this.router.navigateByUrl('/admin/semester-application');
	}

	goToSupplySemesterApplication() {
		this.router.navigateByUrl('/admin/semester-supply-application');
	}

	goToRevaluationApplication() {
		this.router.navigateByUrl('/admin/revaluation-applications');
	}

	goToSupplyCertificateApplication() {
		this.router.navigateByUrl('/admin/certificate-application');
	}
}
