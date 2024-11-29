import { NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router'; // Asegúrate de importar esto
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GoogleMapsModule } from '@angular/google-maps';
import { isPlatform, ionicModule } from '@ionic/angular';
const getConfig = () =>{
  if (isPlatform('hybrid')) {
    return{
      backButtonText: 'Previous',
      tabButtonLayout: 'label-hide'
      }
    }

    return {
     menuIcon: 'ellipsis-vertical'
     }
  }
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(getConfig()),
    AppRoutingModule,
    HttpClientModule, // Importa el módulo HTTP aquí
    FormsModule,
    ReactiveFormsModule,
    GoogleMapsModule, // Asegúrate de incluir FormsModule
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  ],
  bootstrap: [AppComponent],

  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}


