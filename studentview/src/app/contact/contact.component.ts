import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BackendService } from '../services/backend/backend.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {

	current_year = new Date().getFullYear()
	constructor(private bk: BackendService, private router: Router) { }


	class_name: String = ''
	changeClass() {
		if (this.class_name == '') {
			this.class_name = 'toggle-sidebar'
		} else {
			this.class_name = ''
		}
	}

	user_data: any = null;
	adminList : any = []

	ngOnInit(): void {
		this.user_data = localStorage.getItem('user_data')

		if (!this.user_data) {
			this.router.navigateByUrl('/login')
		}
		this.user_data = JSON.parse(this.user_data)
		console.log(this.user_data)
		this.bk.get('/admin/get-admin-list', {}).subscribe(data => {
			console.log(data)
			this.adminList = data

		})
	}


	postQuery(data: any,) {
		console.log({
			user_id: this.user_data._id,
			name: data.name,
			email: data.email,
			topic_of_subject: data.topic_of_subject,
			query_msg: data.query_msg,
			adminId: data.adminId
		})
		this.bk.post('/query/post-query', {
			adminId: data.adminId,
			user_id: this.user_data._id,
			name: data.name,
			email: data.email,
			topic_of_subject: data.topic_of_subject,
			query_msg: data.query_msg
		}).subscribe(result => {
			console.log(result)
			if(result){
				alert('Query posted successfully')
				this.router.navigateByUrl('/')
			}else{
				alert('Query not posted')
			}
		})
	}

}
