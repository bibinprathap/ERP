import React, {Component, PropTypes} from 'react'
import {observer} from 'mobx-react'
import { DateField, Calendar } from 'react-date-picker'
import moment  from "moment"
@observer
export default class InputDate extends Component {
  constructor (props) {
    super(props)
    this.onChange = this.onChange.bind(this)
  }

  onChange (event) {
      this.props.onChange(this.props.name,  moment(event,"DD/MM/YYYY")._d)
  }

  render () {
      const iput = this.props
      var valDat;
      if (iput.value=="" )
          valDat= new Date()
      else
          valDat= iput.value
      var dtStr =moment(valDat).format("DD/MM/YYYY")
    return (        
        <DateField
                id={iput.id}
                forceValidDate                                       
                name={iput.name}
                onChange={this.onChange}
                value={dtStr}
                    disabled={iput.disabled}
                 tabIndex={iput.tabIndex}
                placeholder={iput.placeholder}  style={{padding: 0 +'px '}} 
                dateFormat="DD/MM/YYYY"
                updateOnDateClick= "true"
                collapseOnDateClick= "true"
            />
           )
       }
}

InputDate.propTypes = {
  onChange: PropTypes.func.isRequired
}
