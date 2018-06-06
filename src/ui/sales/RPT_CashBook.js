/// <reference path="RPT_DailyOp.js" />
/// <reference path="RPT_DailyOp.js" />
/// <reference path="RPT_DailyOp.js" />
import RPT_CashBook_Form from './RPT_CashBook_Form';
import ReactDOM from 'react-dom';
import React, {Component} from 'react';
import {observable, toJSON, extendObservable} from 'mobx';
import * as constants from '../../constants.js';
import { NotificationManager} from 'react-notifications';
import dailyreports_Store from '../../store/report/dailyreports_Store';
import moment  from "moment";
export default class RPT_CashBook extends React.Component 
{
    

    constructor (props) {
        super(props);
        this.RPT_DailyOpOptions = observable(dailyreports_Store);
        this.branches=[];
        this.salesmen=[];

        var branch = JSON.parse(window.sessionStorage["userInfo"]).branch;
        if(branch)
            constants.ERP_BRANCH = branch; 
        this.viewReport = this.viewReport.bind(this);
        this.printReportCS = this.printReportCS.bind(this);
        this.printReportCB = this.printReportCB.bind(this);
        this.resetOptions = this.resetOptions.bind(this);
    }
    printReportCS (event) {   
        var yyyymmdd =  moment(this.RPT_DailyOpOptions.fromdate).format("YYYYMMDD") ;
        var ddmmyyyy =  moment(this.RPT_DailyOpOptions.fromdate).format("DD/MM/YYYY") ;
        var RefNo='PROC|' + constants.getprocedurename('sp_GetCashStatement',constants.COMPANY) +   ';@dt|\'' + yyyymmdd + '\';@ShowOpBal|\'' + this.RPT_DailyOpOptions.truefalse + '\';@br|\'' + constants.ERP_BRANCH + '\''
        var reportURL=constants.REPORTURL + '/ReportPrint.aspx?ReportCode=RPTCASHSTATEMENT&RefNo=' + RefNo + '&heading=' + ddmmyyyy + '&subheading={BRANCH}&Company=' + constants.COMPANY
        window.open(reportURL,'new window', 'fullscreen=yes, scrollbars=auto, height=screen.height, left=0, top=0, width=screen.width, dependant=no, location=0, alwaysRaised=no, menubar=no, resizeable=no, scrollbars=n, toolbar=no, status=no, center=yes')        
    }
    printReportCB (event) {   
        var yyyymmdd =  moment(this.RPT_DailyOpOptions.fromdate).format("YYYYMMDD") ;
        var ddmmyyyy =  moment(this.RPT_DailyOpOptions.fromdate).format("DD/MM/YYYY") ;
        var RefNo='PROC|' + constants.getprocedurename('sp_GetCashBook',constants.COMPANY) +   ';@dt|\'' + yyyymmdd + '\';@ShowOpBal|\'' + this.RPT_DailyOpOptions.truefalse + '\';@br|\'' + constants.ERP_BRANCH + '\''
        var reportURL=constants.REPORTURL + '/ReportPrint.aspx?ReportCode=RPTCASHBOOK&RefNo=' + RefNo + '&heading=' + ddmmyyyy + '&subheading={BRANCH}&Company=' + constants.COMPANY
        window.open(reportURL,'new window', 'fullscreen=yes, scrollbars=auto, height=screen.height, left=0, top=0, width=screen.width, dependant=no, location=0, alwaysRaised=no, menubar=no, resizeable=no, scrollbars=n, toolbar=no, status=no, center=yes')        
    }
    resetOptions (event){}

    viewReport (event) {
        var yyyymmdd =  moment(this.RPT_DailyOpOptions.fromdate).format("YYYYMMDD") ;
        var branch = JSON.parse(window.sessionStorage["userInfo"]).branch;
        this.setState({data: this.RPT_DailyOpOptions});
        window.OpOpt=this.RPT_DailyOpOptions
        if(branch){
            constants.ERP_BRANCH = branch;}
        var loadrequest = {parem1:yyyymmdd,parem2:constants.ERP_BRANCH,company: constants.COMPANY, truefalse:this.RPT_DailyOpOptions.truefalse}
        window.openModal(); $.ajax({
            url: constants.SERVICEURL +'/getcashbook',
            type: 'POST',
            dataType: 'json',
            data: loadrequest,
            success: function (respoce, textStatus, xhr) {  window.closeModal();
                var grid;
                var gridcb;
                var datacs = respoce.cashstatement;
                var datacb = respoce.cashbook;
                var c =respoce.summary[0];
                
                //this.OpOpt = observable(cashbook_Store);
                window.OpOpt.acno=c.acno;
                window.OpOpt.opbal=c.opbal;
                window.OpOpt.debit=c.debit;
                window.OpOpt.credit=c.credit;
                window.OpOpt.clbal=c.clbal;
                //window.OpOpt=this.OpOpt;
              //  this.setState({data: this.OpOpt});

                var dataViewcs;
                var dataViewcb;
                var columnscs = [];
                var columnscb = [];
                columnscb.push({ id: "docnumd", name: "Doc. No.", field: "docnumd", width: 80,cssClass: "cell-title" });
                columnscb.push({ id: "descriptiond", name: "Narration", field: "descriptiond", width:310, groupTotalsFormatter:sumTotalLabel });
                columnscb.push({ id: "debit", name: "Debit", field: "debit", width: 90, formatter:numformatter,  groupTotalsFormatter: sumTotalsFormatter });
                columnscb.push({ id: "docnumc", name: "Doc No.", field: "docnumc", width: 80} );
                columnscb.push({ id: "descriptionc", name: "Narration", field: "descriptionc", width:310, groupTotalsFormatter:sumTotalLabel });
                columnscb.push({ id: "credit", name: "Credit", field: "credit", formatter:numformatter,  groupTotalsFormatter: sumTotalsFormatter, width: 90 } );                

                columnscs.push({ id: "docdate", name: "Date", field: "docdate", width: 80,cssClass: "cell-title" });
                columnscs.push({ id: "docnum", name: "Doc. No.", field: "docnum", width: 80,cssClass: "cell-title" });
                columnscs.push({ id: "tp", name: "Type", field: "tp", width: 130,cssClass: "cell-title", formatter:doctypeformatter });
                columnscs.push({ id: "ref", name: "Reference", field: "ref", width:120});
                columnscs.push({ id: "narration", name: "Narration", field: "narration", width:200, groupTotalsFormatter:sumTotalLabel });
                columnscs.push({ id: "debit", name: "Debit", field: "debit", width: 100, formatter:numformatter,  groupTotalsFormatter: sumTotalsFormatter });
                columnscs.push({ id: "credit", name: "Credit", field: "credit", width: 100, formatter:numformatter,  groupTotalsFormatter: sumTotalsFormatter } );
                columnscs.push({ id: "dc", name: " ", field: "dc", width:30, formatter:debitcredit});
                columnscs.push({ id: "lpo", name: "LPO", field: "lpo", width: 120} );

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

                function debitcredit(row, cell, value, columnDef, dataContext) {  
                    if (value==="D"){
                        return "DR" ;}
                    else{
                        return "CR" ;}
                }
                function doctypeformatter(row, cell, value, columnDef, dataContext){
                    return  constants.trnname(value)
                }
                function sumTotalLabel(totals, columnDef) {  
                    if (totals.group.level==0){
                        return "<span style='color:black;font-weight:bold'>Total</span>" ;}
                    else{
                        return "<span style='color:black;font-style: italic'>Sub Total</span>" ;}
                }
                
                function numformatter(row, cell, value, columnDef, dataContext){
                    if ((value===0)|| value=== null) {return "" ;}
                    else{
                        return "<span style='float: right;'>"  + constants.number_format(value,2) + "</span>" ; 
                    }                        
                }
                function sumTotalsFormatter(totals, columnDef) {
                    var val = totals.sum && totals.sum[columnDef.field];
                    if ((val === null)||(val === 0)) 
                        {return  "<span style='float: right;color:black;font-weight:bold'>0.00</span>" ;}
                    else
                    {
                        if (totals.group.level==0){
                            {/*return  "<span style='color:black;font-weight:bold'>" + ((Math.round(parseFloat(val)*100)/100)) + "</span>" ;}*/}
                            return  "<span style='float: right;color:black;font-weight:bold'>" + constants.number_format(val,2) + "</span>" ;}
                        else
                        {return  "<span style='float: right;color:black;font-style:italic'>" + constants.number_format(val,2) + "</span>" ;}
                    }                        
                }

                var options = {
                    rowHeight: 20 ,
                    autoEdit: false,
                   enableCellNavigation: false,forceFitColumns: true,
                    showHeaderRow: true,
                    headerRowHeight: 24,
                    explicitInitialization: true
                };
                function openDetails() {

                }
                //for (var i = 0; i < 500; i++) {
                //    var d = (data[i] = {});
                //    d["id"] = i;
                //    d["title"] = "Task " + i;
                //    d["description"] = "01/01/2016";
                //    d["duration"] = "01/01/2016";
                //    d["percentComplete"] = "email@gmail.com";
                //    d["start"] = "User 1";
                //    d["finish"] = "EQ Mode";
                //    d["effortDriven"] = (i % 5 == 0);
                //}

                var groupItemMetadataProvider = new Slick.Data.GroupItemMetadataProvider();
                dataViewcb = new Slick.Data.DataView({
                    groupItemMetadataProvider: groupItemMetadataProvider,
                    inlineFilters: true
                });

                var groupItemMetadataProvider1 = new Slick.Data.GroupItemMetadataProvider();
                dataViewcs = new Slick.Data.DataView({
                    groupItemMetadataProvider: groupItemMetadataProvider1,
                    inlineFilters: true
                });

                setTimeout(function(){
                    grid = new Slick.Grid("#dailyopGrid", dataViewcs, columnscs, options);                    
                    grid.registerPlugin(groupItemMetadataProvider);
                    grid.setSelectionModel(new Slick.CellSelectionModel());

                    window.performagrid = grid;
                    var columnpicker = new Slick.Controls.ColumnPicker(columnscs, grid, options);
                    dataViewcs.onRowCountChanged.subscribe(function (e, args) {
                        grid.updateRowCount();
                        grid.render();
                    });
                    dataViewcs.onRowsChanged.subscribe(function (e, args) {
                        grid.invalidateRows(args.rows);
                        grid.render();
                    });
                    $(grid.getHeaderRow()).delegate(":input", "change keyup", function (e) {
                        var columnId = $(this).data("columnId");
                        if (columnId != null) {
                            columnFilters[columnId] = $.trim($(this).val());
                            dataViewcs.refresh();
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
                    dataViewcs.beginUpdate();
                    dataViewcs.setItems(datacs);
                    dataViewcs.setFilter(filter);
                    dataViewcs.setGrouping({
                        //getter: "btrn",
                        formatter: function (g) {
                            return '' //"Document Type:  " + g.value + "  <span style='color:green'>(" + g.count + " items)</span>";
                        },
                        aggregators: [
                          new Slick.Data.Aggregators.Sum("debit"),
                          new Slick.Data.Aggregators.Sum("credit"),
                        ],
                        aggregateCollapsed: false,
                        lazyTotalsCalculation: true
                    });
                    dataViewcs.endUpdate();
                    var h = 0;
                },100);

                setTimeout(function(){
                    gridcb = new Slick.Grid("#cbGrid", dataViewcb, columnscb, options);
                    gridcb.registerPlugin(groupItemMetadataProvider1);
                    gridcb.setSelectionModel(new Slick.CellSelectionModel());

                    window.performagrid1 = gridcb;
                    var columnpicker = new Slick.Controls.ColumnPicker(columnscb, gridcb, options);
                    dataViewcb.onRowCountChanged.subscribe(function (e, args) {
                        gridcb.updateRowCount();
                        gridcb.render();
                    });
                    dataViewcb.onRowsChanged.subscribe(function (e, args) {
                        gridcb.invalidateRows(args.rows);
                        gridcb.render();
                    });
                    $(gridcb.getHeaderRow()).delegate(":input", "change keyup", function (e) {
                        var columnId = $(this).data("columnId");
                        if (columnId != null) {
                            columnFilters[columnId] = $.trim($(this).val());
                            dataViewcb.refresh();
                        }
                    });
                    gridcb.onHeaderRowCellRendered.subscribe(function (e, args) {
                        $(args.node).empty();
                        $("<input type='text'>")
                           .data("columnId", args.column.id)
                           .val(columnFilters[args.column.id])
                           .appendTo(args.node);
                    });

                    gridcb.init();
                    dataViewcb.beginUpdate();
                    dataViewcb.setItems(datacb);
                    dataViewcb.setFilter(filter);
                    dataViewcb.setGrouping({
                        //getter: "btrn",
                        formatter: function (g) {
                            return '' //"Document Type:  " + g.value + "  <span style='color:green'>(" + g.count + " items)</span>";
                        },
                        aggregators: [
                          new Slick.Data.Aggregators.Sum("debit"),
                          new Slick.Data.Aggregators.Sum("credit"),
                        ],
                        aggregateCollapsed: false,
                        lazyTotalsCalculation: true
                    });
                    dataViewcb.endUpdate();
                    var h = 0;
                },100);
            },
            error: function (xhr, textStatus, errorThrown) { window.closeModal();
                console.log('Error in Operation');
            }
        });
        
    }
    render () {
        return(
        <div>   
           
            {  <RPT_CashBook_Form RPT_DailyOpOptions={this.RPT_DailyOpOptions} 
                    viewReport = {this.viewReport} 
                    printReportCS={this.printReportCS} printReportCB={this.printReportCB} 
                    resetOptions={this.resetOptions} reportTitle='Cash Book'/> }
        </div>
        )
}

}

