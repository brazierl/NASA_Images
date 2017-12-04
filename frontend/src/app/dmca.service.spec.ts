import { TestBed, inject } from '@angular/core/testing';

import { DmcaService } from './dmca.service';

describe('DmcaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DmcaService]
    });
  });

  it('should be created', inject([DmcaService], (service: DmcaService) => {
    expect(service).toBeTruthy();
  }));
});
