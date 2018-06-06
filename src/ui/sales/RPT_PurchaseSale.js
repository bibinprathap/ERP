import RPT_PurchaseSale_Form from './RPT_PurchaseSale_Form';
import React, {Component} from 'react';
import {observable, toJSON, extendObservable} from 'mobx';
import * as constants from '../../constants.js';
import { NotificationManager} from 'react-notifications';
import dailyreports_Store from '../../store/report/dailyreports_Store';
import moment  from "moment";
export default class RPT_PurchaseSale extends React.Component 
{
    constructor (props) {
        super(props);
        this.RPT_DailyOpOptions = observable(dailyreports_Store);
        this.branches=[];
        this.salesmen=[];
         
        this.viewReport = this.viewReport.bind(this);
        this.printReport = this.printReport.bind(this);
        this.excelReport = this.excelReport.bind(this);
        this.resetOptions = this.resetOptions.bind(this);
        
    
    }
    isEmpty(params) {
        if(params=="" || params==null ){
            return null;
        }
    }
    printReport (event) {
        var yyyymmddf =  moment(this.RPT_DailyOpOptions.fromdate).format("YYYYMMDD") ;
        var ddmmyyyyfrom =  moment(this.RPT_DailyOpOptions.fromdate).format("DD/MM/YYYY") ;
        var yyyymmddt =  moment(this.RPT_DailyOpOptions.todate).format("YYYYMMDD") ;
        var ddmmyyyyto =  moment(this.RPT_DailyOpOptions.todate).format("DD/MM/YYYY") ;
        
        var mSub1 =""
        var sup = null;
        var brn = null;
        if (constants.getFieldValue(this.RPT_DailyOpOptions.supplier)!=""){
            mSub1=constants.getFieldValue(this.RPT_DailyOpOptions.supplier)
            sup = constants.getFieldValue(this.RPT_DailyOpOptions.supplier)}
        if (constants.getFieldValue(this.RPT_DailyOpOptions.branch)!=""){
            brn = constants.getFieldValue(this.RPT_DailyOpOptions.branch)}
        var stkParam = "";
        if(constants.getFieldValue(this.RPT_DailyOpOptions.stockType)) 
            stkParam =  constants.getFieldValue(this.RPT_DailyOpOptions.stockType)
        if(constants.getFieldValue(this.RPT_DailyOpOptions.stockQty)) 
            stkParam = stkParam +  constants.getFieldValue(this.RPT_DailyOpOptions.stockQty)   
        var prfParam = "";
        if(constants.getFieldValue(this.RPT_DailyOpOptions.profitType)) 
            prfParam =  constants.getFieldValue(this.RPT_DailyOpOptions.profitType)
        if(constants.getFieldValue(this.RPT_DailyOpOptions.profitQty)) 
            prfParam = prfParam +  constants.getFieldValue(this.RPT_DailyOpOptions.profitQty)   
        var costParam = "";
        if(constants.getFieldValue(this.RPT_DailyOpOptions.costType)) 
            costParam =  constants.getFieldValue(this.RPT_DailyOpOptions.costType)
        if(constants.getFieldValue(this.RPT_DailyOpOptions.costQty)) 
            costParam = costParam +  constants.getFieldValue(this.RPT_DailyOpOptions.costQty) 
        var soldParam = "";
        if(constants.getFieldValue(this.RPT_DailyOpOptions.soldType)) 
            soldParam =  constants.getFieldValue(this.RPT_DailyOpOptions.soldType)
        if(constants.getFieldValue(this.RPT_DailyOpOptions.soldQty)) 
            soldParam = soldParam +  constants.getFieldValue(this.RPT_DailyOpOptions.soldQty) 
        var RefNo='PROC|' + constants.getprocedurename('SP_GetPurchaseSaleReport',constants.COMPANY) +   ';@fromdates|' + yyyymmddf + ';@todates|' + yyyymmddt + ';@br|'+ brn + ';@custorsup|' + sup + ';@stockParam|' + this.isEmpty(stkParam)   + ';@profitParam|' +this.isEmpty(prfParam) + ';@costParam|' + this.isEmpty(costParam)+';@soldParam|'+ this.isEmpty(soldParam) ;
        var reportURL=constants.DSREPORTURL + '/ReportPrint.aspx?ReportCode=PR_SL_RPT&RefNo=' + RefNo + '&heading=' + ddmmyyyyfrom  +' - ' + ddmmyyyyto ;
        window.open(reportURL,'new window', 'fullscreen=yes, scrollbars=auto, height=screen.height, left=0, top=0, width=screen.width, dependant=no, location=0, alwaysRaised=no, menubar=no, resizeable=no, scrollbars=n, toolbar=no, status=no, center=yes');
    }
    excelReport (event) {
        var yyyymmddf =  moment(this.RPT_DailyOpOptions.fromdate).format("YYYYMMDD") ;
        var ddmmyyyyfrom =  moment(this.RPT_DailyOpOptions.fromdate).format("DD/MM/YYYY") ;
        var yyyymmddt =  moment(this.RPT_DailyOpOptions.todate).format("YYYYMMDD") ;
        var ddmmyyyyto =  moment(this.RPT_DailyOpOptions.todate).format("DD/MM/YYYY") ;
        
        var mSub1 =""
        var sup = null;
        var brn = null;
        if (constants.getFieldValue(this.RPT_DailyOpOptions.supplier)!=""){
            mSub1=constants.getFieldValue(this.RPT_DailyOpOptions.supplier)
            sup = constants.getFieldValue(this.RPT_DailyOpOptions.supplier)}
        if (constants.getFieldValue(this.RPT_DailyOpOptions.branch)!=""){
            brn = constants.getFieldValue(this.RPT_DailyOpOptions.branch)}
        var stkParam = "";
        if(constants.getFieldValue(this.RPT_DailyOpOptions.stockType)) 
            stkParam =  constants.getFieldValue(this.RPT_DailyOpOptions.stockType)
        if(constants.getFieldValue(this.RPT_DailyOpOptions.stockQty)) 
            stkParam = stkParam +  constants.getFieldValue(this.RPT_DailyOpOptions.stockQty)   
        var prfParam = "";
        if(constants.getFieldValue(this.RPT_DailyOpOptions.profitType)) 
            prfParam =  constants.getFieldValue(this.RPT_DailyOpOptions.profitType)
        if(constants.getFieldValue(this.RPT_DailyOpOptions.profitQty)) 
            prfParam = prfParam +  constants.getFieldValue(this.RPT_DailyOpOptions.profitQty)   
        var costParam = "";
        if(constants.getFieldValue(this.RPT_DailyOpOptions.costType)) 
            costParam =  constants.getFieldValue(this.RPT_DailyOpOptions.costType)
        if(constants.getFieldValue(this.RPT_DailyOpOptions.costQty)) 
            costParam = costParam +  constants.getFieldValue(this.RPT_DailyOpOptions.costQty) 
        var soldParam = "";
        if(constants.getFieldValue(this.RPT_DailyOpOptions.soldType)) 
            soldParam =  constants.getFieldValue(this.RPT_DailyOpOptions.soldType)
        if(constants.getFieldValue(this.RPT_DailyOpOptions.soldQty)) 
            soldParam = soldParam +  constants.getFieldValue(this.RPT_DailyOpOptions.soldQty) 
        var RefNo='PROC|' + constants.getprocedurename('SP_GetPurchaseSaleReport',constants.COMPANY) +   ';@fromdates|' + yyyymmddf + ';@todates|' + yyyymmddt + ';@br|'+ brn + ';@custorsup|' + sup + ';@stockParam|' + this.isEmpty(stkParam)   + ';@profitParam|' +this.isEmpty(prfParam) + ';@costParam|' + this.isEmpty(costParam)+';@soldParam|'+ this.isEmpty(soldParam) ;
        var reportURL=constants.DSREPORTURL + '/ReportPrint.aspx?ReportCode=PR_SL_RPT&RefNo=' + RefNo + '&heading=' + ddmmyyyyfrom  +' - ' + ddmmyyyyto + '&CSVExport=Y' ;
        window.open(reportURL,'new window', 'fullscreen=yes, scrollbars=auto, height=screen.height, left=0, top=0, width=screen.width, dependant=no, location=0, alwaysRaised=no, menubar=no, resizeable=no, scrollbars=n, toolbar=no, status=no, center=yes');
    }
    resetOptions (event){
        this.RPT_DailyOpOptions.fromdate = '';
        this.RPT_DailyOpOptions.todate = '';
        this.RPT_DailyOpOptions.supplier= '';
        this.RPT_DailyOpOptions.branch= '';
        this.RPT_DailyOpOptions.stockQty= '';
        this.RPT_DailyOpOptions.stockType= '';
        this.RPT_DailyOpOptions.profitQty= '';
        this.RPT_DailyOpOptions.profitType= '';
        this.RPT_DailyOpOptions.costQty= '';
        this.RPT_DailyOpOptions.costType= '';
        this.RPT_DailyOpOptions.soldQty= '';
        this.RPT_DailyOpOptions.soldType= '';
    }
    
    viewReport (event) {

        // if(this.RPT_DailyOpOptions.stockType!=null){
        //     if(this.RPT_DailyOpOptions.stockQty==""){
        //         NotificationManager.error('Stock Qty required !');
        //         return;
        //     }
        // }
        // if(this.RPT_DailyOpOptions.stockQty!=""){
        //     if(this.RPT_DailyOpOptions.stockType==null){
        //         NotificationManager.error('Select Stock Type !');
        //         return;
        //     }
        // }

        // if(this.RPT_DailyOpOptions.profitType!=null){
        //     if(this.RPT_DailyOpOptions.profitQty==""){
        //         NotificationManager.error('Profit Qty required !');
        //         return;
        //     }
        // }
        // if(this.RPT_DailyOpOptions.profitQty!=""){
        //     if(this.RPT_DailyOpOptions.profitType==null){
        //         NotificationManager.error('Select Profit Type !');
        //         return;
        //     }
        // }
        // if(this.RPT_DailyOpOptions.costType!=null){
        //     if(this.RPT_DailyOpOptions.costQty==""){
        //         NotificationManager.error('Cost Qty required !');
        //         return;
        //     }
        // }
        // if(this.RPT_DailyOpOptions.costQty!=""){
        //     if(this.RPT_DailyOpOptions.costType==null){
        //         NotificationManager.error('Select Cost Type !');
        //         return;
        //     }
        // }
        // if(this.RPT_DailyOpOptions.soldType!=null){
        //     if(this.RPT_DailyOpOptions.soldQty==""){
        //         NotificationManager.error('Sold Qty required !');
        //         return;
        //     }
        // }
        // if(this.RPT_DailyOpOptions.soldQty!=""){
        //     if(this.RPT_DailyOpOptions.soldType==null){
        //         NotificationManager.error('Select Sold Type !');
        //         return;
        //     }
        // }


        var fromdate =  moment(this.RPT_DailyOpOptions.fromdate).format("YYYYMMDD") ;
        var todate =  moment(this.RPT_DailyOpOptions.todate).format("YYYYMMDD") ;
        var loadrequest = {parem1:fromdate,parem2:todate,company: constants.COMPANY};
        if(constants.getFieldValue( this.RPT_DailyOpOptions.branch)) 
            loadrequest.parem3 =  constants.getFieldValue( this.RPT_DailyOpOptions.branch)
       if(constants.getFieldValue(this.RPT_DailyOpOptions.supplier)) 
           loadrequest.parem4 =  constants.getFieldValue(this.RPT_DailyOpOptions.supplier)

        if(constants.getFieldValue(this.RPT_DailyOpOptions.stockType)) 
            loadrequest.parem5 =  constants.getFieldValue(this.RPT_DailyOpOptions.stockType)
        if(constants.getFieldValue(this.RPT_DailyOpOptions.stockQty)) 
            loadrequest.parem5 = loadrequest.parem5 +  constants.getFieldValue(this.RPT_DailyOpOptions.stockQty)
        if(constants.getFieldValue(this.RPT_DailyOpOptions.profitType)) 
            loadrequest.parem6 =  constants.getFieldValue(this.RPT_DailyOpOptions.profitType)
        if(constants.getFieldValue(this.RPT_DailyOpOptions.profitQty)) 
            loadrequest.parem6 =  loadrequest.parem6 + constants.getFieldValue(this.RPT_DailyOpOptions.profitQty)
        if(constants.getFieldValue(this.RPT_DailyOpOptions.costType)) 
            loadrequest.parem7 =  constants.getFieldValue(this.RPT_DailyOpOptions.costType)
        if(constants.getFieldValue(this.RPT_DailyOpOptions.costQty)) 
            loadrequest.parem7 =  loadrequest.parem7 + constants.getFieldValue(this.RPT_DailyOpOptions.costQty)
        if(constants.getFieldValue(this.RPT_DailyOpOptions.soldType)) 
            loadrequest.parem8 =  constants.getFieldValue(this.RPT_DailyOpOptions.soldType)
        if(constants.getFieldValue(this.RPT_DailyOpOptions.soldQty)) 
            loadrequest.parem8 =  loadrequest.parem8 + constants.getFieldValue(this.RPT_DailyOpOptions.soldQty)
        window.openModal(); $.ajax({
            url: constants.SERVICEURL +'/purchasesalereport',
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
                columns.push({ id: "id", name: "Sl No.", field: "id", width:10});
                columns.push({ id: "branch", name: "Branch", field: "Sale_Branch", width:110});
                columns.push({ id: "prinv", name: "Pr.Inv", field: "InvNo", width: 90,formatter:colorformatter1});
                columns.push({ id: "lastinvoice", name: "Sl.Inv", field: "lastinvoice", width:90});
                columns.push({ id: "PartNo", name: "Part No.", field: "PartNo", width:130});
                columns.push({ id: "Brand", name: "Brand", field: "Brand", width:50 });
                columns.push({ id: "Origin", name: "Origin", field: "Origin", width:100,  groupTotalsFormatter: sumTotalLabel });
                columns.push({ id: "Description", name: "Description", field: "Description", width:130});
                columns.push({ id: "AverageCost", name: "Avg Cost", field: "AverageCost", width:40, formatter:numformatter,  groupTotalsFormatter: sumTotalsFormatter});
                columns.push({ id: "LastPrQty", name: "LastPrQty", field: "LastPrQty", width:40, formatter:numformatter,  groupTotalsFormatter: sumTotalsFormatter});
                columns.push({ id: "LastPrPrice", name: "LastPrPrice", field: "LastPrPrice", width: 60 , formatter:numformatter,  groupTotalsFormatter: sumTotalsFormatter});
                columns.push({ id: "LastPrDate", name: "LastPrDate", field: "LastPrDate", width: 140 });
                columns.push({ id: "LastSoldDate", name: "LastSoldDate", field: "LastSoldDate", width: 140});
                columns.push({ id: "LastSoldQty", name: "LastSoldQty", field: "LastSoldQty", width: 30, formatter:numformatter,  groupTotalsFormatter: sumTotalsFormatter} );              
                columns.push({ id: "LastSoldValue", name: "LastSoldValue", field: "LastSoldValue", width: 50, formatter:numformatter,  groupTotalsFormatter: sumTotalsFormatter} );              
                columns.push({ id: "Profit", name: "Profit", field: "Profit", width: 50} );              
                columns.push({ id: "ProfitPercentage", name: "ProfitPercentage", field: "ProfitPercentage", width: 50} );              
                columns.push({ id: "onhandqty", name: "On Hand", field: "onhandqty", width: 50, formatter:numformatter,  groupTotalsFormatter: sumTotalsFormatter} );              
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
                function colorformatter1(row, cell, value, columnDef, dataContext){
                    if(value.indexOf('DN') ==0)
                        return "<span style='float: left;color: red;'>"  + value + "</span>" ; 
                        else
                        return "<span style='float: left;'>"  +value + "</span>" ; 
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
                    autoEdit: true,
                   enableCellNavigation: false,forceFitColumns: true,
                    showHeaderRow: true,
                    headerRowHeight: 24,
                    explicitInitialization: true,
                    enableTextSelectionOnCells:true
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
                            window.columnFilters[columnId] = $.trim($(this).val());
                            dataView.refresh();
                        }
                    });
                    grid.onHeaderRowCellRendered.subscribe(function (e, args) {
                        $(args.node).empty();
                        $("<input type='text'>")
                           .data("columnId", args.column.id)
                           .val(window.columnFilters[args.column.id])
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
                          new Slick.Data.Aggregators.Sum("AverageCost"),
                          new Slick.Data.Aggregators.Sum("LastPrQty"),
                          new Slick.Data.Aggregators.Sum("LastPrPrice"),
                          new Slick.Data.Aggregators.Sum("LastSoldQty"),
                          new Slick.Data.Aggregators.Sum("LastSoldValue"),
                          new Slick.Data.Aggregators.Sum("onhandqty")
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
           
            {  <RPT_PurchaseSale_Form RPT_DailyOpOptions={this.RPT_DailyOpOptions} 
                    viewReport = {this.viewReport} printReport={this.printReport} excelReport={this.excelReport}
                    resetOptions={this.resetOptions} reportTitle='Purchase-Sale Report'/> }

</div>
        )
}
}

