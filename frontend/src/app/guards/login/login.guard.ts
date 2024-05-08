import { CanActivateFn, Router } from '@angular/router';

export const loginGuard: CanActivateFn = (route, state) => {
  const router = new Router();
  if (localStorage.getItem('token')) {
    return true
  } else {
    router.navigate(['/login'])
    return false
  }

};
