import { Component } from '@angular/core';
import { BackendService } from '../services/backend/backend.service';

@Component({
	selector: 'app-revaluation-applications',
	templateUrl: './revaluation-applications.component.html',
	styleUrls: ['./revaluation-applications.component.css'],
})
export class RevaluationApplicationsComponent {
	constructor(private bk: BackendService) {}

	applications: any = [];
	img_src: string = '';
	show_img: boolean = false;
	flag: boolean = true;

	class_name: String = '';
	changeClass() {
		if (this.class_name == '') {
			this.class_name = 'toggle-sidebar';
		} else {
			this.class_name = '';
		}
	}

	ngOnInit(): void {
		document.addEventListener('click', () => {
			if (this.flag) {
				this.show_img = false;
				this.img_src = '';
			}
		});
		this.getApplications();
	}

	view(img_src: string) {
		this.img_src = img_src;
		var file_base_url = this.bk._baseURL.replace('api', img_src);
		console.log(file_base_url);
		window.open(file_base_url, '_blank');
	}

	year_map(year: number): string {
		let arr = ['1st year', '2nd year', '3rd year', '4th year'];
		return arr[year - 1];
	}

	semester_map(semester: number): string {
		let arr = ['1st semester', '2nd semester'];
		return arr[semester - 1];
	}

	getApplications() {
		this.bk.post('/admin/revaluation-application', {}).subscribe((data) => {
			this.applications = data;
			console.log(data);
		});
	}

	approveApplication(roll: string, DU_number: string) {
		this.bk
			.post('/admin/approve-revaluation-application', {
				roll: roll,
				DU_number: DU_number,
			})
			.subscribe((response) => {
				if (response.errno != undefined) {
					alert('certificate not approved');
				} else {
					location.reload();
				}
			});
	}

	deleteApplication(id: string) {
		this.bk
			.post('/admin/delete-revaluation-application', {
				id: id,
			})
			.subscribe((response) => {
				if (response.errno != undefined) {
					alert('certificate not Rejected');
				} else {
					location.reload();
				}
			});
	}
}
