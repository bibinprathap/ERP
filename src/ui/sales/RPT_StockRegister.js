import RPT_StockRegister_Form from './RPT_StockRegister_Form';
import React, {Component} from 'react';
import {observable, toJSON, extendObservable} from 'mobx';
import * as constants from '../../constants.js';
import { NotificationManager} from 'react-notifications';
import dailyreports_Store from '../../store/report/dailyreports_Store';
import moment  from "moment";
export default class RPT_StockRegister extends React.Component 
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
        var mSub1 =""
        if (constants.getFieldValue(this.RPT_DailyOpOptions.salesman)!=""){
            mSub1="Salesman : " + constants.getFieldValue(this.RPT_DailyOpOptions.salesman)}
        if (constants.getFieldValue(this.RPT_DailyOpOptions.custsupno)!="")
        {
            if (mSub1==""){
                mSub1 = mSub1 + ",     "
            }
            mSub1= mSub1 + "Customer : " + constants.getFieldValue(this.RPT_DailyOpOptions.custsupno)
        }
        var qtycond=""
        if(constants.getFieldValue(this.RPT_DailyOpOptions.filtertype)){
            if (constants.getFieldValue(this.RPT_DailyOpOptions.filtertype)==="op")
                qtycond="Opening Quantity "
            else if (constants.getFieldValue(this.RPT_DailyOpOptions.filtertype)==="in")
                qtycond="Inwards Quantity "
            else if (constants.getFieldValue(this.RPT_DailyOpOptions.filtertype)==="out")
                qtycond="Outwards Quantity "
            else if (constants.getFieldValue(this.RPT_DailyOpOptions.filtertype)==="cl")
                qtycond="Closing Quantity "
            if(constants.getFieldValue(this.RPT_DailyOpOptions.filtervalue)){
                if (constants.getFieldValue(this.RPT_DailyOpOptions.filtervalue)==='ze')
                    qtycond= qtycond + " is Zero "
                else if (constants.getFieldValue(this.RPT_DailyOpOptions.filtervalue)==='nz')
                    qtycond= qtycond + " is NOT Zero "
                else if (constants.getFieldValue(this.RPT_DailyOpOptions.filtervalue)==='lz')
                    qtycond= qtycond + " is less than Zero "
                else if (constants.getFieldValue(this.RPT_DailyOpOptions.filtervalue)==='gz')
                    qtycond= qtycond + " is greater than Zero "
            }
        }
        if (mSub1!='')
            mSub1=mSub1+ " - " + qtycond
        else
            mSub1=qtycond
        var RefNo='PROC|' + constants.getprocedurename('SP_GetStockRegister',constants.COMPANY) +   ';@fromdates|\'' + yyyymmddf + '\';@todates|\'' + yyyymmddt + '\';@br|\'' + constants.getFieldValue( this.RPT_DailyOpOptions.branch) + '\';@sman|\'' + constants.getFieldValue(this.RPT_DailyOpOptions.salesman) + '\';@custorsup|\'' + constants.getFieldValue(this.RPT_DailyOpOptions.custsupno) + '\';@ftyp|\'' + constants.getFieldValue(this.RPT_DailyOpOptions.filtertype) + '\';@fcond|\'' + constants.getFieldValue(this.RPT_DailyOpOptions.filtervalue) + '\'';
        var reportURL=constants.REPORTURL + '/ReportPrint.aspx?ReportCode=RPTSTOCKREG&RefNo=' + RefNo + '&heading=' + ddmmyyyyfrom  +' - ' + ddmmyyyyto + '&subheading={BRANCH}&subheading1=' + mSub1 + '&Company=' + constants.COMPANY;
        window.open(reportURL,'new window', 'fullscreen=yes, scrollbars=auto, height=screen.height, left=0, top=0, width=screen.width, dependant=no, location=0, alwaysRaised=no, menubar=no, resizeable=no, scrollbars=n, toolbar=no, status=no, center=yes');
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
       if(constants.getFieldValue(this.RPT_DailyOpOptions.filtertype))
           loadrequest.parem6 =  constants.getFieldValue(this.RPT_DailyOpOptions.filtertype)
       if(constants.getFieldValue(this.RPT_DailyOpOptions.filtervalue))
           loadrequest.truefalse =  constants.getFieldValue(this.RPT_DailyOpOptions.filtervalue)

        window.openModal(); $.ajax({
            url: constants.SERVICEURL +'/getstockregister',
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
                columns.push({ id: "id", name: "S.No", field: "id", width: 30, cssClass: "cell-title" });                
                columns.push({ id: "partno", name: "Part No.", field: "partno", width: 100,cssClass: "cell-title" })
                columns.push({ id: "description", name: "Description", field: "description", width:150},)
                columns.push({ id: "brand", name: "Brand", field: "brand", width: 45})
                columns.push({ id: "origin", name: "Origin", field: "origin", width: 45})
                columns.push({ id: "op_qty", name: "Op. Qty", field: "op_qty", width: 60, formatter:intformatter,  groupTotalsFormatter: sumintTotalsFormatter });
                columns.push({ id: "op_rate", name: "Op. Rate", field: "op_rate", width: 80, formatter:numformatter});
                columns.push({ id: "op_amt", name: "Op. Amount", field: "op_amt", width: 80, formatter:numformatter,  groupTotalsFormatter: sumTotalsFormatter } );
                columns.push({ id: "in_qty", name: "In Qty", field: "in_qty", width: 60, formatter:intformatter,  groupTotalsFormatter: sumintTotalsFormatter });
                columns.push({ id: "in_rate", name: "In Rate", field: "in_rate", width: 80, formatter:numformatter});
                columns.push({ id: "in_amt", name: "In Amount", field: "in_amt", width: 80, formatter:numformatter,  groupTotalsFormatter: sumTotalsFormatter } );
                columns.push({ id: "out_qty", name: "Out Qty", field: "out_qty", width: 60, formatter:intformatter,  groupTotalsFormatter: sumintTotalsFormatter });
                columns.push({ id: "out_rate", name: "Out Rate", field: "out_rate", width: 80, formatter:numformatter});
                columns.push({ id: "out_amt", name: "Out Amount", field: "out_amt", width: 80, formatter:numformatter,  groupTotalsFormatter: sumTotalsFormatter } );
                columns.push({ id: "cl_qty", name: "Cl. Qty", field: "cl_qty", width: 60, formatter:intformatter,  groupTotalsFormatter: sumintTotalsFormatter });
                columns.push({ id: "cl_rate", name: "Cl. Rate", field: "cl_rate", width: 80, formatter:numformatter});
                columns.push({ id: "cl_amt", name: "Cl. Amount", field: "cl_amt", width: 80, formatter:numformatter,  groupTotalsFormatter: sumTotalsFormatter } );
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

                function sumTotalLabel(totals, columnDef) {  
                    if (totals.group.level==0){
                        return "<span style='color:black;font-weight:bold'>Total</span>" ;}
                    else{
                        return "<span style='color:black;font-style: italic'>Sub Total</span>" ;}
                }
                function intformatter(row, cell, value, columnDef, dataContext){
                    return "<span style='float: right;'>"  + constants.number_format(value,0) + "</span>" ; 
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
                function sumintTotalsFormatter(totals, columnDef) {
                    var val = totals.sum && totals.sum[columnDef.field];
                    if (val != null) {
                        if (totals.group.level==0){
                            return  "<span style='float: right;color:black;font-weight:bold'>" + constants.number_format(val,0) + "</span>" ;}
                        else
                        {return  "<span style='float: right;color:black;font-style:italic'>" + constants.number_format(val,0) + "</span>" ;}
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
                        formatter: function (g) {
                            return '' //"Document Type:  " + g.value + "  <span style='color:green'>(" + g.count + " items)</span>";
                        },
                        aggregators: [
                          new Slick.Data.Aggregators.Sum("op_qty"),
                          new Slick.Data.Aggregators.Sum("op_amt"),
                          new Slick.Data.Aggregators.Sum("in_qty"),
                          new Slick.Data.Aggregators.Sum("in_amt"),
                          new Slick.Data.Aggregators.Sum("out_qty"),
                          new Slick.Data.Aggregators.Sum("out_amt"),
                          new Slick.Data.Aggregators.Sum("cl_qty"),
                          new Slick.Data.Aggregators.Sum("cl_amt")
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
           
            {  <RPT_StockRegister_Form RPT_DailyOpOptions={this.RPT_DailyOpOptions} 
                    viewReport = {this.viewReport} printReport={this.printReport} 
                    resetOptions={this.resetOptions} reportTitle='Stock Register'/> }

</div>
        )
}

}

