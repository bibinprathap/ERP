import RPT_SOA_Form from './RPT_SOA_Form';
import ReactDOM from 'react-dom';
import React, {Component} from 'react';
import {observable, toJSON, extendObservable} from 'mobx';
import * as constants from '../../constants.js';
import { NotificationManager} from 'react-notifications';
import dailyreports_Store from '../../store/report/dailyreports_Store';
import moment  from "moment";


export default class RPT_SOA extends React.Component 
{
    constructor (props) {
        super(props);
        this.RPT_SOAOptions = observable(dailyreports_Store);
        this.branches=[];
        this.salesmen=[];
        var branch = JSON.parse(window.sessionStorage["userInfo"]).branch;
        if(branch)
            constants.ERP_BRANCH = branch; 
        this.viewReport = this.viewReport.bind(this);
        this.printReport = this.printReport.bind(this);
        this.resetOptions = this.resetOptions.bind(this);
       
    }
    printReport (event) {   
        var fromdate =  moment(this.RPT_SOAOptions.fromdate).format("YYYYMMDD") ;
        var todate =  moment(this.RPT_SOAOptions.todate).format("YYYYMMDD") ;
        var fromdated =  moment(this.RPT_SOAOptions.fromdate).format("DD/MM/YYYY") ;
        var todated =  moment(this.RPT_SOAOptions.todate).format("DD/MM/YYYY") ;
        var RefNo='PROC|' + constants.getprocedurename('sp_GetSOA',constants.COMPANY) +   ';@fromdate|\'' + fromdate + '\';@todate|\'' + todate + '\';@accno|\'' + constants.getFieldValue(this.RPT_SOAOptions.acno) + '\';@All|'+ this.RPT_SOAOptions.truefalse;
        var reportURL=constants.REPORTURL + '/ReportPrint.aspx?ReportCode=RPTSOA&RefNo=' + RefNo + '&heading=' + fromdated + '&subheading='+ todated +'&subheading1=' + this.RPT_SOAOptions.truefalse + '&Company=' + constants.COMPANY
        window.open(reportURL,'new window', 'fullscreen=yes, scrollbars=auto, height=screen.height, left=0, top=0, width=screen.width, dependant=no, location=0, alwaysRaised=no, menubar=no, resizeable=no, scrollbars=n, toolbar=no, status=no, center=yes')        
    }
    resetOptions (event){}

    viewReport (event) {
        var fromdate =  moment(this.RPT_SOAOptions.fromdate).format("YYYYMMDD") ;
        var todate =  moment(this.RPT_SOAOptions.todate).format("YYYYMMDD") ;        
        window.setcompany();
        var loadrequest = {parem1:constants.getFieldValue(this.RPT_SOAOptions.acno),parem2:fromdate,parem3:todate,parem4:this.RPT_SOAOptions.truefalse, company:constants.COMPANY}
        var dailyreportdata = this.RPT_SOAOptions;
        window.openModal(); $.ajax({
            url: constants.SERVICEURL +'/Vouchers/getVouchersGL',
            type: 'POST',
            dataType: 'json',
            data: loadrequest,
            success: function (respoce, textStatus, xhr) {  window.closeModal();
                var grid;
                var newdata = respoce;
                var data = [];
                var balance = 0;
                var   totalrow =   {id: -1  ,docdate:'',TNO:'',DOCNO:'',br:'',ref:'',description:'Total',debit:0,credit:0,balance:'',dc:'',USERNAME:''};
                newdata.forEach(function(row,index){
                    balance = balance + parseFloat(row.amt);
                    row.balance =  balance;
                    data.push(row);
                    if(row.debit)
                        totalrow.debit = (parseFloat(totalrow.debit)+parseFloat(row.debit));
                    if(row.credit)
                        totalrow.credit = (parseFloat(totalrow.credit)+parseFloat(row.credit));
                });
                totalrow.description="Total"
                totalrow.balance =balance;
                data.push(totalrow);
                var dataView;
                var columns = [
                  { id: "id", name: "SNO", field: "id", width: 30, cssClass: "cell-title" , formatter:sumidLabel},
                  { id: "docdate", name: "Date", field: "docdate", width: 80, cssClass: "cell-title" },
                  { id: "docnum", name: "Doc. No", field: "docnum", width: 100 },
                  { id: "ref", name: "Reference", field: "ref", minWidth: 120 },
                  { id: "description", name: "Description", field: "description", minWidth: 400 , formatter:sumTotalLabel},
                  { id: "debit", name: "DEBIT", field: "debit", minWidth: 90, formatter:numformatter },
                  { id: "credit", name: "CREDIT", field: "credit", minWidth: 90 , formatter:numformatter},
                  { id: "balance", name: "BALANCE", field: "balance", minWidth: 90, formatter:numformatter}
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
                function numformatter(row, cell, value, columnDef, dataContext){
                    if (dataContext.id===-1){
                        return "<span style='float: right;color:black;font-weight:bold'>"+  constants.number_format(value,2) +"</span>" ;}
                    else if  (dataContext.id===-2)
                    {return "<span style='float: right;color:black;font-weight:bold'>"+ constants.number_format(value,2)+ "</span>" ;}
                    else
                    {return "<span style='float: right;'>"  + constants.number_format(value,2) + "</span>" ; }
                }
                function sumidLabel (row, cell, value, columnDef, dataContext){
                    if ((value===-1) || (value===-2)) {
                        return ""}
                    else {return value}
                }

                function sumTotalLabel (row, cell, value, columnDef, dataContext){
                    if (dataContext.id===-1){
                        return "<span style='color:black;font-weight:bold'>Total</span>" ;}
                    else if  (dataContext.id===-2)
                    {return "<span style='color:black;font-weight:bold'>Balance</span>" ;}
                    else
                    {return value}
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
                grid = new Slick.Grid("#soaGrid", dataView, columns, options);
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
    return(
    <div>   
           
        {  <RPT_SOA_Form RPT_SOAOptions={this.RPT_SOAOptions} 
            viewReport = {this.viewReport} printReport={this.printReport} 
resetOptions={this.resetOptions} reportTitle='Statement Of Account'/> }

    </div>
        )
}

}

