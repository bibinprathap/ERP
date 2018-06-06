import RPT_PendingItems_Form from './RPT_PendingItems_Form';
import React, {Component} from 'react';
import {observable, toJSON, extendObservable} from 'mobx';
import * as constants from '../../constants.js';
import { NotificationManager} from 'react-notifications';
import dailyreports_Store from '../../store/report/dailyreports_Store';
import moment  from "moment";
export default class RPT_PendingItems extends React.Component 
{
    constructor (props) {
        super(props);
        this.RPT_DailyOpOptions = observable(dailyreports_Store);
        this.branches=[];
        this.salesmen=[];
         
        this.viewReport = this.viewReport.bind(this);
        this.printReport = this.printReport.bind(this);
        this.resetOptions = this.resetOptions.bind(this);
    }
    printReport (event) {
        var yyyymmddf =  moment(this.RPT_DailyOpOptions.fromdate).format("YYYYMMDD") ;
        var ddmmyyyyfrom =  moment(this.RPT_DailyOpOptions.fromdate).format("DD/MM/YYYY") ;
        var yyyymmddt =  moment(this.RPT_DailyOpOptions.todate).format("YYYYMMDD") ;
        var ddmmyyyyto =  moment(this.RPT_DailyOpOptions.todate).format("DD/MM/YYYY") ;
        var RefNo='PROC|' + constants.getprocedurename('SP_GetAllpendingallowcation_Report',constants.COMPANY) + ';@fromdates|' + yyyymmddf + ';@todates|' + yyyymmddt + ';@supplier|' + constants.getFieldValue( this.RPT_DailyOpOptions.custsupname) ;
        var reportURL=constants.DSREPORTURL + '/ReportPrint.aspx?ReportCode=PENDING_RECEIPT_LIST&RefNo=' + RefNo + '&heading=PENDING RECEIPTS' + '&subheading='+ constants.getFieldValue( this.RPT_DailyOpOptions.custsupname) ;
        window.open(reportURL,'new window', 'fullscreen=yes, scrollbars=auto, height=screen.height, left=0, top=0, width=screen.width, dependant=no, location=0, alwaysRaised=no, menubar=no, resizeable=no, scrollbars=n, toolbar=no, status=no, center=yes');
    }
    resetOptions (event){}

    viewReport (event) {
        var fromdate =  moment(this.RPT_DailyOpOptions.fromdate).format("YYYYMMDD") ;
        var todate =  moment(this.RPT_DailyOpOptions.todate).format("YYYYMMDD") ;
        var loadrequest = {parem1:fromdate,parem2:todate,company: constants.COMPANY};
        if(constants.getFieldValue( this.RPT_DailyOpOptions.custsupname)) 
            loadrequest.parem3 =  constants.getFieldValue( this.RPT_DailyOpOptions.custsupname)
        window.openModal(); $.ajax({
            url: constants.SERVICEURL +'/pendingitemsreport',
            type: 'POST',
            dataType: 'json',
            data: loadrequest,
            success: function (respoce, textStatus, xhr) {  window.closeModal();
                var grid;
                var data = respoce;
                var dataView;
                var columns = [];
                var checkboxSelector = new Slick.CheckboxSelectColumn({
                    cssClass: "slick-cell-checkboxsel"
                });
                columns.push(checkboxSelector.getColumnDefinition());
                columns.push({ id: "invno", name: "Inv.No", field: "vicno", width: 60});
                columns.push({ id: "tno", name: "Tr No", field: "TNO", width: 60});
                columns.push({ id: "br", name: "Branch", field: "branchname", width: 60});
                columns.push({ id: "vdate", name: "Date", field: "vdate", width:100});
                columns.push({ id: "amount", name: "Amount", field: "amount", width:70,formatter:numformatter,  groupTotalsFormatter: sumTotalsFormatter});
                columns.push({ id: "narration", name: "Narration", field: "narration", width: 50 });
                var columnFilters = {};
                function filter(item) {
                    if(!columnFilters)
                        var columnFilters = {};
                    for (var columnId in columnFilters) {
                        if (columnId !== undefined && columnFilters[columnId] !== "") {
                            var c = grid.getColumns()[grid.getColumnIndex(columnId)];
                            if (!(item[c.field] && ("" + item[c.field]).indexOf(columnFilters[columnId]) !== -1)) {
                                return false;
                            }
                        }
                    }
                    return true;
                }

                function doctypeformmatter(row, cell, value, columnDef, dataContext){
                    return  constants.trnname(value)
                }
                function sumTotalLabel(totals, columnDef) {  
                    if (totals.group.level==0){
                        return "<span style='color:black;font-weight:bold'>Total</span>" ;}
                    else{
                        return "<span style='color:black;font-style: italic'>Sub Total</span>" ;}
                }
                function avgTotalsFormatter(totals, columnDef) {
                    var val = totals.avg && totals.avg[columnDef.field];
                    if (val != null) {
                        return PercentCompleteFormatterTot(val,totals.group.level);
                    }
                    return "";
                }
                function PercentCompleteFormatterTot(value, to) {
                    var fnt=''
                    if (to==0){
                        fnt='font-weight:bold;'}
                    else{fnt='font-style:italic;'}
                    if (value == null || value === "") {
                        return "-";
                    } else if (value < 50) {
                        return "<span style='float: right;color:red;"+ fnt +";'>" + constants.number_format(value,2) + "%</span>";
                    } else {
                        return "<span style='float: right;color:green;"+ fnt +";'>" + constants.number_format(value,2) + "%</span>";
                    }
                }
                function PercentCompleteFormatterVal(row, cell, value, columnDef, dataContext) {
                    if (value == null || value === "") {
                        return "-";
                    } else if (value < 50) {
                        return "<span style='float: right;color:red'>" + constants.number_format(value,2) + "%</span>";
                    } else {
                        return "<span style='float: right;color:green'>" + constants.number_format(value,2) + "%</span>";
                    }
                }
                function numformatter(row, cell, value, columnDef, dataContext){
                    return "<span style='float: right;'>"  + constants.number_format(value,2) + "</span>" ; 
                }
                function sumTotalsFormatter(totals, columnDef) {
                    var val = totals.sum && totals.sum[columnDef.field];
                    if (val != null) {
                        if (totals.group.level==0){
                            {/*return  "<span style='color:black;font-weight:bold'>" + ((Math.round(parseFloat(val)*100)/100)) + "</span>" ;}*/}
                            return  "<span style='float: right;color:black;font-weight:bold'>" + constants.number_format(val,2) + "</span>" ;}
                        else
                        {return  "<span style='float: right;color:black;font-style:italic'>" + constants.number_format(val,2) + "</span>" ;}
                    }
                    return "";
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
                dataView = new Slick.Data.DataView({
                    groupItemMetadataProvider: groupItemMetadataProvider,
                    inlineFilters: true
                });

                //dataView = new Slick.Data.DataView();
                setTimeout(function(){
                    grid = new Slick.Grid("#dailyopGrid", dataView, columns, options);
                    // grid.setSelectionModel(new Slick.RowSelectionModel({selectActiveRow: false}));
                    grid.registerPlugin(checkboxSelector);
                    grid.registerPlugin(groupItemMetadataProvider);
                    grid.setSelectionModel(new Slick.CellSelectionModel());

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

                    grid.init();
                    dataView.beginUpdate();
                    dataView.setItems(data);
                    dataView.setFilter(filter);
                    dataView.setGrouping({
                        getter: "btrn",
                        formatter: function (g) {
                            return '' //"Document Type:  " + g.value + "  <span style='color:green'>(" + g.count + " items)</span>";
                        },
                        aggregators: [
                          new Slick.Data.Aggregators.Sum("gross"),
                          new Slick.Data.Aggregators.Sum("disc"),
                          new Slick.Data.Aggregators.Sum("amount")
                        ],
                        aggregateCollapsed: false,
                        lazyTotalsCalculation: true
                    });
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
           
            {  <RPT_PendingItems_Form RPT_DailyOpOptions={this.RPT_DailyOpOptions} 
                    viewReport = {this.viewReport} printReport={this.printReport} 
                    resetOptions={this.resetOptions} reportTitle='Not Allocated Invoices in Receipts'/> }

</div>
        )
}

}

