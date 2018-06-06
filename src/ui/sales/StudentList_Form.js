import ReactDOM from 'react-dom';
import React, { Component, PropTypes } from 'react';
import ReactDataGrid from 'react-data-grid';
import { Button, Grid, Row, Col, Tabs, Tab, Glyphicon } from 'react-bootstrap';
import * as constants from '../../constants.js';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import NewStudent from './NewStudent'
import { observer } from 'mobx-react';
import { observable, extendObservable } from 'mobx';
import { InputField, asForm, InputDate, InputSelect } from '../../utils';
import ReactModal from 'react-modal';

class CellCheckboxformatter extends Component {
    render() {
        var flagvalue = this.props.value;
        return (<span className={'slickgridflag ' + flagvalue}></span>)
    }
}
class EditColButton extends Component {
    render() {
        return (<div style={{ color: 'blue' }} > <Glyphicon glyph="edit" /></div>)
    }
}

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

@observer
class StudentList_Form extends Component {
    constructor(props) {
        super(props)
        this.state = {};
        this.handleNew();
         this.state.modalIsOpen = false;
        this.handleNew = this.handleNew.bind(this);
        this.rowGetter = this.rowGetter.bind(this);
            this.onCellClick = this.onCellClick.bind(this);
            this.changeuserrole = this.changeuserrole.bind(this);

            window.sudentlistdata = this;
        this.col = [
            {
                key: 'ID',
                name: 'ID',
                width: 100
            },
            {
                key: 'firstName',
                name: 'First Name',
                width: 100
            },
            {
                key: 'lastName',
                name: 'Last Name'
            },
            {
                key: 'dateOfBirth',
                name: 'Date Of Birth' 
            } ,
            {
                key: 'ID',
                name: 'Students Details',
                formatter: EditColButton
            }];
this.afterOpenFn = this.afterOpenFn.bind(this);
this.requestCloseFn = this.requestCloseFn.bind(this);
    }
     afterOpenFn(i) {
        // alert('afterOpenFn');
    }
    requestCloseFn(i) {
        // alert('requestCloseFn');
    }
    changeuserrole(key, value) {
        this.props.updateProperty(key, value);
        constants.USERROLID = value;
    }
    rowGetter(i) {
        return this.props.currencyratedetails.studentdata[i]
    }
    onCellClick(rowIdx, row, cellidx) {
        if (cellidx == 4)   //EDIT Button
        {
                window.editstudentid = row.ID;
                this.setState({ modalIsOpen: true });
        }
    }
    handleNew() {
       $.ajax({
            url: constants.SERVICEURL + '/Students',
            type: 'GET',
            dataType: 'json',
            data: {},
            success: function (respoce, textStatus, xhr) {  
          this.props.currencyratedetails.studentdata  =  respoce;
             this.props.currencyratedetails.rollid = constants.USERROLID;
             }.bind(this),
            error: function (xhr, textStatus, errorThrown) { window.closeModal();
                console.log('Error in Operation');
            }
        });
    }
   render() {
        const {currencyratedetails, submitForm, updateProperty} = this.props;
        return (
            <form  autocomplete="on">
                <ReactModal
                            isOpen={this.state.modalIsOpen}
                            onAfterOpen={this.afterOpenFn}
                            onRequestClose={this.requestCloseFn}
                            className="Modal"
                            overlayClassName="Overlay"
                            style={customStyles}
                            contentLabel="Item Inquiry"
                            >
                    <NewStudent isedit={true} />
                        </ReactModal >
                <div className="container-fluid">
                    <div className="panel panel-primary" >
                        <div className="panel-heading">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="ibox float-e-margins">
                                        <div className="ibox-content text-center p-md">
                                            <span className="simple_tag pull-left pull-left">Students List</span>
                                            <div className="pull-right">
                                                <span className="simple_tag">
                                                    <Button bsStyle="success" onClick={submitForm}  ><Glyphicon glyph="floppy-save" />ADD New Student</Button>
                                                    &nbsp;
                                                    </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <NotificationContainer />
                        <div className="panel-body" style={{ padding: 5 + 'px ' + 15 + 'px ' + 2 + 'px ' + 15 + 'px' }}>
                           <Row>
                                                <Col xs={2} sm={2} md={2} lg={2} xl={2} style={{ fontWeight:  'bold' }}>
                                                  User Role:
                                                </Col>
                                                <Col xs={2} sm={2} md={2} lg={2} xl={2}>
                                                 <InputSelect id="rollid" tabIndex="1" name="rollid"
                                                  value={currencyratedetails.rollid} 
                                                 onChange={this.changeuserrole}
                                                  placeholder="Select User Role"
                                                    options={constants.roles} />
                                                </Col>
                                            </Row>
                        <Row>
                                <Col xs={11} sm={11} md={11} lg={11} xl={11} >
                                    <div className="currencygrid" style={{ marginTop: '1%' }}>
                                        <ReactDataGrid
                                            ref="grid"
                                            enableCellSelect={true}
                                            columns={this.col}
                                            rowGetter={this.rowGetter}
                                            rowsCount={currencyratedetails.studentdata.length}
                                            onCellClick={this.onCellClick} rowHeight={45}
                                            minHeight={600} />
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </div>
            </form>
        )
    }
}
StudentList_Form.propTypes =
    {
        currencyratedetails: PropTypes.shape
            (
            {
                rollid: PropTypes.string,
                studentdata: PropTypes.object
            }
            )
    }
export default asForm(StudentList_Form, "currencyratedetails")