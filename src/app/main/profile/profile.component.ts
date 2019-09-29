import { Component, OnInit } from '@angular/core';
import { WorksService } from 'src/app/api/services';
import { CompactTask } from 'src/app/api/models';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

tasks : CompactTask[] = [];

  constructor(private workService : WorksService) { }

  ngOnInit() {
    this.getWorkerTask();
  }

  getInitiator(task: CompactTask) {
    if (task.organizationInitiator)
      return task.organizationInitiator.name;
      
    return task.personInitiator.name;
  }

  setData(task: string) {
    const date: Date = new Date(task);
    const s : string = date.getDay() + 1 < 10 ? `0${date.getDay() + 1}` : `${date.getDay() + 1}`
    return `${s}.${date.getMonth() + 1}.${date.getFullYear()}`;
  }

  async getWorkerTask(){
    try{
      this.tasks = await this.workService.apiWorksGet().toPromise();
    } catch (ex)
    {

    }
  }
}
