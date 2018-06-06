import NewStudent_Form from './NewStudent_Form';
import React, { Component } from 'react';
import NewStudent_Store from '../../store/sales/NewStudent_Store';
import NewStudentItem_Store from '../../store/sales/NewStudentItem_Store';
import { observable, toJSON, extendObservable } from 'mobx';
import * as constants from '../../constants.js';
import { NotificationManager } from 'react-notifications';
import moment from "moment";
export default class NewStudent extends React.Component {
    constructor(props) {
        super(props);
        this.NewStudentDetails = observable(NewStudent_Store);
        this.NewStudentDetails.familyMembers = [];
        window.NewStudentDetails = this.NewStudentDetails;

        this.handleedit = this.handleedit.bind(this)
        if (this.props.cashsalesdocno) {
            window.fillcashsales(this.props.cashsalesdocno);
        }
        this.submitForm = this.submitForm.bind(this);
        this.submitFormedit = this.submitFormedit.bind(this);
        this.handleedit = this.handleedit.bind(this);
        if (this.props.isedit)
            this.handleedit();
    }

    handleedit() {
        this.setState({ showaccountstab: true, branchspacialrates: true });
        // var currencyratedetails = this.props.currbranchspacialratedocitems;
        var currencyrateform = this;
        var loadrequest = {}

        $.ajax({
            url: constants.SERVICEURL + '/Students/' + window.editstudentid,
            type: 'GET',
            dataType: 'json',
            data: loadrequest,
            success: function (respoce, textStatus, xhr) {
                this.NewStudentDetails.ID = respoce.ID;
                this.NewStudentDetails.firstName = respoce.firstName
                this.NewStudentDetails.lastName = respoce.lastName
                this.NewStudentDetails.dateOfBirth = respoce.dateOfBirth
                $.ajax({
                    url: constants.SERVICEURL + '/Students/' + window.editstudentid + '/FamilyMembers',
                    type: 'GET',
                    dataType: 'json',
                    data: {},
                    success: function (responce, textStatus, xhr) {

                        var grid_array = [];
                        responce.forEach(function (row, index) {
                            grid_array.push({
                                srno:index +1,
                                ID: row.ID,
                                firstName: row.firstName,
                                lastName: row.lastName,
                                dateOfBirth: row.dateOfBirth,
                                relationship: constants.getFieldValue(row.relationship),
                                nationality: constants.getFieldValue(row.nationality.ID||row.nationality.value),
                                nationalityname:constants.getFieldValue(row.nationality.Title||row.nationality.label||row.nationality.ID||row.nationality.value)
                            });
                        });
                        this.NewStudentDetails.familyMembers = grid_array;
                    }.bind(this),
                    error: function (xhr, textStatus, errorThrown) {
                        console.log('Error in Operation');
                    }
                });
                this.setState({ random: Math.random() });
                window.studentlist();
            }.bind(this),
            error: function (xhr, textStatus, errorThrown) {
                console.log('Error in Operation');
            }
        });
        var loadrequest = {}
        loadrequest.parem1 = {};
        $.ajax({
            url: constants.SERVICEURL + '/Students/' + window.editstudentid + '/Nationality',
            type: 'GET',
            dataType: 'json',
            data: loadrequest,
            success: function (respoce, textStatus, xhr) {
                var nation = { label: respoce.nationality.Title, value: respoce.nationality.ID }
                this.NewStudentDetails.nationality = nation;
                this.setState({ random: Math.random() });
            }.bind(this),
            error: function (xhr, textStatus, errorThrown) {
                console.log('Error in Operation');
            }
        });
        
    }

    submitFormedit() {

        console.log('Sending form', JSON.stringify(toJSON(this.NewStudentDetails), null, 2));
        // validation
        var errors = [];
        if (errors.length !== 0) return;
        var params = {};
        var obj = {};
        var url = constants.SERVICEURL + '/Students/' + this.NewStudentDetails.ID;
        var validatefieldlist = ['firstName', 'lastName'];
        var validatefieldname = ['FirstName', 'LastName'];
        var cashsales = {};
        var cashsalesorg = toJSON(this.NewStudentDetails);
        var validatemessges = [];
        validatefieldlist.forEach(function (field, index) {
            if (!cashsalesorg[field])
                validatemessges.push(validatefieldname[index] + ' is required ');
        });

        if (validatemessges.length > 0) {
            NotificationManager.error('Validation message', validatemessges.join(' , '));
            return;
        }
        cashsalesorg.dateOfBirth = moment(cashsalesorg.dateOfBirth).format("MMM DD, YYYY");


        var bodydata = {};
        bodydata.firstName = cashsalesorg.firstName;
        bodydata.lastName = cashsalesorg.lastName;
        bodydata.dateOfBirth = cashsalesorg.dateOfBirth;

        $.ajax({
            type: "PUT",
            url: url,
            async: true,
            cache: false,
            contentType: 'application/json',
data: JSON.stringify(bodydata),
            dataType: "json",
            success: function (result) {
                //  window.cashsalesform.handleEditOpen()
                cashsalesorg.familyMembers.forEach(function (member, mi) {
                    try {
                        var url = constants.SERVICEURL + '/FamilyMembers/' + member.ID;
                        var bodydata = {};
                        $.ajax({
                            type: "DELETE",
                            url: url,
                            async: true,
                            cache: false,
                            contentType: 'application/json',
data: JSON.stringify(bodydata),
                            dataType: "json",
                            success: function (result) {
                            },
                            error: function (jqXHR, exception) {

                               // NotificationManager.error('Error message', 'Error While Saveing');
                            }
                        });
                    }
                    catch (e) {


                    }
                }.bind(this));
                cashsalesorg.familyMembers.forEach(function (member, mi) {

                    var url = constants.SERVICEURL + '/Students/' + cashsalesorg.ID + '/FamilyMembers';
                    var bodydata = {};
                    bodydata.firstName = member.firstName;
                    bodydata.lastName = member.lastName;
                    bodydata.dateOfBirth = member.dateOfBirth;
                    bodydata.relationship = member.relationship;
                    $.ajax({
                        type: "POST",
                        url: url,
                        async: true,
                        cache: false,
                        contentType: 'application/json',
data: JSON.stringify(bodydata),
                        dataType: "json",
                        success: function (result) {
                            $.ajax({
                                type: "PUT",
                                url: constants.SERVICEURL + '/FamilyMembers/' + result.ID + '/Nationality/' + constants.getFieldValue(member.nationality),
                                async: true,
                                cache: false,
                                data: {},
                                dataType: "json",
                                success: function (result) {


                                },
                                error: function (jqXHR, exception) {

                               //     NotificationManager.error('Error message', 'Error While Saveing');
                                }
                            });
                        },
                        error: function (jqXHR, exception) {

                          //  NotificationManager.error('Error message', 'Error While Saveing');
                        }
                    });
                });
                NotificationManager.remove({ id: 1 });
                NotificationManager.create({
                    id: 1,
                    type: "success",
                    message: 'Saved Successfully',
                    title: 'Success message',
                    timeOut: 0
                });
                window.studentlist();
                setTimeout(function () {
                    NotificationManager.remove({ id: 1 });
                }, 2000);
            },
            error: function (jqXHR, exception) {
             
                //alert(exception);
              //  NotificationManager.error('Error message', 'Error While Saveing');
            }
        });

        var url = constants.SERVICEURL + '/Students/' + this.NewStudentDetails.ID + '/Nationality/' + constants.getFieldValue(this.NewStudentDetails.nationality)
        var bodydata = {}
        $.ajax({
            type: "PUT",
            url: url,
            async: true,
            cache: false,
            data: bodydata,
            dataType: "json",
            success: function (result) {

            },
            error: function (jqXHR, exception) {
              
                //alert(exception);
               // NotificationManager.error('Error message', 'Error While Saveing');
            }
        });


    }

    submitForm(event) {
        event.preventDefault();

        if (this.props.isedit) {
            this.submitFormedit();
            return;
        }
        console.log('Sending form', JSON.stringify(toJSON(this.NewStudentDetails), null, 2));
        // validation
        var errors = [];
        if (errors.length !== 0) return;
        var params = {};
        var obj = {};
        var url = constants.SERVICEURL + '/Students';
        var validatefieldlist = ['firstName', 'lastName'];
        var validatefieldname = ['FirstName', 'LastName'];
        var cashsales = {};
        var cashsalesorg = toJSON(this.NewStudentDetails);
        var validatemessges = [];
        validatefieldlist.forEach(function (field, index) {
            if (!cashsalesorg[field])
                validatemessges.push(validatefieldname[index] + ' is required ');
        });

        if (validatemessges.length > 0) {
            NotificationManager.error('Validation message', validatemessges.join(' , '));
            return;
        }
        cashsalesorg.dateOfBirth = moment(cashsalesorg.dateOfBirth).format("MMM DD, YYYY");


        var bodydata = {};
        bodydata.firstName = cashsalesorg.firstName;
        bodydata.lastName = cashsalesorg.lastName;
        bodydata.dateOfBirth = cashsalesorg.dateOfBirth;

        $.ajax({
            type: "POST",
            url: url,
            async: true,
             contentType: 'application/json',
            cache: false,
            data: JSON.stringify(bodydata),
            dataType: "json",
            success: function (result) {
                //  window.cashsalesform.handleEditOpen()
                this.NewStudentDetails.ID = result.ID;
                var url = constants.SERVICEURL + '/Students/' + result.ID + '/FamilyMembers';
                cashsalesorg.familyMembers.forEach(function (member, mi) {

                    var bodydata = {};
                    bodydata.firstName = member.firstName;
                    bodydata.lastName = member.lastName;
                    bodydata.dateOfBirth = member.dateOfBirth;
                    bodydata.relationship = constants.getFieldValue( member.relationship);
                    $.ajax({
                        type: "POST",
                        url: url,
                        async: true,
                        cache: false,
                         contentType: 'application/json',
data: JSON.stringify(bodydata),
                        dataType: "json",
                        success: function (result) {
                            //submit family member nationality
                            $.ajax({
                                type: "PUT",
                                url: constants.SERVICEURL + '/FamilyMembers/' + result.ID + '/Nationality/' + constants.getFieldValue(member.nationality),
                                async: true,
                                cache: false,
                                data: {},
                                dataType: "json",
                                success: function (result) {


                                },
                                error: function (jqXHR, exception) {

                                   // NotificationManager.error('Error message', 'Error While Saveing');
                                }
                            });

                        }.bind(this),
                        error: function (jqXHR, exception) {

                          //  NotificationManager.error('Error message', 'Error While Saveing');
                        }
                    });




                }.bind(this));
        var url = constants.SERVICEURL + '/Students/' + this.NewStudentDetails.ID + '/Nationality/' + constants.getFieldValue(this.NewStudentDetails.nationality)
        var bodydata = {}
        $.ajax({
            type: "PUT",
            url: url,
            async: true,
            cache: false,
            data: bodydata,
            dataType: "json",
            success: function (result) {

            },
            error: function (jqXHR, exception) {
                
                //alert(exception);
              //  NotificationManager.error('Error message', 'Error While Saveing');
            }
        });
                NotificationManager.remove({ id: 1 });
                NotificationManager.create({
                    id: 1,
                    type: "success",
                    message: 'Saved Successfully',
                    title: 'Success message',
                    timeOut: 0
                });
                setTimeout(function () {
                    NotificationManager.remove({ id: 1 });
                }, 2000);

            }.bind(this),
            error: function (jqXHR, exception) {
                
                //alert(exception);
                NotificationManager.error('Error message', 'Error While Saveing');
            }
        });
     

    }

    render() {
        return (
            <div>
                {<NewStudent_Form NewStudentDetails={this.NewStudentDetails} isedit={this.props.isedit}  submitForm={this.submitForm} />}
            </div>
        )
    }

}
