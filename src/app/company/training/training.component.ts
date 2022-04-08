import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';
import { CompanySocketService } from '../services/company-socket.service';
import { CompanyService } from '../services/company.service';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit {
  public trainingTitle = "";
  public isTraining = false;
  public domainToken : any  = null;
  public SOCKET_URL = 'wss://34.131.139.183:4444/ws/chatroom/';
  public cols = [
    { field: 'id', header: 'ID' },
    { field: 'datetime', header: 'Training Date' },
    { field: 'status', header: 'Training Status' },
    { field: 'user', header: 'User' },
  ];
  public trainingHistory :any[] = []

  constructor(private companyService: CompanyService,private companySocketService: CompanySocketService, private toaster : ToastrService, private loader : NgxUiLoaderService) { }

  ngOnInit(): void {
    this.trainingTitle = "All Trainings Complete";
    this.companySocketService.openWebSocketConnection(this.SOCKET_URL+'dineshpabbi10@gmail.com');

    this.companySocketService.socketCloseSubject$.subscribe((data:any)=>{
      setTimeout(()=>{
        this.getTrainingStatusFromSocket();
      },1000)
    });

    this.companySocketService.socketResponseSubject$.subscribe((data:any)=>{
      console.log(data);
    })


    
    this.getDomains();

    this.getTrainHistory();
  }

  getDomains(){
    this.loader.start();
    this.companyService
    .getWebsiteTokens()
    .pipe(
      catchError((err) => {
        this.toaster.error(err.message);
        return of(err.message);
      })
    )
    .subscribe((res) => {
      if (res.status) {
        this.domainToken = res.data[0]?.token;
      }
      this.loader.stop();
    });
  }

  getTrainHistory(){
    this.loader.start();
    this.companyService
    .getTrainHistory()
    .pipe(
      catchError((err) => {
        this.toaster.error(err.message);
        return of(err.message);
      })
    )
    .subscribe((res) => {
      if (res.status) {
        this.trainingHistory = res.data;
      }
      this.loader.stop();
    });
  }

  startTraining(){
    this.loader.start();
    this.companyService
    .trainBot(this.domainToken)
    .pipe(
      catchError((err) => {
        this.toaster.error(err.message);
        return of(err.message);
      })
    )
    .subscribe((res) => {
      if (res.status) {
        this.toaster.success("Training started successfully");
      }
      this.loader.stop();
    });
  }

  getTrainingStatusFromSocket() {
    let data = {
      payload: {
        msg: '',
        agent: '',
      },
      type: 'train_status',
      from: 'agent',
    };
    console.log('GETTING MESSAGE');
    this.companySocketService.sendWebSocketMessage(data);
  }

  

}
