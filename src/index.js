import React from 'react'
import ReactDOM from 'react-dom'
import NewStudent from './ui/sales/NewStudent'
import StudentList from './ui/sales/StudentList'

import RPT_CreditSales from './ui/sales/RPT_CreditSales'
import RPT_Purchase from './ui/sales/RPT_Purchase'
import RPT_NegativeItems from './ui/sales/RPT_NegativeItems'
import RPT_NetPurchase from './ui/sales/RPT_NetPurchase'
import RPT_DatewisePurchase from './ui/sales/RPT_DatewisePurchase'
import RPT_MonthwisePurchase from './ui/sales/RPT_MonthwisePurchase'
import RPT_PurchaseSale from './ui/sales/RPT_PurchaseSale'
import RPT_PendingItems from './ui/sales/RPT_PendingItems'
import RPT_SalesmanwiseSales from './ui/sales/RPT_SalesmanwiseSales'
import RPT_PDC from './ui/sales/RPT_PDC'
import CashSales from './ui/sales/CashSales'
import CustomerComplaint_SubForm from './ui/sales/CustomerComplaint_SubForm'
import Estimate from './ui/sales/Estimate'
import * as constants from './constants.js';
import StockTransfer from './ui/sales/StockTransfer'



var openModal  = function() {
   // document.getElementById('modal').style.display = 'block';
   // document.getElementById('fade').style.display = 'block';
}
window.openModal = openModal;

var closeModal  = function() {
//document.getElementById('modal').style.display = 'none';
//document.getElementById('fade').style.display = 'none';
}
window.closeModal = closeModal;

var newstudents = function () {
    ReactDOM.render(
        <NewStudent />, document.getElementById('root')
    );
    
}
window.newstudents = newstudents;
//window.newstudents();

var studentlist = function () {
    ReactDOM.render(
        <StudentList />, document.getElementById('root')
    );
}
//window.studentlist = studentlist;


var creditsalesreport = function () {
    ReactDOM.render(
        <RPT_CreditSales />, document.getElementById('root')
    );
}
window.creditsalesreport = creditsalesreport;
//window.newstudents();
// window.studentlist();
//window.creditsalesreport();


var purchasereport = function () {
    ReactDOM.render(
        <RPT_Purchase />, document.getElementById('root')
    );
}
window.purchasereport = purchasereport;
//window.purchasereport();

var negativeitemsreport = function () {
    ReactDOM.render(
        <RPT_NegativeItems />, document.getElementById('root')
    );
}
window.negativeitemsreport = negativeitemsreport;
//window.negativeitemsreport();

var netpurchasereport = function () {
    ReactDOM.render(
        <RPT_NetPurchase />, document.getElementById('root')
    );
}
window.netpurchasereport = netpurchasereport;
//window.netpurchasereport();

var datewisepurchasereport = function () {
    ReactDOM.render(
        <RPT_DatewisePurchase />, document.getElementById('root')
    );
}
window.datewisepurchasereport = datewisepurchasereport;
//window.datewisepurchasereport();

var monthwisepurchasereport = function () {
    ReactDOM.render(
        <RPT_MonthwisePurchase />, document.getElementById('root')
    );
}
window.monthwisepurchasereport = monthwisepurchasereport;
//window.monthwisepurchasereport();

var purchasesalereport = function () {
    ReactDOM.render(
        <RPT_PurchaseSale />, document.getElementById('root')
    );
}
window.purchasesalereport = purchasesalereport;
window.purchasesalereport();

var pendingitemsreport = function () {
    ReactDOM.render(
        <RPT_PendingItems />, document.getElementById('root')
    );
}
window.pendingitemsreport = pendingitemsreport;
//window.pendingitemsreport();

var salesmanwisesales = function () {
    ReactDOM.render(
        <RPT_SalesmanwiseSales />, document.getElementById('root')
    );
}
window.salesmanwisesales = salesmanwisesales;
//window.salesmanwisesales();

var chequedeposit = function () {
    ReactDOM.render(
        <RPT_PDC />, document.getElementById('root')
    );
}
window.chequedeposit = chequedeposit;
//window.chequedeposit();

var cashsales = function () {
    ReactDOM.render(
        <CashSales />, document.getElementById('root')
    );
}
window.cashsales = cashsales;
//window.cashsales();

var estimate = function () {
    ReactDOM.render(
        <Estimate />, document.getElementById('root')
    );
}
window.estimate = estimate;
//window.estimate();


var stocktransfer = function () {
    ReactDOM.render(
        <StockTransfer />, document.getElementById('root')
    )
   window.SPstate.go('changestate'); 
}
window.StockTransfer = stocktransfer;
window.StockTransfer();