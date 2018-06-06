import React, {Component, PropTypes} from 'react'
import {observer} from 'mobx-react'
import Select from 'react-select';

@observer
export default class InputSelect extends Component {
  constructor (props) {
    super(props)
    this.onChange = this.onChange.bind(this)
    this.handleFocus = this.handleFocus.bind(this);
    this.state={};
    this.state.initialload= false;
  }
  

  onChange (event,selectedrow) {
    this.props.onChange(this.props.name, event,selectedrow)
  }
    handleFocus()
    {
      if( this.state.initialload== false)
     this.refs.child.loadOptions('')
       this.state.initialload = true;
    }
  render () {
    const iput = this.props
    if(iput.combotype)
    {
    return (            
      <Select.Async
      ref='child'
       cache={false}
        onFocus={this.handleFocus}
                    id={iput.name}
                    name={iput.name}
                    onChange={this.onChange}
                    type={iput.type}
                    value={iput.value}
                    options={iput.options}
                    disabled={iput.disabled}
                    className={iput.className?'ContactForm-error-select':''}
                    placeholder={iput.placeholder}  
                    loadOptions={iput.loadOptions}
                    style={{padding: 1 +'px '}}
/>
  )
           }
           else{
 return (            
                          <Select
                    id={iput.id}
                    name={iput.name}
                    onChange={this.onChange}
                    type={iput.type}
                    value={iput.value}
                    cacheAsyncResults={false}
                    disabled={iput.disabled}
                    tabIndex={iput.tabIndex}
                    asyncOptions={iput.asyncOptions}
                    options={iput.options}
                    placeholder={iput.placeholder} 
                     style={{padding: 4 +'px '}}
               />
 )
           }
       }
}

InputSelect.propTypes = {
  onChange: PropTypes.func.isRequired
}

InputSelect.defaultProps = {
  type: 'text'
}



// import React, {Component, PropTypes} from 'react'
// import {observer} from 'mobx-react'
// import Select from 'react-select';

// @observer
// export default class InputSelect extends Component {
//   constructor (props) {
//     super(props)
//     this.onChange = this.onChange.bind(this)
//   }

//   onChange (event,selectedrow) {
//     this.props.onChange(this.props.name, event,selectedrow)
//   }

//   render () {
//     const iput = this.props
//     return (            
//                <Select
//                     id={iput.id}
//                     name={iput.name}
//                     onChange={this.onChange}
//                     type={iput.type}
//                     value={iput.value}
//                     cacheAsyncResults={false}
//                     disabled={iput.disabled}
//                     tabIndex={iput.tabIndex}
//                     asyncOptions={iput.asyncOptions}
//                     options={iput.options}
//                     placeholder={iput.placeholder} 
//                      style={{padding: 4 +'px '}}
//                />
//            )
//        }
// }

// InputSelect.propTypes = {
//   onChange: PropTypes.func.isRequired
// }

// InputSelect.defaultProps = {
//   type: 'text'
// }
