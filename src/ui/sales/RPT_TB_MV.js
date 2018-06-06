/// <reference path="RPT_TB_MV.js" />
/// <reference path="RPT_TB_MV.js" />
import RPT_TB_MV_Form from './RPT_TB_MV_Form';
import ReactDOM from 'react-dom';
import React, {Component} from 'react';
import {observable, toJSON, extendObservable} from 'mobx';
import * as constants from '../../constants.js';
import { NotificationManager} from 'react-notifications';
import dailyreports_Store from '../../store/report/dailyreports_Store';
import moment  from "moment";


export default class RPT_TB_MV extends React.Component 
{
    constructor (props) {
        super(props);
        this.RPT_TBOptions = observable(dailyreports_Store);
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
        var fromdate
        var fromdated
        var todate =  moment(this.RPT_TBOptions.todate).format("YYYYMMDD") ;        
        var todated =  moment(this.RPT_TBOptions.todate).format("DD/MM/YYYY") ;
        var hd;
        fromdate =  moment(this.RPT_TBOptions.fromdate).format("YYYYMMDD") ;
        fromdated =  moment(this.RPT_TBOptions.fromdate).format("DD/MM/YYYY") ;
        hd='From ' + fromdated + ' To ' + todated
        
        var RefNo='PROC|' + constants.getprocedurename('SP_GetTB',constants.COMPANY) +   ';@Tp|\'V\';@summary|\'' + constants.getFieldValue(this.RPT_TBOptions.filtertype) + '\';@LedgerOnly|\'' +  constants.getFieldValue( this.RPT_TBOptions.custsupno) +  '\';@dtFrom|\'' + fromdate + '\';@dtTo|\'' + todate + '\';@br|\'' + constants.getFieldValue(this.RPT_TBOptions.branch) + '\'';
        var reportURL=constants.REPORTURL + '/ReportPrint.aspx?ReportCode=RPTTB_MV&RefNo=' + RefNo + '&heading=' + hd + '&subheading={BRANCH}&Company=' + constants.COMPANY
        window.open(reportURL,'new window', 'fullscreen=yes, scrollbars=auto, height=screen.height, left=0, top=0, width=screen.width, dependant=no, location=0, alwaysRaised=no, menubar=no, resizeable=no, scrollbars=n, toolbar=no, status=no, center=yes')        
    }
    resetOptions (event){}

    viewReport (event) {
        var fromdate 
        var todate =  moment(this.RPT_TBOptions.todate).format("YYYYMMDD") ;
        fromdate =  moment(this.RPT_TBOptions.fromdate).format("YYYYMMDD") ;
        window.setcompany();
        var loadrequest = {parem1:'V', parem2:constants.getFieldValue(this.RPT_TBOptions.filtertype), parem3:constants.getFieldValue( this.RPT_TBOptions.custsupno), parem4:fromdate, parem5:todate, parem6:constants.getFieldValue(this.RPT_TBOptions.branch), company:constants.COMPANY};
        var dailyreportdata = this.RPT_TBOptions;
        window.openModal(); $.ajax({
            url: constants.SERVICEURL +'/get_tb_mv',
            type: 'POST',
            dataType: 'json',
            data: loadrequest,
            success: function (respoce, textStatus, xhr) {  window.closeModal();
                var grid;
                var data = respoce;
                var dataView;
                var columns = [
                  { id: "txt1", name: "Account No.", field: "txt1", width: 80, cssClass: "cell-title", formatter:sumidLabel },
                  { id: "txt2", name: "Account Name", field: "txt2", width: 400, formatter:sumTotalLabel },
                  { id: "amt3", name: "Op. Bal. Dr", field: "amt3", minWidth: 120, formatter:numformatter1 },
                  { id: "amt5", name: "Op. Bal. Cr", field: "amt5", minWidth: 120, formatter:numformatter1 },
                  { id: "amt1", name: "Debit", field: "amt1", minWidth: 120 , formatter:numformatter1},
                  { id: "amt2", name: "Credit", field: "amt2", minWidth: 120, formatter:numformatter1 },
                  { id: "amt4", name: "Cl. Bal. Dr", field: "amt4", minWidth: 120 , formatter:numformatter1},
                  { id: "amt6", name: "Cl. Bal. Cr", field: "amt6", minWidth: 120 , formatter:numformatter1}
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
                function numformatter1(row, cell, value, columnDef, dataContext){
                    if (value!=0)
                    {
                        if (dataContext.txt1==='99999999'){
                            return "<span style='float: right;color:black;font-weight:800;font-size: 120%'>"+  constants.number_format(value,2) +"</span>" ;}
                        else
                        {return "<span style='float: right;'>"  + constants.number_format(value,2) + "</span>" ; }
                    }
                    else{return ''}
                        
                }

                function numformatterD(row, cell, value, columnDef, dataContext){
                    if (value>0)
                    {
                        if (dataContext.txt1==='99999999'){
                            return "<span style='float: right;color:black;font-weight:800;font-size: 120%'>"+  constants.number_format(value,2) +"</span>" ;}
                        else
                        {return "<span style='float: right;'>"  + constants.number_format(value,2) + "</span>" ; }
                    }
                    else{return ''}
                        
                }

                function numformatterC(row, cell, value, columnDef, dataContext){
                    if (value<0)
                    {
                        var v1=value * -1
                        if (dataContext.txt1==='99999999'){
                            return "<span style='float: right;color:black;font-weight:800;font-size: 120%'>"+  constants.number_format(v1,2) +"</span>" ;}
                        else
                        {return "<span style='float: right;'>"  + constants.number_format(v1,2) + "</span>" ; }
                    }
                    else{return ''}                        
                }

                function sumidLabel (row, cell, value, columnDef, dataContext){
                    if (value>='99999998') {
                        return ""}
                    else 
                    {
                        if (dataContext.int1===1)
                        {
                            return "<span style='color:black;font-weight:800;font-size: 120%;text-decoration: underline'>"+  value +"</span>" ;
                        }
                        else
                        {
                            if ((dataContext.int1===2) && (dataContext.int2===1))
                            {
                                return "<span style='color:black;font-weight:800;font-size: 110%;'>"+  value +"</span>" ;
                            }
                            else
                            {
                                if ((dataContext.int1===3) && (dataContext.int2===1))
                                {
                                    return "<span style='color:black;font-weight:800'>"+  value +"</span>" ;
                                }
                                else
                                {
                                    if (dataContext.int2===1)
                                    {
                                        return "<span style='color:black;font-weight:600'>"+  value +"</span>" ;
                                    }

                                    else
                                    {
                                        return value
                                    }
                                }
                            }
                        }
                    }
                }

                function sumTotalLabel (row, cell, value, columnDef, dataContext){
                    if (dataContext.txt1==='99999999'){
                        return "<span style='color:black;font-weight:800; font-size: 130%;'>"+  value +"</span>" ;}
                    else
                    {
                        if (dataContext.int1===1)
                        {
                            return "<span style='color:black;font-weight:800;font-size: 120%;text-decoration: underline'>"+  value +"</span>" ;
                        }
                        else
                        {
                            if ((dataContext.int1===2) && (dataContext.int2===1))
                            {
                                return "<span style='color:black;font-weight:800;font-size: 110%;'>"+  value +"</span>" ;
                            }
                            else
                            {
                                if ((dataContext.int1===3) && (dataContext.int2===1))
                                {
                                    return "<span style='color:black;font-weight:800'>"+  value +"</span>" ;
                                }
                                else
                                {
                                    if (dataContext.int2===1)
                                    {
                                        return "<span style='color:black;font-weight:600'>"+  value +"</span>" ;
                                    }
                                    else
                                    {
                                        return value
                                    }
                                }
                            }
                        }                    
                    }
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
                grid.onClick.subscribe(function (e, args) {
                    var fromdate =  '' ;
                    var todate =  moment(dailyreportdata.todate).format("YYYYMMDD") ;
                    window.setcompany();
                    var loadrequest = {
                        parem1:dataView.getItem(args.row).txt1,
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

            
            },
            error: function (xhr, textStatus, errorThrown) { window.closeModal();
                console.log('Error in Operation');
            }
        });

    }
render () {
    return(
    <div>   
           
        {  <RPT_TB_MV_Form RPT_TBOptions={this.RPT_TBOptions} 
            viewReport = {this.viewReport} printReport={this.printReport} 
resetOptions={this.resetOptions} reportTitle='Trail Balance (Movement)'/> }

    </div>
        )
}

}

