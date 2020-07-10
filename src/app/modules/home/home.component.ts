import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { take, finalize } from 'rxjs/operators';
import { IDragon } from 'src/app/shared/models/dragon.model';
import { DragonService } from 'src/app/core/services/dragon.service';
import { AlertService } from 'src/app/core/services/alert.service';
import { DialogComponent } from '../../shared/components/dialog/dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  private subscriptions = new Subscription();
  public dragons: IDragon;
  public result: IDragon;
  public loading: boolean;
  public hidden: boolean;
  private options = {
    autoClose: true,
    keepAfterRouteChange: false,
  };

  constructor(private service: DragonService, protected alertService: AlertService, private dialog: MatDialog) {}

  ngOnInit() {
    this.setAlignment();
    this.getAllDragons();
  }
  alert(msg: string) {
    this.alertService.clear();
    this.alertService.success(msg, this.options);
  }
  setAlignment() {
    document.getElementsByTagName('body')[0].removeAttribute('class');
  }
  getAllDragons() {
    this.loading = true;
    this.subscriptions.add(
      this.service
        .getAllDragon()
        .pipe(
          take(1),
          finalize(() => (this.loading = false)),
        )
        .subscribe(res => {
          if (res.toString().length) {
            const formatDate = this.formatDate(res);
            const result = this.order(formatDate);
            this.hidden = false;
            return (this.dragons = result);
          } else {
            this.hidden = true;
            return (this.dragons = res);
          }
        }),
    );
  }
  order(res) {
    return res.sort((a, b) => a.name.localeCompare(b.name));
  }
  formatDate(res) {
    return res.map(item => {
      const today = new Date(item.createdAt);
      item.createdAt = `${today.getUTCDate()}-${today.getMonth() + 1}-${today.getFullYear()}`;
      return item;
    });
  }
  delete(id: string) {
    this.loading = true;
    this.subscriptions.add(
      this.service
        .deleteDragon(id)
        .pipe(
          take(1),
          finalize(() => (this.loading = false)),
        )
        .subscribe(res => {
          this.getAllDragons();
          this.result = res;
          const msg = 'Dragon successfully deleted. ';
          this.alert(msg);
        }),
    );
  }
  modalDialog(dragon: IDragon) {
    const dialog = this.dialog.open(DialogComponent, {
      data: {
        title: 'Delete',
        message: `Do you want to delete <strong>${dragon.name || 'unnamed'}</strong> dragon?`,
      },
    });
    dialog.afterClosed().subscribe(data => {
      if (data) {
        this.loading = true;
        this.delete(dragon.id);
      }
    });
  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
