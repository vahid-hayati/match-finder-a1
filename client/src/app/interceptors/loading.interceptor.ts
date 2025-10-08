import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LoadinService } from '../services/loadin.service';
import { delay, finalize } from 'rxjs';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingService = inject(LoadinService);

  loadingService.loading();

  return next(req).pipe(
    delay(2000), // remove delay on production,
    finalize(() => {
      loadingService.idle()
    })
  );
};
