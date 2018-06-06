import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import {observer} from 'mobx-react';
import {observable, extendObservable} from 'mobx';
import {InputField, asForm, InputDate, InputSelect, InputCheckbox} from '../../utils';
import Collapse, { Panel } from 'rc-collapse';
import ReactDataGrid from 'react-data-grid';
import { Button,  Grid, Row, Col, Tabs, Tab, Glyphicon} from 'react-bootstrap';
import * as constants from '../../constants.js';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import moment  from "moment";
import LedgerEntries from '../sales/LedgerEntries'
import { Modal,ModalHeader,ModalTitle,ModalClose,ModalBody,ModalFooter} from 'react-modal-bootstrap';
@observer
class RPT_SOA_Form extends Component 
{
    constructor (props) {
        super(props)
        this.state ={};
        this.state.key=0;
        this.state.isOpen=false;
        this.addledgermaster = this.addledgermaster.bind(this);
        this.hideModal = this.hideModal.bind(this);
        this.openModal = this.openModal.bind(this);
    }

    hideModal()
    { 
        this.setState({
        isOpen: false
    });
      }

    openModal()
    {
        window.SOAOptions = this;
        this.setState({
            isOpen: true
        });
    }
    addledgermaster()
    {
        window.ledgerfilloptions =  this.props.RPT_SOAOptions;
        window.showaddpopup();
         //this.setState({modalIsOpen:true,editpopup:false});
    }
     render () {
         const {RPT_SOAOptions, viewReport, printReport, resetOptions, reportTitle,updateProperty} = this.props;        
        return(
            <form onSubmit={viewReport}   style={{padding:0 + 'px',margin: 0 + 'px'}}>
                  <div className="modal fade"  id="historyModal" role="dialog">
                    <div className="modal-dialog">
                        <div className="modal-content modal-dialog modal-lg" style={{ width: '835' + 'px' }}>
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                                <h4 className="modal-title">Ledgers</h4>
                            </div>
                            <div className="modal-body">
                                <div style={{minHeight:"250px"}} >
                                <LedgerEntries/> 
                                </div></div>
                        </div>
                    </div>
                </div>
                <div className="container-fluid">
                {/* <Modal isOpen={this.state.isOpen} size = "modal-lg" onRequestHide={this.hideModal}>
                              <ModalHeader>
                                <ModalClose onClick={this.hideModal}/>
                                <ModalTitle>Ledgers</ModalTitle>
                              </ModalHeader>
                              <ModalBody>
                             <LedgerEntries/> 
                             </ModalBody>
                            <ModalFooter>
                              <button className='btn btn-default' onClick={this.hideModal}>
                                Close
                              </button>
                               </ModalFooter>
                          </Modal> */}
                  <div className="panel panel-primary" >
                        <div className="panel-heading" style={{padding:3 + 'px'}}>
                            <table class='table borderless'>
                                <tbody>
                                <tr>
                                    <td style={{width:100 +'%'}}>
                                        <h3 className="panel-title">{reportTitle}</h3>
                                    </td>
                                    <td> &nbsp;</td>
                                    <td>
                                        <Button  onClick={viewReport}  bsStyle="primary"><Glyphicon glyph="search"/>&nbsp;View</Button>
                                    </td>
                                    <td> &nbsp;</td>
                                    <td>
                                        <Button onClick={printReport} bsStyle="primary"><Glyphicon glyph="print"/>&nbsp;Print</Button>
                                    </td>
                                    <td> &nbsp;</td>
                                    <td>
                                    <Button  onClick={resetOptions} bsStyle="primary"><Glyphicon glyph="erase"/>&nbsp;Reset</Button>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        <NotificationContainer/>
                        <div className="panel-body"  style={{padding: 5+'px ' + 15+'px ' + 2+'px ' + 15+'px'}}>  
                           <Row>
                         
                               <Col xs={1} sm={1} md={1} lg={1} xl={1} >                               
                               A/C Name
                                </Col>
                                <Col xs={4} sm={4} md={4} lg={4} xl={4}  style={{padding:0 + 'px'}}>
                                    <table class='table borderless'>
                                        <tbody>
                                            <tr>
                                                <td style={{width:64 +'%'}}>
            	                                    <InputField id="acname" name="acname"  value={RPT_SOAOptions.acname}    onChange={updateProperty} placeholder="A/C Name"/>
                                                </td>
                                                <td style={{width:2 +'%'}}></td>
                                                <td style={{width:10 +'%'}}>
                                                    <Button  onClick={this.addledgermaster} className="floatleft" style={{margin: 0+'px ' + 0 +'px ' + 15+'px ' + 0+'px'}} bsStyle="primary"><Glyphicon glyph="search"/></Button>
                                                </td>
                                                <td style={{width:2 +'%'}}></td>
                                                <td style={{width:22 +'%'}}>
                                                    <InputField id="acno" name="acno"   value={RPT_SOAOptions.acno} onChange={updateProperty} placeholder="A/C No"/>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </Col>
                                <Col xs={1} sm={1} md={1} lg={1} xl={1} style={{padding: 0+'px ' + 0+'px ' + 0+'px ' + 15+'px'}}>
                                    <InputCheckbox id="truefalse" name="truefalse" labeltext="All Period" value={RPT_SOAOptions.truefalse} onChange={updateProperty} />
                                </Col>
                                <Col xs={1} sm={1} md={1} lg={1} xl={1} style={{padding: 0+'px ' + 0+'px ' + 0+'px ' + 15+'px'}}>
                                    From Date
                                </Col>
                                <Col xs={2} sm={2} md={2} lg={2} xl={2} style={{padding: 0+'px ' + 0+'px ' + 0+'px ' + 0+'px'}}>
            	                    <InputDate onChange={updateProperty} value={RPT_SOAOptions.fromdate} id="fromdate" name="fromdate" />
                                </Col>  
                                <Col xs={1} sm={1} md={1} lg={1} xl={1} style={{padding: 5+'px ' + 0+'px ' + 0+'px ' + 15+'px'}}>
                                    To Date
                                </Col>
                                <Col xs={2} sm={2} md={2} lg={2} xl={2} style={{padding: 5+'px ' + 0+'px ' + 0+'px ' + 0+'px'}}>
            	                    <InputDate onChange={updateProperty} value={RPT_SOAOptions.todate} id="todate" name="todate" />
                                </Col> 
                            </Row>
                             <Row>
                                <Col xs={12} sm={12} id="soaGrid"  style={{height: 600+'px '}}  md={12} lg={12} xl={12}>
                                </Col>
                            </Row> 
                </div>
            </div>
        </div>
    </form>
)
                        }
                        }
RPT_SOA_Form.propTypes = 
                        {
                            RPT_SOAOptions: PropTypes.shape
        (
                        {
                            fromDate:  PropTypes.date,
                            toDate:  PropTypes.date,
                            truefalse: PropTypes.boolean,
                            acno: PropTypes.string 
                        }
        )
                        }
export default asForm(RPT_SOA_Form,"RPT_SOAOptions")