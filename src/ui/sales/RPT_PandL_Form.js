import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import {observer} from 'mobx-react';
import {observable, extendObservable} from 'mobx';
import {InputField, asForm, InputDate, InputSelect, InputCheckbox} from '../../utils';
import Collapse, { Panel } from 'rc-collapse';
import ReactDataGrid from 'react-data-grid';
import { Button,  Grid, Row, Col, Tabs, Tab, Glyphicon} from 'react-bootstrap';
import * as constants from '../../constants.js';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import moment  from "moment";
@observer
class RPT_PandL_Form extends Component 
{
    constructor (props) {
        super(props)
        this.state ={};
        this.state.key=0;
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
         const {RPT_PandLOptions, viewReport, printReport,printReportPlain, resetOptions, reportTitle,updateProperty} = this.props;
        return(
            <form onSubmit={viewReport}   style={{padding:0 + 'px',margin: 0 + 'px'}}>
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
                                        <Button onClick={printReportPlain} bsStyle="primary"><Glyphicon glyph="print"/>&nbsp;Print Plain</Button>
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
                                <Col xs={2} sm={2} md={2} lg={2} xl={2} style={{padding: 0+'px ' + 0+'px ' + 0+'px ' + 15+'px'}}>
                                    <InputCheckbox id="truefalse" name="truefalse" labeltext="Upto 'TO DATE'" value={RPT_PandLOptions.truefalse} onChange={updateProperty} />
                                </Col>
                                <Col xs={1} sm={1} md={1} lg={1} xl={1} style={{padding: 0+'px ' + 0+'px ' + 0+'px ' + 15+'px'}}>
                                    From Date
                                </Col>
                                <Col xs={2} sm={2} md={2} lg={2} xl={2} style={{padding: 0+'px ' + 0+'px ' + 0+'px ' + 0+'px'}}>
            	                    <InputDate onChange={updateProperty} value={RPT_PandLOptions.fromdate} id="fromdate" name="fromdate" />
                                </Col>  
                                <Col xs={1} sm={1} md={1} lg={1} xl={1} style={{padding: 5+'px ' + 0+'px ' + 0+'px ' + 15+'px'}}>
                                    To Date
                                </Col>
                                <Col xs={2} sm={2} md={2} lg={2} xl={2} style={{padding: 5+'px ' + 0+'px ' + 0+'px ' + 0+'px'}}>
            	                    <InputDate onChange={updateProperty} value={RPT_PandLOptions.todate} id="todate" name="todate" />
                                </Col> 
                                <Col xs={1} sm={1} md={1} lg={1} xl={1} style={{padding: 5+'px ' + 0+'px ' + 0+'px ' + 15+'px'}}>
                                    Branch
                                </Col>
                                <Col xs={2} sm={2} md={2} lg={2} xl={2} style={{padding: 5+'px ' + 0+'px ' + 0+'px ' + 0+'px'}}>
            	                    <InputSelect id="branch" name="branch" value={RPT_PandLOptions.branch} onChange={updateProperty} placeholder="Select Branches"   combotype={true}  loadOptions={this.getBranches}/>
                                </Col> 
                            </Row>
                             <Row>
                                <Col xs={12} sm={12} id="soaGrid"  style={{height: 650+'px '}}  md={12} lg={12} xl={12}>
                                </Col>
                            </Row> 
                </div>
            </div>
        </div>
    </form>
)
}
}
RPT_PandL_Form.propTypes = 
    {
        RPT_PandLOptions: PropTypes.shape
        (
            {
                fromDate:  PropTypes.date,
                toDate:  PropTypes.date,
                truefalse: PropTypes.boolean,
                branch: PropTypes.string,
                acno: PropTypes.string 
            }
        )
    }
export default asForm(RPT_PandL_Form,"RPT_PandLOptions")