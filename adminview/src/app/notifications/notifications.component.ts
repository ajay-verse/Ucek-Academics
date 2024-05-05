import { Component } from '@angular/core';
import { BackendService } from '../services/backend/backend.service';
import Swal from 'sweetalert2';

@Component({
	selector: 'app-notifications',
	templateUrl: './notifications.component.html',
	styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent {

	constructor(private bk: BackendService) { }

	class_name: String = ''
	changeClass() {
		if (this.class_name == '') {
			this.class_name = 'toggle-sidebar'
		} else {
			this.class_name = ''
		}
	}

	ngOnInit(): void {
	}


	formData: FormData = new FormData()
	handleFileInput(event: any) {
		const fileToUpload = event.target.files.item(0)
		this.formData = new FormData()
		this.formData.append('file', fileToUpload)
	}

	postNotification(params: any) {
		for (let key in params) {
			if (params[key] === '') {
				alert(`Please Enter proper ${key}`)
				break
			}
		}

		this.bk.upload("/upload/exam-fee-receipt", this.formData).subscribe((event: any) => {
			if (event.body) {
				console.log(event.body.path)
				params.file = event.body.path
				this.bk.post('/notification/post-one', params).subscribe(data => {
					if (data.errno != undefined) {
						Swal.fire('error in uploaded', 'Notification is not uploaded', 'error')
					} else {
						console.log(data)
						Swal.fire('success upload', 'Notification is uploaded Successfully', 'success')
							.then(() => {
								location.reload()
							})
					}
				})
			}
		})
	}



}
