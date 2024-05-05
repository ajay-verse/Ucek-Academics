import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BackendService } from '../services/backend/backend.service';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.css']
})
export class RegisterComponent {

	current_year = new Date().getFullYear()
	constructor(private bk: BackendService, private router: Router) { }

	ngOnInit(): void {
	}

	registerAdmin(data: any) {
		console.log(data)
		// validate here
		this.bk.post('/admin/register', data).subscribe(result => {
			console.log(result)
			if (result.errno != undefined) {
				alert('error while registering')
			} else {
        alert("Admin register successfully")
				this.router.navigateByUrl('/admin/login')
			}
		})
	}

}
