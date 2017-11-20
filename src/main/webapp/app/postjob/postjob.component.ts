import { Component, OnInit} from "@angular/core";
import { jobDetails } from "../Models/jobDetails";
import { PostjobService } from "./postjob.service";
import { AlertService } from '../alert/alert.service';
import { Router } from '@angular/router';


@Component({
    moduleId: module.id,
    selector: "postjob",
    templateUrl: "postjob.component.html",
    styleUrls: ['postjob.component.css']
})

export class PostjobComponent implements OnInit{
    public _jobform: jobDetails;
    public skill: string;
    public submitted: false;

    constructor(
        private postjobService: PostjobService,
        private alertService: AlertService,
        private router: Router
    ) {}

    ngOnInit() {
        let company = null;
        this._jobform = new jobDetails("","","",company,new Array<string>(),new Date(),new Date(),new Date(),"", "", new Array<any>());
    }

    add(form:jobDetails) {
        form.company = JSON.parse(localStorage.getItem("currentUser"));
        this.postjobService
            .create(form)
            .subscribe(
                data => {
                    this.router.navigate(['/jobdetail'])
                    this.alertService.success('Post Job successful', true);
                },
                error => {
                    console.log('there ' + error);
                    // this.alertService.error(error.text());
                });
    }

    add_skills(skill) {
        let skills = skill.split(',');
            for (let item of skills) {
                if (!this._jobform.requiredSkills.includes(item)) {
                    this._jobform.requiredSkills.push(item);
                }
            }
        console.log(this._jobform.requiredSkills);
        this.skill = "";
    }

    remove_skills(skill) {
        this._jobform.requiredSkills = this._jobform.requiredSkills.filter(obj => obj !== skill);
        console.log(this._jobform.requiredSkills);
    }

}