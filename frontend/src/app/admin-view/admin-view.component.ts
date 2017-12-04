import { Component, OnInit } from '@angular/core';
import { DmcaService } from '../dmca.service';
import { HttpErrorResponse } from '@angular/common/http/src/response';
import { DmcaRequest } from '../dmca-request';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from '../authentication.service';
import { User } from '../user';
import { of } from 'rxjs/observable/of';

@Component({
  selector: 'app-admin-view',
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.css']
})
export class AdminViewComponent implements OnInit {

  private user$ = this.authenticationService.readProfile();
  private requests: DmcaRequest[];
  private success: string;
  private error: string;

  constructor(private dmcaService: DmcaService, private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.dmcaService.getRequests().subscribe((data) => {
      console.log(data);
      this.requests = data;
    },
      (err: HttpErrorResponse) => {
        this.error = 'Error retreiving the requests: ' + err.message;
      });
  }

  updateRequest(request: DmcaRequest) {
    this.success = null;
    this.error = null;
    this.dmcaService.updateRequest(request).subscribe((data) => {
      if (data['message']) {
        this.success = data['message'];
        this.ngOnInit();
      } else {
        this.error = 'An unexpected error has been encountered.';
      }
    },
      (err: HttpErrorResponse) => {
        this.error = err.message;
        this.handleError(err);
      }
    );
  }

  handleError(err: HttpErrorResponse) {
    this.error = err.message;
    return this.dmcaService.handleError('update-request', []);
  }

}
