import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BackendService } from '../services/backend/backend.service';
import Swal from 'sweetalert2';

@Component({
	selector: 'app-payment',
	templateUrl: './payment.component.html',
	styleUrls: ['./payment.component.css']
})
export class PaymentComponent {


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

	ngOnInit(): void {
	}

	// confirmPayment(data: any,) {
	// 	this.bk.post('/query/post-query', {data
	// 	}).subscribe(result => {
	// 		console.log(result)
	// 		if(result){
	// 			alert('Query posted successfully')
	// 			this.router.navigateByUrl('/')
	// 		}else{
	// 			alert('Query not posted')
	// 		}
	// 	})
	// }

	confirmPayment(formData: any) {
		const keys = ["roll", "name", "email", "purpose", "amount"]
		let link = 'http://127.0.0.1:3000/payment'
		for (const key of keys) {
			if (formData[key] === "") {
				Swal.fire('status Failed', 'Please fill all fields', 'error')

                return
            }
			link += '/' + formData[key]
		}
		location.href = "https://google.com"
	}

}
