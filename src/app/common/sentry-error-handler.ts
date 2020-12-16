import { Injectable, ErrorHandler} from '@angular/core'
import * as Sentry from '@sentry/browser'

@Injectable()
export class SentryErrorHandler implements ErrorHandler {
  
  constructor() {
    Sentry.init({
      dsn: "https://d364239008134edaab9366e51b25af91@o465619.ingest.sentry.io/5478555"
    })
  }
  
  handleError(error) {
    Sentry.captureException(error.originalError || error)
  }
}