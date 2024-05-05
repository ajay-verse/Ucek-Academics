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
		this.bk.post('/student/login', userData).subscribe(data => {
			if (data.errno) {
				window.alert("validate properly")
				return
			}
			localStorage.setItem('roll', data.roll)
			localStorage.setItem('email', data.email)
			localStorage.setItem('username', data.first_name + ' ' + data.last_name)
			localStorage.setItem('regulation', data.regulation)
			localStorage.setItem('batch', data.batch)
			localStorage.setItem('user_data', JSON.stringify(data))
			this.router.navigateByUrl('/home')
		})
	}
}
