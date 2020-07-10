import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { LoginModule } from './modules/login/login.module';
import { HomeModule } from './modules/home/home.module';
import { DetailModule } from './modules/details/details.module';
import { RegisterModule } from './modules/register/register.module';
import { AppComponent } from './app.component';
import { NotFoundComponent } from './modules/not-found/not-found.component';
import { AuthService } from './core/authentication/auth.service';
import { AuthGuard } from './core/guards/auth.guard';

@NgModule({
  declarations: [AppComponent, NotFoundComponent],
  imports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    LoginModule,
    HomeModule,
    DetailModule,
    RegisterModule,
  ],
  providers: [AuthService, AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
