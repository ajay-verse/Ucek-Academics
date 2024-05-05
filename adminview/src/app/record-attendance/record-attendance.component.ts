import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BackendService } from '../services/backend/backend.service';
import Swal from 'sweetalert2';

@Component({
	selector: 'app-record-attendance',
	templateUrl: './record-attendance.component.html',
	styleUrls: ['./record-attendance.component.css'],
})
export class RecordAttendanceComponent {
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

	rows: any[] = [{ month: '', classesConducted: '', classesAttended: '' }];

	addRow() {
		this.rows.push({
			month: '',
			classesConducted: '',
			classesAttended: '',
		});
	}

	removeRow(index: number) {
		this.rows.splice(index, 1);
	}

	year: String = '';
	course_code = '';
	roll_number: String = '';
	attendance: any = [];

	checkParams() {
		if (this.roll_number != '' && this.year != '') {
		}
	}

	checkDuplicateAttendanceRecord(id: any) {
		let attendanceData: Record<string, any> = {
			month: this.rows[id].month,
		};
		console.log(attendanceData);
		this.bk
			.post('/admin/checkDuplicateAttendence', attendanceData)
			.subscribe((data) => {
				console.log('API response');
				console.log(data);
				console.log('Api response ended');
			});
	}

	getRegulation(params: any) {
		console.log(params);
		// this.bk.post('/regulation/subjects', params).subscribe((data) => {
		// 	this.subjects = Object.entries(data.subjects);
		// });
	}

	uploadAttendance(formData: any) {
		if (formData.roll == '') {
			alert('Please enter a roll number.');
			return;
		}
		let pdata: Record<string, any> = {
			roll: formData.roll_number,
			year: formData.year,
			course_code: formData.course_code,
		};
		delete formData.roll;
		delete formData.year;
		delete formData.course_code;

		let attendance: any[] = [];
		for (let i = 0; i < this.rows.length; i++) {
			if (
				this.rows[i].month == '' ||
				this.rows[i].classesConducted == '' ||
				this.rows[i].classesAttended == ''
			) {
				continue;
			}
			attendance.push(this.rows[i]);
		}
		pdata['attendance'] = attendance;

		console.log(pdata);
		this.bk.post('/admin/upload-attendance', pdata).subscribe((data) => {
			if (data.errno != undefined) {
				alert('Data not inserted');
			} else {
				alert('Data inserted');
				window.location.reload();
			}
		});
	}
}
