/// <reference path="RPT_EmployeeAc.js" />
import RPT_ARAP_Form from './RPT_APAR_Form';
import React, {Component} from 'react';
import {observable, toJSON, extendObservable} from 'mobx';
import * as constants from '../../constants.js';
import { NotificationManager} from 'react-notifications';
import dailyreports_Store from '../../store/report/dailyreports_Store';
import moment  from "moment";
export default class RPT_EmployeeAc extends React.Component 
{
    constructor (props) {
        super(props);
        this.RPT_DailyOpOptions = observable(dailyreports_Store);
        this.branches=[];
        this.salesmen=[];
        window.RPT_DailyOpOptions = this.RPT_DailyOpOptions;
        this.viewReport = this.viewReport.bind(this);
        this.printReport = this.printReport.bind(this);
        this.resetOptions = this.resetOptions.bind(this);
    }
    printReport (event) {
        var yyyymmdd =  moment(this.RPT_DailyOpOptions.fromdate).format("YYYYMMDD") ;
        var ddmmyyyy =  moment(this.RPT_DailyOpOptions.fromdate).format("DD/MM/YYYY") ;
        var glac =  constants.getFieldValue(this.RPT_DailyOpOptions.acno);
        var RefNo='PROC|' + constants.getprocedurename('SP_GetAccountsEmployee',constants.COMPANY) +   ';@dt|\'' + yyyymmdd + '\';@glac|\'' + glac + '\''
        var reportURL=constants.REPORTURL + '/ReportPrint.aspx?ReportCode=RPTEMPBAL&RefNo=' + RefNo + '&heading=' + ddmmyyyy + '&subheading='+ glac +'&Company=' + constants.COMPANY
        window.open(reportURL,'new window', 'fullscreen=yes, scrollbars=auto, height=screen.height, left=0, top=0, width=screen.width, dependant=no, location=0, alwaysRaised=no, menubar=no, resizeable=no, scrollbars=n, toolbar=no, status=no, center=yes')        
    }
    resetOptions (event){}
    
    viewReport (event) {
        var yyyymmdd =  moment(this.RPT_DailyOpOptions.fromdate).format("YYYYMMDD") ;
        var glac =  constants.getFieldValue(this.RPT_DailyOpOptions.acno);
        var loadrequest = {parem1:yyyymmdd,parem2:glac,company: constants.COMPANY}
        window.openModal(); $.ajax({
            url: constants.SERVICEURL +'/employeebalance',
            type: 'POST',
            dataType: 'json',
            data: loadrequest,
            success: function (respoce, textStatus, xhr) {  window.closeModal();
                var grid;
                var data1 = respoce;
                var totalcr =0
                var totaldr =0
                var btotal=0
                var gtotalcr =0
                var gtotaldr =0
                var glac1=""
                var rwid=-2
                var data=[]
                data1.forEach(function(row,ind){
                    if ((glac1!=row.glac) )
                    {                        
                        if (glac1!=""){
                            rwid=rwid-1
                            var newrow={};
                            newrow.credit =totalcr;
                            newrow.debit =totaldr;
                            newrow.id =rwid;
                            newrow.glac="";
                            newrow.acname="Sub Total";
                            data.push(newrow);
                            btotal=totaldr-totalcr
                            rwid=rwid-1
                            var newrow={};
                            if(btotal>0)
                            {                        
                                newrow.debit =btotal;
                            }
                            else
                            {
                                newrow.credit =btotal*-1;
                            }
                            newrow.id =rwid;
                            newrow.glac="";
                            newrow.acname="Sub Balance";
                            data.push(newrow);

                            rwid=rwid-1
                            var newrow={};
                            newrow.id =rwid;
                            newrow.glac="";
                            newrow.acname="";
                            data.push(newrow);
                            totalcr=0
                            totaldr=0
                            btotal=0
                        }
                        rwid=rwid-1
                        var newrow={};
                        newrow.id =rwid;
                        newrow.acname=row.glname;
                        newrow.glac=row.glac;
                        data.push(newrow);
                    }
                    totalcr = totalcr + row.credit;
                    totaldr = totaldr + row.debit;
                    gtotalcr = gtotalcr + row.credit;
                    gtotaldr = gtotaldr + row.debit;
                    glac1=row.glac;
                    data.push (row);
                })

                rwid=rwid-1
                var newrow={};
                newrow.credit =totalcr;
                newrow.debit =totaldr;
                newrow.id =rwid;
                newrow.glac="";
                newrow.acname="Sub Total";
                data.push(newrow);
                btotal=totaldr-totalcr
                rwid=rwid-1
                var newrow={};
                if(btotal>0)
                {                        
                    newrow.debit =btotal;
                }
                else
                {
                    newrow.credit =btotal*-1;
                }
                newrow.id =rwid;
                newrow.glac="";
                newrow.acname="Sub Balance";
                data.push(newrow);

                rwid=rwid-1
                var newrow={};
                newrow.id =rwid;
                newrow.glac="";
                newrow.acname="";
                data.push(newrow);

                var gtotal=gtotaldr - gtotalcr

                var newrow={};
                newrow.credit =gtotalcr;
                newrow.debit =gtotaldr;
                newrow.id =-1;
                newrow.glac=""
                newrow.acname="Grand Total";
                data.push(newrow);

                var newrow={};
                if(gtotal>0)
                {                        
                    newrow.debit =gtotal;
                }
                else
                {
                    newrow.credit =gtotal*-1;
                }
                newrow.id =-2;
                newrow.glac=""
                newrow.acname="Balance";
                data.push(newrow);
                    
                var dataView;
                var columns = [];
                var checkboxSelector = new Slick.CheckboxSelectColumn({
                    cssClass: "slick-cell-checkboxsel"
                });
                columns.push(checkboxSelector.getColumnDefinition());
                columns.push({ id: "glac", name: "GL A/c", field: "glac", minWidth: 80, formatter:glacfmtr } );
                columns.push({ id: "acno", name: "Emp A/c", field: "acno", width: 80, cssClass: "cell-title" });
                columns.push({ id: "acname", name: "Employee Name", field: "acname", width: 400, formatter: sumTotalLabel });
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
                    if (value<0) {
                        return ""}
                    else {return value}
                }

                function glacfmtr (row, cell, value, columnDef, dataContext){
                    if (dataContext.id<0)  {
                        {return "<span style='color:black;font-weight:bold'>" + value +  "</span>" ;}}
                    else {return ""}
                }

                function sumTotalLabel (row, cell, value, columnDef, dataContext){
                    if ((dataContext.id===-1)||(dataContext.id===-2)){
                        return "<span style='color:black;font-weight:900'>" + value + "</span>" ;}
                    else if  (dataContext.id<0)
                        {return "<span style='color:black;font-weight:bold'>" + value +  "</span>" ;}
                    else
                        {return value}
                }

                function numformatter(row, cell, value, columnDef, dataContext){
                    if ((dataContext.id===-1)||(dataContext.id===-2)){
                        return "<span style='float: right;color:black;font-weight:900'>"+  constants.number_format(value,2) +"</span>" ;}
                    else if  (dataContext.id<0)
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
           
            {  <RPT_ARAP_Form RPT_DailyOpOptions={this.RPT_DailyOpOptions} getarapgroupsname ='getempgroups'
                    viewReport = {this.viewReport} printReport={this.printReport} 
                    resetOptions={this.resetOptions} reportTitle='Employee Balance Report'/> }

</div>
        )
}

}

