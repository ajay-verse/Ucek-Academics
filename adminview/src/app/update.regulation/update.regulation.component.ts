import { Component } from '@angular/core';
import { BackendService } from '../services/backend/backend.service';

@Component({
	selector: 'app-update.regulation',
	templateUrl: './update.regulation.component.html',
	styleUrls: ['./update.regulation.component.css']
})
export class UpdateRegulationComponent {

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
		this.len = 0
	}

	len: number = 0
	subjects: any = []

	addItem() {
		this.len++
		this.subjects.push(0)
	}

	updateRegulation(formData: any) {
		if (formData.regulation_ == '' || formData.year == '' || formData.semester == '') {
			alert('Please fill all fields')
			return
		}
		let pdata: Record<string, any> = {
			regulation_: formData.regulation_,
			year: formData.year,
			semester: formData.semester,
		}
		let subjects: Record<string, any> = {}
		for (let i = 0; i < this.len; ++i) {
			let sub_code: string = formData["code_" + i]
			let sub_name: string = formData["name_" + i]
			let sub_credits: string = formData["credits_" + i]
			subjects[sub_code] = {
				name: sub_name,
				credits: +sub_credits
			}
		}
		pdata['subjects'] = subjects
		console.log(pdata)
		this.bk.post('/admin/add-regulation', pdata).subscribe(data => {
			console.log(data)
		})
	}

}

