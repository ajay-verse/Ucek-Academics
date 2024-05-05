

import { Component } from '@angular/core';
import { BackendService } from '../services/backend/backend.service';
import * as XLSX from 'xlsx';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-query',
  templateUrl: './query.component.html',
  styleUrls: ['./query.component.css']
})
export class QueryComponent {

	constructor(private bk: BackendService) { }


	class_name: String = ''
	loading: boolean = false
	changeClass() {
		if (this.class_name == '') {
			this.class_name = 'toggle-sidebar'
		} else {
			this.class_name = ''
		}
	}

	img_src: string = ''
	show_img: boolean = false
	flag: boolean = true
	view(img_src: string) {
		this.img_src = img_src
		this.show_img = true
		this.flag = false
		setTimeout(() => {
			this.flag = true
		}, 500)
	}

	ngOnInit(): void {
		document.addEventListener('click', () => {
			if (this.flag) {
				this.show_img = false
				this.img_src = ''
			}
		})
		this.getQuery()
	}


	applications: any = []
  query: any = []

	getQuery() {
		this.bk.post('/admin/getQuery', { exam_type: 'REG' }).subscribe(data => {
			this.query = data
		})
	}

	approveApplication(roll: string, challana: string) {
		this.bk.post('/admin/approve-semester-application', { roll: roll, challana: challana, exam_type: 'REG' }).subscribe(data => {
			if (data.errno != undefined) {
				alert('application not approved')
			} else {
				window.location.href= "/"
			}
		})
	}

}

