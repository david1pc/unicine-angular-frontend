import { NgModule } from '@angular/core';
import {
  NgbCarouselModule,
  NgbDatepickerModule,
  NgbDropdownModule,
  NgbOffcanvasModule,
  NgbPaginationModule,
} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  exports: [
    NgbPaginationModule,
    NgbCarouselModule,
    NgbDatepickerModule,
    NgbDropdownModule,
    NgbOffcanvasModule,
    NgbPaginationModule,
  ],
})
export class NgBootstrapModule {}
