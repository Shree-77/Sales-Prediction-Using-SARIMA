import { HttpClient} from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { bufferToggle } from 'rxjs';


@Component({
  selector: 'app-file.upload',
  templateUrl: './file.upload.component.html',
  styleUrls: ['./file.upload.component.css']
})
export class FileUploadComponent {
  title = 'fileApp';

  // file variables
  file:any;
  filename:any;
  fileform:any;
  fileformat:any;
  formdata:any;

  // boolean for [hiiden]
  upload_button_div=true;
  message_div=false;

  // message
  message:string="";
  
  constructor(private http:HttpClient,private router:Router){}

  ngOnInit(): void {
  }
  
  
  chooseFile(event:any){
    try{

      // File Access
      this.file=event.target.files[0]

      if(this.file){

        // Name of the file is obtained
        this.filename=this.file.name;
        
        // Checking whether the file is in .csv format
        this.fileformat=this.filename.split('.')[1]

        if (this.fileformat!='csv')
        {
          this.message="Please select only csv file !!"
          setTimeout(()=>{this.message_div=true},1000)
          this.message_div=false
          setTimeout(()=>{this.clearFile()},1000)
        }
        else{
          this.message="Successfully file has been selected"
          setTimeout(()=>{this.message_div=true},1000)
          this.upload_button_div=false;
          this.message_div=false
          this.formdata=new FormData();
          this.formdata.append('file',this.file);
        }
      }
    }
    catch(error)
    {
      this.message="Please Ensure that file has been selected!!"
        setTimeout(()=>{this.message_div=true},1000)
        this.message_div=false
    }
   

  }
  
  uploadFile(){
    
    if(this.file){

    // API call for uploading the file
    let url='http://localhost:5000/file_upload';

    this.http.post(url,this.formdata).subscribe((response:any)=>{

    // Routing to the component by comparing the response

      this.message=response.response
      if(this.message=='file upload success'){
      this.router.navigateByUrl("/chart")
      }
    });
    }
  }

  clearFile(){
    //Clearing the file variables and hiding the upload option div
      this.file=null;
      this.filename=null;
      this.fileform=null;
      this.upload_button_div=true;
  }

}



