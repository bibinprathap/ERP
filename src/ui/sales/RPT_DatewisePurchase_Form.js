import React, {Component, PropTypes} from 'react';
import {observer} from 'mobx-react';
import {observable, extendObservable} from 'mobx';
import {InputField, asForm, InputDate, InputSelect} from '../../utils';
import Collapse, { Panel } from 'rc-collapse';
import ReactDataGrid from 'react-data-grid';
import { Button,  Grid, Row, Col, Tabs, Tab, Glyphicon} from 'react-bootstrap';
import * as constants from '../../constants.js';
import {NotificationContainer, NotificationManager} from 'react-notifications';

@observer
class RPT_DatewisePurchase_Form extends Component 
{
    constructor (props) {
        super(props)
        this.state ={};
        this.state.key=0;
    }
    handleOpen()
    {
        window.SalesQuotpopupshow();
    }
   
   
    getBrands = (input) => {
        return fetch(constants.SERVICEURL + `/combo/brands_erp/`+ constants.COMPANY, {
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
        getApprovers= (input) => {
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
        
        render () {
            const {RPT_DailyOpOptions, viewReport, printReport, resetOptions, reportTitle,updateProperty} = this.props;
          
            return(
                <form onSubmit={viewReport}>
                    <div className="container-fluid">
                    <div className="panel panel-primary" >
                            <div className="panel-heading" style={{padding:3 + 'px'}}>
                            <table class='table borderless'>
                                <tbody>
                                <tr>
                                    <td style={{width:100 +'%'}}>
                                        <h3 className="panel-title">{reportTitle}</h3>
                                    </td>
                                    <td> &nbsp;</td>
                                    <td>
                                        <Button  onClick={viewReport}  bsStyle="primary"><Glyphicon glyph="search"/>&nbsp;View</Button>
                                    </td>
                                    <td> &nbsp;</td>
                                    <td>
                                        <Button onClick={printReport} bsStyle="primary"><Glyphicon glyph="print"/>&nbsp;Print</Button>
                                    </td>
                                    <td> &nbsp;</td>
                                    <td>
                                    <Button  onClick={resetOptions} bsStyle="primary"><Glyphicon glyph="erase"/>&nbsp;Reset</Button>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        <NotificationContainer/>
                        <div className="panel-body"  style={{padding: 5+'px ' + 15+'px ' + 2+'px ' + 15+'px'}}>  
                           <Row>
                                <Col xs={1} sm={1} md={1} lg={1} xl={1}>
                                    From
                                </Col>
                                <Col xs={3} sm={3} md={3} lg={3} xl={3}>
            	                    <InputDate onChange={updateProperty} value={RPT_DailyOpOptions.fromdate  } id="fromdate" name="fromdate" />
                                </Col> 
                                  <Col xs={1} sm={1} md={1} lg={1} xl={1}>
                                    Branch
                                </Col>
                                <Col xs={3} sm={3} md={3} lg={3} xl={3}>
            	                   <InputSelect id="branch" name="branch" value={RPT_DailyOpOptions.branch} onChange={updateProperty} placeholder="Select Branches"   combotype={true}  loadOptions={this.getBranches}/>
                                </Col>   
                                  <Col xs={1} sm={1} md={1} lg={1} xl={1}>
                                   Cus/Sup
                                </Col>
                                <Col xs={3} sm={3} md={3} lg={3} xl={3}>
            	                    <InputField id="custsupno" name="custsupno" value={RPT_DailyOpOptions.custsupno} onChange={updateProperty} placeholder="Cust/Sup No"/>
                                </Col>   
                            </Row>
                               <Row>
                                <Col xs={1} sm={1} md={1} lg={1} xl={1}>
                                    To
                                </Col>
                                <Col xs={3} sm={3} md={3} lg={3} xl={3}>
            	                    <InputDate onChange={updateProperty} value={RPT_DailyOpOptions.todate} id="todate" name="todate" />
                                </Col> 
                                  <Col xs={1} sm={1} md={1} lg={1} xl={1}>
                                    SALESMAN
                                </Col>
                                <Col xs={3} sm={3} md={3} lg={3} xl={3}>
                                    <InputSelect id="salesman" name="salesman" 
                                    value={RPT_DailyOpOptions.salesman} onChange={updateProperty}
                                     placeholder="Select Salesman"   combotype={true}  loadOptions={this.getApprovers}/>
                                </Col>   
                                  <Col xs={1} sm={1} md={1} lg={1} xl={1}>
                                  </Col>
                                <Col xs={3} sm={3} md={3} lg={3} xl={3}>
            	                  <InputField id="custsupname" name="custsupname" value={RPT_DailyOpOptions.custsupname} onChange={updateProperty} placeholder="Cust/Sup Name"/>
                                </Col>   
                            </Row>
                            
                             <Row>
                                <Col xs={12} sm={12} id="dailyopGrid"  style={{height: 600+'px '}}  md={12} lg={12} xl={12}>
                                      
                                </Col>
                            </Row> 
                </div>
            </div>
        </div>
    </form>
)
                            }
                            }
                                RPT_DatewisePurchase_Form.propTypes = 
                                {
                                    RPT_DailyOpOptions: PropTypes.shape
                                    (
                                        {
                                            fromdate:  PropTypes.date,
                                            todate:  PropTypes.date,
                                            branch: PropTypes.string,
                                            salesman: PropTypes.string,
                                            filtertype: PropTypes.string,
                                            filtervalue: PropTypes.string,
                                            acname: PropTypes.string
                                        }
                                    )
                                }
export default asForm(RPT_DatewisePurchase_Form,"RPT_DailyOpOptions")