import { TestBed } from '@angular/core/testing';

import { LoginUsersService } from './login-users.service';

describe('LoginUsersService', () => {
  let service: LoginUsersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginUsersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
