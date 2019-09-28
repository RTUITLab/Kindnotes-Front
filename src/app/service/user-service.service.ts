import { Injectable } from '@angular/core';
import { IdentityService } from '../api/services';
import { TouchSequence } from 'selenium-webdriver';
import { UserModel } from '../api/models';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';


@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Apply the headers
    req = req.clone({
      setHeaders: {
        'Authorization': `Bearer ${localStorage.getItem("token")}`
      }
    });
    return next.handle(req).pipe(
      tap(x => x, err => {
        // Handle this err
        console.error(`Error performing request, status code = ${err.status}`);
      })
    );
  }
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userModel: UserModel;

  constructor(private identity: IdentityService) {

  }

  get isAuthorized(): boolean {
    if (localStorage.getItem("token"))
      return true;

    return false;
  }

  async getUserModel() {
    if (!this.isAuthorized)
      return;

    try {
      this.userModel = await this.identity.apiIdentityMeGet().toPromise();
      alert(`Здравствуй, ${this.userModel.userName}`)
    } catch (ex) {
      alert(`Чет не так! ${ex}`);
    }
  }
}
