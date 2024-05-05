import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BackendService } from '../services/backend/backend.service';
import { Form } from '@angular/forms';
import { UploadService } from '../services/upload/upload.service';
import { HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { catchError, map, of } from 'rxjs';
import { Location } from '@angular/common';

@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
	constructor(
		private router: Router,
		private bk: BackendService,
		private upload: UploadService,
		private location: Location
	) {}
	profile_image_base_url = this.bk._baseURL.replace('api', '');
	profile_image_path: String = '';
	user_data: any = null;
	loading: boolean = false;
	image: any = null;

	class_name: String = '';
	changeClass() {
		if (this.class_name == '') {
			this.class_name = 'toggle-sidebar';
		} else {
			this.class_name = '';
		}
	}

	ngOnInit(): void {
		this.user_data = localStorage.getItem('user_data');

		if (!this.user_data) {
			this.router.navigateByUrl('/login');
		}
		this.user_data = JSON.parse(this.user_data);
		this.profile_image_path =
			this.profile_image_base_url + this.user_data.picture;
	}

	updateProfile(params: any) {
		if (params.name) {
			params.first_name = params.first_name;
			params.last_name = params.last_name;
		}
		params.roll = this.user_data.roll;
		params.picture = this.user_data.picture;
		console.log(params);
		this.bk.post('/student/updateprofile', params).subscribe((data) => {
			localStorage.setItem('user_data', JSON.stringify(data));
			this.user_data = data;
			console.log(data);
			location.reload();
		});
	}

	updatePasswd(params: any) {
		params.roll = this.user_data.roll;
		console.log(params);
		if (params.length < 8) {
			alert('Password length must be at least 8 characters');
			return;
		}
		if (params.npasswd != params.cnpasswd) {
			alert('Password does not match');
			return;
		}
		this.bk.post('/student/updatepasswd', params).subscribe((data) => {
			if (data.errno != undefined) {
				alert('something went wrong');
			} else {
				alert('password changed successfully');
				location.reload();
			}
		});
	}

	uploadFile(fileInput: HTMLInputElement) {
		if (
			fileInput.files &&
			fileInput.files.length > 0 &&
			this.image != null
		) {
			console.log('File is selected');
			this.loading = true;
			this.formData.append('file', this.image);
			this.bk
				.upload('/upload/profile-picture', this.formData)
				.subscribe((event: any) => {
					if (event.body) {
						console.log(event.body.path);

						this.user_data.picture = event.body.path;
						localStorage.setItem(
							'user_data',
							JSON.stringify(this.user_data)
						);
						console.log('localStorage after uploading the picture');
						console.log(localStorage.getItem('user_data'));
						console.log(event.body);
						this.loading = false;
						alert('Profile picture updated');
						location.reload();
					}
				});
		} else {
			alert('File is not selected');
		}
	}

	formData: FormData = new FormData();
	handleFileInput(event: any) {
		console.log('In handleFile function');
		const fileToUpload = event.target.files.item(0);
		// this.formData.append('file_to_upload', fileToUpload);
		this.image = event.target.files[0];
		this.formData.append('roll', localStorage.getItem('roll') || '');
	}

	deleteFile(fileInput: HTMLInputElement) {
		fileInput.value = '';
	}
}
