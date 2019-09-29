import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user-service.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit() {
   const d = this.userService.isAuthorized();
  }

  
}
