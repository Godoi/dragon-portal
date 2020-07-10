import { Component, OnInit, OnDestroy } from '@angular/core';
import { IDragon } from 'src/app/shared/models/dragon.model';
import { Subscription } from 'rxjs';
import { DragonService } from 'src/app/core/services/dragon.service';
import { take, finalize } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit, OnDestroy {
  private subscriptions = new Subscription();
  public data: IDragon;
  public loading: boolean;
  public id: number;

  constructor(private router: ActivatedRoute, private service: DragonService) {}

  ngOnInit() {
    this.router.params.subscribe(params => {
      this.setAlignment();
      this.getDetailDragon(params.id);
    });
  }
  setAlignment() {
    document.getElementsByTagName('body')[0].removeAttribute('class');
  }
  getDetailDragon(id: number) {
    if (!id) {
      return null;
    }
    this.loading = true;
    this.subscriptions.add(
      this.service
        .getDetailDragon(id)
        .pipe(
          take(1),
          finalize(() => (this.loading = false)),
        )
        .subscribe(res => {
          return (this.data = this.formatDate(res));
        }),
    );
  }
  formatDate(item) {
    const today = new Date(item.createdAt);
    item.createdAt = `${today.getUTCDate()}-${today.getMonth() + 1}-${today.getFullYear()}`;
    return item;
  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
