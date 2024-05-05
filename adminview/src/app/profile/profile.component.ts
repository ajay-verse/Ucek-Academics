import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BackendService } from '../services/backend/backend.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

	constructor(private router: Router, private bk: BackendService) { }

	email: String = ''

	class_name: String = ''
	changeClass() {
		if (this.class_name == '') {
			this.class_name = 'toggle-sidebar'
		} else {
			this.class_name = ''
		}
	}

	ngOnInit(): void {
		this.email = localStorage.getItem("email") || ''
		if (this.email == '') {
			this.router.navigateByUrl('/admin/login')
		}
	}

	updateProfile(params: any) {
		params.email = this.email
		console.log(params)
		if (params.length < 8) {
			alert('Password length must be at least 8 characters')
			return
		}
		if (params.npasswd != params.cnpasswd) {
			alert('Password does not match')
			return
		}
		this.bk.post('/admin/updateprofile', params).subscribe(data => {
			if (data.errno != undefined) {
				alert('something went wrong')
			} else {
				alert('password changed successfully')
				location.reload()
			}
		})
	}

}
