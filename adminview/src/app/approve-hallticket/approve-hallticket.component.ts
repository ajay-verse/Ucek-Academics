import { Component } from '@angular/core';
import { BackendService } from '../services/backend/backend.service';
import * as XLSX from 'xlsx';
import Swal from 'sweetalert2';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
	selector: 'app-approve-hallticket',
	templateUrl: './approve-hallticket.component.html',
	styleUrls: ['./approve-hallticket.component.css'],
})
export class ApproveHallticketComponent {
	constructor(private bk: BackendService) {}

	result_element: any = [];
	cache: Map<string, string> = new Map();
	show_doc: boolean = false;

	class_name: String = '';
	loading: boolean = false;
	changeClass() {
		if (this.class_name == '') {
			this.class_name = 'toggle-sidebar';
		} else {
			this.class_name = '';
		}
	}

	img_src: string = '';
	show_img: boolean = false;
	flag: boolean = true;
	view(img_src: string) {
		this.img_src = img_src;
		this.show_img = true;
		this.flag = false;
		setTimeout(() => {
			this.flag = true;
		}, 500);
	}

	ngOnInit(): void {
		document.addEventListener('click', () => {
			if (this.flag) {
				this.show_img = false;
				this.img_src = '';
			}
		});
		this.getApplications();
	}

	changeExcelFile(event: any) {
		const excel_file = event.target.files.item(0);
		this.readExcelFile(excel_file);
	}

	readExcelFile(file: File) {
		const reader = new FileReader();
		reader.onload = (e: any) => {
			const data = new Uint8Array(e.target.result);
			const workbook = XLSX.read(data, { type: 'array' });
			const sheetName = workbook.SheetNames[0];
			const worksheet = workbook.Sheets[sheetName];
			const excelData: any = XLSX.utils.sheet_to_json(worksheet, {
				raw: true,
			});
			this.result_element = [];
			for (let i = 0; i < excelData.length; i++) {
				let result: Record<string, any> = excelData[i];
				let roll = result['roll'];
				delete result['roll'];
				this.result_element.push({
					roll: roll,
				});
			}
			console.log(this.result_element);
		};
		reader.readAsArrayBuffer(file);
	}

	approveApplications() {
		this.loading = true;
		let count = 0,
			rejected = 0;
		for (const student of this.result_element) {
			++count;
			if (this.cache.has(student.roll)) {
				this.bk
					.post('/admin/approve-semester-application', {
						roll: student.roll,
						challana: this.cache.get(student.roll),
						exam_type: 'REG',
					})
					.subscribe((data) => {
						if (data.errno != undefined) {
							++rejected;
						}
						if (count == this.result_element.length) {
							this.loading = false;
							Swal.fire(
								'completed',
								`${
									count - rejected
								} Applications Approved & ${rejected} Applications Rejected`,
								'success'
							).then(() => {
								location.reload();
							});
						}
					});
			} else {
				++rejected;
			}
		}
	}

	year_map(year: number): string {
		let arr = ['1st year', '2nd year', '3rd year', '4th year'];
		return arr[year - 1];
	}

	semester_map(semester: number): string {
		let arr = ['1st semester', '2nd semester'];
		return arr[semester - 1];
	}

	applications: any = [];

	getApplications() {
		this.bk
			.post('/admin/getAllHallTicketRequests', { exam_type: 'REG' })
			.subscribe((data) => {
				this.applications = data;
				console.log(data);
				for (const student of this.applications) {
					this.cache.set(student.roll, student.challana);
				}
			});
	}

	approveApplication(id: string) {
		this.bk
			.post('/admin/approve-hallticket', {
				id: id,
			})
			.subscribe((data) => {
				console.log(data);
				if (data.errno != undefined) {
					alert('application not Rejected');
				} else {
					window.location.href = '/admin/approve-hallticket';
				}
			});
	}

	rejectApplication(id: string) {
		this.bk
			.post('/admin/reject-hallticket', {
				id: id,
			})
			.subscribe((data) => {
				console.log(data);
				if (data.errno != undefined) {
					alert('application not Rejected');
				} else {
					window.location.href = '/admin/approve-hallticket';
				}
			});
	}





	user_data: any = {}
	hallticket_data: any = {}
	roll_array: any = []


	year_map2: any = {
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

	labs: any = []
	theory: any = []
	subjects: any = []



	student_name : string = ""
	s_father_name : string = ""
	s_year : string = ""
	s_semester : string = ""
	s_branch : string = ""
	s_roll : string = ""
	subjects_string : string = ""
	e_type : string = ""


	// Function to convert a string to title case
	toTitleCase(str: string): string {
    	return str.toLowerCase().replace(/(?:^|\s)\w/g, function(match) {
        return match.toUpperCase();
    });
	}


	getHallticket(app: any) {
		this.e_type = app.regularSupply
		this.s_roll = app.roll_no
		this.student_name = app.name.toUpperCase()
		this.s_father_name = app.father_name.toUpperCase()
		this.subjects_string = app.listOfSubjects
		this.s_year =  app.year,
		this.s_semester =  app.semester,
		this.s_branch = app.branch
		this.theory = []
		this.labs = []
		this.roll_array = this.s_roll.split('')
		this.subjects= this.subjects_string.split(",").map(item => this.toTitleCase(item.trim()));

		if(this.e_type.toLowerCase().includes('reg')){
			this.hallticket_data.exam_type = "REG"
		} else{
			this.hallticket_data.exam_type = "SUP"
		}

		for (const subject of this.subjects) {
			if(subject.toLowerCase().includes('lab')) {
				this.labs.push(subject)
			} else {
				this.theory.push(subject)
			}
		}
		this.show_doc = true;
	}

	downloadPdf(roll: string) {
		const context = document.getElementById('hallTicket')
		if (!context) {
			console.error('Element not found!')
			return
		}
		let filename: string = roll + '_hallticket.pdf'
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
