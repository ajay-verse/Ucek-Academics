import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BackendService } from '../services/backend/backend.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent {
	constructor(private router: Router, private bk: BackendService) { }

	ngOnInit(): void {
	}

	getUser(userData: Object) {
		this.bk.post('/admin/login', userData).subscribe(data => {
			if (data.errno) {
				window.alert("validate properly")
				return
			}
			localStorage.setItem('email', data.email)
			localStorage.setItem('role', data.role)
			localStorage.setItem('adminId', data._id)
			this.router.navigateByUrl('/admin/home')
		})
	}
}
