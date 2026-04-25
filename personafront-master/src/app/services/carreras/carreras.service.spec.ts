import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { CarrerasService } from './carreras.service';

describe('CarrerasService', () => {
  let service: CarrerasService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });

    service = TestBed.inject(CarrerasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
