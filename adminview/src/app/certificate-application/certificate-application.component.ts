import { Component } from '@angular/core';
import { Router } from '@angular/router';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { BackendService } from '../services/backend/backend.service';
import Swal from 'sweetalert2';

@Component({
	selector: 'app-certificate-application',
	templateUrl: './certificate-application.component.html',
	styleUrls: ['./certificate-application.component.css'],
})
export class CertificateApplicationComponent {
	constructor(private router: Router, private bk: BackendService) {}

	email: String = '';
	certifcates: any = [];
	img_src: string = '';
	show_img: boolean = false;
	flag: boolean = true;
	today_date = '';
	metadata: any = {};
	student_data: any = {};
	show_doc: boolean = false;
	certs: any = [false, false, false];

	getCertificates() {
		this.bk
			.post('/admin/certificate-applications', { approved: false })
			.subscribe((response) => {
				// console.log(response);
				for (var i = 0; i < response.length; i++) {
					response[i].receipt = this.bk._baseURL.replace(
						'api',
						response[i].receipt
					);
				}
				this.certifcates = response;
				// console.log(response);
			});
	}

	view(img_src: string) {
		this.img_src = img_src;
		console.log(this.img_src);
		// return 'localhost:4200/admin';
		this.show_img = true;
		this.flag = false;
		setTimeout(() => {
			this.flag = true;
		}, 500);
	}

	printView(
		roll: string,
		application_type: string,
		duration: string,
		purpose: string
	) {
		this.show_doc = false;
		this.certs = [false, false, false];
		if (application_type == 'bonafide') {
			this.certs[0] = true;
		} else if (application_type == 'custodian') {
			this.certs[1] = true;
		} else if (application_type == 'course_completion_certificate') {
			this.certs[2] = true;
		} else {
			return;
		}
		this.bk
			.post('/admin/get-student-details', { roll: roll })
			.subscribe((data) => {
				if (data.errno != undefined) {
					Swal.fire('error', 'No student details', 'error');
					return;
				}
				data.purpose = purpose;
				data.duration = duration;
				data.application_type = application_type.split('_').join(' ');
				this.student_data = data;
				this.show_doc = true;
			});
	}

	class_name: String = '';
	changeClass() {
		if (this.class_name == '') {
			this.class_name = 'toggle-sidebar';
		} else {
			this.class_name = '';
		}
	}

	getMetaData() {
		this.bk.post('/admin/metadata', {}).subscribe((data) => {
			// console.log(data);
			for (const obj of data) {
				this.metadata[obj.key] = obj.value;
			}
			// console.log(this.metadata);
		});
	}

	ngOnInit() {
		document.addEventListener('click', () => {
			if (this.flag) {
				this.show_img = false;
				this.img_src = '';
			}
		});
		this.email = localStorage.getItem('email') || '';
		if (!this.email) {
			this.router.navigateByUrl('/admin/login');
			return;
		}
		this.getCertificates();
		this.getMetaData();
		let date = new Date();
		this.today_date =
			(date.getDate() > 9 ? date.getDate() : '0' + date.getDate()) +
			'.' +
			(date.getMonth() > 8
				? date.getMonth() + 1
				: '0' + (date.getMonth() + 1)) +
			'.' +
			date.getFullYear();
	}

	approveApplications(
		roll: string,
		DU_number: string,
		application_type: string
	) {
		this.bk
			.post('/admin/approve-certificate-application', {
				roll: roll,
				DU_number: DU_number,
				application_type: application_type,
			})
			.subscribe((response) => {
				if (response.errno != undefined) {
					alert('certificate not approved');
				} else {
					location.reload();
				}
			});
	}

	downloadPdf() {
		let index = -1;
		for (const [i, bool] of this.certs.entries()) {
			if (bool) {
				index = i;
				break;
			}
		}
		const context = document.getElementById('certificate-' + index);
		if (!context) {
			console.error('Element not found!');
			return;
		}
		let filename: string = 'certificate.pdf';
		html2canvas(context || document.createElement('div'), {
			scale: 3,
		}).then((canvas) => {
			const pdf = new jsPDF('p', 'mm', 'a4');
			const imgData = canvas.toDataURL('image/png');
			const imgProps = pdf.getImageProperties(imgData);
			const pdfWidth = pdf.internal.pageSize.getWidth();
			const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
			pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
			pdf.save(filename);
		});
	}
}
