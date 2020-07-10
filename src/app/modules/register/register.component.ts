import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DragonService } from 'src/app/core/services/dragon.service';
import { IDragon } from 'src/app/shared/models/dragon.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit, OnDestroy {
  private subscriptions = new Subscription();
  public registerForm: FormGroup;
  public title: string;
  public id: string;

  constructor(
    private service: DragonService,
    private fb: FormBuilder,
    private activatedRouter: ActivatedRoute,
    private router: Router,
  ) {
    this.registerForm = this.fb.group({
      type: [null, [Validators.required]],
      name: [null, [Validators.required]],
      history: [null, [Validators.required]],
    });
  }

  ngOnInit() {
    this.setAlignment();
    this.activatedRouter.params.subscribe(params => {
      if (params.id) {
        this.title = 'Edition';
        this.subscriptions.add(
          this.service.getDetailDragon(params.id).subscribe((dragons: IDragon) => {
            this.id = dragons.id;
            this.registerForm.get('name').setValue(dragons.name);
            this.registerForm.get('type').setValue(dragons.type);
            this.registerForm.get('history').setValue(dragons.history);
          }),
        );
      } else {
        this.title = 'Register new dragon';
      }
    });
  }
  setAlignment() {
    document.getElementsByTagName('body')[0].removeAttribute('class');
  }
  resetForm() {
    this.registerForm.reset({
      codType: null,
      name: null,
      history: null,
    });
  }
  onSubmit() {
    const result = {
      name: this.registerForm.get('name').value,
      type: this.registerForm.get('type').value,
      history: this.registerForm.get('history').value,
    } as IDragon;
    if (this.id) {
      result.id = this.id;
    }
    if (this.registerForm.valid) {
      if (!this.id) {
        this.subscriptions.add(
          this.service.saveDragon(result).subscribe(() => {
            this.resetForm();
            this.router.navigate(['home']);
          }),
        );
      }
      if (this.id) {
        this.subscriptions.add(
          this.service.updateDragon(result).subscribe(() => {
            this.resetForm();
            this.router.navigate(['home']);
          }),
        );
      }
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
