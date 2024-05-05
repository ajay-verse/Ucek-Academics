import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BackendService } from '../services/backend/backend.service';
import Swal from 'sweetalert2';

@Component({
	selector: 'app-semester-application',
	templateUrl: './semester-application.component.html',
	styleUrls: ['./semester-application.component.css']
})
export class SemesterApplicationComponent {
	constructor(private router: Router, private bk: BackendService) { }

	roll = ''
	reg = ''
	year = ''
	sem = ''
	type = ''
	challana = ''
	subjects = ''
	user_data: any = {}

	class_name: String = ''
	changeClass() {
		if (this.class_name == '') {
			this.class_name = 'toggle-sidebar'
		} else {
			this.class_name = ''
		}
	}

	loading: boolean = false
	ngOnInit(): void {
		this.user_data = localStorage.getItem("user_data")
		if (!this.user_data) {
			this.router.navigateByUrl('/login')
		}
		this.user_data = JSON.parse(this.user_data)
		this.reg = this.user_data.regulation
		this.roll = this.user_data.roll
	}


	formData: FormData = new FormData()
	handleFileInput(event: any) {
		const fileToUpload = event.target.files.item(0)
		this.formData = new FormData()
		this.formData.append('file', fileToUpload)
	}

	applyForSemester(params: any) {
		if (this.challana == '') {
			Swal.fire('Enter DU number', 'Please enter DU number', 'warning')
			return
		}
		if (this.subjects == '') {
			Swal.fire('Enter subject', 'Please enter subject ', 'warning')
			return
		}

		params.roll = this.roll
		params.regulation_ = this.reg
		params.exam_type = 'REG'
		params.batch = this.user_data.batch
		params.challana = this.challana
		params.subject = this.subjects
		console.log(params)
		this.loading = true
		this.formData.set('challana', this.challana)
		this.bk.upload("/upload/exam-fee-receipt", this.formData).subscribe((event: any) => {
			if (event.body) {
				console.log(event.body.path)
				params.receipt = event.body.path
				this.bk.post('/student/applyforsemester', params).subscribe(result => {
					console.log(result)
					this.loading = false
					if (result.errno != undefined) {
						Swal.fire('status Failed', 'application submission failed', 'error')
					} else {
						Swal.fire('status success', 'application submission successfully', 'success')
							.then(() => {
								location.reload()
							})
					}
				})
			}
		})
	}
}
