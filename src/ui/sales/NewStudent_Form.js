/// /<reference path="NewStudent_Form.js" />
import NewStudentItem_SubForm from "./NewStudentItem_SubForm.js";
import React, { Component, PropTypes } from 'react';
import { observer } from 'mobx-react';
import { observable, extendObservable } from 'mobx';
import { InputField, asForm, InputDate, InputSelect } from '../../utils';
import Collapse, { Panel } from 'rc-collapse';
import ReactDataGrid from 'react-data-grid';
import { Button, Grid, Row, Col, Tabs, Tab, Glyphicon, Label } from 'react-bootstrap';
import * as rbstrap from 'react-bootstrap';
import NewStudentItem_Store from '../../store/sales/NewStudentItem_Store';
import * as constants from '../../constants.js';
import { NotificationContainer, NotificationManager } from 'react-notifications';
//import * as Modal from  'react-bootstrap-modal'
import NewStudent_Store from '../../store/sales/NewStudent_Store';
import moment from "moment";
@observer
class NewStudent_Form extends Component {
    constructor(props) {
        super(props)
        let SalesItem = observable(Object.assign({}, NewStudentItem_Store))
        this.SalesItem = SalesItem
        extendObservable(this.SalesItem, NewStudentItem_Store);
        this.SalesItem.slno = 1;
        this.state = {};
        this.state.key = 0;
        this.state.newenabled = true;
        this.state.openenabled = true;
        this.state.saveenabled = false;
        this.state.canceledenabled = false;
        this.handleOpen = this.handleOpen.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleEditOpen = this.handleEditOpen.bind(this);
        this.handleNew();
        this.handleNew = this.handleNew.bind(this);
        this.handlelist = this.handlelist.bind(this);
        this.NewStudentDetails = observable(NewStudent_Store);
        this.getnationality = this.getnationality.bind(this);
        this.changeuserrole = this.changeuserrole.bind(this);
        this.columns = [
            {
                key: 'id',
                name: 'SI No'
            },
            {
                key: 'acno',
                name: 'A/C Code'
            },
            {
                key: 'acname',
                name: 'Account Name'
            },
            {
                key: 'debit',
                name: 'Debit'
            },
            {
                key: 'credit',
                name: 'Credit'
            }];
    }
 

    handleOpen() {
     
        
    }
    handleEditOpen() {
        
    }
    handleNew() {
        this.props.NewStudentDetails.rollid= constants.USERROLID;
      this.props.NewStudentDetails.ID= '',
     this.props.NewStudentDetails.firstName= '',
     this.props.NewStudentDetails.lastName= '',
     this.props.NewStudentDetails.dateOfBirth= new Date(),
     this.props.NewStudentDetails.nationality= {},
     this.props.NewStudentDetails.familyMembers= []
      //  $('#ref').focus();
    }
    handlelist()
    {

        window.studentlist();
    }
    changeuserrole(key, value) {
        this.props.updateProperty(key, value);
        constants.USERROLID = value;
        this.setState({rand:Math.random()});
        if( window.cashsalesiteminquiry )
        window.cashsalesiteminquiry.setState({rand:Math.random()});
    }
    handleCancel() {
  window.sudentlistdata.setState({ modalIsOpen: false });
  window.studentlist();
  window.sudentlistdata.handleNew();
        }
    getnationality = (input) => {
        return fetch(constants.SERVICEURL + `/Nationalities/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((response) => {
                return response.json();
            }).then((json) => {
                json.forEach(function(row,index){
                    row.label =row.Title;
                    row.value = row.ID;
                });
                return { options: json };
            });
           }
    render() {
        const {NewStudentDetails, submitForm, updateProperty} = this.props;
        return (
                <form >
                    <div className="container-fluid">
                        <div className="panel panel-primary" >
                        <Row>
                                                <Col xs={2} sm={2} md={2} lg={2} xl={2} style={{ fontWeight:  'bold' }}>
                                                  User Role:
                                                </Col>
                                                <Col xs={2} sm={2} md={2} lg={2} xl={2}>
                                                 <InputSelect id="rollid" tabIndex="1" name="rollid"
                                                  value={NewStudentDetails.rollid} 
                                                 onChange={this.changeuserrole}
                                                  placeholder="Select User Role"
                                                  options={constants.roles} />
                                                </Col>
                                            </Row>
                            <div className="panel-heading" style={{ padding: 3 + 'px' }}>
                                <table class='table borderless'>
                                    <tbody>
                                        <tr>
                                            <td style={{ width: 100 + '%' }}>
                                                <h3 className="panel-title">Add New Student</h3>
                                            </td>
                                            {this.props.isedit==true?null:<td>
                                                <Button onClick={this.handlelist} bsStyle="primary"><Glyphicon glyph="new-window" />&nbsp;Student List</Button>
                                            </td>}
                                            <td>
                                                <Button bsStyle="success"   onClick={submitForm}   ><Glyphicon glyph="floppy-save" />&nbsp;Save</Button>
                                            </td>
                                            <td>
                                                <Button bsStyle="danger" onClick={this.handleCancel}  ><Glyphicon glyph="remove" />&nbsp;Close</Button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <NotificationContainer />
                            <div className="panel-body" style={{ padding: 5 + 'px ' + 15 + 'px ' + 2 + 'px ' + 15 + 'px' }}>
                                <Row>
                                    <Col xs={4} sm={4} md={4} lg={4} xl={4}>
                                        <rbstrap.Panel>
                                            <Row>
                                                <Col xs={4} sm={4} md={4} lg={4} xl={4}>
                                                   First name:
                                                </Col>
                                                <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                                                    <InputField id="firstName" name="firstName" disabled={this.props.isedit && constants.USERROLID =="1"  }  value={NewStudentDetails.firstName} onChange={updateProperty} placeholder="First Name" />
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col xs={4} sm={4} md={4} lg={4} xl={4}>
                                                         Last name:
                                                </Col>
                                                <Col xs={8} sm={8} md={8} lg={8} xl={8}>

                                                            <InputField id="lastName" name="lastName" disabled={this.props.isedit && constants.USERROLID =="1"  } value={NewStudentDetails.lastName} onChange={updateProperty} placeholder="Last Name" />
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col xs={4} sm={4} md={4} lg={4} xl={4}>
                                                    Date Of Birth:
                                                </Col>
                                                <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                                                    <InputDate onChange={updateProperty} disabled={this.props.isedit && constants.USERROLID =="1"  } value={NewStudentDetails.dateOfBirth} id="dateOfBirth" name="dateOfBirth" />
                                                </Col>
                                            </Row>
                                          
                                        </rbstrap.Panel>
                                    </Col>
                                    <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                                        <rbstrap.Panel>
                                            
                                            <Row>
                                                <Col xs={3} sm={3} md={3} lg={3} xl={3}>
                                                    Nationality:
                                                </Col>
                                                <Col xs={3} sm={3} md={3} lg={3} xl={3}>
                                                    
                                                 <InputSelect id="nationality" tabIndex="1" name="nationality" disabled={this.props.isedit && constants.USERROLID =="1"  } value={NewStudentDetails.nationality} onChange={updateProperty}
                                                  placeholder="Select Nationality"
                                                    asyncOptions={this.getnationality} />
                                                </Col>
                                            
                                            </Row>
                                        </rbstrap.Panel>
                                    </Col>
                                </Row>
                                <Row>
                                    <Collapse accordion={true} defaultActiveKey="1">
                                        <Panel header="Family Information" key="1">
                                            <NewStudentItem_SubForm isedit={this.props.isedit}  NewStudentItems={NewStudentDetails.familyMembers} NewStudentItemParent={NewStudentDetails} SalesItem={this.SalesItem} SubHead="" />
                                        </Panel>
                                    </Collapse>
                                </Row>

                                
                                
                            </div>
                        </div>
                    </div>
                </form>
        )
    }
}

NewStudent_Form.propTypes =
    {
        NewStudentDetails: PropTypes.shape
            (
            {
                
            }
            )
    }
export default asForm(NewStudent_Form, "NewStudentDetails")