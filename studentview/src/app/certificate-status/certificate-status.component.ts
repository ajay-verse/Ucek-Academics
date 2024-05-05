import { Component } from '@angular/core';
import { BackendService } from '../services/backend/backend.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-certificate-status',
	templateUrl: './certificate-status.component.html',
	styleUrls: ['./certificate-status.component.css']
})
export class CertificateStatusComponent {

	constructor(private router: Router, private bk: BackendService) { }

	roll: String = ''
	certifcates: any = []

	getCertificates() {
		this.bk.post('/student/get-certificate-status', { roll: this.roll }).subscribe(response => {
			this.certifcates = response
		})
	}

	class_name: String = ''
	changeClass() {
		if (this.class_name == '') {
			this.class_name = 'toggle-sidebar'
		} else {
			this.class_name = ''
		}
	}

	ngOnInit() {
		this.roll = localStorage.getItem('roll') || ''
		if (!this.roll) {
			this.router.navigateByUrl('/login')
			return
		}
		this.getCertificates()
	}

}
