import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DragonService } from 'src/app/core/services/dragon.service';
import { MOCK_DRAGONS_RESULT, MOCK_DRAGONS } from 'src/app/shared/mocks/dragons';
import { SharedModule } from 'src/app/shared/shared.module';
import { DetailComponent } from './detail.component';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { AuthService } from 'src/app/core/authentication/auth.service';

describe('DetailComponent', () => {
  let component: DetailComponent;
  let fixture: ComponentFixture<DetailComponent>;
  let dragonService: DragonService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DetailComponent],
      imports: [HttpClientTestingModule, RouterTestingModule, SharedModule],
      providers: [AuthService],
    }).compileComponents();
  }));

  beforeEach(async () => {
    fixture = TestBed.createComponent(DetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    dragonService = TestBed.inject(DragonService);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('formatDate', () => {
    it('should set Dragon content formatted to date', () => {
      expect(component.formatDate(MOCK_DRAGONS[2])).toEqual(MOCK_DRAGONS_RESULT[0]);
    });
  });

  describe('getDetailDragon', () => {
    it('should set Dragon content ordered and formatted to date', () => {
      jest.spyOn(dragonService, 'getDetailDragon').mockReturnValue(of(MOCK_DRAGONS_RESULT[0]));
      component.getDetailDragon(2);
      expect(component.data).toEqual(MOCK_DRAGONS_RESULT[0]);
    });
    it('should return null getDetailDragon called with null', () => {
      expect(component.getDetailDragon(null)).toBeNull();
    });
    it('should return null getDetailDragon called with undefined', () => {
      expect(component.getDetailDragon(undefined)).toBeNull();
    });
    it('should loading be true before subscribe', () => {
      jest
        .spyOn(dragonService, 'getDetailDragon')
        .mockImplementation(() => of(MOCK_DRAGONS_RESULT[0]).pipe(delay(100)));
      component.getDetailDragon(2);
      expect(component.loading).toBeTruthy();
    });
    it('should loading be false after subscribe', () => {
      jest.spyOn(dragonService, 'getDetailDragon').mockReturnValue(of(MOCK_DRAGONS_RESULT[0]));

      component.getDetailDragon(2);
      expect(component.loading).toBeFalsy();
    });
  });
});
