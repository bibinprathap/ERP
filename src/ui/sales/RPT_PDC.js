import RPT_PDC_Form from './RPT_PDC_Form';
import React, {Component} from 'react';
import ChequeDeposit_Store from '../../store/sales/ChequeDeposit_Store';
import DeliveryAddress_Store from '../../store/sales/DeliveryAddress_Store';
import {observable, toJSON, extendObservable} from 'mobx';
import * as constants from '../../constants.js';
import { NotificationManager} from 'react-notifications';
import moment  from "moment";
export default class RPT_PDC extends React.Component 
{
    constructor (props) {
        super(props);
        this.chequedepositDetails = observable(ChequeDeposit_Store);
        this.chequedepositDetails.ItemDetails=[];
        this.DeliveryAddress=observable(DeliveryAddress_Store)
        window.chequedepositDetails = this.chequedepositDetails;
        if(this.props.receiptdocno)
        {
            window.fillreceipt(this.props.receiptdocno);
        }
        this.submitForm = this.submitForm.bind(this);
    }
    submitForm(event) {
        event.preventDefault();
        console.log('Sending form', JSON.stringify(toJSON(this.chequedepositDetails), null, 2));
        // validation
        var errors = [];
        if (errors.length !== 0) return;
        var params = {};
        var obj = {};
        params['cmd'] = 'save';
        $.extend(params, JSON.parse(JSON.stringify(toJSON(this.chequedepositDetails), null, 2)));
        params.isEditMode = false;
        if (params.isEditMode) {
            params.record.id = obj.id;
        }
        var url = constants.SERVICEURL + '/savebankdeposit';
        var validatefieldlist = ['vicno', 'accode' ,'br'];
        var validatefieldname = ['Inv. No', 'Bank','Branch'];
        var receipt = {};
        var chequedepositorg = toJSON(this.chequedepositDetails);
        var validatemessges = [];
      
        if (!chequedepositorg.iseditmode) {
            chequedepositorg.userid = constants.ERP_USERID;
        }
        else {
            chequedepositorg.euserid = constants.ERP_USERID;
            NotificationManager.error('Error message', 'Not allowed to Edit Cash Sales');
            return;
        }
        validatefieldlist.forEach(function (field, index) {
            if (!chequedepositorg[field])
                validatemessges.push(validatefieldname[index] + ' is required ');
        });
        if (validatemessges.length > 0) {
            NotificationManager.error('Validation message', validatemessges.join(' , '));
            return;
        }
        chequedepositorg.docdate = moment(chequedepositorg.docdate).format("MMM DD, YYYY");
        var totalfob = 0;
        if (!chequedepositorg.iseditmode) {
            chequedepositorg.userid = constants.ERP_USERID;
        }
        else
        { chequedepositorg.euserid = constants.ERP_USERID; }

        chequedepositorg.vdate =  chequedepositorg.docdate;
        chequedepositorg.tno =  chequedepositorg.vicno + 'C';
        chequedepositorg.edate = chequedepositorg.docdate;
        chequedepositorg.userid = constants.ERP_USERID;
        chequedepositorg.LPO = constants.COMPANY;
       // chequedepositorg.docdate = moment(new Date()).format("MM/DD/YYYY");
        chequedepositorg.br = constants.ERP_BRANCH;
        //chequedepositorg.br = constants.getFieldValue(chequedepositorg.br);
        //chequedepositorg.docno = result.newdocno;
        chequedepositorg.totalfob = 0;
        chequedepositorg.trn = constants.TRN_BANKDEPOSIT;
        chequedepositorg.trnid = constants.TRNID_BANKDEPOSIT;
        chequedepositorg.src = constants.SRC_BANKDEPOSIT + constants.ERP_BRANCH;
        //chequedepositorg.vicno = chequedepositorg.newrefno;
        chequedepositorg.post = 2;
        chequedepositorg.trntype = constants.TRNTYPE_BANKDEPOSIT + constants.ERP_BRANCH;
        chequedepositorg.yyyymmdd = moment(chequedepositorg.docdate).format("YYYYMMDD");
       
       // chequedepositorg.vdate = new Date();
        chequedepositorg.userid = constants.ERP_USERID;
        chequedepositorg.yyyymmdd = moment(chequedepositorg.docdate).format("YYYYMMDD");
        var docno = chequedepositorg.vicno.split('-')[1];
        chequedepositorg.docno = docno;
        chequedepositorg.ACNAME =  chequedepositorg.acname
        chequedepositorg.ItemDetails1 =[];
        chequedepositorg.ItemDetails.forEach(function (row, ind) {
          var creditrow = {};
          row.LPO = row.vicno ;
          creditrow.LPO = row.vicno ;
          row.LTNO = row.TNO ;
          creditrow.LTNO = row.TNO ;
          row.ref1 = constants.getFieldValue(row.vicno);
          creditrow.ref1 = constants.getFieldValue(row.vicno);

          row.dtltrn = '1';
            creditrow.dtltrn = '0';
            row.TRN = 'DP'
            creditrow.TRN = 'DP'
            row.TNO = chequedepositorg.vicno +  'D' +ind  ;
            creditrow.tno = chequedepositorg.vicno  + 'C' + ind ;
            row.dc = 'D';
            creditrow.dc = 'C';
            row.docno = chequedepositorg.docno;
            creditrow.docno = chequedepositorg.docno;
            row.docdate = chequedepositorg.docdate;
            creditrow.docdate = chequedepositorg.docdate;
            row.src = chequedepositorg.src;
            creditrow.src = chequedepositorg.src;
            row.trntype = chequedepositorg.trntype;
            creditrow.trntype = chequedepositorg.trntype;
            row.br =   constants.ERP_BRANCH;
            creditrow.br =   constants.ERP_BRANCH;
            row.trn = 'DP';
            creditrow.trn = 'DP';
            row.trnid = chequedepositorg.trnid;
            creditrow.trnid = chequedepositorg.trnid;
            row.yyyymmdd = chequedepositorg.yyyymmdd;
            creditrow.yyyymmdd = chequedepositorg.yyyymmdd;
            row.accode =  constants.getFieldValue(chequedepositorg.accode);
            creditrow.accode = constants.getFieldValue( chequedepositorg.accode) ;
            creditrow.acno = JSON.parse(JSON.stringify( row.acno)) ;
            row.acno = constants.getFieldValue(chequedepositorg.accode);
            row.ana1=''  ;
           creditrow.ana1='';
          row.fcind = 'AED';
          creditrow.fcind = 'AED'
            row.fcrate = 1;
            creditrow.fcrate = 1
            row.trnid = null;
            creditrow.trnid = null;
            // row.trnid = chequedepositorg.trnid;
            // creditrow.trnid = chequedepositorg.trnid;
            row.debit = row.amount;
            creditrow.credit = row.amount;
            creditrow.fcamount = row.amount;
            row.depno = null;
            creditrow.depno = null;
            row.amt=    row.amount;
            creditrow.amt=   -1 * parseFloat(row.amount);
           
            row.N = 1;
            creditrow.N = 1;
            row.costamt = null;
            creditrow.costamt = null;
            row.vdate = chequedepositorg.vdate;
            creditrow.vdate = chequedepositorg.vdate;
            row.sid = chequedepositorg.sid;
            creditrow.sid = chequedepositorg.sid;
            row.COSTAMT = null;
            creditrow.COSTAMT = null;
            row.userid = chequedepositorg.userid;
            creditrow.userid = chequedepositorg.userid;
          
            if (!chequedepositorg.iseditmode) {
                row.userid = constants.ERP_USERID;
                creditrow.userid = constants.ERP_USERID;
            }
            else {
                row.Euserid = constants.ERP_USERID;
                creditrow.Euserid = constants.ERP_USERID;
            }

            creditrow.narration = row.narration ;
            creditrow.acname =  chequedepositorg.acname;
            creditrow.amount = row.amount;
            creditrow.ref = row.ref;
            creditrow.fdt = row.fdt;
            
               chequedepositorg.ItemDetails1.push(row);
                chequedepositorg.ItemDetails1.push(creditrow);
        });
 
    
        chequedepositorg.userid = constants.ERP_USERID;
        chequedepositorg.jobno = constants.COMPANY;
        chequedepositorg.accode = constants.getFieldValue(chequedepositorg.accode);
        chequedepositorg.fdt =  moment(new Date()).format("MMM DD, YYYY"); 
          //chequedepositorg.docdate = chequedepositorg.docdate
        var receiptformheader = this.chequedepositDetails;
        window.openModal(); $.ajax({
            type: "POST",
            url: url,
            async: true,
            cache: false,
            type: 'POST',
            data: chequedepositorg,
            dataType: "json",
            success: function (result) { window.closeModal();
                receiptformheader.iseditmode = true;
                NotificationManager.success('Success message', 'Saved Successfully');
            }.bind(this),
            error: function (jqXHR, exception) {  window.closeModal();
                //alert(exception);
                NotificationManager.error('Error message', 'Error While Saveing');
            }
        });
    }
    render () {
        return(
        <div>   
            {<RPT_PDC_Form chequedepositDetails={this.chequedepositDetails} DeliveryAddress={this.DeliveryAddress} submitForm={this.submitForm}/>}
        </div>
        )
            }

}
