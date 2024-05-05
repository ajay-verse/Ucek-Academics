import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { FooterComponent } from './footer/footer.component';
import { ResultsComponent } from './results/results.component';
import { SemesterApplicationComponent } from './semester-application/semester-application.component';
import { NewsfeedComponent } from './newsfeed/newsfeed.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { ContactComponent } from './contact/contact.component';
import { MapComponent } from './map/map.component';
import { PaymentStatusComponent } from './payment.status/payment.status.component';
import { Error404Component } from './error404/error404.component';
import { PaymentComponent } from './payment/payment.component';
import { SupplySemesterApplicationComponent } from './supply-semester-application/supply-semester-application.component';
import { CertificateApplicationComponent } from './certificate-application/certificate-application.component';
import { CertificateStatusComponent } from './certificate-status/certificate-status.component';
import { NgxLoadingModule } from 'ngx-loading';
import { VerifyEmailComponent } from './verify.email/verify.email.component';
import { HallticketDownloadComponent } from './hallticket.download/hallticket.download.component';
import { RevaluationComponent } from './revaluation/revaluation.component';
import { HallticketStatusComponent } from './hallticket.status/hallticket.status.component';
import { GetAttendanceComponent } from './get-attendance/get-attendance.component';

@NgModule({
	declarations: [
		AppComponent,
		HomeComponent,
		HeaderComponent,
		SidebarComponent,
		LoginComponent,
		RegisterComponent,
		ProfileComponent,
		FooterComponent,
		ResultsComponent,
		SemesterApplicationComponent,
		NewsfeedComponent,
		NotificationsComponent,
		ContactComponent,
		MapComponent,
		PaymentStatusComponent,
		Error404Component,
		PaymentComponent,
		SupplySemesterApplicationComponent,
		CertificateApplicationComponent,
		CertificateStatusComponent,
		VerifyEmailComponent,
		HallticketDownloadComponent,
		RevaluationComponent,
  HallticketStatusComponent,
  GetAttendanceComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		HttpClientModule,
		FormsModule,
		NgxLoadingModule.forRoot({}),
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
