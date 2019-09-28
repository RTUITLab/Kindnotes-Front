import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ApiModule } from './api/api.module';
import { HttpClientModule } from '@angular/common/http';
import { MainComponent } from './main/main.component';
import { RouterModule } from '@angular/router';
import { AuthentificationPageComponent } from './authentification-page/authentification-page.component';
import { LoginComponent } from './authentification-page/login/login.component';
import { RegistrationComponent } from './authentification-page/registration/registration.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    AuthentificationPageComponent,
    LoginComponent,
    RegistrationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ApiModule.forRoot({ rootUrl: "http://10.70.3.91:5000" }),
    RouterModule.forRoot(
      [{
        path:'', component: MainComponent
      },
      {
        path:'authentification', component: AuthentificationPageComponent, children: [
          {
            path:'', component: LoginComponent
          },
          {
            path:'registration', component: RegistrationComponent
          }
        ]
      }]
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
