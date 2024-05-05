import { Component } from '@angular/core';
import { BackendService } from '../services/backend/backend.service';
import * as XLSX from 'xlsx';
import Swal from 'sweetalert2';
@Component({
	selector: 'app-supply-semester-application',
	templateUrl: './supply-semester-application.component.html',
	styleUrls: ['./supply-semester-application.component.css']
})
export class SupplySemesterApplicationComponent {

	constructor(private bk: BackendService) { }

	result_element: any = []
	cache: Map<string, string> = new Map()

	class_name: String = ''
	loading: boolean = false
	changeClass() {
		if (this.class_name == '') {
			this.class_name = 'toggle-sidebar'
		} else {
			this.class_name = ''
		}
	}

	changeExcelFile(event: any) {
		const excel_file = event.target.files.item(0)
		this.readExcelFile(excel_file)
	}

	readExcelFile(file: File) {
		const reader = new FileReader()
		reader.onload = (e: any) => {
			const data = new Uint8Array(e.target.result)
			const workbook = XLSX.read(data, { type: 'array' })
			const sheetName = workbook.SheetNames[0]
			const worksheet = workbook.Sheets[sheetName]
			const excelData: any = XLSX.utils.sheet_to_json(worksheet, { raw: true })
			this.result_element = []
			for (let i = 0; i < excelData.length; i++) {
				let result: Record<string, any> = excelData[i]
				let roll = result['roll']
				delete result['roll']
				this.result_element.push({
					roll: roll
				})
			}
			console.log(this.result_element)
		}
		reader.readAsArrayBuffer(file)
	}

	approveApplications() {
		this.loading = true
		let count = 0, rejected = 0
		for (const student of this.result_element) {
			++count
			if (this.cache.has(student.roll)) {
				this.bk.post('/admin/approve-semester-application', {
					roll: student.roll,
					challana: this.cache.get(student.roll),
					exam_type: 'SUP'
				}).subscribe(data => {
					if (data.errno != undefined) {
						++rejected
					}
					if (count == this.result_element.length) {
						this.loading = false
						Swal.fire('completed', `${count - rejected} Applications Approved & ${rejected} Applications Rejected`, 'success')
							.then(() => {
								location.reload()
							})
					}
				})
			} else {
				++rejected
			}
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
		this.getApplications()
	}

	year_map(year: number): string {
		let arr = ["1st year", "2nd year", "3rd year", "4th year"]
		return arr[year - 1]
	}

	semester_map(semester: number): string {
		let arr = ["1st semester", "2nd semester"]
		return arr[semester - 1]
	}

	applications: any = []

	getApplications() {
		this.bk.post('/admin/semester-applications', { exam_type: 'SUP' }).subscribe(data => {
			this.applications = data
			console.log(data)
		})
	}

	approveApplication(roll: string, challana: string) {
		console.log(roll, challana)
		this.bk.post('/admin/approve-semester-application', { roll: roll, challana: challana, exam_type: 'SUP' }).subscribe(data => {
			if (data.errno != undefined) {
				alert('application not approved')
			} else {
				location.reload()
			}
		})
	}

}
