import RPT_ARAP_Form from './RPT_APAR_Form';
import React, {Component} from 'react';
import {observable, toJSON, extendObservable} from 'mobx';
import * as constants from '../../constants.js';
import { NotificationManager} from 'react-notifications';
import dailyreports_Store from '../../store/report/dailyreports_Store';
import moment  from "moment";
export default class RPT_AccountsReceivable extends React.Component 
{
    constructor (props) {
        super(props);
        this.RPT_DailyOpOptions = observable(dailyreports_Store);
        this.branches=[];
        this.salesmen=[];
        window.RPT_DailyOpOptions = this.RPT_DailyOpOptions;
        this.viewReport = this.viewReport.bind(this);
        this.printReport = this.printReport.bind(this);
        this.printReportex = this.printReportex.bind(this);
        this.resetOptions = this.resetOptions.bind(this);
    }
    printReport (event) {
        var yyyymmdd =  moment(this.RPT_DailyOpOptions.fromdate).format("YYYYMMDD") ;
        var ddmmyyyy =  moment(this.RPT_DailyOpOptions.fromdate).format("DD/MM/YYYY") ;
        var glac =  constants.getFieldValue(this.RPT_DailyOpOptions.acno);
        var RefNo='PROC|' + constants.getprocedurename('SP_GetAccountsPayable',constants.COMPANY) +   ';@dt|\'' + yyyymmdd + '\';@glac|\'' + glac + '\''
        var reportURL=constants.REPORTURL + '/ReportPrint.aspx?ReportCode=RPTAP&RefNo=' + RefNo + '&heading=' + ddmmyyyy + '&subheading='+ glac +'&Company=' + constants.COMPANY
        window.open(reportURL,'new window', 'fullscreen=yes, scrollbars=auto, height=screen.height, left=0, top=0, width=screen.width, dependant=no, location=0, alwaysRaised=no, menubar=no, resizeable=no, scrollbars=n, toolbar=no, status=no, center=yes')        
    }

    printReportex (event) {
        var yyyymmdd =  moment(this.RPT_DailyOpOptions.fromdate).format("YYYYMMDD") ;
        var ddmmyyyy =  moment(this.RPT_DailyOpOptions.fromdate).format("DD/MM/YYYY") ;
        var glac =  constants.getFieldValue(this.RPT_DailyOpOptions.acno);
        var RefNo='PROC|' + constants.getprocedurename('SP_GetAccountsPayable',constants.COMPANY) +   ';@dt|\'' + yyyymmdd + '\';@glac|\'' + glac + '\''
        var reportURL=constants.REPORTURL + '/ReportPrint.aspx?CSVExport=Y&ReportCode=RPTAP&RefNo=' + RefNo + '&heading=' + ddmmyyyy + '&subheading='+ glac +'&Company=' + constants.COMPANY
        window.open(reportURL,'new window', 'fullscreen=yes, scrollbars=auto, height=screen.height, left=0, top=0, width=screen.width, dependant=no, location=0, alwaysRaised=no, menubar=no, resizeable=no, scrollbars=n, toolbar=no, status=no, center=yes')        
    }

    resetOptions (event){}
    
    viewReport (event) {
        var yyyymmdd =  moment(this.RPT_DailyOpOptions.fromdate).format("YYYYMMDD") ;
        var glac =  constants.getFieldValue(this.RPT_DailyOpOptions.acno);
        var loadrequest = {parem1:yyyymmdd,parem2:glac,company: constants.COMPANY}
         var reportparam = this.RPT_DailyOpOptions;
        window.openModal(); $.ajax({
            url: constants.SERVICEURL +'/accountspayable',
            type: 'POST',
            dataType: 'json',
            data: loadrequest,
            success: function (respoce, textStatus, xhr) {  window.closeModal();
                var grid;
                var data = respoce;
                var totalcr =0
                var totaldr =0
                data.forEach(function(row,ind){
                    totalcr = totalcr + row.credit
                    totaldr = totaldr + row.debit
                })
                var total=totaldr - totalcr

                var newrow={};
                newrow.credit =totalcr;
                newrow.debit =totaldr;
                newrow.id =-1;
                newrow.acname="Total";
                data.push(newrow);

                var newrow={};
                if(total>0)
                {                        
                    newrow.debit =total;
                }
                else
                {
                    newrow.credit =total*-1;
                }
                newrow.id =-2;
                newrow.acname="Balance";
                data.push(newrow);
                    
                var dataView;
                var columns = [];
                var checkboxSelector = new Slick.CheckboxSelectColumn({
                    cssClass: "slick-cell-checkboxsel"
                });
                columns.push(checkboxSelector.getColumnDefinition());
                columns.push({ id: "id", name: "SL#", field: "id", width: 40, cssClass: "cell-title",formatter: sumidLabel });
                columns.push({ id: "glac", name: "GL A/c", field: "glac", minWidth: 80 } );
                columns.push({ id: "acno", name: "Sup A/c", field: "acno", width: 80, cssClass: "cell-title" });
                columns.push({ id: "acname", name: "Supplier Name", field: "acname", width: 400, formatter: sumTotalLabel });
                columns.push({ id: "debit", name: "Debit", field: "debit", width: 110,   formatter:numformatter });
                columns.push({ id: "credit", name: "Credit", field: "credit", width: 110, formatter:numformatter });
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

                function numformatter(row, cell, value, columnDef, dataContext){
                    if (dataContext.id===-1){
                        return "<span style='float: right;color:black;font-weight:bold'>"+  constants.number_format(value,2) +"</span>" ;}
                    else if  (dataContext.id===-2)
                    {return "<span style='float: right;color:black;font-weight:bold'>"+ constants.number_format(value,2)+ "</span>" ;}
                    else
                        {return "<span style='float: right;'>"  + constants.number_format(value,2) + "</span>" ; }
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
                dataView = new Slick.Data.DataView();
                setTimeout(function(){
                    grid = new Slick.Grid("#dailyopGrid", dataView, columns, options);
                    grid.setSelectionModel(new Slick.RowSelectionModel({selectActiveRow: false}));
                    grid.registerPlugin(checkboxSelector);
                    window.performagrid = grid;
                    var columnpicker = new Slick.Controls.ColumnPicker(columns, grid, options);
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

                    grid.onClick.subscribe(function (e, args) {
                        var fromdate =  '' ;
                        var todate =  moment(reportparam.todate).format("YYYYMMDD") ;
                        window.setcompany();
                        var loadrequest = {
                            parem1:dataView.getItem(args.row).acno,
                            parem3:todate,
                            parem2:fromdate,
                            parem4:constants.ERP_BRANCH,
                            company:constants.COMPANY}
                        window.SOApopupshow(loadrequest);
                    });

                    grid.init();
                    window.grid = grid;
                    dataView.beginUpdate();
                    dataView.setItems(data);
                    
                    dataView.setFilter(filter);
                    dataView.endUpdate();
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
           
            {  <RPT_ARAP_Form RPT_DailyOpOptions={this.RPT_DailyOpOptions} getarapgroupsname ='getapgroups'
                    viewReport = {this.viewReport}  printReport={this.printReport}  printReportex={this.printReportex} 
                    resetOptions={this.resetOptions} reportTitle='Account Payable Report'/> }

</div>
        )
}

}

