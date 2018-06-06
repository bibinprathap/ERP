import React, {Component, PropTypes} from 'react'
import {observer} from 'mobx-react'

@observer
export default class InputCheckboxes extends Component {
  constructor (props) {
    super(props)
    this.onChange = this.onChange.bind(this)
  }

  onChange (event) {
    this.props.onChange(this.props.name, event.target.value)
  }

  render () {
    const {items, name, checkedItems,tabIndex} = this.props
    return (
      <div className="form-group">
        <b>{name}</b>
        {
          items.map((item) => {
            return (
              <div className="checkbox" key={`${name}-${item}`}>
                <label htmlFor={`${name}-${item}`}>
                  <input type="checkbox" name={`${name}`} value={item} id={`${name}-${item}`}
                     tabIndex={parseFloat(tabIndex)  + parseFloat(index)}   checked={checkedItems.indexOf(item) > -1}
                      onChange={this.onChange}/> {item}
                </label>
              </div>
            )
          })
        }
      </div>
    )
  }
}

InputCheckboxes.propTypes = {
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired
}
