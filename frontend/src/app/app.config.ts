import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { HTTP_INTERCEPTORS, provideHttpClient , withFetch, withInterceptors } from '@angular/common/http';
import { routes } from './app.routes';
 import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import {ToastrModule} from "ngx-toastr"
import { provideAnimations } from '@angular/platform-browser/animations';
import { AuthInterceptor } from './interceptors/auth.interceptor';
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
     provideRouter(routes), 
     provideHttpClient(withFetch(),withInterceptors([AuthInterceptor])
    ),
     provideAnimations() ,
     FormsModule, ReactiveFormsModule ,
     importProvidersFrom (ToastrModule.forRoot({positionClass:"toast-bottom-right"})), 
     provideClientHydration(withEventReplay()),
   
    
    ]
};
