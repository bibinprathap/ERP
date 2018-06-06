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
class RPT_TB_DT_Form extends Component 
{
    constructor (props) {
        super(props)
        this.state ={};
        this.state.key=0;
        this.props.RPT_TBOptions.filtertype="N";
        this.props.RPT_TBOptions.custsupno="N";
    }

    getOptions= (input) => {
        return fetch(constants.SERVICEURL + `/combo/getTBOptions/`, {
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

    getOptions1= (input) => {
            return fetch(constants.SERVICEURL + `/combo/getTBOptions1/`, {
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
         const {RPT_TBOptions, viewReport, printReport, resetOptions, reportTitle,updateProperty} = this.props;
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
                                <Col xs={1} sm={1} md={1} lg={1} xl={1} style={{padding: 5+'px ' + 0+'px ' + 0+'px ' + 15+'px'}}>
                                    Type
                                </Col>
                                <Col xs={2} sm={2} md={2} lg={2} xl={2} style={{padding: 5+'px ' + 0+'px ' + 0+'px ' + 0+'px'}}>
            	                    <InputSelect id="filtertype" name="filtertype" value={RPT_TBOptions.filtertype} onChange={updateProperty} placeholder="Select Option" combotype={true}  loadOptions={this.getOptions}/>
                                </Col> 
                                <Col xs={2} sm={2} md={2} lg={2} xl={2} style={{padding: 5+'px ' + 0+'px ' + 0+'px ' + 0+'px'}}>
            	                    <InputSelect id="custsupno" name="custsupno" value={RPT_TBOptions.custsupno} onChange={updateProperty} placeholder="Select Option" combotype={true}  loadOptions={this.getOptions1}/>
                                </Col> 
                                <Col xs={1} sm={1} md={1} lg={1} xl={1} style={{padding: 5+'px ' + 0+'px ' + 0+'px ' + 15+'px'}}>
                                    As on Date
                                </Col>
                                <Col xs={2} sm={2} md={2} lg={2} xl={2} style={{padding: 5+'px ' + 0+'px ' + 0+'px ' + 0+'px'}}>
            	                    <InputDate onChange={updateProperty} value={RPT_TBOptions.todate} id="todate" name="todate" />
                                </Col> 
                                <Col xs={1} sm={1} md={1} lg={1} xl={1} style={{padding: 5+'px ' + 0+'px ' + 0+'px ' + 15+'px'}}>
                                    Branch
                                </Col>
                                <Col xs={2} sm={2} md={2} lg={2} xl={2} style={{padding: 5+'px ' + 0+'px ' + 0+'px ' + 0+'px'}}>
            	                    <InputSelect id="branch" name="branch" value={RPT_TBOptions.branch} onChange={updateProperty} placeholder="Select Branches"   combotype={true}  loadOptions={this.getBranches}/>
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
RPT_TB_DT_Form.propTypes = 
    {
        RPT_TBOptions: PropTypes.shape
        (
            {
                fromDate:  PropTypes.date,
                toDate:  PropTypes.date,
                filtertype: PropTypes.string,
                custsupno: PropTypes.string,
                filtervalue: PropTypes.string,
                branch: PropTypes.string
            }
        )
    }
export default asForm(RPT_TB_DT_Form,"RPT_TBOptions")