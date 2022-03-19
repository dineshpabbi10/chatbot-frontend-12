import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../services/company.service'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  data: any;
  success: Boolean = false
  totalValidChats: Number = 0
  validChatsPie: any

  constructor(private companyService: CompanyService) { }

  ngOnInit(): void {
    this.updateData()
    // this.getGraphData()
    console.log(this.validChatsPie.datasets)
  }

  updateData() {
    this.companyService.getDashboardPieData().subscribe(data => {
      // console.log(data.data.total_chats,)
      if (data.status) {
        var validChats = [data.data.total_chats, data.data.total_valid_chats - data.data.total_chats]

        this.totalValidChats = data.data.total_valid_chats
        this.validChatsPie = {
          labels: ['Valid chats till now', 'Remaining chats'],
          datasets: [
            {
              data: validChats ? validChats : [],
              backgroundColor: ["#42A5F5", "#66BB6A"],
              hoverBackgroundColor: ["#64B5F6", "#81C784"]

            }
          ]
        };

        this.success = true
      }
    })
  }

  


  // getLightTheme() {
  //   return {
  //     plugins: {
  //       legend: {
  //         labels: {
  //           color: '#495057'
  //         }
  //       }
  //     }
  //   }
  // }

  // getDarkTheme() {
  //   return {
  //     plugins: {
  //       legend: {
  //         labels: {
  //           color: '#ebedef'
  //         }
  //       }
  //     }
  //   }
  // }

}
