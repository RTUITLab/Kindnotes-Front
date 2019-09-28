import { BrowserModule } from '@angular/platform-browser';
import { NgModule, forwardRef } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ApiModule } from './api/api.module';
import { HttpClientModule } from '@angular/common/http';
import { MainComponent } from './main/main.component';
import { RouterModule } from '@angular/router';
import { AuthentificationPageComponent } from './authentification-page/authentification-page.component';
import { LoginComponent } from './authentification-page/login/login.component';
import { RegistrationComponent } from './authentification-page/registration/registration.component';
import { TopBarComponent } from './main/top-bar/top-bar.component';
import { LeftBarComponent } from './main/left-bar/left-bar.component';
import { RightBarComponent } from './main/right-bar/right-bar.component';
import { NewsComponent } from './main/news/news.component';
import { UserService } from './service/user-service.service';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiInterceptor } from 'src/app/service/user-service.service'
import { Provider } from '@angular/compiler/src/core';
import { PostsComponent } from './main/posts/posts.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatNativeDateModule }  from '@angular/material/core';
import {MatDialogModule} from '@angular/material/dialog';
import { DetailedInformationComponent } from './main/posts/detailed-information/detailed-information.component';

export const API_INTERCEPTOR_PROVIDER: Provider = {
  provide: HTTP_INTERCEPTORS,
  useExisting: forwardRef(() => ApiInterceptor),
  multi: true
};

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    AuthentificationPageComponent,
    LoginComponent,
    RegistrationComponent,
    TopBarComponent,
    LeftBarComponent,
    RightBarComponent,
    NewsComponent,
    PostsComponent,
    DetailedInformationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatNativeDateModule,
    FormsModule,
    MatDialogModule,
    ReactiveFormsModule,
    ApiModule.forRoot({ rootUrl: "http://10.70.3.91:5000" }),
    RouterModule.forRoot(
      [{
        path: '', component: MainComponent, children: [
          {
            path: '', component: NewsComponent
          },
          {
            path: 'posts', component: PostsComponent
          },
        ]
      },
      {
        path: 'authentification', component: AuthentificationPageComponent, children: [
          {
            path: '', component: LoginComponent
          },
          {
            path: 'registration', component: RegistrationComponent
          }
        ]
      }]
    ),
    BrowserAnimationsModule
  ],
  providers: [UserService,
    ApiInterceptor,
    API_INTERCEPTOR_PROVIDER],
  bootstrap: [AppComponent]
})
export class AppModule { }
