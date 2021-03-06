import { Component, OnInit } from '@angular/core';
import { WorksService } from 'src/app/api/services';
import { CompactTask, CompactNetworkType } from 'src/app/api/models';
import { MatDialog } from '@angular/material/dialog';
import { VerificationComponent } from './verification/verification.component';
import { ApprovComponent } from './approv/approv.component';
import { FinishTaskComponent } from './finish-task/finish-task.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  tasks: CompactTask[] = [];

  constructor(private workService: WorksService, public dialog: MatDialog) { }

  ngOnInit() {
    this.getWorkerTask();
  }

  getInitiator(task: CompactTask) {
    if (task.organizationInitiator)
      return task.organizationInitiator.name;

    return task.personInitiator.name;
  }

  socialIcon(social: CompactNetworkType){
    switch (social.id) {
      case 1:
        return "assets/images/Icons/vk.png"
        case 2:
            return "assets/images/Icons/yt.png"
      case 3:
        return "assets/images/Icons/instagram.png"
      case 4:
        return "assets/images/Icons/twitter.png"        
      default:
        return ""
    }
  }

  setData(task: string) {
    const date: Date = new Date(task);
    const s: string = date.getDay() + 1 < 10 ? `0${date.getDay() + 1}` : `${date.getDay() + 1}`
    return `${s}.${date.getMonth() + 1}.${date.getFullYear()}`;
  }

  async getWorkerTask() {
    try {
      this.tasks = await this.workService.apiWorksGet().toPromise();
    } catch (ex) {

    }
  }

  checkStatus(task: CompactTask) {
    switch (task.status) {
      case 1:
        return "Согласовать"

      case 2: return "Сдать"
    }
  }

  openDialogVerif() {
    const dialogRef = this.dialog.open(VerificationComponent, {
      width: '40%',
      height: '40%',
      panelClass: "test-dialog",
    });
    dialogRef.afterClosed().subscribe(() => this.getWorkerTask());
  }

  openDialogResult(task: CompactTask) {
    switch (task.status) {
      case 1:
        {
          const dialogRef = this.dialog.open(ApprovComponent, {
            width: '40%',
            height: '40%',
            panelClass: "test-dialog",
            data: task
          });
          dialogRef.afterClosed().subscribe(() => this.getWorkerTask());
          break;
        }
      case 2: {
        const dialogRef = this.dialog.open(FinishTaskComponent, {
          width: '40%',
          height: '40%',
          panelClass: "test-dialog",
          data: task
        });
        dialogRef.afterClosed().subscribe(() => this.getWorkerTask());
        break;
      }
    }
  }
}
