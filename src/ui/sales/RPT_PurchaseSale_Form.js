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
class RPT_PurchaseSale_Form extends Component 
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

        getSupplier= (input) => {
            return fetch(constants.SERVICEURL + `/combo/supplier/`+ constants.COMPANY, {
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
            const {RPT_DailyOpOptions, viewReport, printReport,excelReport, resetOptions, reportTitle,updateProperty} = this.props;
          
            const StockOptions  =[{value:'>',label:'Greater Than'},
                            {value:'<',label:'Less Than'},
                            {value:'=',label:'Equal'}];
            const ProfitOptions  =[{value:'>',label:'Greater Than'},
                            {value:'<',label:'Less Than'},
                            {value:'=',label:'Equal'}];
            const CostOptions  =[{value:'>',label:'Greater Than'},
                            {value:'<',label:'Less Than'},
                            {value:'=',label:'Equal'}];
            const SoldOptions  =[{value:'>',label:'Greater Than'},
                            {value:'<',label:'Less Than'},
                            {value:'=',label:'Equal'}];
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
                                        <Button onClick={excelReport} bsStyle="primary"><Glyphicon glyph="print"/>&nbsp;Export Excel</Button>
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
                                    Supplier
                                </Col>
                                <Col xs={3} sm={3} md={3} lg={3} xl={3}>
                                    <InputSelect id="supplier" name="supplier" value={RPT_DailyOpOptions.supplier} onChange={updateProperty} placeholder="Select Supplier"   combotype={true}  loadOptions={this.getSupplier}/>
                                </Col> 
                                  <Col xs={1} sm={1} md={1} lg={1} xl={1}>
                                    Branch
                                </Col>
                                <Col xs={3} sm={3} md={3} lg={3} xl={3}>
            	                   <InputSelect id="branch" name="branch" value={RPT_DailyOpOptions.branch} onChange={updateProperty} placeholder="Select Branches"   combotype={true}  loadOptions={this.getBranches}/>
                                </Col>     
                            </Row>
                            <br/>
                               <Row>
                                <Col xs={1} sm={1} md={1} lg={1} xl={1}>
                                    To
                                </Col>
                                <Col xs={3} sm={3} md={3} lg={3} xl={3}>
            	                    <InputDate onChange={updateProperty} value={RPT_DailyOpOptions.todate} id="todate" name="todate" />
                                </Col> 

                                <Col xs={1} sm={1} md={1} lg={1} xl={1}>
                                    Stock
                                </Col>
                                <Col xs={3} sm={3} md={3} lg={2} xl={3}>
                                <InputSelect id="stockType" name="stockType" 
                                    value={RPT_DailyOpOptions.stockType} onChange={updateProperty}
                                     placeholder="Select Stock Type"   
                                     options={StockOptions}/>
                                </Col> 
                                <Col xs={3} sm={3} md={3} lg={1} xl={3}>
                                    <InputField id="stockQty" name="stockQty" placeholder="Qty" value={RPT_DailyOpOptions.stockQty} onChange={updateProperty}  />
                                </Col>
                                 <Col xs={1} sm={1} md={1} lg={1} xl={1}>
                                    Profit Percentage
                                </Col>
                                <Col xs={3} sm={3} md={3} lg={2} xl={3}>
                                <InputSelect id="profitType" name="profitType" 
                                    value={RPT_DailyOpOptions.profitType} onChange={updateProperty}
                                     placeholder="Select Profit Type"   
                                     options={ProfitOptions}/>
                                </Col> 
                                <Col xs={3} sm={3} md={3} lg={1} xl={3}>
                                    <InputField id="profitQty" name="profitQty" placeholder="Qty" value={RPT_DailyOpOptions.profitQty} onChange={updateProperty} />
                                </Col>
                            </Row>
                            <br/>
                            <Row>
                                <Col xs={1} sm={1} md={1} lg={1} xl={1}>
                                    Sales Cost
                                </Col>
                                <Col xs={3} sm={3} md={3} lg={2} xl={3}>
                                <InputSelect id="costType" name="costType" 
                                    value={RPT_DailyOpOptions.costType} onChange={updateProperty}
                                     placeholder="Select Cost Type"   
                                     options={CostOptions}/>
                                </Col> 
                                <Col xs={3} sm={3} md={3} lg={1} xl={3}>
                                    <InputField id="costQty" name="costQty" placeholder="Qty" value={RPT_DailyOpOptions.costQty}  onChange={updateProperty}/>
                                </Col>

                                <Col xs={1} sm={1} md={1} lg={1} xl={1}>
                                    Sold
                                </Col>
                                <Col xs={3} sm={3} md={3} lg={2} xl={3}>
                                <InputSelect id="soldType" name="soldType" 
                                    value={RPT_DailyOpOptions.soldType} onChange={updateProperty}
                                     placeholder="Select Sold Type"   
                                     options={SoldOptions}/>
                                </Col> 
                                <Col xs={3} sm={3} md={3} lg={1} xl={3}>
                                    <InputField id="soldQty" name="soldQty" placeholder="Qty" value={RPT_DailyOpOptions.soldQty}  onChange={updateProperty}/>
                                </Col>
                            </Row>
                            <br/>
                             <Row>
                                <Col xs={12} sm={12} id="dailyopGrid"  style={{height: 600+'px ',width:100+'%'}}  md={12} lg={12} xl={12}>
                                      
                                </Col>
                            </Row> 
                </div>
            </div>
        </div>
    </form>
)
                            }
                            }
                                RPT_PurchaseSale_Form.propTypes = 
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
                                            acname: PropTypes.string,
                                            supplier: PropTypes.string,
                                            stockType:PropTypes.string,
                                            stockQty:PropTypes.string,
                                            profitType:PropTypes.string,
                                            profitQty:PropTypes.string,
                                            costType:PropTypes.string,
                                            costQty:PropTypes.string,
                                            soldType:PropTypes.string,
                                            soldQty:PropTypes.string
                                        }
                                    )
                                }
export default asForm(RPT_PurchaseSale_Form,"RPT_DailyOpOptions")