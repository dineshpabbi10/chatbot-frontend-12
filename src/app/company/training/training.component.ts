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
  styleUrls: ['./training.component.css'],
})
export class TrainingComponent implements OnInit {
  public trainingTitle = '';
  public isTraining = false;
  public domainToken: any = null;
  public userId: any = null;
  public SOCKET_URL_BASE = environment.socketBase || 'wss://34.131.3.178:4444/ws/chatroom/';
  public SOCKET_URL = '';
  public cols = [
    { field: 'datetime', header: 'Training Date' },
    { field: 'status', header: 'Training Status' },
  ];
  public trainingHistory: any[] = [];

  constructor(
    private companyService: CompanyService,
    private companySocketService: CompanySocketService,
    private toaster: ToastrService,
    private loader: NgxUiLoaderService
  ) {}

  ngOnInit(): void {
    // create socket on user detail fetch
    this.companyService
      .getCompanyUserDetails()
      .pipe(
        catchError((err) => {
          this.toaster.error(err.message);
          return of(err.message);
        })
      )
      .subscribe((res) => {
        if (res.status) {
          this.userId = res.data.userID;
          this.SOCKET_URL = this.SOCKET_URL_BASE + this.userId + '/'
          this.companySocketService.openWebSocketConnection(
            this.SOCKET_URL
          );
        }
      });

    this.companySocketService.socketCloseSubject$.subscribe((error) => {
      setTimeout(() => {
        this.companySocketService.openWebSocketConnection(this.SOCKET_URL);
      }, 10000);
    });

    // listen to socket messages
    this.companySocketService.socketResponseSubject$.subscribe((message:any)=>{
      if(message.type === "train_status"){
        if(message.payload.msg === "Training started"){
          this.trainingTitle = "Training in progress";
          this.isTraining = true;
          this.getTrainHistory();
        }else{
          this.trainingTitle = "All trainings complete";
          this.isTraining = false;
          this.getTrainHistory();
        }
      }
    })

    this.companySocketService.socketCloseSubject$.subscribe((data: any) => {
      setTimeout(() => {
        this.getTrainingStatusFromSocket();
      }, 1000);
    });

    this.companySocketService.socketResponseSubject$.subscribe((data: any) => {
    });

    this.getDomains();

    this.getTrainHistory();
  }

  getDomains() {
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

  getTrainHistory() {
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
          this.trainingHistory = res.data.history;
          this.isTraining = res.data.train_status;
          this.trainingTitle = this.isTraining ? "Training in progress" : "All trainings complete";
        }
        this.loader.stop();
      });
  }

  startTraining() {
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
          this.toaster.success('Training started successfully');
          this.getTrainHistory();
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
    this.companySocketService.sendWebSocketMessage(data);
  }
}
