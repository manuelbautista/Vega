import * as Raven from 'raven-js';
import { ToastyService } from 'ng2-toasty';
import { ErrorHandler, Inject, NgZone } from "@angular/core";

export class AppErrorHandler implements ErrorHandler {
    constructor(
        @Inject(ToastyService) private toastyService: ToastyService) {

        }
    handleError(error: any): void {
        if (typeof(window) !== 'undefined') {
            
            Raven.captureException(error.originalError || error);

            this.toastyService.error({
                title: 'Error',
                msg: 'An unexpected error happened',
                theme: 'bootstrap',
                showClose: true,
                timeout: 5000
                });
        }
    }

}