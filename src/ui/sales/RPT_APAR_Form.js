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
class RPT_APAR_Form extends Component 
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
        getarapgroups = (input) => {
            return fetch(constants.SERVICEURL + `/combo/` + this.props.getarapgroupsname + `/`+ constants.COMPANY , {
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
            const {RPT_DailyOpOptions, getarapgroupsname, viewReport,printReportex, printReport, resetOptions, reportTitle,updateProperty} = this.props;
        
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
                                        <Button onClick={printReportex} bsStyle="primary"><Glyphicon glyph="print"/>&nbsp;Export Excel</Button>
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
                                    As On
                                </Col>
                                <Col xs={3} sm={3} md={3} lg={3} xl={3}>
            	                    <InputDate onChange={updateProperty} value={RPT_DailyOpOptions.fromdate} id="fromdate" name="fromdate" />
                                </Col> 
                                  <Col xs={1} sm={1} md={1} lg={1} xl={1}>
                                    Group
                                </Col>
                                <Col xs={3} sm={3} md={3} lg={3} xl={3}>
            	                   <InputSelect id="acno" name="acno" value={RPT_DailyOpOptions.acno} onChange={updateProperty} placeholder="Select Group Filter"   combotype={true}  loadOptions={this.getarapgroups}/>
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
                                RPT_APAR_Form.propTypes = 
                                {
                                    RPT_DailyOpOptions: PropTypes.shape
                                    (
                                        {
                                            fromdate:  PropTypes.date,
                                            todate:  PropTypes.date,
                                            acno:  PropTypes.string,
                                            branch: PropTypes.string,
                                            salesman: PropTypes.string,
                                            filtertype: PropTypes.string,
                                            filtervalue: PropTypes.string
                                        }
                                    )
                                }
export default asForm(RPT_APAR_Form,"RPT_DailyOpOptions")