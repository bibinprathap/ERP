/**
 * asForm Higher Order Component
 */
import React, {Component} from 'react'

export default function asForm (MyComponent, formDataProp) {
  return class Form extends Component {
    constructor (props) {
      super(props)
      this.updateProperty = this.updateProperty.bind(this)
      this.updateArray = this.updateArray.bind(this)
    }

    updateProperty (key, value) {
      this.props[formDataProp][key] = value
    }

    updateArray (key, value) {
      const array = this.props[formDataProp][key]
      const index = array.indexOf(value)

      if (array.indexOf(value) > -1) {
        array.splice(index, 1)
      } else {
        array.push(value)
      }
    }

    render () {
      return (
        <MyComponent {...this.props}
            updateProperty={this.updateProperty}
            updateArray={this.updateArray}/>
      )
    }
  }
}
