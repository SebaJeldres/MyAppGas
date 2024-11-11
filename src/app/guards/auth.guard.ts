import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { AuthServicesService } from '../api/services/authService/auth-services.service';


export const authGuard: CanActivateFn = async (route, state) => {

  const _authService = inject(AuthServicesService)
  const router = inject(Router)

  const userInfo = await _authService.getDecrytedUserData();

  if (userInfo?.rol?.name == "admin") {
    return true;
  }
  router.navigate(['/login']);
  return true;
};
