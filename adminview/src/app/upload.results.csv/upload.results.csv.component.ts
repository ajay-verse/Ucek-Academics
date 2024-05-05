import { Component } from '@angular/core';
import { BackendService } from '../services/backend/backend.service';
import * as XLSX from 'xlsx';
import Swal from 'sweetalert2';


interface StringMap {
    [key: string]: any;
}


@Component({
	selector: 'app-upload.results.csv',
	templateUrl: './upload.results.csv.component.html',
	styleUrls: ['./upload.results.csv.component.css']
})


export class UploadResultsCsvComponent {
	constructor(private bk: BackendService) { }

	rows: any[] = [{ courseCode: '', courseTitle: '', gradePoints: '' }];
	year: String = ''
	semester: String = ''
	regulation: String = ''
	subjects: any = []
	names: any = []
	result_element: StringMap[] = []


	class_name: String = ''
	changeClass() {
		if (this.class_name == '') {
			this.class_name = 'toggle-sidebar'
		} else {
			this.class_name = ''
		}
	}

	ngOnInit() {
	}

	checkParams() {
		if (this.regulation != '' && this.year != '' && this.semester != '') {
			this.getRegulation({ regulation_: this.regulation, year: this.year, semester: this.semester });
		}
	}

	getRegulation(params: any) {
		console.log(params)
		this.bk.post('/regulation/subjects', params).subscribe(data => {
			this.names = Object.entries(data.subjects)
		})
	}

	uploadResults() {
		// console.log('Ajay', this.result_element[0])
		if (this.regulation == '' || this.year == '' || this.semester == '') {
			alert('fill required details')
			location.reload()
			return
		}
		let i = 0, n = this.result_element.length
		// console.log(this.result_element)
		for (const obj of this.result_element) {
			// console.log('Ajay', obj['subjects'])
			this.bk.post('/admin/upload-result', obj).subscribe(data => {
				++i
				if (data.errno != undefined) {
					console.log(obj['roll'] + " result not inserted")
				} else {
					console.log(obj + " result inserted")
				}
				if (i == n) {
					Swal.fire({
						title: "Good job!",
						text: "Results Uploaded Successfully!",
						icon: "success",
						timer: 3000
					  }).then((result) => {
						location.reload()
					  });
					
				}
			})
		}
	}

	changeExcelFile(event: any) {
		const excel_file = event.target.files.item(0)
		this.readExcelFile(excel_file)
	}

	readExcelFile(file: File) {
		this.checkParams()
		const reader = new FileReader()
		reader.onload = (e: any) => {
			const data = new Uint8Array(e.target.result)
			const workbook = XLSX.read(data, { type: 'array' })
			const sheetName = workbook.SheetNames[0]
			const worksheet = workbook.Sheets[sheetName]
			const excelData: any = XLSX.utils.sheet_to_json(worksheet, { raw: true })
			// console.log('Hi', excelData)
			for (let i = 0; i < excelData.length; i++) {
				let result: Record<string, any> = excelData[i]
				let roll = result['roll']
				// console.log(result)
				delete result['roll']
				// console.log(result)
				let pdata: Record<string, any> = {
					roll: roll,
					year: this.year,
					semester: this.semester,
					regulation: this.regulation,
					result_type: 'REG',
				};

				let subjects: any[] = [];
				let key_map = this.names[0][1]
				for(const key in result) {
					if(key_map[key] == undefined){
						Swal.fire({
							icon: "error",
							title: "Oops...",
							text: "Error in CSV File Or DataBase",
						  }).then((result) => {	
							location.reload()
						  	});
					}
					subjects.push({ courseCode: key, courseTitle: key_map[key]['name'], gradePoints: result[key] });
				}
				pdata['subjects'] = subjects
				this.result_element.push(pdata)
				// console.log(this.result_element[0]['subjects'])
			}
		}
		reader.readAsArrayBuffer(file)
	}

}
