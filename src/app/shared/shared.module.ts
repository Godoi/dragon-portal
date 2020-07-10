import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { HeaderComponent } from './components/header/header.component';
import { AlertComponent } from './components/alert/alert.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { DialogComponent } from './components/dialog/dialog.component';

@NgModule({
  declarations: [HeaderComponent, AlertComponent, SpinnerComponent, DialogComponent],
  imports: [CommonModule, RouterModule, MatDialogModule],
  exports: [HeaderComponent, AlertComponent, SpinnerComponent, DialogComponent],
  entryComponents: [DialogComponent],
})
export class SharedModule {}
