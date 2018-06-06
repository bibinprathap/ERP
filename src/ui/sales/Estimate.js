import Estimate_Form from './Estimate_Form';
import React, { Component } from 'react';
import CashSales_Store from '../../store/sales/CashSales_Store';
import CashSalesItem_Store from '../../store/sales/CashSalesItem_Store';
import DeliveryAddress_Store from '../../store/sales/DeliveryAddress_Store';
import { observable, toJSON, extendObservable } from 'mobx';
import * as constants from '../../constants.js';
import { NotificationManager } from 'react-notifications';
import moment from "moment";
export default class Estimate extends React.Component {
    constructor(props) {
        super(props);
        this.CashSalesDetails = observable(CashSales_Store);
        this.CashSalesDetails.ItemDetails = [];
        this.DeliveryAddress = observable(DeliveryAddress_Store)
        window.CashSalesDetails = this.CashSalesDetails;
        if (this.props.cashsalesdocno) {
            window.fillcashsales(this.props.cashsalesdocno);
        }
        this.submitForm = this.submitForm.bind(this);
    }
    submitForm(event) {
        event.preventDefault();
        console.log('Sending form', JSON.stringify(toJSON(this.CashSalesDetails), null, 2));
        // validation
        var errors = [];
        if (errors.length !== 0) return;
        // submit save
        // if (postData == null) postData = {};

        // obj.lock(w2utils.lang(obj.msgSaving) + ' <span id="'+ obj.name +'_progress"></span>');
        // need timer to allow to lock

        // build parameters list
        var params = {};
        var obj = {};
        // add list params
        params['cmd'] = 'save';
        // params['recid'] = obj.recid;
        // append other params
        $.extend(params, JSON.parse(JSON.stringify(toJSON(this.CashSalesDetails), null, 2)));
        //$.extend(params, postData);
        // clear up files

        params.isEditMode = false;
        if (params.isEditMode) {
            params.record.id = obj.id;
        }
        // event before
        //var edata = obj.trigger({ phase: 'before', type: 'submit', target: obj.name, url: obj.url, postData: params });
        //if (edata.isCancelled === true) return;
        // default action
        //if (typeof edata.url == 'object' && edata.url.save) url = edata.url.save;
        //if (obj.last.xhr) try { obj.last.xhr.abort(); } catch (e) {}
        // process url with routeData
        //if (!$.isEmptyObject(obj.routeData)) {
        //    var info  = w2utils.parseRoute(url);
        //    if (info.keys.length > 0) {
        //        for (var k = 0; k < info.keys.length; k++) {
        //            if (obj.routeData[info.keys[k].name] == null) continue;
        //            url = url.replace((new RegExp(':'+ info.keys[k].name, 'g')), obj.routeData[info.keys[k].name]);
        //        }
        //    }
        //}
        var url = constants.SERVICEURL + '/savecashsales';
        //var product = { 'Id': 12, 'Name': 'Maya', 'Category': 'newcat', 'Price': 1234 };
        if(constants.ERP_TYPE == 'AUTO')
        {
        var validatefieldlist = ['vicno', 'ref', 'acno','sid'];
        var validatefieldname = ['Inv. No', 'Phone No', 'A/C Code','Salesman'];
        }
        else
        {
             var validatefieldlist = ['vicno','acno','sid'];
             var validatefieldname = ['Inv. No','A/C Code','Salesman'];
        }
        var cashsales = {};
        var cashsalesorg = toJSON(this.CashSalesDetails);
        var validatemessges = [];
        validatefieldlist.forEach(function (field, index) {
            if (!cashsalesorg[field])
                validatemessges.push(validatefieldname[index] + ' is required ' );
        });

        if (validatemessges.length > 0) {
            NotificationManager.error('Validation message', validatemessges.join(' , '));
            return;
        }
        //salesquotaion.ItemDetails1 = [];
        //salesquotaionorg.ItemDetails1.forEach(function(row,index){
        //    var gridrow = {};
        //    ['Description','PartNo','Brand','Qty','Price'].forEach(function(field,index)
        //           {
        //         gridrow[field] = row[field]
        //    });
        //    salesquotaion.ItemDetails1.push(gridrow)
        //});
        //  var salesquotaion  = toJSON(this.SalesQuoteDetails);
        // var salesquotaion =  {QuoteRefNo:this.SalesQuoteDetails.QuoteRefNo,ChaiseNo:this.SalesQuoteDetails.ChaiseNo,BrandName:this.SalesQuoteDetails.BrandName};

         cashsalesorg.docdate = moment(cashsalesorg.docdate).format("MMM DD, YYYY");
        // cashsalesorg.docdate = moment(cashsalesorg.docdate).format("MM/DD/YYYY");
        var totalfob = 0;
        if (!cashsalesorg.iseditmode) {
            cashsalesorg.userid = constants.ERP_USERID;
        }
        else {
        cashsalesorg.euserid = constants.ERP_USERID;
        var invoicerolls = constants.checkUserAccess(constants.ERP_ROLLPREVILLAGES, 'cashsales', 'EDIT', constants.ERP_ROLLID)
        if (invoicerolls.length == 0) {
            NotificationManager.error('Access Denied', 'Access Denied For this User');
            return;
        }
            // NotificationManager.error('Error message', 'Not allowed to Edit Cash Sales');
            // return;
        }
        cashsalesorg.sid = constants.getFieldValue(cashsalesorg.sid);
        cashsalesorg.userid = constants.ERP_USERID;
        cashsalesorg.userid1 = constants.COMPANY;



      var  cashamt = parseFloat(cashsalesorg.amount || 0) - parseFloat(cashsalesorg.adv || 0);
        cashsalesorg.adv = cashamt > 0 ? parseFloat(cashsalesorg.adv || 0) : parseFloat(cashsalesorg.amount || 0);
        this.CashSalesDetails.adv = cashsalesorg.adv;
        if(parseFloat(cashsalesorg.cash || 0) <0 )
         cashsalesorg.cash  = 0;
         this.CashSalesDetails.cash  = 0;

        if (parseFloat(cashsalesorg.amount || 0) != (parseFloat(cashsalesorg.adv || 0) + parseFloat(cashsalesorg.cash || 0) + parseFloat(cashsalesorg.cc || 0)+ parseFloat(cashsalesorg.chq || 0) )) {
            NotificationManager.error('Error message', 'Total Amount is not equal to Cash + credit Card +Cheque +Advance ');
            return;
        }
        if ((parseFloat(cashsalesorg.gross || 0) - parseFloat(cashsalesorg.pricediscount || 0) + parseFloat(cashsalesorg.tax || 0) - parseFloat(cashsalesorg.disc || 0)).toFixed() != parseFloat(cashsalesorg.amount || 0).toFixed()) {
            NotificationManager.error('Error message', 'Gross Amount - discount is not equal to Total Amount');
            return;
        }
        cashsalesorg.vdate = cashsalesorg.docdate;
        cashsalesorg.edate = cashsalesorg.docdate;
        cashsalesorg.yyyymmdd = moment(cashsalesorg.docdate).format("YYYYMMDD");
        var docno = cashsalesorg.vicno.split('-')[1];
        cashsalesorg.docno = docno;
        cashsalesorg.dealertype = "2";
        cashsalesorg.ItemDetails1 = [];
        cashsalesorg.ItemDetails.forEach(function (row, ind) {
            // row.ITEMID = 'MB221.277.0195GER'
            //row.PARTNO = '221.277.0195' 
            //row.SEC    = 'MB'
            //row.BRAND  = 'GER' 
            //row.IDESC  = 'GEAR FILTER 221 7 SPEED' 
            //row.QTY    = 1 
            //row.QTY1    = -1 
            //row.UNIT   = ''
            //row.UNITPRICE= 200
            //row.TOTAL  = 200.00
            row.io = 'O'
            row.src = cashsalesorg.src;
            row.docdate = cashsalesorg.docdate;
            row.yyyymmdd = cashsalesorg.yyyymmdd;
            row.acno = cashsalesorg.acno;
            row.br = cashsalesorg.br;
            row.srno = ind;
            row.trntype = cashsalesorg.trntype;
            row.trn = cashsalesorg.trn;
            //row.costp   = 22
            row.fcind = 'AED'
            row.fcrate = 1
            row.trnid = 11
            row.exprice = 0
            row.extotal = 0
            row.sdisc = 0
            row.unit = 'PCS'
            row.tno = cashsalesorg.vicno + row.itemid;
            row.docno = cashsalesorg.docno;
            row.trnid = cashsalesorg.trnid;
            row.yyyymmdd = cashsalesorg.yyyymmdd;
            row.acno = cashsalesorg.acno;
            row.qty1 = -1 * row.qty;
            row.io = 'O';
            row.ltotal = row.total;
            row.ref = cashsalesorg.ref;
            row.costamt = row.qty * row.costp;
            row.vdate = cashsalesorg.vdate;
            row.sid = cashsalesorg.sid;
            row.COSTAMT = row.qty * row.costp;
            row.userid = cashsalesorg.userid;
            if (row.brf == 91 && row.isservice!= 1) {
                row.costamt = 0;
                row.COSTAMT = 0;
                row.costp = 0;
                cashsalesorg.ItemDetails1.push({
                    SRNO: row.srno,
                    TNO: row.vicno + row.sec,
                    VICNO: parseFloat(row.vicno),
                    QTY: parseFloat(row.qty) - parseFloat(row.stockqty||0),
                    UNITPRICE: row.unitprice,
                    //ITEMID : 'PRTXVIEWSALE',
                    ITEMID: row.itemid,
                    PARTNO: row.partno,
                    USERID: cashsalesorg.userid,
                    acno: row.acno,
                    br: row.br,
                    src: row.src,
                    trntype: 'PO#',
                    IDESC: row.idesc,
                    brand: row.sec,
                    SEC: row.brand ,
                    REF: row.vicno,
                    TRN: 'OI',
                    DOCDATE: moment(cashsalesorg.docdate).format("DD/MM/YYYY"),
                    YYYYMMDD: cashsalesorg.yyyymmdd,
                    TIME: cashsalesorg.time
                });
            }

            if (!cashsalesorg.iseditmode) {
                row.userid = constants.ERP_USERID;
            }
            else {
                row.Euserid = constants.ERP_USERID;
            }

            if (constants.ERP_BRANCH == '1')
                row.qty01 = row.qty1;
            else if (constants.ERP_BRANCH == '2')
                row.qty02 = row.qty1;
            else if (constants.ERP_BRANCH == '3')
                row.qty03 = row.qty1;
            else if (constants.ERP_BRANCH == '4')
                row.qty04 = row.qty1;
            else if (constants.ERP_BRANCH == '5')
                row.qty05 = row.qty1;
            else if (constants.ERP_BRANCH == '6')
                row.qty06 = row.qty1;
            else if (constants.ERP_BRANCH == '7')
                row.qty07 = row.qty1;
            else if (constants.ERP_BRANCH == '8')
                row.qty08 = row.qty1;

            if (row.brf == '1')
                row.do01 = row.qty;
            else if (row.brf == '2')
                row.do02 = row.qty;
            else if (row.brf == '3')
                row.do03 = row.qty;
            else if (row.brf == '4')
                row.do04 = row.qty;

            // Update STKXLDG Set costp = stkxmst.avgcostp FROM STKXMST 
            // WHERE  STKXMST.ITEMID = STKXLDG.itemid AND STKXLDG.VICNO='CS2-3499'

        });
       

        var cashsalesformheader = this.CashSalesDetails;
        cashsalesorg.bal =0;
        delete cashsalesorg.ItemDetails2;
        delete cashsalesorg.ItemDetails3;
        delete cashsalesorg.ItemDetails4;
        delete cashsalesorg.ItemDetailsSales;
        window.openModal(); $.ajax({
            type: "POST",
            url: url,
            async: true,
            cache: false,
            data: cashsalesorg,
            dataType: "json",
            success: function (result) {
                window.closeModal();
                cashsalesformheader.iseditmode = true;
                //window.cashsalesform.handleNew();
                window.cashsalesform.handleEditOpen()

                NotificationManager.remove({ id: 1 });
                NotificationManager.create({
                    id: 1,
                    type: "success",
                    message: 'Saved Successfully',
                    title: 'Success message',
                    timeOut: 0
                });
                setTimeout(function () {
                    NotificationManager.remove({ id: 1 });
                }, 2000);

            },
            error: function (jqXHR, exception) {
                window.closeModal();
                //alert(exception);
                NotificationManager.error('Error message', 'Error While Saveing');
            }
        });




    }

    render() {
        return (
            <div>
                {<Estimate_Form CashSalesDetails={this.CashSalesDetails} DeliveryAddress={this.DeliveryAddress} submitForm={this.submitForm} />}
            </div>
        )
    }

}
