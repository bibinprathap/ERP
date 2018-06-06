import React, {Component, PropTypes} from 'react'
import {observer} from 'mobx-react'

@observer
export default class InputRadio extends Component {
  constructor (props) {
    super(props)
    this.onChange = this.onChange.bind(this)
  }

  onChange (event) {
    this.props.onChange(this.props.name, event.target.value)
  }

  render () {
    const {items, name, value,tabIndex} = this.props
    return (
      <div className="form-group">
        <b>{name}</b>
        {
          items.map((item) => {
            return (
              <div className="radio" key={`${name}-${item}`}>
                <label>
                  <input type="radio" value={item} name={name}
                   tabIndex={tabIndex}    checked={item === value} onChange={this.onChange}/>
                  {item}
                </label>
              </div>
            )
          })
        }
      </div>
    )
  }
}

InputRadio.propTypes = {
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired
}
