/// <reference path="ChequeDeposit_Form.js" />
import React, {Component, PropTypes} from 'react';
import {observer} from 'mobx-react';
import {observable, extendObservable} from 'mobx';
import {InputField, asForm, InputDate, InputSelect,InputCheckbox} from '../../utils';
import Collapse, { Panel } from 'rc-collapse';
import ReactDataGrid from 'react-data-grid';
import { Button,  Grid, Row, Col, Tabs, Tab, Glyphicon, Label} from 'react-bootstrap';
import * as rbstrap from 'react-bootstrap';
import * as constants from '../../constants.js';
import {NotificationContainer, NotificationManager} from 'react-notifications';
//import * as Modal from  'react-bootstrap-modal'
import ChequeDeposit_Store from '../../store/sales/ChequeDeposit_Store';
import moment  from "moment";

@observer
class RPT_PDC_Form extends Component 
{
    constructor (props) {
        super(props)
        
        this.state = { CheckPendingList: [], rows: '', selectedIndexes: [] };
        this.state.key=0;
        this.handleOpen =   this.handleOpen.bind(this);
        this.handlePrint =   this.handlePrint.bind(this);
        this.handleNew();
         window.ctrlkeysubmitForm = this.props.submitForm;
        window.ctrlkeyprintForm = this.handlePrint;
        window.ctrlkeyopenForm = this.handleOpen;
        window.ctrlkeynewForm = this.handleNew;
        this.handleNew =   this.handleNew.bind(this);
        this.getCustomerDetails = this.getCustomerDetails.bind(this);
        this.getusers = this.getusers.bind(this);
        this.calculatetotalcash = this.calculatetotalcash.bind(this);
        this.calculatetotalcs = this.calculatetotalcs.bind(this);
        this.onCellClick = this.onCellClick.bind(this);
        this.chequedepositDetails = observable(ChequeDeposit_Store);
        window.chequedepositDetails =  this.chequedepositDetails;
        this.rowGetter = this.rowGetter.bind(this);
        this.rowGettercheck = this.rowGettercheck.bind(this);
        this.getaccount = this.getaccount.bind(this);
        this.onRowsSelected = this.onRowsSelected.bind(this);
        this.onRowsDeselected = this.onRowsDeselected.bind(this);
        this.setfootertotal = this.setfootertotal.bind(this);

        this.col = [
            {
                key: 'ref',
                name: 'Bank Name',
                resizable: true
            },
            {
                key: 'fdt',
                name: 'Cheque Amount',
                resizable: true
            },
            {
                key: 'ref1',
                name: 'Cheque No',
                resizable: true
            },
            {
                key: 'amount',
                name: 'PV. No',
                resizable: true
            },
            {
                key: 'vicno',
                name: 'PV. Date', 
                resizable: true
            },
            {
                key: 'ACNAME',
                name: 'Narration', 
                resizable: true
            }
        ];

        this.columns = [
            {
                key: 'ref',
                name: 'SR#',
                resizable: true
            },
            {
                key: 'fdt',
                name: 'Bank Name',
                resizable: true
            },
            {
                key: 'ref1',
                name: 'Amount',
                resizable: true
            },
            {
                key: 'amount',
                name: 'Cheque No',
                resizable: true
            },
            {
                key: 'vicno',
                name: 'Chq-Date', 
                resizable: true
            },
            {
                key: 'ACNAME',
                name: 'Payment No', 
                resizable: true
            },    
            {
                key: 'narration',
                name: 'PV Date', 
                resizable: true
            },    
            {
                key: 'narration',
                name: 'Narration', 
                resizable: true
            },
            {
                key: 'narration',
                name: 'Paid To', 
                resizable: true
            }];
    }
 setfootertotal() {
        this.props.chequedepositDetails.amount  =0;
        this.props.chequedepositDetails.ItemDetails.forEach(function(row,index){
            this.props.chequedepositDetails.amount  =   this.props.chequedepositDetails.amount +parseFloat(row.amount) ;
        }.bind(this));
    }
    rowGetter(i){
      return this.chequedepositDetails.ItemDetails[i]
    }
    rowGettercheck(i){
        //  return this.chequedepositDetails.ItemDetails1[i]
            return this.state.CheckPendingList[i]
      }
    
    onRowsSelected = (rows) => {
        this.setState({ selectedIndexes: this.state.selectedIndexes.concat(rows.map(r => r.rowIdx)) });
       setTimeout(function() {
        this.props.chequedepositDetails.ItemDetails=[];
          this.state.selectedIndexes.forEach(function(row,index) {
            this.props.chequedepositDetails.ItemDetails.push(this.state.CheckPendingList[row]);
           
        }.bind(this)); 
        this.setfootertotal();
       }.bind(this), 100);
    };

    onRowsDeselected = (rows) => {
        let rowIndexes = rows.map(r => r.rowIdx);
        this.setState({ selectedIndexes: this.state.selectedIndexes.filter(i => rowIndexes.indexOf(i) === -1) });
        setTimeout(function() {
            this.props.chequedepositDetails.ItemDetails=[];
              this.state.selectedIndexes.forEach(function(row,index) {
                this.props.chequedepositDetails.ItemDetails.push(this.state.CheckPendingList[row]);
               
            }.bind(this)); 
            this.setfootertotal();
          }.bind(this), 100);
    };

 
    calculatetotalcash()
    {
        this.chequedepositDetails.amount =  this.chequedepositDetails.gross -   this.chequedepositDetails.disc;
        this.chequedepositDetails.cash   =    parseFloat(this.chequedepositDetails.amount)   - parseFloat(this.chequedepositDetails.chq)- parseFloat(this.chequedepositDetails.cc)- parseFloat(this.chequedepositDetails.adv); 
        this.chequedepositDetails.bal  =0;
    }

    calculatetotalcs()
    {
        this.chequedepositDetails.amount =  this.chequedepositDetails.gross -   this.chequedepositDetails.disc;
        this.chequedepositDetails.bal  =    parseFloat(this.chequedepositDetails.amount)  - parseFloat(this.chequedepositDetails.cash)  - parseFloat(this.chequedepositDetails.chq)- parseFloat(this.chequedepositDetails.cc)- parseFloat(this.chequedepositDetails.adv); 
    }

    handleOpen()
    {
        window.Bankpaymentpopupshow();
    }
    handleNew()
    {
        var url = constants.SERVICEURL +'/payment/getnewbankdepositrefno';
        var loadrequest = {parem1:constants.ERP_BRANCH,company: constants.COMPANY}
        window.openModal(); $.ajax({
            type: "POST",
            url: url,
            async: true,
            cache: false,
            dataType: "json",
            data: loadrequest,
            success: function (result) { window.closeModal();
                NotificationManager.remove({ id: 1 });
                NotificationManager.create({
                    id: 1,
                    type: "success",
                    message: 'Cheque Deposit Initialised',
                    title: 'Success message',
                    timeOut: 0
                });
                setTimeout(function () {
                    NotificationManager.remove({ id: 1 });
                }, 2000);
                this.chequedepositDetails.docdate = new Date(),
                this.chequedepositDetails.br = constants.ERP_BRANCH,
                this.chequedepositDetails.docno = result.newdocno,
                this.chequedepositDetails.fcind = 'AED';
                this.chequedepositDetails.fcrate = '1';
                this.chequedepositDetails.jobno = '';
                this.chequedepositDetails.narration = '';
                this.chequedepositDetails.vicno = '',
                this.chequedepositDetails.gross = 0,
                this.chequedepositDetails.disc = 0,
                this.chequedepositDetails.amount = 0,
                this.chequedepositDetails.trntype = constants.TRNTYPE_BANKDEPOSIT + constants.ERP_BRANCH,
                this.chequedepositDetails.trn = constants.TRN_BANKDEPOSIT,
                this.chequedepositDetails.trnid = constants.TRNID_BANKDEPOSIT,
                this.chequedepositDetails.src = constants.SRC_BANKDEPOSIT + constants.ERP_BRANCH,
                this.chequedepositDetails.acno = result.acno,
                this.chequedepositDetails.acname = 'CHEQUE IN HAND',
                this.chequedepositDetails.accode = '',
                this.chequedepositDetails.yyyymmdd = moment(this.chequedepositDetails.docdate).format("YYYYMMDD"),
                this.chequedepositDetails.ref = '',
                this.chequedepositDetails.ref1 = '',
                this.chequedepositDetails.svicno = '',
                this.chequedepositDetails.cash = 0,
                this.chequedepositDetails.cc = 0,
                this.chequedepositDetails.chq = 0,
                this.chequedepositDetails.bal = 0,
                this.chequedepositDetails.post = 2,
                this.chequedepositDetails.iseditmode = false,
                this.chequedepositDetails.vehclno = '',
                this.chequedepositDetails.ItemDetails = [],
                this.chequedepositDetails.ItemDetails1 = [],
                this.chequedepositDetails.totalfob = 0
                this.chequedepositDetails.vicno = result.newrefno;
            }.bind(this),
            error: function (jqXHR, exception) {  window.closeModal();
                NotificationManager.error('Error message', 'Error While Initialising...');
            }
        });
        var url = constants.SERVICEURL +'/bankdeposit/getallchecklist';
        var loadrequest = {parem1:constants.ERP_BRANCH,company: constants.COMPANY}
        window.openModal(); $.ajax({
            type: "POST",
            url: url,
            async: true,
            cache: false,
            dataType: "json",
            data: loadrequest,
            success: function (result) {
                window.closeModal();
                NotificationManager.remove({ id: 1 });
                NotificationManager.create({
                    id: 1,
                    type: "success",
                    message: 'Bank Payment Initialised',
                    title: 'Success message',
                    timeOut: 0
                });
                setTimeout(function () {
                    NotificationManager.remove({ id: 1 });
                }, 2000);
                this.setState({CheckPendingList:result});
            }.bind(this),
            error: function (jqXHR, exception) {  window.closeModal();
                NotificationManager.error('Error message', 'Error While Initialising...');
            }
        });
    }
    
 

    getCustomerDetails(fileldname,fieldvalue,keyCode)
    {
        if(keyCode == 13 && this.chequedepositDetails.ref.length>2)
        {
            var url = constants.SERVICEURL +'/SalesQuo/getcustomerdetails';
            var chequedepositDetails = this.chequedepositDetails;
            var loadrequest = {parem1:chequedepositDetails.ref}
            chequedepositDetails.narration =  '';
            chequedepositDetails.acno = '';
            window.openModal(); $.ajax({
                url: url,
                type: 'POST',
                dataType: 'json',
                data: loadrequest,
                success: function (respoce, textStatus, xhr) {  window.closeModal();
                    var editdata = respoce;
                    chequedepositDetails.narration = editdata.ACNAME;
                    chequedepositDetails.acno = editdata.ACNO;
                    chequedepositDetails.adv = 2000;
                },
                error: function (xhr, textStatus, errorThrown) { window.closeModal();
                    console.log('Error in Operation');
                }
            });
        }
        else{
            this.chequedepositDetails.acno =this.chequedepositDetails.ref;
        }
    }
    handlePrint()
    {
        if(this.props.chequedepositDetails.refnumber=='')
        {
            NotificationManager.warning('', 'No Data Selected. \n Please select a Cash Sales Voucher to Print', 30000);
        }
        else{
            
            var RefNo='PROC|' + constants.getprocedurename('sp_PaymentHeaderTop',constants.COMPANY) + ';@RefNo|\''+ this.props.journalvoucherDetails.refnumber +'\';@Br|\'' + constants.getFieldValue(this.RPT_TBOptions.branch) + '\';@UserName|\'' + this.props.userid +  '\'' ;
            var reportURL=constants.REPORTURL + '/ReportPrint.aspx?ReportCode=' + constants.getprocedurename('BNKPV',constants.COMPANY) +  '&RefNo=' + RefNo
            window.open(reportURL,'new window', 'fullscreen=yes, scrollbars=auto, height=screen.height, left=0, top=0, width=screen.width, dependant=no, location=0, alwaysRaised=no, menubar=no, resizeable=no, scrollbars=n, toolbar=no, status=no, center=yes')        
        }
    }
    getSalesMen = (input) => {
        return fetch(constants.SERVICEURL + `/combo/salesmen/`+ constants.COMPANY, {   //Select id, idname  from PRTXACC.dbo.ACCxtab WHERE LEFT(VICNO,3)='SID' ORDER BY IDNAME
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
    getaccount = (input) => {
        return fetch(constants.SERVICEURL + `/combo/getbankref/` + constants.COMPANY, {   //Select id, idname  from PRTXACC.dbo.ACCxtab WHERE LEFT(VICNO,3)='SID' ORDER BY IDNAME
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((response) => {
                return response.json();
            }).then((json) => {
                return { options: json };
            });
    }
     getChequenumber = (input) => {
        return fetch(constants.SERVICEURL + `/combo/salesmen/`+ constants.COMPANY, {   //Select id, idname  from PRTXACC.dbo.ACCxtab WHERE LEFT(VICNO,3)='SID' ORDER BY IDNAME
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

    getusers= (input) => {
            return fetch(constants.SERVICEURL + `/combo/users`, {
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
        
    onCellClick(rowIdx, row, cellidx) {
        if (cellidx == 9)   //EDIT Button
        {
            //this.setState({ modalIsOpen: true, editpopup: true });
            // window.attendanceform.handleedit(row.DeductionID, row.CompanyId)

        }
    }

        render () {
            const {chequedepositDetails, DeliveryAddress, submitForm, updateProperty} = this.props;        
            const rowText = this.state.selectedIndexes.length === 1 ? 'Cheque' : 'Cheque(s)';
            return(
                <form >
                    <div className="container-fluid">
                        <div className="panel panel-primary" >
                            
                            <div className="panel-body"  style={{padding: 5+'px ' + 15+'px ' + 2+'px ' + 15+'px'}}>  
                                <Row>
                                    <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                                        <rbstrap.Panel>
                                           <Row>
                                                <Col xs={1} sm={1} md={1} lg={1} xl={1}>
                                                   Find
                                                </Col>
                                                <Col xs={3}  >
            	                                   <InputField id="accode" name="accode" value={chequedepositDetails.accode} onChange={updateProperty} 
                                                   placeholder="Find"/>
                                                </Col>
                                                
                                                <Col xs={1} sm={1} md={1} lg={3} xl={1}>
                                                   Total Cheque Amount
                                                </Col>
                                                <Col xs={3}  >
            	                                   <InputField id="amount" name="amount" value={chequedepositDetails.amount} 
                                                   onChange={updateProperty} placeholder="Total Cheque Amount"/>
                                                </Col>
                                           </Row>
                                        </rbstrap.Panel>
                                    </Col>
                                </Row>
                                <Row>
                                                        <Col xs={12} sm={12} md={12} lg={12} xl={12} style={{width: "98%"}} >
                                                            <ReactDataGrid
                                                                ref="grid"
                                                                enableCellSelect={true}
                                                                columns={this.col}
                                                                rowGetter={this.rowGettercheck}
                                                                rowsCount={this.state.CheckPendingList.length}
                                                                onCellClick={this.onCellClick}
                                                                rowHeight={45}
                                                                minHeight={200}
                                                                rowSelection={{
                                                                    showCheckbox: true,
                                                                    enableShiftSelect: true,
                                                                    onRowsSelected: this.onRowsSelected,
                                                                    onRowsDeselected: this.onRowsDeselected,
                                                                    selectBy: {
                                                                        indexes: this.state.selectedIndexes
                                                                    }
                                                                }} />
                                                        </Col>
                                                        <Col xs={12} sm={12} md={12} lg={12} xl={12} >
                                                            <span>{this.state.selectedIndexes.length} {rowText} &nbsp;selected</span>
                                                        </Col>
                                                    </Row>
                               <Row>
                               <Col xs={3}>
                                  Following Cheque are cleared at the Date
                               </Col>
                               
                               <Col xs={3}  >
                               <InputDate onChange={updateProperty} 
                               value={chequedepositDetails.docdate  } 
                               id="docdate" name="docdate" />
                               </Col>
                               <Col xs={2} sm={2} md={2} lg={2} xl={2}>
                                <Button    onClick={submitForm}  bsStyle="primary">
                                   <Glyphicon glyph="folder-open"/>&nbsp;Clear PDC</Button>
                               </Col>
                          </Row>
                                  <Row>
                                    <Col xs={12} >  
                                            <ReactDataGrid
                                    enableCellSelect={true}
                                    columns={this.columns}
                                    rowGetter={this.rowGetter}
                                    rowsCount={chequedepositDetails.ItemDetails.length}
                                    /> 
                                </Col>
                             </Row>
                           </div>
                        </div>
                    </div>
                </form>
            )
                                }
                                }

                                RPT_PDC_Form.propTypes = 
                                    {
                                        chequedepositDetails: PropTypes.shape
                                        (
                                            {
                                                vicno: PropTypes.string,
                                                br: PropTypes.string,
                                                docno: PropTypes.string,
                                                per: PropTypes.number,
                                                gross: PropTypes.number,
                                                disc: PropTypes.number,
                                                amount: PropTypes.number,
                                                adv: PropTypes.number,
                                                stlamt: PropTypes.number,
                                                cos: PropTypes.number,
                                                ldiscount: PropTypes.number,
                                                exgross: PropTypes.number,
                                                exdisc: PropTypes.number,
                                                examount: PropTypes.number,
                                                cash: PropTypes.number,
                                                cc: PropTypes.number,
                                                chq: PropTypes.number,
                                                bal: PropTypes.number,
                                                post: PropTypes.number,
                                                trntype: PropTypes.string,
                                                trn: PropTypes.string,
                                                trnid: PropTypes.number,
                                                src: PropTypes.string,
                                                acno: PropTypes.string,
                                                accode: PropTypes.string,
                                                yyyymmdd: PropTypes.string,
                                                docdate: PropTypes.string,
                                                narration: PropTypes.string,
                                                ref: PropTypes.string,
                                                ref1: PropTypes.string,
                                                svicno: PropTypes.string,
                                                chq1: PropTypes.string,
                                                chq2: PropTypes.string,
                                                chq3: PropTypes.string,
                                                cc1: PropTypes.string,
                                                cc2: PropTypes.string,
                                                cc3: PropTypes.string,
                                                sid: PropTypes.string,
                                                vdate: PropTypes.date,
                                                userid: PropTypes.string,
                                                iseditmode: PropTypes.boolean,
                                                vehclno: PropTypes.string,
                                                ItemDetails:PropTypes.object
                                            }
                                        )
                                    }
export default asForm(RPT_PDC_Form,"Post Dated Cheque")