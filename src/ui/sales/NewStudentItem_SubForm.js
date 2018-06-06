import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom'
import { observer } from 'mobx-react'
import { InputField, InputDate, asForm, InputSelect } from '../../utils'
import { Button, Panel, Grid, Row, Col, Glyphicon } from 'react-bootstrap';
import { observable, toJSON, extendObservable } from 'mobx';
import ReactDataGrid from 'react-data-grid';
import * as constants from '../../constants.js'
import NewStudentItem_Store from '../../store/sales/NewStudentItem_Store';
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
class NewStudentItem_SubForm extends Component {
    constructor(props) {
        super(props)
        this.handleSelect = this.handleSelect.bind(this);
        this.state = {};
      this.state.key = 1;
        this.state.isedit = 'N';
        this.state.lastno = 1;;
        window.cashsalesiteminquiry = this;
        this.rowGetter = this.rowGetter.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.onCellClick = this.onCellClick.bind(this);
        this.handleEditSave = this.handleEditSave.bind(this);
        this.handleEditCancel = this.handleEditCancel.bind(this);
        this.afterOpenFn = this.afterOpenFn.bind(this);
        this.requestCloseFn = this.requestCloseFn.bind(this);
        this.getnationality = this.getnationality.bind(this);
        this.changenationality = this.changenationality.bind(this);

        this.columns = [
            {
                key: 'ID',
                name: 'ID'
            },
            {
                key: 'firstName',
                name: 'First Name',
                width: 140
            },
            {
                key: 'lastName',
                name: 'Last Name'
            },
            {
                key: 'dateOfBirth',
                name: 'Date Of Birth'
            },
            {
                key: 'relationship',
                name: 'relationship',
                width: 200
            },
            {
                key: 'nationalityname',
                name: 'nationality'
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
    handleAdd() {
        this.props.SalesItem.srno = this.props.NewStudentItems.length + 1;
        this.props.SalesItem.total = parseFloat(this.props.SalesItem.qty) * parseFloat(this.props.SalesItem.unitprice);
        this.props.NewStudentItems.push(JSON.parse(JSON.stringify(toJSON(this.props.SalesItem), null, 2)));
        extendObservable(this.props.SalesItem, NewStudentItem_Store);
        this.state.lastno = this.state.lastno + 1;
        this.state.key = this.state.lastno;
    }
    handleEditSave() {
        this.props.SalesItem.total = parseFloat(this.props.SalesItem.qty) * parseFloat(this.props.SalesItem.unitprice);
        this.props.NewStudentItems[this.state.key] = (JSON.parse(JSON.stringify(toJSON(this.props.SalesItem), null, 2)));
        extendObservable(this.props.SalesItem, NewStudentItem_Store);
        this.state.key = this.state.lastno;
        this.state.isedit = 'N'
        this.props.SalesItem.srno = this.state.lastno;
    }
    handleEditCancel() {
        extendObservable(this.props.SalesItem, NewStudentItem_Store);
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
                this.props.NewStudentItems.remove(row)
                var i = 0;
                for (i = 0; i < this.props.NewStudentItems.length; i++) {
                    this.props.NewStudentItems[i].srno = i + 1;
                }
                this.state.lastno = i + 1;
                this.props.SalesItem.srno = this.state.lastno;
                var i = 0;
                for (i = 0; i < this.props.NewStudentItems.length; i++) {
                    this.props.NewStudentItems[i].srno = i + 1;
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
        return this.props.NewStudentItems[i]
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
        const {NewStudentItems, SalesItem, SubHead, updateProperty} = this.props;
        return (
            <div className="container-fluid">
                <div className="panel panel-primary"  >
                    <div className="panel-body" style={{ padding: 5 + 'px ' + 15 + 'px ' + 2 + 'px ' + 15 + 'px' }}>
                        {/*    */}
                        <Row>
                            <Col xs={3} sm={3} md={3} lg={3} xl={3} style={{ padding: 2 + 'px ' }}>
                                First Name
                                </Col>
                            <Col xs={2} sm={2} md={2} lg={2} xl={2} style={{ padding: 2 + 'px ' }}>
                                Last Name
                                </Col>
                            <Col xs={2} sm={2} md={2} lg={2} xl={2} style={{ padding: 2 + 'px ' }}>
                                Date Of Birth
                                </Col>
                            <Col xs={2} sm={2} md={2} lg={2} xl={2} style={{ padding: 2 + 'px ' }}>

                                Relationship
                                </Col>
                            <Col xs={2} sm={2} md={2} lg={2} xl={2} style={{ padding: 2 + 'px ' }}>
                                Nationality
                                </Col>
                            <Col xs={1} sm={1} md={1} lg={1} xl={1} style={{ padding: 2 + 'px ' }}>
                                <Button bsStyle="danger" bsSize="xsmall" style={{ padding: 6 + 'px ', width: 50 + 'px', display: this.state.isedit == 'N' ? 'none' : '' }} onClick={this.handleEditCancel}>Cancel</Button>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={3} sm={3} md={3} lg={3} xl={3} style={{ padding: 2 + 'px ' }}>
                                <InputField id="firstName" disabled={this.props.isedit && constants.USERROLID =="1"  } tabIndex="3" name="firstName" value={SalesItem.firstName} onChange={updateProperty} placeholder="First Name" />
                            </Col>
                            <Col xs={2} sm={2} md={2} lg={2} xl={2} style={{ padding: 2 + 'px ' }}>
                                <InputField id="lastName" disabled={this.props.isedit && constants.USERROLID =="1"  } name="lastName" value={SalesItem.lastName} onChange={updateProperty} placeholder="Last Name" />
                            </Col>
                            <Col xs={2} sm={2} md={2} lg={2} xl={2} style={{ padding: 2 + 'px ' }}>
                                <InputDate onChange={updateProperty} value={SalesItem.dateOfBirth} id="dateOfBirth" name="dateOfBirth" />
                            </Col>
                            <Col xs={2} sm={2} md={2} lg={2} xl={2} style={{ padding: 2 + 'px ' }}>
                                <InputSelect id="relationship" tabIndex="1" name="relationship" disabled={this.props.isedit && constants.USERROLID =="1"  } value={SalesItem.relationship} onChange={updateProperty}
                                    placeholder="Select Relationship"
                                    options={constants.relationships} />
                            </Col>
                            <Col xs={2} sm={2} md={2} lg={2} xl={2} style={{ padding: 2 + 'px ' }}>
                                <InputSelect id="nationality" tabIndex="1" name="nationality" disabled={this.props.isedit && constants.USERROLID =="1"  }   value={SalesItem.nationality} onChange={this.changenationality}
                                    placeholder="Select Nationality"
                                    asyncOptions={this.getnationality} />
                            </Col>

                            <Col xs={1} sm={1} md={1} lg={1} xl={1} style={{ padding: 2 + 'px' }}>
                                <Button bsStyle="success" bsSize="xsmall" disabled={this.props.isedit && constants.USERROLID =="1"  }  tabIndex="9" style={{ padding: 6 + 'px ', width: 50 + 'px', display: this.state.isedit == 'N' ? '' : 'none' }} onClick={this.handleAdd}>Add</Button>
                                <Button bsStyle="success" bsSize="xsmall"  disabled={this.props.isedit && constants.USERROLID =="1"  }  style={{ padding: 6 + 'px ', width: 50 + 'px', display: this.state.isedit == 'N' ? 'none' : '' }} onClick={this.handleEditSave}>Save</Button>
                            </Col>
                        </Row>
                        <Row>
                            <ReactDataGrid
                                enableCellSelect={true}
                                columns={this.columns}
                                rowGetter={this.rowGetter}
                                rowsCount={NewStudentItems.length}
                                onCellClick={this.onCellClick} rowHeight={20}
                                minHeight={250} />
                        </Row>
                    </div>
                </div>
            </div>
        )
    }
}
NewStudentItem_SubForm.propTypes =
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
export default asForm(NewStudentItem_SubForm, 'SalesItem')

