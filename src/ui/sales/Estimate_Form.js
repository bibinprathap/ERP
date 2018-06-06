/// <reference path="CashSales_Form.js" />
import CashSalesItem_SubForm from "./CashSalesItem_SubForm.js";
import CustomerComplaint_SubForm from "./CustomerComplaint_SubForm.js";
import LabourCharges_SubForm from "./LabourCharges_SubForm";

import React, { Component, PropTypes } from 'react';
import { observer } from 'mobx-react';
import { observable, extendObservable } from 'mobx';
import { InputField, asForm, InputDate, InputSelect } from '../../utils';
import Collapse, { Panel } from 'rc-collapse';
import ReactDataGrid from 'react-data-grid';
import { Button, Grid, Row, Col, Tabs, Tab, Glyphicon, Label } from 'react-bootstrap';

import * as rbstrap from 'react-bootstrap';
import CashSalesItem_Store from '../../store/sales/CashSalesItem_Store';
import * as constants from '../../constants.js';
import { NotificationContainer, NotificationManager } from 'react-notifications';
//import * as Modal from  'react-bootstrap-modal'
import CashSales_Store from '../../store/sales/CashSales_Store';

import moment from "moment";

@observer
class Estimate_Form extends Component {
    constructor(props) {
        super(props)

        let SalesItem = observable(Object.assign({}, CashSalesItem_Store))
        this.SalesItem = SalesItem
        extendObservable(this.SalesItem, CashSalesItem_Store);
        this.SalesItem.slno = 1;
        this.state = {};
        this.state.key = 0;
        this.state.newenabled = true;
        this.state.openenabled = true;
        this.state.printwopartnoenabled = true;
        this.state.printenabled = true;
        this.state.saveenabled = false;
        this.state.canceledenabled = false;
        this.handleOpen = this.handleOpen.bind(this);
        this.addledgermaster = this.addledgermaster.bind(this);
        this.handlePrint = this.handlePrint.bind(this);
        this.handlePrintPN = this.handlePrintPN.bind(this);
        this.handlePrintsmall = this.handlePrintsmall.bind(this);
        this.handlecustomer = this.handlecustomer.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleEditOpen = this.handleEditOpen.bind(this);
        this.getcustomerlimit = this.getcustomerlimit.bind(this);
        
        this.handleNew();
        window.ctrlkeysubmitForm = this.props.submitForm;
        window.ctrlkeyprintForm = this.handlePrint;
        window.ctrlkeyopenForm = this.handleOpen;
        window.ctrlkeynewForm = this.handleNew;
        this.handleNew = this.handleNew.bind(this);
        this.getCustomerDetails = this.getCustomerDetails.bind(this);
        this.calculatetotalcash = this.calculatetotalcash.bind(this);
        this.calculatetotalcash1 = this.calculatetotalcash1.bind(this);
        // this.getusers = this.getusers.bind(this);
        this.calculatetotalcs = this.calculatetotalcs.bind(this);
        this.CashSalesDetails = observable(CashSales_Store);
        this.rowGetter = this.rowGetter.bind(this);
        this.rowGetterTax = this.rowGetterTax.bind(this);
        window.cashsalesform = this;


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

            this.columnstax = [
                {
                    key:'id',
                    name:'SI No'
                },
                {
                    key: 'TransactionType',
                    name: 'Transaction Type'
                },
                {
                    key: 'DealerType',
                    name: 'Tax Type'
                },
                {
                    key: 'DealerRegNo',
                    name: 'Reg No'
                },
                {
                    key: 'BillNo',
                    name: 'Bill No'
                },
                {
                    key: 'ITEMID',
                    name: 'Item'
                },{
                    key: 'CostCentre',
                    name: 'Cost Center'
                },
                {
                    key: 'Amount',
                    name: 'Amount'
                },
                {
                    key: 'TaxPercentage',
                    name: 'Tax%'
                },
                {
                    key: 'Tax',
                    name: 'Tax'
                },
                {
                    key: 'Total',
                    name: 'Total'
                }];

        }
    rowGetter(i) {
        return this.CashSalesDetails.ItemDetails1[i]
    }
    rowGetterTax(i) {
        return this.CashSalesDetails.ItemDetails4[i]
    }
    
  getcustomerlimit(key,value,selectedrow) {
      this.props.updateProperty(key,value);
      this.props.CashSalesDetails.text5 = value.crlimit;
      this.props.CashSalesDetails.text4 = value.BALAMT;

       this.props.CashSalesDetails.dealertype = value.dealertype;
       this.props.CashSalesDetails.dealerregno = value.dealerregno;
     //  this.props.CashSalesDetails.terms = value.terms;
     }


     addledgermaster()
    {
        window.ledgerfilloptions =  this.props.CashSalesDetails;
        window.showledgermasterpopup();
         //this.setState({modalIsOpen:true,editpopup:false});
    }

    calculatetotalcash() {
        this.CashSalesDetails.amount = parseFloat( parseFloat(parseFloat(this.CashSalesDetails.gross  || 0)  - parseFloat(this.CashSalesDetails.pricediscount  || 0) + parseFloat(this.CashSalesDetails.tax  || 0) - parseFloat(this.CashSalesDetails.disc  || 0)).toFixed(2));
        var  cashamt = parseFloat(this.CashSalesDetails.amount || 0) - parseFloat(this.CashSalesDetails.adv || 0);
        this.CashSalesDetails.adv = cashamt > 0 ? parseFloat(this.CashSalesDetails.adv || 0) : parseFloat(this.CashSalesDetails.amount || 0);
        //var cashTotal = 0;
        var bal = 0;
        //cashTotal= parseFloat(this.CashSalesDetails.amount  || 0) - parseFloat(this.CashSalesDetails.chq  || 0) - parseFloat(this.CashSalesDetails.cc  || 0) - parseFloat(this.CashSalesDetails.adv  || 0);
        //cashTotal = (cashTotal >0? cashTotal:0)
        //this.CashSalesDetails.cash = (cashTotal >0? cashTotal:0)        
        bal =  parseFloat(this.CashSalesDetails.amount  || 0) - parseFloat(this.CashSalesDetails.cash || 0)  - parseFloat(this.CashSalesDetails.chq  || 0) - parseFloat(this.CashSalesDetails.cc  || 0) - parseFloat(this.CashSalesDetails.adv  || 0);
        this.CashSalesDetails.bal = bal;        
    }
    calculatetotalcash1(){
        this.CashSalesDetails.amount = parseFloat( parseFloat( parseFloat(this.CashSalesDetails.gross  || 0) - parseFloat(this.CashSalesDetails.pricediscount  || 0) + parseFloat(this.CashSalesDetails.tax  || 0) - parseFloat(this.CashSalesDetails.disc  || 0)).toFixed(2));
        var  cashamt = parseFloat(this.CashSalesDetails.amount || 0) - parseFloat(this.CashSalesDetails.adv || 0);
        this.CashSalesDetails.adv = cashamt > 0 ? parseFloat(this.CashSalesDetails.adv || 0) : parseFloat(this.CashSalesDetails.amount || 0);
        var cashTotal = 0;
        var bal = 0;
        bal =  parseFloat(this.CashSalesDetails.amount  || 0) - cashTotal - parseFloat(this.CashSalesDetails.chq  || 0) - parseFloat(this.CashSalesDetails.cc  || 0) - parseFloat(this.CashSalesDetails.adv  || 0);
        this.CashSalesDetails.bal = bal;        
    }
    calculatetotalcs() {
        this.CashSalesDetails.amount = parseFloat( parseFloat(parseFloat(this.CashSalesDetails.gross  || 0) + parseFloat(this.CashSalesDetails.tax  || 0) - parseFloat(this.CashSalesDetails.disc  || 0)).toFixed(2));
        this.CashSalesDetails.bal = parseFloat(this.CashSalesDetails.amount  || 0) - parseFloat(this.CashSalesDetails.cash  || 0) - parseFloat(this.CashSalesDetails.chq  || 0) - parseFloat(this.CashSalesDetails.cc  || 0) - parseFloat(this.CashSalesDetails.adv  || 0);
    }
    handleOpen() {
        window.CashSalespopupshow();
        this.setState({ newenabled: true, openenabled: true, printwopartnoenabled: true, printenabled: true, saveenabled: true, canceledenabled: true });

    }
    handleEditOpen() {
        this.setState({ newenabled: true, openenabled: true, printwopartnoenabled: true, printenabled: true, saveenabled: false, canceledenabled: true });
    }
    
    handlecustomer() {
        window.showaddpopup();
        window.customermasterrefn.handleNew();
    }
     getDealerType = (input) => {
            return fetch(constants.SERVICEURL + `/combo/dealertype/`+ constants.COMPANY , {
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
    handleNew() {

        $('#ref').focus();

        var url = constants.SERVICEURL + '/SalesQuo/getnewcashrefno';
        var loadrequest = { parem1: constants.ERP_BRANCH, company: constants.COMPANY }
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
                    message: 'Cash Sales Initialised',
                    title: 'Success message',
                    timeOut: 0
                });
                setTimeout(function () {
                    NotificationManager.remove({ id: 1 });
                }, 2000);


                CashSalesDetails.adv = 0;
                CashSalesDetails.N = 1;
                CashSalesDetails.cos = 0;
                CashSalesDetails.exdisc = 0;
                CashSalesDetails.examount = 0;
                CashSalesDetails.cc = 0;
                CashSalesDetails.chq = 0;
                CashSalesDetails.bal = 0;
                CashSalesDetails.totalfob = 0;
                CashSalesDetails.pricediscount = 0;
                CashSalesDetails.exp1 = 0;
                CashSalesDetails.gross = 0;
                CashSalesDetails.disc = 0;
                CashSalesDetails.amount = 0;
                CashSalesDetails.ADV = 0;
                CashSalesDetails.adv = 0;
                CashSalesDetails.stlamt = 0;
                CashSalesDetails.COS = 0;
                CashSalesDetails.ldiscount = 0;
                CashSalesDetails.exgross = 0;
                CashSalesDetails.EXdisc = 0;
                CashSalesDetails.examount = 0;
                CashSalesDetails.cash = 0;
                CashSalesDetails.CC = 0;
                CashSalesDetails.CHQ = 0;
                CashSalesDetails.bal = 0;
                CashSalesDetails.receipt = ''
                CashSalesDetails.status = ''
                CashSalesDetails.svicno = ''
                CashSalesDetails.acno = '';
                CashSalesDetails.accode = '';
                //CashSalesDetails.docdate = moment(CashSalesDetails.docdate).format("DD/MM/YYYY"); 
                CashSalesDetails.narration = '';
                CashSalesDetails.ref = '';
                CashSalesDetails.ref1 = '';
                CashSalesDetails.SVICNO = '';
                CashSalesDetails.chq1 = '';
                CashSalesDetails.chq2 = '';
                CashSalesDetails.chq3 = '';
                CashSalesDetails.CC1 = '';
                CashSalesDetails.CC2 = '';
                CashSalesDetails.CC3 = '';
                CashSalesDetails.per1 = 0;
                CashSalesDetails.per = 0;
                CashSalesDetails.cc1 = '',
                CashSalesDetails.cc2 = '';
                CashSalesDetails.cc3 = '',
                CashSalesDetails.vehclno = '',
                CashSalesDetails.profit = '',
                CashSalesDetails.profitper = '',
                CashSalesDetails.statusname = '',
                
                CashSalesDetails.tax = '',
                CashSalesDetails.totalwithtax = '',

                CashSalesDetails.ItemDetails2 = []
                CashSalesDetails.ItemDetails3 = []
                CashSalesDetails.ItemDetails4 =[];
                CashSalesDetails.ItemDetailsSales = []
                CashSalesDetails.vdate = new Date();
                CashSalesDetails.userid = constants.ERP_USERID;
                CashSalesDetails.iseditmode = false;
                window.cashsalesiteminquiry.setState({ isedit: 'N', key: 1, lastno: 1 });
                CashSalesDetails.docdate = moment(new Date()).format("MM/DD/YYYY");
                CashSalesDetails.br = constants.ERP_BRANCH;
                CashSalesDetails.docno = result.newdocno;
                CashSalesDetails.trn = constants.TRN_CASHSALES;
                CashSalesDetails.trnid = constants.TRNID_CASHSALES;
                CashSalesDetails.src = constants.SRC_CASHSALES + constants.ERP_BRANCH;
                CashSalesDetails.vicno = result.newrefno;
                CashSalesDetails.post = 2;
                CashSalesDetails.trntype = constants.TRNTYPE_CASHSALES + constants.ERP_BRANCH;
                CashSalesDetails.TRNID = 11;
                CashSalesDetails.yyyymmdd = moment(CashSalesDetails.docdate).format("YYYYMMDD");

                CashSalesDetails.ItemDetails = [];
                CashSalesDetails.ItemDetails1 = [];


                this.setState({ newenabled: false, openenabled: true, printwopartnoenabled: false, printenabled: false, saveenabled: true, canceledenabled: true });

            }.bind(this),
            error: function (jqXHR, exception) {
                window.closeModal();
                window.closeModal();
                NotificationManager.error('Error message', 'Error While Initialising...');
            }
        });
    }
    getCustomerDetails(fileldname, fieldvalue, keyCode) {
        if (keyCode == 13 && this.CashSalesDetails.ref.length > 2) {
            var url = constants.SERVICEURL + '/SalesQuo/getcustomerdetails';
            var CashSalesDetails = this.CashSalesDetails;

            var loadrequest = { company: constants.COMPANY, parem1: CashSalesDetails.ref, parem3: constants.ERP_BRANCH }
            CashSalesDetails.narration = '';
            // CashSalesDetails.acno = '';
            window.openModal(); $.ajax({
                url: url,
                type: 'POST',
                dataType: 'json',
                data: loadrequest,
                success: function (respoce, textStatus, xhr) {
                    window.closeModal();
                    var editdata = respoce[0];
                    if (editdata && editdata.ACNO) {
                        CashSalesDetails.narration = editdata.ACNAME;
                        CashSalesDetails.acno = editdata.ACNO;
                        CashSalesDetails.adv = editdata.lcsrc
                        // CashSalesDetails.adv = 0;
                    }
                },
                error: function (xhr, textStatus, errorThrown) {
                    window.closeModal();
                    console.log('Error in Operation');
                }
            });
            $('[tabIndex=2]').focus();
        }
        else {
            this.CashSalesDetails.acno = this.CashSalesDetails.ref;
        }

    }
    handleCancel() {
        this.setState({ newenabled: true, openenabled: true, printwopartnoenabled: true, printenabled: true, saveenabled: false, canceledenabled: false });
        var CashSalesDetails = this.CashSalesDetails;

        CashSalesDetails.adv = 0;
        CashSalesDetails.N = 1;
        CashSalesDetails.cos = 0;
        CashSalesDetails.exdisc = 0;
        CashSalesDetails.examount = 0;
        CashSalesDetails.cc = 0;
        CashSalesDetails.chq = 0;
        CashSalesDetails.bal = 0;
        CashSalesDetails.totalfob = 0;
        CashSalesDetails.exp1 = 0;
        CashSalesDetails.gross = 0;
        CashSalesDetails.disc = 0;
        CashSalesDetails.amount = 0;
        CashSalesDetails.ADV = 0;
        CashSalesDetails.stlamt = 0;
        CashSalesDetails.COS = 0;
        CashSalesDetails.ldiscount = 0;
        CashSalesDetails.exgross = 0;
        CashSalesDetails.EXdisc = 0;
        CashSalesDetails.examount = 0;
        CashSalesDetails.cash = 0;
        CashSalesDetails.CC = 0;
        CashSalesDetails.CHQ = 0;
        CashSalesDetails.bal = 0;
        CashSalesDetails.receipt = ''
        CashSalesDetails.status = ''
        CashSalesDetails.svicno = ''
        CashSalesDetails.acno = '';
        CashSalesDetails.accode = '';
        //CashSalesDetails.docdate = moment(CashSalesDetails.docdate).format("DD/MM/YYYY"); 
        CashSalesDetails.narration = '';
        CashSalesDetails.ref = '';
        CashSalesDetails.ref1 = '';
        CashSalesDetails.SVICNO = '';
        CashSalesDetails.chq1 = '';
        CashSalesDetails.chq2 = '';
        CashSalesDetails.chq3 = '';
        CashSalesDetails.CC1 = '';
        CashSalesDetails.CC2 = '';
        CashSalesDetails.CC3 = '';
        CashSalesDetails.cc1 = '',
        CashSalesDetails.cc2 = '';
        CashSalesDetails.cc3 = '',
        CashSalesDetails.vehclno = '',
        CashSalesDetails.profit = '',
        CashSalesDetails.profitper = '',
        CashSalesDetails.statusname = '',
        CashSalesDetails.ItemDetails2 = []
        CashSalesDetails.ItemDetails3 = []
        CashSalesDetails.ItemDetailsSales = []
        CashSalesDetails.vdate = new Date();
        CashSalesDetails.userid = constants.ERP_USERID;
        CashSalesDetails.iseditmode = false;
        window.cashsalesiteminquiry.setState({ isedit: 'N', key: 1, lastno: 1 });
        CashSalesDetails.docdate = moment(new Date()).format("MM/DD/YYYY");
        CashSalesDetails.br = constants.ERP_BRANCH;
        CashSalesDetails.trn = constants.TRN_CASHSALES;
        CashSalesDetails.trnid = constants.TRNID_CASHSALES;
        CashSalesDetails.src = constants.SRC_CASHSALES + constants.ERP_BRANCH;
        CashSalesDetails.post = 2;
        CashSalesDetails.trntype = constants.TRNTYPE_CASHSALES + constants.ERP_BRANCH;
        CashSalesDetails.TRNID = 11;
        CashSalesDetails.yyyymmdd = moment(CashSalesDetails.docdate).format("YYYYMMDD");
        CashSalesDetails.docno = '';
        CashSalesDetails.per1 = 0;
        CashSalesDetails.totalfob = 0;
        CashSalesDetails.vicno = '';
        CashSalesDetails.userid = constants.ERP_USERID;
        CashSalesDetails.iseditmode = false;
        CashSalesDetails.ItemDetails = [];
        CashSalesDetails.ItemDetails1 = [];
    }
    handlePrint() {
        this.setState({ newenabled: true, openenabled: true, printwopartnoenabled: true, printenabled: true, saveenabled: true, canceledenabled: true });


        if (this.props.CashSalesDetails.vicno == '') {
            NotificationManager.warning('', 'No Data Selected. \n Please select a Cash Sales Voucher to Print', 30000);
        }
        else {
            //CASHSALESBR2
            if (constants.ERP_BRANCH == "3")
                var reportURL = constants.REPORTURL + '/ReportPrint.aspx?ReportCode=' + constants.getprocedurename('CASHSALESBR2', constants.COMPANY) + '&IsDirectPrint=Y&RefNo=' + this.props.CashSalesDetails.vicno
            else
                var reportURL = constants.REPORTURL + '/ReportPrint.aspx?ReportCode=' + constants.getprocedurename('CASHSALES', constants.COMPANY) + '&IsDirectPrint=Y&RefNo=' + this.props.CashSalesDetails.vicno
            window.open(reportURL, 'new window', 'fullscreen=yes, scrollbars=auto, height=screen.height, left=0, top=0, width=screen.width, dependant=no, location=0, alwaysRaised=no, menubar=no, resizeable=no, scrollbars=n, toolbar=no, status=no, center=yes')
        }
    }

    handlePrintsmall() {
               this.setState({ newenabled: true, openenabled: true, printwopartnoenabled: true, printenabled: true, saveenabled: true, canceledenabled: true });
                if (this.props.CashSalesDetails.vicno == '') {
                    NotificationManager.warning('', 'No Data Selected. \n Please select a Cash Sales Voucher to Print', 30000);
                }
                else {
                     var reportURL = constants.REPORTURL + '/ReportPrint.aspx?ReportCode=' + constants.getprocedurename('CASHSALESSMALL', constants.COMPANY) + '&IsDirectPrint=Y&RefNo=' + this.props.CashSalesDetails.vicno
                    window.open(reportURL, 'new window', 'fullscreen=yes, scrollbars=auto, height=screen.height, left=0, top=0, width=screen.width, dependant=no, location=0, alwaysRaised=no, menubar=no, resizeable=no, scrollbars=n, toolbar=no, status=no, center=yes')
                }
            }
    handlePrintPN() {


        this.setState({ newenabled: true, openenabled: true, printwopartnoenabled: true, printenabled: true, saveenabled: true, canceledenabled: true });
        if (this.props.CashSalesDetails.vicno == '') {
            NotificationManager.warning('', 'No Data Selected. \n Please select a Cash Sales Voucher to Print', 30000);
        }
        else {
            if (constants.ERP_BRANCH == "3")
                var reportURL = constants.REPORTURL + '/ReportPrint.aspx?ReportCode=' + constants.getprocedurename('CASHSALESWPNBR2', constants.COMPANY) + '&IsDirectPrint=Y&RefNo=' + this.props.CashSalesDetails.vicno
            else
                var reportURL = constants.REPORTURL + '/ReportPrint.aspx?ReportCode=' + constants.getprocedurename('CASHSALESWPN', constants.COMPANY) + '&IsDirectPrint=Y&RefNo=' + this.props.CashSalesDetails.vicno
            window.open(reportURL, 'new window', 'fullscreen=yes, scrollbars=auto, height=screen.height, left=0, top=0, width=screen.width, dependant=no, location=0, alwaysRaised=no, menubar=no, resizeable=no, scrollbars=n, toolbar=no, status=no, center=yes')
        }
    }

    // getSalesMen = (input) => {
    //     return fetch(constants.SERVICEURL + `/combo/salesmen/` + constants.COMPANY, {   //Select id, idname  from PRTXACC.dbo.ACCxtab WHERE LEFT(VICNO,3)='SID' ORDER BY IDNAME
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         }
    //     })
    //         .then((response) => {
    //             return response.json();
    //         }).then((json) => {
    //             return { options: json };
    //         });
    // }
    // getusers = (input) => {
    //     return fetch(constants.SERVICEURL + `/combo/users`, {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         }
    //     })
    //         .then((response) => {
    //             return response.json();
    //         }).then((json) => {
    //             return { options: json };
    //         });
    // }
    getacno = (input) => {
        return fetch(constants.SERVICEURL + `/combo/acno/` + constants.COMPANY, {
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
        render() {
            const {CashSalesDetails, DeliveryAddress, submitForm, updateProperty} = this.props;
            const keyMap = {
                'save': 'ctrl+s',
                'print': 'ctrl+p',
                'new': 'ctrl+k',
                'open': 'ctrl+o',
                'itemenquiry': 'f4',
                'itemmaster': 'ctrl+i'
            };
            const handlers = {
                'deleteNode': (event) => console.log('Delete node hotkey called!'),
                'moveUp': (event) => console.log('Move up hotkey called!'),
                'save': (event) => { submitForm(event); event.stopPropagation(); },
                'print': (event) => { window.ctrlkeyprintForm(event); event.stopPropagation(); },
                'new': (event) => { window.ctrlkeynewForm(event); event.stopPropagation(); },
                'open': (event) => { window.ctrlkeyopenForm(event); event.stopPropagation(); },
                'itemenquiry': (event) => { window.iteminquiry(); event.stopPropagation(); },
                'itemmaster': (event) => { window.itemmaster(); event.stopPropagation(); }
            };

            return (
              
                    <form >
                        <div className="container-fluid">
                              <div className="modal fade"  id="ledgerentries" role="dialog">
                    <div className="modal-dialog">
                        <div className="modal-content modal-dialog modal-lg" style={{ width: '835' + 'px' }}>
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                                <h4 className="modal-title">Ledgers</h4>
                            </div>
                            <div className="modal-body">
                                <div style={{minHeight:"250px"}} >
                                
                                </div></div>
                        </div>
                    </div>
                </div> 
                  <div className="modal fade"  id="historyModal" role="dialog">
                    <div className="modal-dialog">
                        <div className="modal-content modal-dialog modal-lg" style={{ width: '835' + 'px' }}>
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                                <h4 className="modal-title">Add New Customer</h4>
                            </div>
                            <div className="modal-body">
                                <div style={{minHeight:"250px"}} >
                              
                                </div></div>
                        </div>
                    </div>
                </div>
                            <div className="panel panel-primary" >
                                <div className="panel-heading panel-headingerp" style={{ padding: 3 + 'px' }}>
                                <table class='table borderless'>
                                    <tbody>
                                        <tr>
                                            <td style={{ width: 100 + '%' }}>
                                                <h3 className="panel-title">Estimation</h3>
                                            </td>
                                            <td>
                                                <Button onClick={this.handleNew} disabled={!this.state.newenabled} bsStyle="primary"><Glyphicon glyph="new-window" />&nbsp;New</Button>
                                            </td>
                                            <td>
                                                <Button onClick={this.handleOpen} disabled={!this.state.openenabled} bsStyle="primary"><Glyphicon glyph="folder-open" />&nbsp;Open</Button>
                                            </td>
                                            <td>
                                                <Button onClick={this.handlePrintsmall} disabled={!this.state.printwopartnoenabled} bsStyle="primary"><Glyphicon glyph="print" /> Small Print  </Button>
                                            </td>

                                             {constants.ERP_TYPE=='AUTO'?<td>
                                                <Button onClick={this.handlePrintPN} disabled={!this.state.printwopartnoenabled} bsStyle="primary"><Glyphicon glyph="print" />W/O Part No</Button>
                                             </td>:null}
                                                  <td>
                                                <Button onClick={this.handlePrint}  disabled={!this.state.printenabled} bsStyle="primary"><Glyphicon glyph="print" /> {constants.ERP_TYPE=='AUTO'?"Part No And Part Name":"Print"}
                                                </Button>
                                            </td>
                                            <td>
                                                <Button bsStyle="success" disabled={!this.state.saveenabled} onClick={submitForm}   ><Glyphicon glyph="floppy-save" />&nbsp;Save</Button>
                                            </td>
                                            <td>
                                                <Button bsStyle="danger" onClick={this.handleCancel} disabled={!this.state.canceledenabled} ><Glyphicon glyph="remove" />&nbsp;Cancel</Button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <NotificationContainer />
                            <div className="panel-body panel-bodyerp" style={{ padding: 5 + 'px ' + 15 + 'px ' + 2 + 'px ' + 15 + 'px' }}>
                                Vehicle & Customer Details
                                <Row>
                                    <Col xs={4} sm={4} md={4} lg={4} xl={4}>
                                        <rbstrap.Panel>
                                        <Row>
                                                <Col xs={4} sm={4} md={4} lg={4} xl={4}>
                                                    Branch 
                                                </Col>
                                                <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                                                    <InputSelect id="dealertype" name="dealertype" placeholder="Select"  />
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col xs={4} sm={4} md={4} lg={4} xl={4}>
                                                    Job Card
                                                </Col>
                                                <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                                                    <InputField id="acname" name="acname" value={CashSalesDetails.acname} onChange={updateProperty} placeholder="Job Card" />
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col xs={4} sm={4} md={4} lg={4} xl={4}>
                                                   Contact No 
                                                </Col>
                                                <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                                                    <InputField id="acname" name="acname" value={CashSalesDetails.acname} onChange={updateProperty} placeholder="Contact No." />
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col xs={4} sm={4} md={4} lg={4} xl={4}>
                                                   Vin No.
                                                </Col>
                                                <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                                                    <InputField id="acname" name="acname" value={CashSalesDetails.acname} onChange={updateProperty} placeholder="Vehicle Vin No." />
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col xs={4} sm={4} md={4} lg={4} xl={4}>
                                                    Veh.Type 
                                                </Col>
                                                <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                                                    <InputSelect id="dealertype" name="dealertype" placeholder="Type"  />
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col xs={4} sm={4} md={4} lg={4} xl={4}>
                                                   LPO No.
                                                </Col>
                                                <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                                                    <InputField id="acname" name="acname" value={CashSalesDetails.acname} onChange={updateProperty} placeholder="LPO No." />
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col xs={4} sm={4} md={4} lg={4} xl={4}>
                                                   Exp Reg No.
                                                </Col>
                                                <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                                                    <InputField id="acname" name="acname" value={CashSalesDetails.acname} onChange={updateProperty} placeholder="Exp Reg.No" />
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col xs={4} sm={4} md={4} lg={4} xl={4}>
                                                   Othr. Amount
                                                </Col>
                                                <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                                                    <InputField id="acname" name="acname" value={CashSalesDetails.acname} onChange={updateProperty} placeholder="Other Amount" />
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col xs={4} sm={4} md={4} lg={4} xl={4}>
                                                    Comtd.Date 
                                                </Col>
                                                <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                                                    <InputDate onChange={updateProperty} value={CashSalesDetails.acname} id="fromdate" name="CommitedDate" />
                                                </Col>
                                            </Row>
                                            
                                        </rbstrap.Panel>
                                    </Col>
                                    <Col xs={4} sm={4} md={4} lg={4} xl={4}>
                                        <rbstrap.Panel>
                                            <Row>
                                                <Col xs={4} sm={4} md={4} lg={4} xl={4}>
                                                    Est. No 
                                                </Col>
                                                <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                                                    <InputField id="acname" name="acname" value={CashSalesDetails.acname} onChange={updateProperty} placeholder="Estimate No" />
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col xs={4} sm={4} md={4} lg={4} xl={4}>
                                                    Job Date
                                                </Col>
                                                <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                                                    <InputDate onChange={updateProperty} value={CashSalesDetails.acname} id="fromdate" name="JobDate" />
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col xs={4} sm={4} md={4} lg={4} xl={4}>
                                                    Cust.Name 
                                                </Col>
                                                <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                                                    <InputField id="acname" name="acname" value={CashSalesDetails.acname} onChange={updateProperty} placeholder="Customer Name" />
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col xs={4} sm={4} md={4} lg={4} xl={4}>
                                                    Plate No 
                                                </Col>
                                                <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                                                    <InputField id="acname" name="acname" value={CashSalesDetails.acname} onChange={updateProperty} placeholder="Plate No" />
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col xs={4} sm={4} md={4} lg={4} xl={4}>
                                                    Veh. Brand
                                                </Col>
                                                <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                                                    <InputSelect id="dealertype" name="dealertype" placeholder="Select"  />
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col xs={4} sm={4} md={4} lg={4} xl={4}>
                                                   KM's In
                                                </Col>
                                                <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                                                    <InputField id="acname" name="acname" value={CashSalesDetails.acname} onChange={updateProperty} placeholder="KM" />
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col xs={4} sm={4} md={4} lg={4} xl={4}>
                                                   Job Category
                                                </Col>
                                                <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                                                    <InputSelect id="dealertype" name="dealertype" placeholder="Select"  />
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col xs={4} sm={4} md={4} lg={4} xl={4}>
                                                    Claim No
                                                </Col>
                                                <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                                                    <InputField id="acname" name="acname" value={CashSalesDetails.acname} onChange={updateProperty} placeholder="Claim No" />
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col xs={4} sm={4} md={4} lg={4} xl={4}>
                                                   Dues
                                                </Col>
                                                <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                                                    <InputField id="acname" name="acname" value={CashSalesDetails.acname} onChange={updateProperty} placeholder="Dues" />
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col xs={4} sm={4} md={4} lg={4} xl={4}>
                                                   Remarks
                                                </Col>
                                                <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                                                    <InputField id="acname" name="acname" value={CashSalesDetails.acname} onChange={updateProperty} placeholder="Checklist Remarks" />
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col xs={4} sm={4} md={4} lg={4} xl={4}>
                                                    Nxt. Date 
                                                </Col>
                                                <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                                                    <InputDate onChange={updateProperty} value={CashSalesDetails.acname} id="NxtDate" name="NxtDate" />
                                                </Col>
                                            </Row>
                                        </rbstrap.Panel>
                                    </Col>
                                    <Col xs={4} sm={4} md={4} lg={4} xl={4}>
                                        <rbstrap.Panel>
                                            <Row>
                                                <Col xs={4} sm={4} md={4} lg={4} xl={4}>
                                                   Veh. Receipt
                                                </Col>
                                                <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                                                    <InputField id="acname" name="acname" value={CashSalesDetails.acname} onChange={updateProperty} placeholder="Vehicle Receipt No" />
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col xs={4} sm={4} md={4} lg={4} xl={4}>
                                                    Time 
                                                </Col>
                                                <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                                                    <InputDate onChange={updateProperty} value={CashSalesDetails.acname} id="fromdate" name="fromdate" />
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col xs={4} sm={4} md={4} lg={4} xl={4}>
                                                   Email
                                                </Col>
                                                <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                                                    <InputField id="acname" name="acname" value={CashSalesDetails.acname} onChange={updateProperty} placeholder="Email" />
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col xs={4} sm={4} md={4} lg={4} xl={4}>
                                                   Emirates
                                                </Col>
                                                <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                                                    <InputSelect id="dealertype" name="dealertype" placeholder="Select"  />
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col xs={4} sm={4} md={4} lg={4} xl={4}>
                                                   Approval
                                                </Col>
                                                <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                                                    <InputSelect id="dealertype" name="dealertype" placeholder="Select"  />
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col xs={4} sm={4} md={4} lg={4} xl={4}>
                                                   Model
                                                </Col>
                                                <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                                                    <InputSelect id="dealertype" name="dealertype" placeholder="Select"  />
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col xs={4} sm={4} md={4} lg={4} xl={4}>
                                                   Year
                                                </Col>
                                                <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                                                    <InputField id="acname" name="acname" value={CashSalesDetails.acname} onChange={updateProperty} placeholder="Year" />
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col xs={4} sm={4} md={4} lg={4} xl={4}>
                                                   Insurance
                                                </Col>
                                                <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                                                    <InputSelect id="dealertype" name="dealertype" placeholder="Select"  />
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col xs={4} sm={4} md={4} lg={4} xl={4}>
                                                   XS Amount
                                                </Col>
                                                <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                                                    <InputField id="acname" name="acname" value={CashSalesDetails.acname} onChange={updateProperty} placeholder="XS Amount" />
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col xs={4} sm={4} md={4} lg={4} xl={4}>
                                                   Appr. Amount
                                                </Col>
                                                <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                                                    <InputField id="acname" name="acname" value={CashSalesDetails.acname} onChange={updateProperty} placeholder="Approved Amount" />
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col xs={4} sm={4} md={4} lg={4} xl={4}>
                                                   Remark
                                                </Col>
                                                <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                                                    <InputField id="acname" name="acname" value={CashSalesDetails.acname} onChange={updateProperty} placeholder="Remark" />
                                                </Col>
                                            </Row>
                                            
                                            <Row>
                                                <Col xs={4} sm={4} md={4} lg={4} xl={4}>
                                                   REDO
                                                </Col>
                                                <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                                                    <InputSelect id="dealertype" name="dealertype" placeholder="Select"  />
                                                </Col>
                                            </Row>
                                        </rbstrap.Panel>
                                    </Col>
                                </Row>
                                <Row>
                                    <Collapse accordion={true} defaultActiveKey="1">
                                        <Panel header="Estimation Approved List" key="1">
                                            {/* <CustomerComplaint_SubForm SubHead="" /> */}
                                        </Panel>
                                    </Collapse>
                                </Row>
                                <Row>
                                    <Collapse accordion={true} defaultActiveKey="1">
                                        <Panel header="Complaints" key="1">
                                            <CustomerComplaint_SubForm CashSalesItems={CashSalesDetails.ItemDetails1} CashSalesItemParent={CashSalesDetails} SalesItem={this.SalesItem} SubHead=""  /> 
                                        </Panel>
                                    </Collapse>
                                </Row>
                                <Row>
                                    <Collapse accordion={true} defaultActiveKey="1">
                                        <Panel header="Spare Parts & Services" key="1">
                                            <CashSalesItem_SubForm CashSalesItems={CashSalesDetails.ItemDetails} CashSalesItemParent={CashSalesDetails} SalesItem={this.SalesItem} SubHead="" />
                                        </Panel>
                                    </Collapse>
                                </Row>
                                <Row>
                                    <Collapse accordion={true} defaultActiveKey="1">
                                        <Panel header="Purchase Invoice for Spare Parts" key="1">
                                            {/* <CashSalesItem_SubForm CashSalesItems={CashSalesDetails.ItemDetails} CashSalesItemParent={CashSalesDetails} SalesItem={this.SalesItem} SubHead="" /> */}
                                        </Panel>
                                    </Collapse>
                                </Row>
                                <Row>
                                    <Collapse accordion={true} defaultActiveKey="1">
                                        <Panel header="Labour Charges" key="1">
                                            <LabourCharges_SubForm CashSalesItems={CashSalesDetails.ItemDetails2} CashSalesItemParent={CashSalesDetails} SalesItem={this.SalesItem} SubHead="" />
                                        </Panel>
                                    </Collapse>
                                </Row>
                                <Row>
                                    <Collapse accordion={true}>
                                        <Panel header="Delivery & Tech Details" key="1">
                                        <Row>
                                    <Col xs={3} sm={3} md={3} lg={3} xl={3}>
                                        <rbstrap.Panel>
                                            <Row>
                                                <Col xs={5} sm={5} md={5} lg={5} xl={5}>
                                                    Advisor
                                                </Col>
                                                <Col xs={7} sm={7} md={7} lg={7} xl={7}>
                                                    <InputField id="cash" name="cash" disabled={true} onChange={updateProperty} />
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col xs={5} sm={5} md={5} lg={5} xl={5}>
                                                    Job Completion
                                                </Col>
                                                <Col xs={7} sm={7} md={7} lg={7} xl={7}>
                                                    <InputField id="cc" name="cc"   onChange={updateProperty} />
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col xs={5} sm={5} md={5} lg={5} xl={5}>
                                                    Appr. Date
                                                </Col>
                                                <Col xs={7} sm={7} md={7} lg={7} xl={7}>
                                                    <InputDate onChange={updateProperty} value={CashSalesDetails.acname} id="fromdate" name="fromdate" />
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col xs={5} sm={5} md={5} lg={5} xl={5}>
                                                    Print Types
                                                </Col>
                                                <Col xs={7} sm={7} md={7} lg={7} xl={7}>
                                                    <InputSelect id="dealertype" name="dealertype" placeholder="Select"  />
                                                </Col>
                                            </Row>
                                        </rbstrap.Panel>
                                    </Col>
                                    <Col xs={3} sm={3} md={3} lg={3} xl={3}>
                                        <rbstrap.Panel>
                                            <Row>
                                                <Col xs={5} sm={5} md={5} lg={5} xl={5}>
                                                    Supervisor
                                                </Col>
                                                <Col xs={7} sm={7} md={7} lg={7} xl={7}>
                                                    <InputSelect id="dealertype" name="dealertype" placeholder="Select"  />
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col xs={5} sm={5} md={5} lg={5} xl={5}>
                                                    Estimated Completion Time
                                                </Col>
                                                <Col xs={7} sm={7} md={7} lg={7} xl={7}>
                                                    <InputField id="receipt" name="receipt" disabled={true} value={CashSalesDetails.receipt} onChange={updateProperty} />
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col xs={5} sm={5} md={5} lg={5} xl={5}>

                                                </Col>
                                                <Col xs={7} sm={7} md={7} lg={7} xl={7}>

                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col xs={5} sm={5} md={5} lg={5} xl={5}>
                                                    Approved Time
                                                </Col>
                                                <Col xs={7} sm={7} md={7} lg={7} xl={7}>
                                                    <InputDate onChange={updateProperty} value={CashSalesDetails.acname} id="fromdate" name="fromdate" />
                                                </Col>
                                            </Row>
                                        </rbstrap.Panel>
                                    </Col>
                                    <Col xs={3} sm={3} md={3} lg={3} xl={3}>
                                        <rbstrap.Panel>
                                            <Row>
                                                <Col xs={5} sm={5} md={5} lg={5} xl={5}>
                                                    Technician
                                                </Col>
                                                <Col xs={7} sm={7} md={7} lg={7} xl={7}>
                                                    <InputSelect id="dealertype" name="dealertype" placeholder="Select"  />
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col xs={5} sm={5} md={5} lg={5} xl={5}>
                                                    Ref Amount
                                                </Col>
                                                <Col xs={7} sm={7} md={7} lg={7} xl={7}>
                                                    <InputField id="per1" name="per1" disabled={true} value={CashSalesDetails.per1} onChange={updateProperty} />
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col xs={5} sm={5} md={5} lg={5} xl={5}>
                                                    Brought Name
                                                </Col>
                                                <Col xs={7} sm={7} md={7} lg={7} xl={7}>
                                                    <InputField id="exp1" name="exp1" disabled={true} value={CashSalesDetails.exp1} onChange={updateProperty} />
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col xs={5} sm={5} md={5} lg={5} xl={5}>
                                                    Revised Date
                                                </Col>
                                                <Col xs={7} sm={7} md={7} lg={7} xl={7}>
                                                    <InputField id="return" name="return" disabled={true} value={CashSalesDetails.return} onChange={updateProperty} />
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col xs={5} sm={5} md={5} lg={5} xl={5}>
                                                    Remarks
                                                </Col>
                                                <Col xs={7} sm={7} md={7} lg={7} xl={7}>
                                                    <InputField id="return" name="return" disabled={true} value={CashSalesDetails.return} onChange={updateProperty}/>
                                                </Col>
                                            </Row>
                                        </rbstrap.Panel>
                                    </Col>
                                                             
                                </Row>
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

                                    Estimate_Form.propTypes =
                                        {
                                            CashSalesDetails: PropTypes.shape
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
                                                    ItemDetails: PropTypes.object
                                                }
                                                )
                                        }
export default asForm(Estimate_Form, "Estimate")