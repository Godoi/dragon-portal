import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HomeComponent } from './home.component';
import { SharedModule } from '../../shared/shared.module';
import { ListCardComponent } from '../../shared/components/list-card/list-card.component';
import { DragonService } from '../../core/services/dragon.service';
import { AuthService } from '../../core/authentication/auth.service';
import { MOCK_DRAGONS, MOCK_DRAGONS_RESULT, MOCK_DRAGONS_DELETE } from '../../shared/mocks/dragons';
import { delay } from 'rxjs/operators';
import { of } from 'rxjs';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let dragonService: DragonService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent, ListCardComponent],
      imports: [HttpClientTestingModule, RouterTestingModule, SharedModule],
      providers: [AuthService],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    dragonService = TestBed.inject(DragonService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  describe('getAllDragon', () => {
    it('should set Dragons content ordered and formatted to date', () => {
      jest.spyOn(dragonService, 'getAllDragon').mockReturnValue(of(MOCK_DRAGONS));
      component.getAllDragons();
      expect(component.dragons).toEqual(MOCK_DRAGONS_RESULT);
    });
    it('should loading be true before subscribe', () => {
      jest.spyOn(dragonService, 'getAllDragon').mockImplementation(() => of(MOCK_DRAGONS_RESULT).pipe(delay(100)));
      component.getAllDragons();
      expect(component.loading).toBeTruthy();
    });
    it('should loading be false after subscribe', () => {
      jest.spyOn(dragonService, 'getAllDragon').mockReturnValue(of(MOCK_DRAGONS_RESULT));

      component.getAllDragons();
      expect(component.loading).toBeFalsy();
    });
  });
  describe('Delete', () => {
    it('should call the delete method', () => {
      const id = '4';
      jest.spyOn(dragonService, 'deleteDragon').mockReturnValue(of(MOCK_DRAGONS_DELETE));
      component.delete(id);
      expect(component.result).toEqual(MOCK_DRAGONS_DELETE);
    });
  });
});
