import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';

export const loginGuard: CanActivateFn = (route, state) => {
  // inject ile servisleri alıyoruz (function-based guard için)
  const authService = inject(AuthService);
  const toastrService = inject(ToastrService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    return true;
  } else {
    toastrService.info("Sisteme giriş yapmalısınız!");
    router.navigate(["login"]);
    return false;
  }
};