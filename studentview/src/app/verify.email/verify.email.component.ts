import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { BackendService } from '../services/backend/backend.service';

@Component({
	selector: 'app-verify.email',
	templateUrl: './verify.email.component.html',
	styleUrls: ['./verify.email.component.css']
})
export class VerifyEmailComponent {

	constructor(private aroute: ActivatedRoute, private bk: BackendService, private router: Router) { }

	ngOnInit() {
		this.aroute.queryParams.subscribe((params: Params) => {
			const token: string = params['id']
			console.log(token)
			this.bk.post(`/student/activate`, { token: token }).subscribe(data => {
				console.log(data)
				if (data.errno != undefined) {
					this.router.navigateByUrl('/error-404')
				} else {
					localStorage.clear()
					localStorage.setItem('user_data', JSON.stringify(data))
					this.router.navigateByUrl('/home')
				}
			})
		})
	}

}
