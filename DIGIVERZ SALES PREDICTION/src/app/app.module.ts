import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ChartComponent } from './chart/chart.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FileUploadComponent } from './file.upload/file.upload.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { ErrorComponent } from './error/error.component';


@NgModule({
  declarations: [
AppComponent,ChartComponent,FileUploadComponent,LoginComponent, ErrorComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,HttpClientModule,FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
