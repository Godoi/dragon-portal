import { TestBed, async } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClientModule, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { DragonService } from './dragon.service';
import { MOCK_DRAGONS } from 'src/app/shared/mocks/dragons';

let service: DragonService;
let httpMock: HttpTestingController;
let httpTestingController: HttpTestingController;

beforeEach(async(() => {
  TestBed.configureTestingModule({
    providers: [DragonService],
    imports: [HttpClientModule, HttpClientTestingModule],
  });

  httpTestingController = TestBed.get(HttpTestingController);
  service = TestBed.get(DragonService);
  httpMock = TestBed.get(HttpTestingController);
  jest.spyOn(console, 'error').mockImplementation(() => undefined);
}));

describe('DragonService', () => {
  const EXPECTED_URL = 'http://5c4b2a47aa8ee500142b4887.mockapi.io/api/v1';

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  describe('getAllDragon', () => {
    it('should send a get request', () => {
      service.getAllDragon().subscribe();
      const req = httpMock.expectOne(`${EXPECTED_URL}/dragon`);
      expect(req.request.method).toBe('GET');
    });
    it('hould call the GET characters api and return all results', () => {
      let dataAll = {};
      service.getAllDragon().subscribe(data => (dataAll = data));
      const req = httpMock.expectOne(`${EXPECTED_URL}/dragon`);
      req.flush(MOCK_DRAGONS);
      expect(dataAll).toEqual(MOCK_DRAGONS);
    });
  });
  describe('getDetailDragon', () => {
    it('should send a get request', () => {
      const ID = 6;
      service.getDetailDragon(ID).subscribe();
      const req = httpMock.expectOne(`${EXPECTED_URL}/dragon/${ID}`);
      expect(req.request.method).toBe('GET');
    });
    it('should call the GET characters api and return the result', () => {
      const ID = 6;
      let dataSpecific = {};
      service.getDetailDragon(ID).subscribe(data => (dataSpecific = data));
      const req = httpMock.expectOne(`${EXPECTED_URL}/dragon/${ID}`);
      req.flush(MOCK_DRAGONS[0]);
      expect(dataSpecific).toEqual(MOCK_DRAGONS[0]);
    });
    it('should return null if parameter is null', () => {
      expect(service.getDetailDragon(null)).toBeNull();
    });
    it('should return null if parameter is undefined', () => {
      expect(service.getDetailDragon(undefined)).toBeNull();
    });
  });
  describe('saveDragon', () => {
    it('should send a POST request', () => {
      service.saveDragon(MOCK_DRAGONS[0]).subscribe();
      const req = httpMock.expectOne(`${EXPECTED_URL}/dragon`);
      expect(req.request.method).toBe('POST');
    });
  });
  describe('updateDragon', () => {
    it('should send a PUT request', () => {
      const ID = MOCK_DRAGONS[0].id;
      service.updateDragon(MOCK_DRAGONS[0]).subscribe();
      const req = httpMock.expectOne(`${EXPECTED_URL}/dragon/${ID}`);
      expect(req.request.method).toBe('PUT');
    });
  });
  describe('deleteDragon', () => {
    it('should send a DELETE request', () => {
      const ID = '6';
      service.deleteDragon(ID).subscribe();
      const req = httpMock.expectOne(`${EXPECTED_URL}/dragon/${ID}`);
      expect(req.request.method).toBe('DELETE');
    });
  });
  describe('handleError', () => {
    it('should return an observable of undefined and print error to console', () => {
      const result = service.handleError(new HttpErrorResponse({ error: 'Error occurs' }), 'test method');
      expect(console.error).toHaveBeenCalled();
      result.subscribe(value => expect(value).toBeUndefined());
    });
  });
});
