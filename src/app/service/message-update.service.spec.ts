import { TestBed } from '@angular/core/testing';

import { MessageUpdateService } from './message-update.service';

describe('MessageUpdateService', () => {
  let service: MessageUpdateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MessageUpdateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
