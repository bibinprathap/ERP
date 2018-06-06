import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom'
import { observer } from 'mobx-react'
import { InputField, asForm, InputSelect,InputCheckbox } from '../../utils'
import ItemInquiry from './ItemInquiry'
import { Button, Panel, Grid, Row, Col, Glyphicon } from 'react-bootstrap';
import { observable, toJSON, extendObservable } from 'mobx';
import ReactDataGrid from 'react-data-grid';
import ReactModal from 'react-modal';
import * as constants from '../../constants.js'
import CashSalesItem_Store from '../../store/sales/CashSalesItem_Store';
import { NotificationContainer, NotificationManager } from 'react-notifications';

class DeleteColButton extends Component {
    render() {
        return (<div style={{ color: 'red' }} ><Glyphicon glyph="trash" /></div>)
    }
}
class EditColButton extends Component {
    render() {
        return (<div style={{ color: 'blue' }} > <Glyphicon glyph="edit" /></div>)
    }
}

class NumberColButtontotal extends Component {
    render() {
        var k = constants.number_formatgrid(this.props.dependentValues.total);
        return (<div style={{ color: 'blue' }} > {k}</div>)
}
}
class NumberColButtonpricediscount extends Component {
    render() {
        var k = constants.number_formatgrid(this.props.dependentValues.pricediscount);
        return (<div style={{ color: 'blue' }} > {k}</div>)
}
}
class NumberColButtontax extends Component {
    render() {
        var k = constants.number_formatgrid(this.props.dependentValues.tax);
        return (<div style={{ color: 'blue' }} > {k}</div>)
}
}
class NumberColButtontotalwithtax extends Component {
    render() {
        var k = constants.number_formatgrid(this.props.dependentValues.totalwithtax);
        return (<div style={{ color: 'blue' }} > {k}</div>)
}
}

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};


@observer
class LabourCharges_SubForm extends Component {
    constructor(props) {
        super(props)
        this.handleSelect = this.handleSelect.bind(this);
        this.state = {};
        this.state.key = 1;
        this.state.isedit = 'N';
        this.state.lastno = 1;
        this.state.modalIsOpen = false;
        window.cashsalesiteminquiry = this;
        this.rowGetter = this.rowGetter.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.onCellClick = this.onCellClick.bind(this);
        this.checknegativeqty = this.checknegativeqty.bind(this);
        this.checklowrate = this.checklowrate.bind(this);
        this.handleEditSave = this.handleEditSave.bind(this);
        this.handleEditCancel = this.handleEditCancel.bind(this);
        this.showitemquerypopup = this.showitemquerypopup.bind(this);
        this.calculatetotal = this.calculatetotal.bind(this);
        this.setdiscount = this.setdiscount.bind(this);
        this.setdiscountamount = this.setdiscountamount.bind(this); 

        this.setfootertotal = this.setfootertotal.bind(this);
        this.afterOpenFn = this.afterOpenFn.bind(this);
        this.requestCloseFn = this.requestCloseFn.bind(this);

        this.columns = [
            {
                key: 'srno',
                name: 'SI No',
                width: 50
            },
            {
                key: 'partno',
                name: 'Service Code',
                width: 200
            },
            {
                key: 'partno',
                name: 'Services',
                width: 200
            },
            {
                key: 'partno',
                name: 'Time',
                width: 100
            },
            {
                key: 'partno',
                name: 'Hrs/Min',
                width: 100
            },
            {
                key: 'partno',
                name: 'Sell Price',
                width: 100
            },
            {
                key: 'partno',
                name: 'Total',
                width:100
            },
            {
                key: 'partno',
                name: 'Department',
                width: 100
            },
            {
                key: 'Edit',
                name: '',
                formatter: EditColButton,
                width: 35
            },
            {
                key: 'Delete',
                name: '',
                formatter: DeleteColButton,
                width: 35
            }
        ];
    }
    afterOpenFn(i) {
        // alert('afterOpenFn');
    }
    requestCloseFn(i) {
        // alert('requestCloseFn');
    }

    showitemquerypopup(fileldname, fieldvalue, keyCode) {
        if (keyCode == 13) {
            window.nextfocuselement = ReactDOM.findDOMNode(this.refs.qty);
            window.cashsalesitemgriddata = this.props.SalesItem;
            // window.ShowItemQuery()
            $('#qty').focus()
            window.nextfocuselement.focus();
            this.setState({ modalIsOpen: true });
            setTimeout(function () {
                var partenq =  $('#partnumber');
                partenq.focus();
                partenq.val(this.props.SalesItem.partno);
                window.iteminquiryref.ItemInquiryDetails.partnumber = this.props.SalesItem.partno
                window.iteminquiryref.partnofillitems("partno",this.props.SalesItem.partno,13)
                //partenq.val();
               // var e = jQuery.Event("keydown");
               // e.which = 13; // # Some key code value  + 
               
                //partenq.trigger(e);
               
              
            }.bind(this), 100);
        }

    }
    calculatetotal(key, value, keycode) {
        this.props.SalesItem.total  = parseFloat((parseFloat(this.props.SalesItem.unitprice) * parseFloat(this.props.SalesItem.qty)).toFixed(2));
        if (keycode == 13 || keycode == 9) {
            if (parseFloat(this.props.SalesItem.unitprice) < this.props.SalesItem.avgcost) {
                NotificationManager.remove({ id: 1 });
                NotificationManager.create({
                    id: 1,
                    type: "error",
                    message: 'Unit Price Is Less Than Cost',
                    title: 'Unit Price',
                    timeOut: 0
                });
                setTimeout(function () {
                    NotificationManager.remove({ id: 1 });
                }, 2000);

            }

        }
    }
    checklowrate(key, value) {
        this.props.updateProperty(key, value);

    }
    handleAdd() {
      
      
      
        if (parseFloat(this.props.SalesItem.unitprice) < this.props.SalesItem.avgcost)
            NotificationManager.error('Unit Price', 'Unit Price Is Less Than Cost');
        this.props.SalesItem.srno = this.props.CashSalesItems.length + 1;
        if(this.props.SalesItem.taxinclude)
        {
            this.props.SalesItem.unitprice = (parseFloat( this.props.SalesItem.unitprice||0)  / (1 +(parseFloat(this.props.SalesItem.taxpercentage||5)/100))).toFixed(2) 
        }   
        this.props.SalesItem.total  = parseFloat((parseFloat(this.props.SalesItem.unitprice) * parseFloat(this.props.SalesItem.qty)).toFixed(2));

        var taxableamount  =  parseFloat(this.props.SalesItem.total||0) - parseFloat(this.props.SalesItem.pricediscount||0) ;
        this.props.SalesItem.tax = parseFloat(parseFloat(taxableamount||0) * ( parseFloat(this.props.SalesItem.taxpercentage||0) /100) ).toFixed(2);
        this.props.SalesItem.totalwithtax  = parseFloat(taxableamount ||0)   +  parseFloat(this.props.SalesItem.tax ||0);
        this.props.CashSalesItems.push(JSON.parse(JSON.stringify(toJSON(this.props.SalesItem), null, 2)));
        //this.props.SalesItem=new SalesItem_Store;        
        extendObservable(this.props.SalesItem, CashSalesItem_Store);
        
         
        this.state.lastno = this.state.lastno + 1;
        this.state.key = this.state.lastno;
        this.setfootertotal();
        $('#partno').focus();
        // this.props.SalesItem.srno = this.state.lastno ;
    }
    handleEditSave() {
     this.props.SalesItem.total  = parseFloat((parseFloat(this.props.SalesItem.unitprice) * parseFloat(this.props.SalesItem.qty)).toFixed(2));

        if(this.props.SalesItem.taxinclude)
        {
            this.props.SalesItem.unitprice = (parseFloat( this.props.SalesItem.unitprice||0)  / (1 +(parseFloat(this.props.SalesItem.taxpercentage||5)/100))).toFixed(2) 
        }   
        
         var taxableamount  =  parseFloat(this.props.SalesItem.total||0) - parseFloat(this.props.SalesItem.pricediscount||0) ;
        this.props.SalesItem.tax =  parseFloat(taxableamount||0) * ( parseFloat(this.props.SalesItem.taxpercentage||0) /100)  ;
        this.props.SalesItem.totalwithtax  = parseFloat(taxableamount ||0)   +  parseFloat(this.props.SalesItem.tax ||0);
       
        
        this.props.CashSalesItems[this.state.key] = (JSON.parse(JSON.stringify(toJSON(this.props.SalesItem), null, 2)));
        extendObservable(this.props.SalesItem, CashSalesItem_Store);
        this.state.key = this.state.lastno;
        this.state.isedit = 'N'
        this.props.SalesItem.srno = this.state.lastno;
        this.setfootertotal();

    }
    setfootertotal() {
        var parentformdata = this.props.CashSalesItemParent;
        parentformdata.gross = 0;
        parentformdata.cos = 0;
        parentformdata.tax = 0;
        parentformdata.totalwithtax = 0;
        parentformdata.pricediscount = 0;
        this.props.CashSalesItems.forEach(function (row, index) {
            parentformdata.gross = parentformdata.gross + parseFloat(row.total);
            if (!row.costamt)
                row.costamt = 0;
                if (row.brf != 91)
                        parentformdata.cos =   parentformdata.cos  +  (parseFloat(row.avgcost ||0) * parseFloat(row.qty));
            parentformdata.tax =  parentformdata.tax  +  parseFloat(row.tax ||0);
            parentformdata.totalwithtax =  parentformdata.totalwithtax  +  parseFloat(row.totalwithtax ||0);
           parentformdata.pricediscount = parentformdata.pricediscount  +  parseFloat(row.pricediscount ||0);  
                    });
        parentformdata.amount = parentformdata.gross  + parseFloat(parentformdata.tax||0)  -  parseFloat(parentformdata.pricediscount||0) - parentformdata.disc;
       
        var cashamt = 0;
        cashamt = parseFloat(parentformdata.amount || 0) - parseFloat(parentformdata.adv || 0) - parseFloat(parentformdata.cc || 0);
        parentformdata.cash = cashamt > 0 ? parseFloat(parseFloat(cashamt || 0).toFixed(2))  : 0;
        parentformdata.per1 = parseFloat(parentformdata.amount || 0) - parseFloat(parentformdata.cos || 0) -  parseFloat( parentformdata.tax ||0)  ;
        parentformdata.exp1 = ((parseFloat(parentformdata.per1 || 0)) * 100 / parseFloat((parentformdata.amount || 0)  -  parentformdata.tax||0)).toFixed(2);
        
         parentformdata.per1  = parseFloat( parentformdata.amount||0)  -   parseFloat( parentformdata.cos||0) -  parseFloat( parentformdata.tax ||0)  ;
        parentformdata.exp1  =   ((parentformdata.per1) * 100/ (parentformdata.amount -  parentformdata.tax) ).toFixed(2); ;

        parentformdata.gross = parseFloat(parentformdata.gross || 0).toFixed(2);
        parentformdata.cos  = parseFloat(parentformdata.cos || 0).toFixed(2);
        parentformdata.tax = parseFloat(parentformdata.tax || 0).toFixed(2);
        parentformdata.totalwithtax = parseFloat(parentformdata.totalwithtax || 0).toFixed(2);
        parentformdata.amount = parseFloat(parentformdata.amount || 0).toFixed(2);
    }
    handleEditCancel() {
        extendObservable(this.props.SalesItem, CashSalesItem_Store);
        this.state.isedit = 'N';
    }
    onCellClick(rowIdx, row, cellidx) {
        if (cellidx == 11)   //EDIT Button
        {
            if (this.state.isedit != 'Y') {
                extendObservable(this.props.SalesItem, row);
                this.state.isedit = 'Y'
                this.state.key = row.srno - 1;
            }
            else {
                NotificationManager.warning('', 'Item is in edit mode. \n Plese Save or Cancel before editing another Item', 3000);
            }

        }
        else if (cellidx == 12)  //DELETE Button
        {
            if (this.state.isedit != 'Y') {
                this.props.CashSalesItems.remove(row)
                var i = 0;
                for (i = 0; i < this.props.CashSalesItems.length; i++) {
                    this.props.CashSalesItems[i].srno = i + 1;
                }
                this.state.lastno = i + 1;
                this.props.SalesItem.srno = this.state.lastno;
                var i = 0;
                for (i = 0; i < this.props.CashSalesItems.length; i++) {
                    this.props.CashSalesItems[i].srno = i + 1;
                }
            }
            else {
                NotificationManager.warning('', 'Item is in edit mode. \n Unable to Delete', 3000);
            }
        }
        this.setfootertotal();
    }
    checknegativeqty(key, value) {
        this.props.updateProperty(key, value);
        var currentqty = this.props.SalesItem.qty;
        if (parseFloat(currentqty) > this.props.SalesItem.stockqty)
            this.props.SalesItem.brf = 91;
        else
            this.props.SalesItem.brf = 0;
    }

    handleSelect(key) {
        alert('selected ' + key);
        this.setState({ key });
    }
    rowGetter(i) {
        return this.props.CashSalesItems[i]
    }
    getParts = (input) => {
        return fetch(constants.SERVICEURL + `/combo/parts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((response) => {
                return response.json();
            }).then((json) => {
                return { options: json };
            });
    }
    getitembrands = (input) => {
        return fetch(constants.SERVICEURL + `/combo/getitembrands`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((response) => {
                return response.json();
            }).then((json) => {
                return { options: json };
            });
    }
  setdiscount(key, value) {
        this.props.updateProperty(key, value);
        this.props.SalesItem.pricediscount = parseFloat( parseFloat(this.props.SalesItem.total||0)  * ( parseFloat(this.props.SalesItem.pricediscper||0)/100)).toFixed(2);
        this.props.SalesItem.totalwithtax =  parseFloat( parseFloat(this.props.SalesItem.total ||0)   +  parseFloat(this.props.SalesItem.tax ||0) - parseFloat(this.props.SalesItem.pricediscount||0)).toFixed(2);
    }
    setdiscountamount(key, value) {
        this.props.updateProperty(key, value);
        this.props.SalesItem.pricediscper =  parseFloat((parseFloat(this.props.SalesItem.pricediscount||0)*100)/ parseFloat(this.props.SalesItem.total||0) ).toFixed(2);
        this.props.SalesItem.totalwithtax =  parseFloat( parseFloat(this.props.SalesItem.total ||0)   +  parseFloat(this.props.SalesItem.tax ||0) - parseFloat(this.props.SalesItem.pricediscount||0)).toFixed(2);
    }

    render() {
        const {CashSalesItems, SalesItem, SubHead, updateProperty} = this.props;
        return (
            <div className="container-fluid">
                <div className="panel panel-primary"  >
                    <div className="panel-body" style={{ padding: 5 + 'px ' + 15 + 'px ' + 2 + 'px ' + 15 + 'px' }}>

                        <ReactModal
                            isOpen={this.state.modalIsOpen}
                            onAfterOpen={this.afterOpenFn}
                            onRequestClose={this.requestCloseFn}
                            className="Modal"
                            overlayClassName="Overlay"
                            style={customStyles}
                            contentLabel="Item Inquiry"
                            >
                            <ItemInquiry formtype="cash" ispopup={true} />
                        </ReactModal >
                        
                        <Row>
                            <Col xs={3} sm={3} md={3} lg={3} xl={3} style={{ padding: 2 + 'px ',width:20 +'%'}}>
                                <InputField id="partno" className="form-control noenter" tabIndex="3"
                                name="partno" value={SalesItem.partno} onChange={updateProperty} placeholder="Service Code" />
                            </Col>
                            <Col xs={3} sm={3} md={3} lg={3} xl={3} style={{ padding: 2 + 'px ',width:20 +'%'}}>
                                <InputField id="partno" className="form-control noenter" tabIndex="3"
                                name="partno" value={SalesItem.partno} onChange={updateProperty} placeholder="Services" />
                            </Col>
                            <Col xs={3} sm={3} md={3} lg={3} xl={3} style={{ padding: 2 + 'px ',width:10 +'%'}}>
                                <InputField id="partno" className="form-control noenter" tabIndex="3"
                                name="partno" value={SalesItem.partno} onChange={updateProperty} placeholder="Time" />
                            </Col>
                            <Col xs={3} sm={3} md={3} lg={3} xl={3} style={{ padding: 2 + 'px ',width:10 +'%'}}>
                                <InputSelect id="dealertype" name="dealertype" placeholder="Hrs/Min"  />
                            </Col>
                            <Col xs={3} sm={3} md={3} lg={3} xl={3} style={{ padding: 2 + 'px ',width:10 +'%'}}>
                                <InputField id="partno" className="form-control noenter" tabIndex="3"
                                name="partno" value={SalesItem.partno} onChange={updateProperty} placeholder="Selling Price" />
                            </Col>
                            <Col xs={3} sm={3} md={3} lg={3} xl={3} style={{ padding: 2 + 'px ',width:10 +'%'}}>
                                <InputField id="partno" className="form-control noenter" tabIndex="3"
                                name="partno" value={SalesItem.partno} onChange={updateProperty} placeholder="Total Amount" />
                            </Col>
                            <Col xs={3} sm={3} md={3} lg={3} xl={3} style={{ padding: 2 + 'px ',width:10 +'%'}}>
                                <InputSelect id="dealertype" name="dealertype" placeholder="Department"  />
                            </Col>
                            <Col xs={1} sm={1} md={1} lg={1} xl={1} style={{ padding: 2 + 'px' }}>
                                <Button bsStyle="success" bsSize="xsmall" tabIndex="9" style={{ padding: 6 + 'px ', width: 50 + 'px', display: this.state.isedit == 'N' ? '' : 'none' }} onClick={this.handleAdd}>Add</Button>
                                <Button bsStyle="success" bsSize="xsmall" style={{ padding: 6 + 'px ', width: 50 + 'px', display: this.state.isedit == 'N' ? 'none' : '' }} onClick={this.handleEditSave}>Save</Button>
                            </Col>
                            <Col xs={1} sm={1} md={1} lg={1} xl={1} style={{ padding: 2 + 'px ' }}>
                                <Button bsStyle="danger" bsSize="xsmall" style={{ padding: 6 + 'px ', width: 50 + 'px', display: this.state.isedit == 'N' ? 'none' : '' }} onClick={this.handleEditCancel}>Cancel</Button>
                            </Col>

                        </Row>
                        
                        <Row>
                            <ReactDataGrid
                                enableCellSelect={true}
                                columns={this.columns}
                                rowGetter={this.rowGetter}
                                rowsCount={CashSalesItems.length}
                                onCellClick={this.onCellClick} rowHeight={20}
                                minHeight={250} />
                        </Row>
                    </div>
                </div>
            </div>
        )
    }
}
LabourCharges_SubForm.propTypes =
    {
        SalesItem: PropTypes.shape
            (
            {
                srno: PropTypes.number,
                tno: PropTypes.string,
                vicno: PropTypes.string,
                docno: PropTypes.string,
                itemid: PropTypes.string,
                partno: PropTypes.string,
                sec: PropTypes.string,
                brand: PropTypes.string,
                idesc: PropTypes.string,
                qty: PropTypes.number,
                qty1: PropTypes.number,
                unit: PropTypes.string,
                unitprice: PropTypes.number,
                total: PropTypes.number,
                io: PropTypes.string,
                src: PropTypes.string,
                docdate: PropTypes.date,
                yyyymmdd: PropTypes.string,
                acno: PropTypes.string,
                br: PropTypes.string,
                brf: PropTypes.number,
                trntype: PropTypes.string,
                trn: PropTypes.string,
                costp: PropTypes.number,
                fcind: PropTypes.string,
                fcrate: PropTypes.number,
                ltotal: PropTypes.number,
                trnid: PropTypes.number,
                exprice: PropTypes.number,
                extotal: PropTypes.number,
                sdisc: PropTypes.number,
                costamt: PropTypes.number
            }
            )
    }
export default asForm(LabourCharges_SubForm, 'LabourCharges')

