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
  numbersData: any
  chatResolutionData: any
  activeAgentPie: any
  responseResolutionData: any

  constructor(private companyService: CompanyService) { }

  ngOnInit(): void {
    this.updateData()
    this.getGraphData()
    this.getDashboardNumberData()
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

        this.activeAgentPie = {
          labels: ['Active agents', 'Inactive agents'],
          datasets: [
            {
              data: [data.data.active_agents, data.data.inactive_agents],
              backgroundColor: ["#FFCE56", "#36A2EB"],
              hoverBackgroundColor: ["#FFCE56", "#36A2EB"]

            }
          ]
        }



        this.success = true
      }
    })
  }

  getGraphData() {
    this.companyService.getDashboardGraphData().subscribe(data => {
      var firstResponseKeys: any = []
      var firstResponseValues: any = []
      var chatResolutionKeys: any = []
      var chatResolutionValues: any = []

      data.data.first_response.map(function (d: any) {
        var responseKey = Object.keys(d)
        var responseValues = Object.values(d)
        firstResponseKeys.push(responseKey[0])
        firstResponseValues.push(responseValues[0])
      })

      data.data.chat_resolution.map(function (e: any) {
        var chatKey = Object.keys(e)
        var chatValues = Object.values(e)
        chatResolutionKeys.push(chatKey[0])
        chatResolutionValues.push(chatValues[0])
      })

      this.chatResolutionData = {
        labels: chatResolutionKeys,
        datasets: [
          {
            label: 'Chat Resolution',
            data: chatResolutionValues,
            fill: false,
            borderColor: '#42A5F5',
            tension: .4
          }
        ]
      }

      this.responseResolutionData = {
        labels: firstResponseKeys,
        datasets: [
          {
            label: 'Response Time',
            data: firstResponseValues,
            fill: false,
            borderColor: '#FFA726',
            tension: .4
          }
        ]
      }

      // console.log(firstResponseKeys + ' ' + firstResponseValues)
    })
  }

  getDashboardNumberData() {
    this.companyService.getNumberData().subscribe(data => {
      if (data.status) {
        this.numbersData = data.data
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
