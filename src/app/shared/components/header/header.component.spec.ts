import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthService } from 'src/app/core/authentication/auth.service';
import { HeaderComponent } from './header.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { Router } from '@angular/router';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let authService: AuthService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [AuthService],
    }).compileComponents();
  }));

  beforeEach(async () => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    authService = TestBed.get(AuthService);

    const originalNavigate = TestBed.get(Router).navigate;
    spyOn(TestBed.get(Router), 'navigate').and.callFake((...options) => {
      fixture.ngZone.run(() => {
        originalNavigate.apply(TestBed.get(Router), options);
      });
    });

    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  describe('Logout', () => {
    it('should call the logout method', () => {
      jest.spyOn(authService, 'logout').mockReturnValueOnce;
      expect(authService.logout()).toEqual(true);
    });
  });
});
