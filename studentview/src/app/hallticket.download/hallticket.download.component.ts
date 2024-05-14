import { Component } from '@angular/core';
import { BackendService } from '../services/backend/backend.service';
import Swal from 'sweetalert2';


@Component({
	selector: 'app-hallticket.download',
	templateUrl: './hallticket.download.component.html',
	styleUrls: ['./hallticket.download.component.css']
})
export class HallticketDownloadComponent {

	constructor(private bk: BackendService) { }

	class_name: String = ''
	changeClass() {
		if (this.class_name == '') {
			this.class_name = 'toggle-sidebar'
		} else {
			this.class_name = ''
		}
	}


	getHallTicket(data: any){
		if(!data.roll){
			alert('Please enter your roll number')
			return
		}
		alert('Hallticket will be available soon')

	}

	loading: boolean = false

	createHallTicket(data: any){
		console.log(data)
		this.bk.post('/student/create-hallticket', data).subscribe(result => {
			console.log(result)
			this.loading = false
			if (result.errno != undefined) {
				Swal.fire('status Failed', 'Hallticket submission failed', 'error')
			} else {
				Swal.fire('status success', 'Hallticket submission successfully', 'success')
					.then(() => {
						location.reload()
					})
			}
		})

	}
}
