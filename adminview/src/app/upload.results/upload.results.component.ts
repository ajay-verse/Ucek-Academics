import { Component } from '@angular/core';
import { BackendService } from '../services/backend/backend.service';

@Component({
	selector: 'app-upload.results',
	templateUrl: './upload.results.component.html',
	styleUrls: ['./upload.results.component.css'],
})
export class UploadResultsComponent {
	constructor(private bk: BackendService) {}

	class_name: String = '';
	changeClass() {
		if (this.class_name == '') {
			this.class_name = 'toggle-sidebar';
		} else {
			this.class_name = '';
		}
	}

	ngOnInit(): void {}

	rows: any[] = [{ courseCode: '', courseTitle: '', gradePoints: '' }];

	addRow() {
		this.rows.push({ courseCode: '', courseTitle: '', gradePoints: '' });
	}

	removeRow(index: number) {
		this.rows.splice(index, 1);
	}

	year: String = '';
	semester: String = '';
	regulation: String = '';
	result_type: String = '';
	subjects: any = [];

	checkParams() {
		if (this.regulation != '' && this.year != '' && this.semester != '') {
			this.getRegulation({
				regulation_: this.regulation,
				year: this.year,
				semester: this.semester,
			});
		}
	}

	getRegulation(params: any) {
		console.log(params);
		// this.bk.post('/regulation/subjects', params).subscribe((data) => {
		// 	this.subjects = Object.entries(data.subjects);
		// });
	}

	uploadResult(formData: any) {
		if (formData.roll == '') {
			alert('Please enter a roll number.');
			return;
		}
		let pdata: Record<string, any> = {
			roll: formData.roll,
			year: formData.year,
			semester: formData.semester,
			regulation: formData.regulation_,
			result_type: 'REG',
		};

		let subjects: any[] = [];
		for (let i = 0; i < this.rows.length; i++) {
			if (
				this.rows[i].courseCode == '' ||
				this.rows[i].courseTitle == '' ||
				this.rows[i].gradePoints == ''
			) {
				continue;
			}
			subjects.push(this.rows[i]);
		}
		pdata['subjects'] = subjects;

		console.log(pdata);
		this.bk.post('/admin/upload-result', pdata).subscribe((data) => {
			if (data.errno != undefined) {
				alert('result not inserted');
			} else {
				alert('result inserted');
				window.location.reload();
			}
		});
	}
}
