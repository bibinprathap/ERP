import React, {Component, PropTypes} from 'react'
import {observer} from 'mobx-react'
import {FormControl} from 'react-bootstrap';
@observer
export default class InputField extends Component {
  constructor (props) {
    super(props)
    this.onChange = this.onChange.bind(this)
    this.onKeyup = this.onKeyup.bind(this)
  }

  onChange (event) {
    this.props.onChange(event.target.name, event.target.value)
  }
  onKeyup (event) {
    if(this.props.onKeyup)
      this.props.onKeyup(event.target.name, event.target.value,event.keyCode)
  }

  render () {
    const iput = this.props
    return (              
               <FormControl
                    id={iput.id}
                    name={iput.name}
                    onChange={this.onChange}
                    onKeyUp={this.onKeyup}
                    type={iput.type}
                    className = {iput.className}
                     tabIndex={iput.tabIndex}
                    value={iput.value}
                    disabled={iput.disabled}
                    placeholder={iput.placeholder}  style={{padding: 4 +'px '}}
               />
           )
       }
}

InputField.propTypes = {
  onChange: PropTypes.func.isRequired
}

InputField.defaultProps = {
  type: 'text'
}
