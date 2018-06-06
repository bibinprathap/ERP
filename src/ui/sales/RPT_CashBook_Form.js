import React, {Component, PropTypes} from 'react';
import {observer} from 'mobx-react';
import {observable, extendObservable} from 'mobx';
import {InputField, asForm, InputDate, InputSelect, InputCheckbox} from '../../utils';
import Collapse, { Panel } from 'rc-collapse';
import ReactDataGrid from 'react-data-grid';
import { Button,  Grid, Row, Col, Tabs, Tab, Glyphicon} from 'react-bootstrap';
import * as constants from '../../constants.js';
import {NotificationContainer, NotificationManager} from 'react-notifications';

@observer
class RPT_CashBook_Form extends Component 
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
        
    render () {        
        const {RPT_DailyOpOptions, viewReport, printReportCS,printReportCB, resetOptions, reportTitle,updateProperty} = this.props; 
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
                                        <Button onClick={printReportCS} bsStyle="primary"><Glyphicon glyph="print"/>&nbsp;Print Cash Statement</Button>
                                    </td>
                                    <td> &nbsp;</td>
                                    <td>
                                        <Button onClick={printReportCB} bsStyle="primary"><Glyphicon glyph="print"/>&nbsp;Print Cash Book</Button>
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
                                Date
                            </Col>
                            <Col xs={3} sm={3} md={3} lg={3} xl={3}>
            	                <InputDate onChange={updateProperty} value={RPT_DailyOpOptions.fromdate} id="fromdate" name="fromdate" />
                            </Col> 
                            <Col xs={3} sm={3} md={3} lg={3} xl={3}>            	                
                                <InputCheckbox id="truefalse" name="truefalse" labeltext="Show Opening Balance" value={RPT_DailyOpOptions.truefalse} onChange={updateProperty} />
                            </Col>   
                                <Col xs={2} sm={2} md={2} lg={2} xl={2}>
                                Account No.
                            </Col>
                            <Col xs={3} sm={3} md={3} lg={3} xl={3}>
            	                <InputField id="acno" name="acno"  disabled={true} value={RPT_DailyOpOptions.acno} onChange={updateProperty} />
                            </Col>   
                        </Row>
                        <Row>
                            <Col xs={2} sm={2} md={2} lg={2} xl={2}>
                                Opening Balance
                            </Col>
                            <Col xs={2} sm={2} md={2} lg={2} xl={2}>
                                Debit
                            </Col>
                            <Col xs={2} sm={2} md={2} lg={2} xl={2}>
                                Credit
                            </Col>
                            <Col xs={2} sm={2} md={2} lg={2} xl={2}>
                                Closing Balance
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={2} sm={2} md={2} lg={2} xl={2}>
                                <InputField id="opbal" name="opbal"  disabled={true} value={RPT_DailyOpOptions.opbal} onChange={updateProperty} />
                            </Col>
                            <Col xs={2} sm={2} md={2} lg={2} xl={2}>
                                <InputField id="debit" name="debit"  disabled={true} value={RPT_DailyOpOptions.debit} onChange={updateProperty} />
                            </Col>
                            <Col xs={2} sm={2} md={2} lg={2} xl={2}>
                                <InputField id="credit" name="credit"  disabled={true} value={RPT_DailyOpOptions.credit} onChange={updateProperty} />
                            </Col>
                            <Col xs={2} sm={2} md={2} lg={2} xl={2}>
                                <InputField id="clbal" name="clbal"  disabled={true} value={RPT_DailyOpOptions.clbal} onChange={updateProperty} />
                            </Col>
                        </Row>                        

                        <Row>
                            <Collapse accordion={true} defaultActiveKey="1">
                                <Panel header="Cash Statement" key="1"> 
                                    <Col xs={12} sm={12} id="dailyopGrid" style={{height: 400+'px '}}    md={12} lg={12} xl={12}>
                                    </Col>
                                </Panel>
                            </Collapse>
                            <Collapse accordion={true} defaultActiveKey="1">
                                <Panel header="Cash Book" key="1"> 
                                    <Col xs={12} sm={12} id="cbGrid"  style={{height: 400+'px '}}  md={12} lg={12} xl={12}>                                      
                                    </Col>
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
                RPT_CashBook_Form.propTypes = 
                {
                    RPT_DailyOpOptions: PropTypes.shape
                    (
                        {
                            fromdate:  PropTypes.date,
                            todate:  PropTypes.date,
                            branch: PropTypes.string,
                            truefalse: PropTypes.boolean,
                            filtertype: PropTypes.string,
                            filtervalue: PropTypes.string
                        }
                    )
                }
export default asForm(RPT_CashBook_Form,"RPT_DailyOpOptions")