import RPT_CashSales_Form from './RPT_CashSales_Form';
import React, {Component} from 'react';
import {observable, toJSON, extendObservable} from 'mobx';
import * as constants from '../../constants.js';
import { NotificationManager} from 'react-notifications';
import dailyreports_Store from '../../store/report/dailyreports_Store';
import moment  from "moment";
export default class RPT_CreditNetSales extends React.Component 
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
        var reportURL=constants.REPORTURL + '/ReportPrint.aspx?ReportCode=DP_QOTUSD&RefNo=' + this.props.SalesQuoteDetails.refnumber
        window.open(reportURL,'new window', 'fullscreen=yes, scrollbars=auto, height=screen.height, left=0, top=0, width=screen.width, dependant=no, location=0, alwaysRaised=no, menubar=no, resizeable=no, scrollbars=n, toolbar=no, status=no, center=yes')        
    }
    resetOptions (event){}

    viewReport (event) {
        var fromdate =  moment(this.RPT_DailyOpOptions.fromdate).format("YYYYMMDD") ;
        var todate =  moment(this.RPT_DailyOpOptions.todate).format("YYYYMMDD") ;
        var loadrequest = {parem1:fromdate,parem2:todate,company: constants.COMPANY };
        if(constants.getFieldValue( this.RPT_DailyOpOptions.branch)) 
            loadrequest.parem3 =  constants.getFieldValue( this.RPT_DailyOpOptions.branch)
       if(constants.getFieldValue(this.RPT_DailyOpOptions.salesman)) 
           loadrequest.parem4 =  constants.getFieldValue(this.RPT_DailyOpOptions.salesman)
       if(constants.getFieldValue(this.RPT_DailyOpOptions.custsupno)) 
           loadrequest.parem5 =  constants.getFieldValue(this.RPT_DailyOpOptions.custsupno)

        window.openModal(); $.ajax({
            url: constants.SERVICEURL +'/getnetcreditsalesreport',
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
                columns.push({ id: "id", name: "S.No", field: "id", width: 40, cssClass: "cell-title" });
                columns.push({ id: "br", name: "Branch", field: "br", width: 60,cssClass: "cell-title" });
                columns.push({ id: "docdate", name: "Date", field: "docdate", width:80 });
                columns.push({ id: "src", name: "SRC", field: "src", width: 50 });
                columns.push({ id: "docno", name: "Inv. No", field: "docno", width: 70, groupTotalsFormatter: sumTotalLabel });
                columns.push({ id: "gross", name: "Gross", field: "gross", width: 90, formatter:numformatter, groupTotalsFormatter: sumTotalsFormatter });
                columns.push({ id: "disc", name: "Discount", field: "disc", width: 90,formatter:numformatter,  groupTotalsFormatter: sumTotalsFormatter } );
                columns.push({ id: "amount", name: "Net Amount", field: "amount", formatter:numformatter, groupTotalsFormatter: sumTotalsFormatter, width: 90 } );
                columns.push({ id: "rtnamount", name: "Return", field: "rtnamount",formatter:numformatter, groupTotalsFormatter: sumTotalsFormatter, width: 90 } );
                columns.push({ id: "netsales", name: "Net Sales", field: "netsales",formatter:numformatter, groupTotalsFormatter: sumTotalsFormatter, width: 90} );
                columns.push({ id: "Customer", name: "Customer", field: "Customer", width: 180} );
                columns.push({ id: "sman", name: "Salesman", field: "sman", width: 90});
                columns.push({ id: "username", name: "User", field: "username", width: 90} );                
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
                    return "<span style='float: right;'>"  + constants.number_format(value,2) + "</span>" ; 
                }
                function sumTotalLabel(totals, columnDef) {                    
                    return "<span style='float: right;color:black;font-weight:bold'>Total</span>" ;
                }

                function sumTotalsFormatter(totals, columnDef) {
                    var val = totals.sum && totals.sum[columnDef.field];
                    if (val != null) {
                        return  "<span style='float: right;color:black;font-weight:bold'>" + ((Math.round(parseFloat(val)*100)/100)) + "</span>" ;
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
                    window.grid = grid;
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
                          new Slick.Data.Aggregators.Sum("amount"),
                          new Slick.Data.Aggregators.Sum("rtnamount"),
                          new Slick.Data.Aggregators.Sum("netsales")
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
           
            {  <RPT_CashSales_Form RPT_DailyOpOptions={this.RPT_DailyOpOptions} 
                    viewReport = {this.viewReport} printReport={this.printReport} 
                    resetOptions={this.resetOptions} reportTitle='Net Credit Sales Report'/> }

</div>
        )
}

}

