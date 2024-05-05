import { Component } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { BackendService } from '../services/backend/backend.service';
import Swal from 'sweetalert2';


@Component({
	selector: 'app-hallticket.download',
	templateUrl: './hallticket.download.component.html',
	styleUrls: ['./hallticket.download.component.css']
})
export class HallticketDownloadComponent {

	constructor(private bk: BackendService) { }

	class_name: String = ''
	changeClass() {
		if (this.class_name == '') {
			this.class_name = 'toggle-sidebar'
		} else {
			this.class_name = ''
		}
	}

	user_data: any = {}
	hallticket_data: any = {}
	roll_array: any = []

	// ngOnInit(): void {
	// 	this.getHallticket()
	// 	this.roll_array = localStorage.getItem('roll')?.split('')
	// }

	year_map: Record<number, any> = {
		0: "None",
		1: "I", 2: "II", 3: "III", 4: "IV"
	}

	branch_map: Record<string, any> = {
		'01': 'Civil Engineering',
		'02': 'Electrical and Electronic Engineering',
		'03': 'Mechanical Engineering',
		'04': 'Electronic and Communication Engineering',
		'05': 'Computer Science and Engineering',
		'06': 'Chemical Engineering',
		'07': 'Petrolum Engineering',
	}

	checkParams() {

	}

	labs: any = []
	theory: any = []
	subjects: any = []
	sub_map: any = {}

	getHallTicket(data: any){
		if(!data.roll){
			alert('Please enter your roll number')
			return
		}
		alert('Hallticket will be available soon')

	}

	loading: boolean = false

	createHallTicket(data: any){
		console.log(data)
		this.bk.post('/student/create-hallticket', data).subscribe(result => {
			console.log(result)
			this.loading = false
			if (result.errno != undefined) {
				Swal.fire('status Failed', 'Hallticket submission failed', 'error')
			} else {
				Swal.fire('status success', 'Hallticket submission successfully', 'success')
					.then(() => {
						location.reload()
					})
			}
		})

	}

	// getHallticket() {
	// 	this.bk.post('/student/get-hallticket', { roll: localStorage.getItem('roll'), exam_type: 'REG' }).subscribe(data => {
	// 		console.log(data)
	// 		this.user_data = JSON.parse(localStorage.getItem('user_data') || '')
	// 		this.hallticket_data = data
	// 		this.subjects = Object.entries(this.hallticket_data.subjects).map(x => x[0])
	// 		this.bk.post('/regulation/subjects', {
	// 			year: data.year,
	// 			semester: data.semester,
	// 			regulation_: localStorage.getItem('regulation')
	// 		}).subscribe(dt => {
	// 			this.theory = []
	// 			this.labs = []
	// 			this.sub_map = dt.subjects
	// 			for (const subject of this.subjects) {
	// 				if (this.sub_map[subject].name.toLowerCase().split(' ').includes('lab')) {
	// 					this.labs.push(this.sub_map[subject].name)
	// 				} else {
	// 					this.theory.push(this.sub_map[subject].name)
	// 				}
	// 			}
	// 		})
	// 	})
	// }

	downloadPdf() {
		const context = document.getElementById('hallTicket')
		if (!context) {
			console.error('Element not found!')
			return
		}
		let filename: string = localStorage.getItem('roll') + '_hallticket.pdf'
		html2canvas(context || document.createElement('div'), { scale: 3 }).then((canvas) => {
			const pdf = new jsPDF('p', 'mm', 'a4')
			const imgData = canvas.toDataURL('image/png')
			const imgProps = pdf.getImageProperties(imgData)
			const pdfWidth = pdf.internal.pageSize.getWidth()
			const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width
			pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight)
			pdf.save(filename)
		})
	}

}
