import { Component, OnInit, OnDestroy } from '@angular/core';
import { JobdetailService } from "./jobdetail.service";
import { jobDetails } from '../Models/jobDetails';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from '../alert/alert.service';
import { Subscription } from 'rxjs/Subscription';
import { userProfile } from "../Models/userProfile";

@Component({
    moduleId: module.id,
    selector: "jobdetail",
    templateUrl: "jobdetail.component.html",
    styleUrls: ['jobdetail.component.css']
})

export class JobdetailComponent implements OnDestroy{
    private subscription = new Subscription();
    public jobdetail: jobDetails;
    public viewuser:userProfile;
    public equalcurrent:boolean;

    constructor(
        private alertService: AlertService,
        private router: Router,
        private jobdetailService: JobdetailService
        )
    {
        this.jobdetailService
            .getJobDetails(localStorage.getItem('jobId'))
            .subscribe(jobDetail => {
                this.jobdetail = jobDetail;
                this.equalcurrent = this.jobdetail.company.userName == JSON.parse(localStorage.getItem("currentUser")).userName;
            }, error => {
                console.log(error);
            });
    }

    ngOnDestroy() {
        // this.subscription.unsubscribe();
    }

    editjob() {
        this.jobdetailService.jobform = this.jobdetail;
        this.router.navigate(['editjob']);
        // setTimeout(() =>
        //     {
        //         console.log(this.jobdetail);
        //         this.jobdetailService
        //             .jobDetail(this.jobdetail);
        //     },
        //     5);
    }

    gotoUserview() {
        this.router.navigate(['userview']);
        this.jobdetailService
            .getUserEmail(this.jobdetail.company.email)
            .subscribe(
                data => {
                    this.viewuser = data;
                    this.setTime();
                }, error => {
                    this.alertService.error(error.text());
                });
    }


    setTime() {
        setTimeout(() =>
            {
                // console.log(this.viewuser);
                this.jobdetailService
                    .userView(this.viewuser);
            },
            5);
    }

    gotoCommentuser(email) {

        this.router.navigate(['userview']);
        this.jobdetailService
            .getUserEmail(email)
            .subscribe(
                data => {
                    this.viewuser = data;
                    this.setTime();
                }, error => {
                    this.alertService.error(error.text());
                });
    }

    addComment(comment) {
        this.jobdetailService.addComment(comment, this.jobdetail.jobId)
            .subscribe(
                info => {
                    this.alertService.success("Comment Added", true);
                    setTimeout(() =>{
                        window.location.reload();
                    },
                    500);
                },
                error => {
                    this.alertService.error(error.text());
                });
    }
}
