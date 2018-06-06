import React, {Component, PropTypes} from 'react';
import {observer} from 'mobx-react';
import {observable, extendObservable} from 'mobx';
import {InputField, asForm, InputDate, InputSelect} from '../../utils';
import Collapse, { Panel } from 'rc-collapse';
import ReactDataGrid from 'react-data-grid';
import { Button,  Grid, Row, Col, Tabs, Tab, Glyphicon} from 'react-bootstrap';
import * as constants from '../../constants.js';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import moment  from "moment";
@observer
class RPT_DailyOp_Form extends Component 
{
    constructor (props) {
        super(props)
        this.state ={};
        this.state.key=0;
        this.handleGL =   this.handleGL.bind(this);

    }
    handleGL()
    {
        window.popup2 = Popup.show(document.getElementById('smallsearchpopup'), Screen.getBody(), 'top right', { 'constrainToScreen': true, autoHide: false, width: 892, height: 477, style: { 'border': '3px solid black', 'backgroundColor': '#0088ce', 'z-index': '9999' } });
        var yyyymmdd =  moment(this.props.RPT_DailyOpOptions.fromdate).format("YYYYMMDD") ;
        var branch = JSON.parse(window.sessionStorage["userInfo"]).branch;
        if(branch)
            constants.ERP_BRANCH = branch;
        var loadrequest = {parem1:yyyymmdd,parem2:constants.ERP_BRANCH, company: constants.COMPANY }
         window.openModal(); $.ajax({
             url: constants.SERVICEURL +'/dailyoprpt/getcashcounter',
            type: 'POST',
            dataType: 'json',
            data: loadrequest,
            success: function (respoce, textStatus, xhr) {  window.closeModal();
                var grid;
                var newdata = respoce;
                var data = [];
                var balance = 0;
                var   totalrow =   {id: 5002  ,docdate:'',TNO:'',DOCNO:'',br:'',ref:'',narration:'',debit:0,credit:0,balance:'',dc:'',USERNAME:''};
                newdata.forEach(function(row,index){
                    balance = balance + parseFloat(row.amt);
                    row.balance =  balance;
                    data.push(row);
                    if(row.debit)
                        totalrow.debit = (parseFloat(totalrow.debit)+parseFloat(row.debit));
                    if(row.credit)
                        totalrow.credit = (parseFloat(totalrow.credit)+parseFloat(row.credit));
                });
                totalrow.balance =balance;
                data.push(totalrow);
                var dataView;
                var columns = [
                     { id: "id", name: "SNO", field: "id", width: 20, cssClass: "cell-title" },
                  { id: "docdate", name: "Date", field: "docdate", width: 100, cssClass: "cell-title" },
                  { id: "TNO", name: "TRN", field: "TNO", width: 70 },
                  { id: "DOCNO", name: "DOC No", field: "DOCNO", width: 50 },
                  { id: "br", name: "BR", field: "br", width: 20 },
                  { id: "ref", name: "REFERENCE", field: "ref", minWidth: 20 },
                  { id: "narration", name: "NARRATION", field: "narration", minWidth: 100 },
                  { id: "debit", name: "DEBIT", field: "debit", minWidth: 30 },
                  { id: "credit", name: "CREDIT", field: "credit", minWidth: 30 },
                  { id: "balance", name: "BALANCE", field: "balance", minWidth: 30},
                  { id: "dc", name: "D/C", field: "dc", minWidth: 10 },
                  { id: "USERNAME", name: "USER", field: "USERNAME", minWidth: 50 }
                ];
                window.columnFilters = {};
                function filter(item) {
                    if(!window.columnFilters)
                         window.columnFilters = {};
                    for (var columnId in window.columnFilters) {
                        if (columnId !== undefined && window.columnFilters[columnId] !== "") {
                            var c = window.grid.getColumns()[window.grid.getColumnIndex(columnId)];
                            if (!(item[c.field] && ("" + item[c.field]).indexOf(window.columnFilters[columnId]) !== -1)) {
                                return false;
                            }
                        }
                    }
                    return true;
                }

                var options = {
                    autoEdit: false,
                   enableCellNavigation: false,forceFitColumns: true,
                    showHeaderRow: true,
                    headerRowHeight: 24,
                    explicitInitialization: true
                };
                function openDetails() {

                }
                dataView = new Slick.Data.DataView();
                grid = new Slick.Grid("#myGrid", dataView, columns, options);
                dataView.onRowCountChanged.subscribe(function (e, args) {
                    grid.updateRowCount();
                    grid.render();
                });
                dataView.onRowsChanged.subscribe(function (e, args) {
                    grid.invalidateRows(args.rows);
                    grid.render();
                });
                $(grid.getHeaderRow()).delegate(":input", "change keyup", function (e) {
                    var columnId = $(this).data("columnId");
                    if (columnId != null) {
                        columnFilters[columnId] = $.trim($(this).val());
                        dataView.refresh();
                    }
                });
                grid.onHeaderRowCellRendered.subscribe(function (e, args) {
                    $(args.node).empty();
                    $("<input type='text'>")
                       .data("columnId", args.column.id)
                       .val(columnFilters[args.column.id])
                       .appendTo(args.node);
                });

                grid.init();
                window.grid = grid;
                dataView.beginUpdate();
                dataView.setItems(data);
                dataView.setFilter(filter);
                dataView.endUpdate();

                var h = 0;

            
            },
            error: function (xhr, textStatus, errorThrown) { window.closeModal();
                console.log('Error in Operation');
            }
        });
    }

    render () {
            const {RPT_DailyOpOptions, viewReport, printReport, resetOptions, reportTitle,updateProperty} = this.props;        
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
                                <Col xs={1} sm={1} md={1} lg={1} xl={1}>
                                    Date
                                </Col>
                                <Col xs={3} sm={3} md={3} lg={3} xl={3}>
            	                    <InputDate onChange={updateProperty} value={RPT_DailyOpOptions.fromdate  } id="fromdate" name="fromdate" />
                                </Col>  
                                <Col xs={1} sm={1} md={1} lg={1} xl={1}>
                                     <Button  onClick={this.handleGL}  bsStyle="primary"><Glyphicon glyph="new-window"/>CASH</Button>
                                </Col>
                                <Col xs={3} sm={3} md={3} lg={3} xl={3}>
            	                    <InputField id="cashamount" name="cashamount"  disabled={true}  value={RPT_DailyOpOptions.cashamount} onChange={updateProperty} placeholder="Cash"/>
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
                                RPT_DailyOp_Form.propTypes = 
                                {
                                    RPT_DailyOpOptions: PropTypes.shape
                                    (
                                        {
                                            fromDate:  PropTypes.date,
                                            toDate:  PropTypes.date,
                                            branch: PropTypes.string,
                                            salesman: PropTypes.string,
                                            filtertype: PropTypes.string,
                                            filtervalue: PropTypes.string
                                        }
                                    )
                                }
export default asForm(RPT_DailyOp_Form,"RPT_DailyOpOptions")