import { Component, OnInit } from '@angular/core';
import { Chart,registerables } from 'chart.js';
import { map } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  title = 'fileApp';
  
  
  // Date input variables
  prediction_from_date:any;
  prediction_end_date:any;
  prediction_span:any;
  custom_date:any;

  //Chart Variables
  actual_predicted_chart:any;
  forecasted_chart:any;

  // Output and proceesing variables
  actual_sales:any;
  predicted_sales:any;
  sales_date:any;
 
  future_user_date:any;
  future_sales:any;
  predicted_value:any;

  // errors variables
  accuracy:any;
  rmse:any;
  mape:any;

  // Boolean for Hiding Charts
  chart_div_1=false;
  chart_div_2=false;

  // Boolean for Hiding Input Format Cards
  calendar_div=false;
  to_from_date_div=false;
  single_date=false;

  display_div1=false;
  display_div2=true;

  calendar_input_div=true;
  total_days_input_div=true;
  specific_days_input_div=true;




  constructor(private http:HttpClient){Chart.register(...registerables)}
  ngOnInit(): void {
  }
 
  
  
  // Actual Vs Predicted Chart  and  Forecasted Chart using Start and End Date

  generate_prediction_1(){

    this.display_div1=true;
    this.display_div2=false;
    this.chart_div_2=true;
    this.chart_div_1=false;
    this.custom_predicted_value_div=true;

  // API Call for passing inputs

    let url='http://localhost:5000/user_input';
    this.http.post(url,{'from':this.prediction_from_date,'to':this.prediction_end_date}).subscribe((response:any)=>{
      this.sales_date=JSON.parse(response.dates);
      this.actual_sales=JSON.parse(response.actual)
      this.predicted_sales=JSON.parse(response.predicted)
      this.future_user_date=JSON.parse(response.future_user_date)
      this.future_sales=JSON.parse(response.future_sales)
      this.rmse=response.rmse;
      this.accuracy=response.accuracy;
      this.mape=response.mape ;
      console.log(this.rmse,this.accuracy,this.mape)

   // Generating Charts  ------- Actual Vs Predicted Sales

      this.actual_predicted_chart=new Chart('actual-vs-predicted-1',{
        type:'line',
        data:{
          labels:this.sales_date,
          datasets:[
            {
              label:'Actual Sales',
              data:this.actual_sales,
              borderColor:'#318CE7',
              fill:false
            },
            {
              label:'Predicted Sales',
              data:this.predicted_sales,
              borderColor:'#002D62',
              fill:false
            }
          ]
        }
      })
    
    // Generating Charts ----- Forecasted Sales

      this.forecasted_chart=new Chart('forecast-periodicity',{
        type:'line',
        data:{
          labels:this.future_user_date,
          datasets:[
            {
              label:'User Prediction',
              data:this.future_sales,
              borderColor:'#002D62',
              fill:false
            }
          ]
        }
      })
    })
    
  }

  custom_predicted_value_div=true;
  specific_date_req=false;
  specific_date_result=true;

  // Sales for specific date

  generate_prediction_3(){
    
    // API Call for passing date input and obtaing sales
    
    this.http.post('http://localhost:5000/custom_value',{'custom_date':this.custom_date}).subscribe((response:any)=>{
      this.predicted_value=JSON.parse(response.custom_value)

      this.custom_predicted_value_div=false;
      this.specific_date_req=true;
      this.specific_date_result=false;
    });
  }

// Drop Down Input 
select_value=''
onSelect(value:string){
    this.select_value=value;
}

// Integer validation
containsAnyLetters(str:string) {
    return /[a-zA-Z]/.test(str);
  }

// Initializing days to 0
days=0

// Actual Vs Predicted Sales and Forecasted Sales for Total Days count Input

generate_prediction_2(){
    
    if(this.select_value=='' || this.select_value=='Dont'){
      alert("select duration")
    }
    else if(this.prediction_span=='' || this.containsAnyLetters(this.prediction_span)==true){
      alert("Please provide a number...")
    }
    else{
      if(this.select_value=='Months'){
        this.days=+this.prediction_span
        this.days=this.days*30
      }
      else if(this.select_value=='Days'){
        this.days=+this.prediction_span
      }
      else if(this.select_value=='Weeks'){
        this.days=+this.prediction_span
        this.days=this.days*7
      }
    }
    if(this.days==0){
      alert("Cannot predict for zero "+this.select_value)
    }
    else if(this.days>=1){

      this.custom_predicted_value_div=true;
      this.display_div1=true;
      this.display_div2=false;
      this.chart_div_2=false;
      this.chart_div_1=true;

      // API Call for passing total days needed to be predicted value

      this.http.post("http://localhost:5000/pred_days",{'days':this.days}).subscribe((response:any)=>{
      this.sales_date=JSON.parse(response.dates);
      this.actual_sales=JSON.parse(response.actual)
      this.predicted_sales=JSON.parse(response.predicted)
      this.future_user_date=JSON.parse(response.future_user_date)
      this.future_sales=JSON.parse(response.future_sales)
      this.rmse=response.rmse;
      this.accuracy=response.accuracy;
      this.mape=response.mape ;
      console.log(this.rmse,this.accuracy,this.mape)
      console.log(this.sales_date[0],this.actual_sales[0],this.predicted_sales, this.future_user_date[0],this.future_sales[0])
      

    // Generating Charts -------------------- Actual Vs Predicted Chart

      this.actual_predicted_chart=new Chart('actual-vs-predicted-2',{
        type:'line',
        data:{
          labels:this.sales_date,
          datasets:[
            {
              label:'Actual Sales',
              data:this.actual_sales,
              borderColor:'#318CE7',
              fill:false
            },
            {
              label:'Predicted Sales',
              data:this.predicted_sales,
              borderColor:'#002D62',
              fill:false
            }
          ]
        }
      })

      // Generating Charts ---------------------- Forecast Chart

      this.forecasted_chart=new Chart('forecast-total-days',{
        type:'line',
        data:{
          labels:this.future_user_date,
          datasets:[
            {
              label:'User Prediction',
              data:this.future_sales,
              borderColor:'#002D62',
              fill:false
            }
          ]
        }
      })
      })
    }
  
  }


// Hiding Input Cards Functions

hide_calendar(){
  this.to_from_date_div=true;
  this.single_date=true;
  this.calendar_input_div=false;
  this.total_days_input_div=true;
  this.specific_days_input_div=true;
  this.calendar_div=false;
}

hide_date_input(){
  this.calendar_div=true;
  this.single_date=true;;
  this.to_from_date_div=false;
  this.calendar_input_div=true;
  this.total_days_input_div=false;
  this.specific_days_input_div=true;
}

hide_specific_date(){
  this.calendar_div=true;
  this.to_from_date_div=true;
  this.single_date=false;
  this.calendar_input_div=true;
  this.total_days_input_div=true;
  this.specific_days_input_div=false;
}


}




