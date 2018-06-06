<reference path="StockTransfer_Form.js" />
import StockTransferItem_SubForm from "./StockTransferItem_SubForm.js";
import React, { Component, PropTypes } from 'react';
import { observer } from 'mobx-react';
import { observable, extendObservable } from 'mobx';
import { InputField, asForm, InputDate, InputSelect } from '../../utils';
import Collapse, { Panel } from 'rc-collapse';
import ReactDataGrid from 'react-data-grid';
import { Button, Grid, Row, Col, Tabs, Tab, Glyphicon, Label } from 'react-bootstrap';
import * as rbstrap from 'react-bootstrap';
import StockTransferItem_Store from '../../store/sales/StockTransferItem_Store';
import * as constants from '../../constants.js';
import { NotificationContainer, NotificationManager } from 'react-notifications';
//import * as Modal from  'react-bootstrap-modal'
import StockTransfer_Store from '../../store/sales/StockTransfer_Store';
import moment from "moment";
@observer
class StockTransfer_Form extends Component {
    constructor(props) {
        super(props)
        let SalesItem = observable(Object.assign({}, StockTransferItem_Store))
        this.SalesItem = SalesItem
        extendObservable(this.SalesItem, StockTransferItem_Store);
        this.SalesItem.slno = 1;
        this.state = {};
        this.state.key = 0;
        this.state.newenabled = true;
        this.rowGetter = this.rowGetter.bind(this);
        this.state.openenabled = true;
        this.state.saveenabled = false;
        this.state.canceledenabled = false;
        this.handleOpen = this.handleOpen.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleEditOpen = this.handleEditOpen.bind(this);
        this.handleNew();
        this.handleNew = this.handleNew.bind(this);
        this.handlelist = this.handlelist.bind(this);
        this.StockTransferDetails = observable(StockTransfer_Store);
        this.changeuserrole = this.changeuserrole.bind(this);
        this.getRequestor = this.getRequestor.bind(this);
        this.getBranches = this.getBranches.bind(this);
        
          this.columns = [
            {
                key: 'SRNO',
                name: 'SRNO'
            },
            {
                key: 'ItemCode',
                name: 'Item Code',
                width: 140
            },
            {
                key: 'Brand',
                name: 'Brand'
            },
            {
                key: 'Origin',
                name: 'Origin'
            },
            {
                key: 'ItemDescription',
                name: 'Item Description',
                width: 200
            },
            {
                key: 'Qty',
                name: 'Qty'
            },

             {
                key: 'StockBR2',
                name: 'Stock BR2'
            },
            {
                key: 'AVGCOST',
                name: 'AVG COST',
                width: 200
            },
            {
                key: 'Total',
                name: 'Total'
            }
           
        ];
    }
    rowGetter(i) {
        return this.props.StockTransferDetails.ItemDetails2[i]
    }

    handleOpen() {
     
        
    }
    handleEditOpen() {
        
    }
    handleNew() {
        this.props.StockTransferDetails.rollid= constants.USERROLID;
      this.props.StockTransferDetails.ID= '',
     this.props.StockTransferDetails.firstName= '',
     this.props.StockTransferDetails.lastName= '',
     this.props.StockTransferDetails.dateOfBirth= new Date(),
     this.props.StockTransferDetails.nationality= {},
     this.props.StockTransferDetails.familyMembers= []
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

     
    getRequestor = (input) => {
        return fetch(constants.SERVICEURL + `/combo/salesmen/`+ constants.COMPANY, {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            } 
        })
            .then((response) => {
                return response.json() ;
            }).then((json) => {
                return { options: json };
            }); 
           }   
    
           getBranches= (input) => {
            return fetch(constants.SERVICEURL + `/combo/getBranch/`+ constants.COMPANY, {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json'
                } 
            })
                .then((response) => {
                    return response.json() ;
                }).then((json) => {
                    return { options: json };
                });        
        }
    render() {
        const {StockTransferDetails, submitForm, updateProperty} = this.props;
        return (
                <form >
                    <div className="container-fluid">
                        <div className="panel panel-primary" >
                    
                            <div className="panel-heading panel-headingerp" style={{ padding: 3 + 'px' }}>
                                <table class='table borderless'>
                                    <tbody>
                                        <tr>
                                            <td style={{ width: 100 + '%' }}>
                                                <h3 className="panel-title">Stock Transfer</h3>
                                            </td>
                                            
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
                            <div className="panel-body panel-bodyerp" style={{ padding: 5 + 'px ' + 15 + 'px ' + 2 + 'px ' + 15 + 'px' }}>
                                <Row>
                                    <Col xs={4} sm={4} md={4} lg={4} xl={4}>
                                        <rbstrap.Panel style={{minHeight:'175'}}>
                                            <Row>
                                                <Col xs={4} sm={4} md={4} lg={4} xl={4} style={{ padding:  '5'}}>
                                                  Invoice No/Date:
                                                </Col>
                                                <Col xs={8} sm={8} md={8} lg={8} xl={8} style={{ padding:  '5'}}>
                                                    <Button onClick={this.handlelist} bsStyle="primary"><Glyphicon glyph="new-window" />&nbsp;View</Button>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col xs={4} sm={4} md={4} lg={4} xl={4} style={{ padding:  '5'}}>
                                                         NO:
                                                </Col>
                                                <Col xs={8} sm={8} md={8} lg={8} xl={8} style={{ padding:  '5'}} >
                                                
                                               
                                                <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-3" style={{ padding:  '0',margin:  '0'}}>
                                                   <InputField id="lastName" name="lastName" value={StockTransferDetails.lastName} 
                                                   onChange={updateProperty} placeholder="" />   
                                            
                                                </div>
                                                <div className="col-xs-5 col-sm-5 col-md-5 col-lg-5 col-xl-5" style={{ paddingLeft:'1',paddingRight:'0',paddingTop:'0',paddingBottom:'0',margin:  '0'}}>
                                                <InputField id="lastName" name="lastName" value={StockTransferDetails.lastName}
                                                 onChange={updateProperty} placeholder="" />
                                                </div>
          
                                                
                                                   
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col xs={4} sm={4} md={4} lg={4} xl={4} style={{ padding:  '5'}}>
                                                    Date:
                                                </Col>
                                                <Col xs={8} sm={8} md={8} lg={8} xl={8} style={{ padding:  '5'}}>
                                                    <InputDate onChange={updateProperty} disabled={this.props.isedit && constants.USERROLID =="1"  } value={StockTransferDetails.dateOfBirth} id="dateOfBirth" name="dateOfBirth" />
                                                </Col>
                                            </Row>

                                            <Row>
                                                <Col xs={4} sm={4} md={4} lg={4} xl={4} style={{ padding:  '5'}} >
                                                    Enter:
                                                </Col>
                                                <Col xs={8} sm={8} md={8} lg={8} xl={8} style={{ padding:  '5'}}>
                                                    <InputDate onChange={updateProperty} disabled={this.props.isedit && constants.USERROLID =="1"  } value={StockTransferDetails.dateOfBirth} id="dateOfBirth" name="dateOfBirth" />
                                                </Col>
                                            </Row>
                                          
                                        </rbstrap.Panel>
                                    </Col>
                                    <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                                        <rbstrap.Panel  style={{minHeight:'175'}}>
                                            
                                            <Row>
                                                <Col xs={3} sm={3} md={3} lg={3} xl={3} style={{ padding:  '5' }}>
                                                    From Location/Branch:
                                                </Col>
                                                <Col xs={9} sm={9} md={9} lg={9} xl={9} style={{ padding:  '5' }}>
                                                    
                                                 <InputSelect id="Fromlocation" tabIndex="1" name="location" disabled={this.props.isedit && constants.USERROLID =="1"  } value={StockTransferDetails.nationality} onChange={updateProperty}
                                                  placeholder="Select Location"
                                                    combotype={true}  
                                                    loadOptions={this.getBranches} />
                                                </Col>
                                            
                                            </Row>

                                             <Row>
                                                <Col xs={3} sm={3} md={3} lg={3} xl={3} style={{ padding:  '5' }}>
                                                   To Location/Branch:
                                                </Col>
                                                <Col  xs={9} sm={9} md={9} lg={9} xl={9}  style={{ padding:  '5' }}>
                                                 <InputSelect id="Tolocation" tabIndex="1" name="location" disabled={this.props.isedit && constants.USERROLID =="1"  } value={StockTransferDetails.nationality} onChange={updateProperty}
                                                  placeholder="Select Location" 
                                                    combotype={true}  loadOptions={this.getBranches} />
                                                </Col>
                                            
                                            </Row>

                                             <Row>
                                                <Col xs={3} sm={3} md={3} lg={3} xl={3} style={{ padding:  '5' }}>
                                                    Requested By:
                                                </Col>
                                                <Col  xs={9} sm={9} md={9} lg={9} xl={9}  style={{ padding:  '5' }}>
                                                    
                                                 <InputSelect id="Requestor" tabIndex="1" name="Requestor" disabled={this.props.isedit && constants.USERROLID =="1"  } value={StockTransferDetails.nationality} onChange={updateProperty}
                                                  placeholder="Select Requestor" 
                                                    combotype={true}  loadOptions={this.getRequestor} />
                                                </Col>
                                            
                                            </Row>
                                        </rbstrap.Panel>
                                    </Col>
                                </Row>
                                <Row>
                                    {/*<Collapse accordion={true} defaultActiveKey="1">
                                        <Panel header="Details" key="1">*/}
                                            <div className="panel-heading panel-headingerp" style={{ padding: 5 + 'px' }}>
                                            <StockTransferItem_SubForm isedit={this.props.isedit}  StockTransferItems={StockTransferDetails.familyMembers} StockTransferItemParent={StockTransferDetails} SalesItem={this.SalesItem} SubHead="" />
                                            </div>
                                      {/*  </Panel>

                                    </Collapse>*/}
                                </Row>

                                <Row>
                                    {/*top right bottom left*/}
                                    <div className="panel-body panel-bodyerp" style={{ padding: 10 + 'px ' + 35 + 'px ' + 20 + 'px ' + 35 + 'px' }}>
                                     
                                      
                                        <Row>
                                            <ReactDataGrid
                                                enableCellSelect={true}
                                                columns={this.columns}
                                                rowGetter={this.rowGetter}
                                                rowsCount={StockTransferDetails.ItemDetails2.length}
                                                rowHeight={20}
                                                minHeight={100}
                                                minColumnWidth={50}

                                            />
                                        </Row>
                                    </div>
                                </Row>
                                
                            </div>
                        </div>
                    </div>
                </form>
        )
    }
}

StockTransfer_Form.propTypes =
    {
        StockTransferDetails: PropTypes.shape
            (
            {
                
            }
            )
    }
export default asForm(StockTransfer_Form, "StockTransferDetails")