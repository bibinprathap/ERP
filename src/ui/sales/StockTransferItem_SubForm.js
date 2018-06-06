import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom'
import { observer } from 'mobx-react'
import { InputField, InputDate, asForm, InputSelect } from '../../utils'
import { Button, Panel, Grid, Row, Col, Glyphicon } from 'react-bootstrap';
import { observable, toJSON, extendObservable } from 'mobx';
import ReactDataGrid from 'react-data-grid';
import * as constants from '../../constants.js'
import ReactModal from 'react-modal';
import ItemInquiry from './ItemInquiry';
import StockTransferItem_Store from '../../store/sales/StockTransferItem_Store';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import * as rbstrap from 'react-bootstrap';

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
class StockTransferItem_SubForm extends Component {
    constructor(props) {
        super(props)
        this.handleSelect = this.handleSelect.bind(this);
        this.state = {};
      this.state.key = 1;
        this.state.isedit = 'N';
        this.state.lastno = 1;;
        this.state.modalIsOpen = false;
        window.stocktransferiteminquiry = this;
        this.rowGetter = this.rowGetter.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.onCellClick = this.onCellClick.bind(this);
        this.handleEditSave = this.handleEditSave.bind(this);
        this.handleEditCancel = this.handleEditCancel.bind(this);
        this.afterOpenFn = this.afterOpenFn.bind(this);
        this.requestCloseFn = this.requestCloseFn.bind(this);
        this.getnationality = this.getnationality.bind(this);
        this.changenationality = this.changenationality.bind(this);
        this.showitemquerypopup = this.showitemquerypopup.bind(this);

        this.columns = [
            {
                key: 'SRNO',
                name: 'SRNO'
            },
            {
                key: 'ItemCode',
                name: 'Item Code',
                width: 140
            },
            {
                key: 'Brand',
                name: 'Brand'
            },
            {
                key: 'Origin',
                name: 'Origin'
            },
            {
                key: 'ItemDescription',
                name: 'Item Description',
                width: 200
            },
            {
                key: 'Qty',
                name: 'Qty'
            },

             {
                key: 'StockBR2',
                name: 'Stock BR2'
            },
            {
                key: 'AVGCOST',
                name: 'AVG COST',
                width: 200
            },
            {
                key: 'Total',
                name: 'Total'
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
            window.stocktransferitemgriddata = this.props.SalesItem;
            // window.ShowItemQuery()
            $('#qty').focus()
            window.nextfocuselement.focus();
            this.setState({ modalIsOpen: true });
            setTimeout(function () {
                $('#partnumber').focus()

            }, 100);
        }

    }
    handleAdd() {
        this.props.SalesItem.srno = this.props.StockTransferItems.length + 1;
        this.props.SalesItem.total = parseFloat(this.props.SalesItem.qty) * parseFloat(this.props.SalesItem.unitprice);
        this.props.StockTransferItems.push(JSON.parse(JSON.stringify(toJSON(this.props.SalesItem), null, 2)));
        extendObservable(this.props.SalesItem, StockTransferItem_Store);
        this.state.lastno = this.state.lastno + 1;
        this.state.key = this.state.lastno;
    }
    handleEditSave() {
        this.props.SalesItem.total = parseFloat(this.props.SalesItem.qty) * parseFloat(this.props.SalesItem.unitprice);
        this.props.StockTransferItems[this.state.key] = (JSON.parse(JSON.stringify(toJSON(this.props.SalesItem), null, 2)));
        extendObservable(this.props.SalesItem, StockTransferItem_Store);
        this.state.key = this.state.lastno;
        this.state.isedit = 'N'
        this.props.SalesItem.srno = this.state.lastno;
    }
    handleEditCancel() {
        extendObservable(this.props.SalesItem, StockTransferItem_Store);
        this.state.isedit = 'N';
    }
    onCellClick(rowIdx, row, cellidx) {
        if (cellidx == 6)   //EDIT Button
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
        else if (cellidx == 7)  //DELETE Button
        {
            if (this.state.isedit != 'Y') {
                this.props.StockTransferItems.remove(row)
                var i = 0;
                for (i = 0; i < this.props.StockTransferItems.length; i++) {
                    this.props.StockTransferItems[i].srno = i + 1;
                }
                this.state.lastno = i + 1;
                this.props.SalesItem.srno = this.state.lastno;
                var i = 0;
                for (i = 0; i < this.props.StockTransferItems.length; i++) {
                    this.props.StockTransferItems[i].srno = i + 1;
                }
            }
            else {
                NotificationManager.warning('', 'Item is in edit mode. \n Unable to Delete', 3000);
            }
        }
    }
    handleSelect(key) {
        alert('selected ' + key);
        this.setState({ key });
    }
    rowGetter(i) {
        return this.props.StockTransferItems[i]
    }

    changenationality(key, value,row) {
        this.props.updateProperty(key, value);
        this.props.SalesItem.nationalityname = constants.getFieldLabel(row[0].Title);
    }
    getnationality = (input) => {
        return fetch(constants.SERVICEURL + `/Nationalities/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((response) => {
                return response.json();
            }).then((json) => {
                json.forEach(function (row, index) {
                    row.label = row.Title;
                    row.value = row.ID;
                });
                return { options: json };
            });
    }

    render() {
        const {StockTransferItems, SalesItem, SubHead, updateProperty} = this.props;
        return (
            <div className="container-fluid">
                
                <div className="panel panel-primary"  style={{ padding: 5 }}>
                    
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
                            <ItemInquiry formtype="stocktransfer" ispopup={true} />
                        </ReactModal >     
                            
                        <rbstrap.Panel style={{ minHeight: '60' }}>
                            <Row>
                                {/*  <Col xs={1} sm={1} md={1} lg={1} xl={1}>
                                                  SR#:
                                          </Col>
                                          <Col xs={2} sm={2} md={2} lg={2} xl={2}>
                                                  Invoice No/Date:
                                          </Col>*/}
                                <Col xs={3} sm={3} md={3} lg={3} xl={3}>
                                    <InputField id="partno" name="partno" value={StockTransferDetails.partno}
                                        onChange={updateProperty}  onKeyup={this.showitemquerypopup} placeholder="Item Code" />
                                </Col>

                                <Col xs={2} sm={2} md={2} lg={2} xl={2}>
                                    <InputField id="sec" name="sec" value={StockTransferDetails.sec}
                                        onChange={updateProperty} placeholder="Brand" />
                                </Col>
                                <Col xs={2} sm={2} md={2} lg={2} xl={2}>
                                    <InputField id="brand" name="brand" value={StockTransferDetails.brand}
                                        onChange={updateProperty} placeholder="Origin" />
                                </Col>
                                <Col xs={3} sm={3} md={3} lg={3} xl={3}>
                                    <InputField id="idesc" name="idesc" value={StockTransferDetails.idesc}
                                        onChange={updateProperty} placeholder="Item Description" />
                                </Col>
                                <Col xs={2} sm={2} md={2} lg={2} xl={2}>

                                    <InputField id="qty" name="qty" ref="qty" value={StockTransferDetails.lastName}
                                        onChange={updateProperty} placeholder="Qty" />
                                </Col>

                            </Row>

                            <Row style={{ paddingTop: 5 }}>

                                <Col xs={3} sm={3} md={3} lg={3} xl={3}>
                                    <InputField id="stockBR2" name="stockBR2" value={StockTransferDetails.lastName}
                                        onChange={updateProperty} placeholder="Stock BR:2" />

                                </Col>

                                <Col xs={2} sm={2} md={2} lg={2} xl={2}>

                                    <InputField id="unitprice" name="unitprice" value={StockTransferDetails.unitprice}
                                        onChange={updateProperty} placeholder="AVG COST" />
                                </Col>

                                <Col xs={2} sm={2} md={2} lg={2} xl={2}>
                                    <InputField id="total" name="total" value={StockTransferDetails.total}
                                        onChange={updateProperty} placeholder="Total" />
                                </Col>

                                <Col xs={2} sm={2} md={2} lg={2} xl={2}>
                                    <Button bsStyle="info"><Glyphicon glyph="ok" />&nbsp;Add</Button>
                                </Col>
                                  
                            </Row>
                        </rbstrap.Panel>
                              

                            <Row>
                                <ReactDataGrid
                                    enableCellSelect={true}
                                    columns={this.columns}
                                    rowGetter={this.rowGetter}
                                    rowsCount={StockTransferItems.length}
                                    onCellClick={this.onCellClick} rowHeight={20}
                                    minHeight={250} 
                                     minColumnWidth={50}/>
                            </Row>
                        </div>
                    
                </div>

                
                
            {/*<div className="panel panel-primary" >
              <div className="panel-body" style={{ padding: 5 + 'px ' + 15 + 'px ' + 2 + 'px ' + 15 + 'px' }}>
                                */}
                             <Row>
                                    <Col xs={4} sm={4} md={4} lg={4} xl={4}>
                                        <rbstrap.Panel style={{minHeight:'60',textAlign:'center'}}>
                                             <Button bsStyle="success" > <Glyphicon glyph="check" />&nbsp;Check Stock</Button>
                                            </rbstrap.Panel>
                                     </Col>

                                     <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                                        <rbstrap.Panel style={{minHeight:'60'}}>
                                            <Row>
                                                <Col xs={3} sm={3} md={3} lg={3} xl={3} style={{ paddingTop:'5', paddingLeft:  '50'}}>
                                                        Total Quantity:
                                                </Col>
                                                <Col xs={3} sm={3} md={3} lg={3} xl={3} style={{ paddingRight:  '15'}} >
                                                 <InputField id="totalQty" name="lastName" value={StockTransferDetails.lastName} 
                                                   onChange={updateProperty} placeholder="" />        
                                                </Col>
                                                
                                                <Col xs={3} sm={3} md={3} lg={3} xl={3} style={{ paddingTop:'5',paddingLeft:  '50'}}>
                                                        Total Cost:
                                                </Col>
                                                <Col xs={3} sm={3} md={3} lg={3} xl={3} style={{float:'left', paddingRight:  '15'}} >
                                                 <InputField id="totalCost" name="lastName" value={StockTransferDetails.lastName} 
                                                   onChange={updateProperty} placeholder="" />       
                                                </Col>
                                             </Row>   
                                            </rbstrap.Panel>
                                     </Col>
                              </Row>               

                  {/*      </div>
            
             </div>  */}
              
             
            </div>
            
        )
    }
}
StockTransferItem_SubForm.propTypes =
    {
        SalesItem: PropTypes.shape
            (
            {
                firstName: PropTypes.string,
                lastName: PropTypes.string,
                dateOfBirth: PropTypes.string,
                relationship: PropTypes.string,
                nationality: PropTypes.string
            }
            )
    }
export default asForm(StockTransferItem_SubForm, 'SalesItem')

