import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { FileUploadComponent } from './file.upload/file.upload.component';
import { ChartComponent } from './chart/chart.component';
import { ErrorComponent } from './error/error.component';


const routes: Routes = [{path:'',component:LoginComponent},
                        {path:'uploadfile',component:FileUploadComponent},
                        {path:'chart',component:ChartComponent},
                        {path:'**',component:ErrorComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
