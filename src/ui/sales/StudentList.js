import StudentList_Form from './StudentList_Form';
import React, {Component} from 'react';
import StudentList_Store from '../../store/sales/Studentslist_Store';
import * as constants from '../../constants.js';
import { NotificationManager} from 'react-notifications';
import moment  from "moment";
import { observable, extendObservable } from 'mobx';
export default class StudentList extends React.Component 
{
    constructor (props) {
        super(props);
         this.StudentList_Store = observable(StudentList_Store);
         this.submitForm = this.submitForm.bind(this);
    }
    submitForm()
    {
     window.newstudents();     
    }

    render () {
        return(
        <div>   
            {<StudentList_Form submitForm ={this.submitForm} currencyratedetails = {this.StudentList_Store}  />}
        </div>
        )
    }

}

