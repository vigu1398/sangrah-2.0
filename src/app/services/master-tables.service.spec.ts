import { TestBed } from '@angular/core/testing';

import { MasterTablesService } from './master-tables.service';

describe('MasterTablesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MasterTablesService = TestBed.get(MasterTablesService);
    expect(service).toBeTruthy();
  });
});
