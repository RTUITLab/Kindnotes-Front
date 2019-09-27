import { Component } from '@angular/core';
import { WeatherForecastService } from './api/services/weather-forecast.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private service: WeatherForecastService) {
  }

  async ngOnInit() {
    console.log("LOL");
    const r = await this.service.weatherForecastGet$Json().toPromise();
    r.forEach(w => console.log(w.date));
  }

  title = 'kindnotes';
}
