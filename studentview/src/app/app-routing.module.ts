import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NewsfeedComponent } from './newsfeed/newsfeed.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { ResultsComponent } from './results/results.component';
import { SemesterApplicationComponent } from './semester-application/semester-application.component';
import { MapComponent } from './map/map.component';
import { PaymentStatusComponent } from './payment.status/payment.status.component';
import { Error404Component } from './error404/error404.component';
import { PaymentComponent } from './payment/payment.component';
import { SupplySemesterApplicationComponent } from './supply-semester-application/supply-semester-application.component';
import { CertificateApplicationComponent } from './certificate-application/certificate-application.component';
import { CertificateStatusComponent } from './certificate-status/certificate-status.component';
import { VerifyEmailComponent } from './verify.email/verify.email.component';
import { HallticketDownloadComponent } from './hallticket.download/hallticket.download.component';
import { RevaluationComponent } from './revaluation/revaluation.component';
import { HallticketStatusComponent } from './hallticket.status/hallticket.status.component';
import { GetAttendanceComponent } from './get-attendance/get-attendance.component';

const routes: Routes = [
	{ path: '', redirectTo: '/home', pathMatch: 'full' },
	{ path: 'home', component: HomeComponent },
	{ path: 'login', component: LoginComponent },
	{ path: 'register', component: RegisterComponent },
	{ path: 'profile', component: ProfileComponent },
	{ path: 'result', component: ResultsComponent },
	{ path: 'certificatestatus', component: CertificateStatusComponent },
	{ path: 'semesterapplication', component: SemesterApplicationComponent },
	{
		path: 'supplysemesterapplication',
		component: SupplySemesterApplicationComponent,
	},
	{
		path: 'certificateapplication',
		component: CertificateApplicationComponent,
	},
	{ path: 'newsfeed', component: NewsfeedComponent },
	{ path: 'notifications', component: NotificationsComponent },
	{ path: 'contact', component: ContactComponent },
	{ path: 'map', component: MapComponent },
	{ path: 'payment', component: PaymentComponent },
	{ path: 'payment-status', component: PaymentStatusComponent },
	{ path: 'error-404', component: Error404Component },
	{ path: 'activate', component: VerifyEmailComponent },
	{ path: 'downloadhallticket', component: HallticketDownloadComponent },
	{ path: 'applyrevaluation', component: RevaluationComponent },
	{ path: 'hallticketStatus', component: HallticketStatusComponent },
	{ path: 'getAttendance', component: GetAttendanceComponent },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
