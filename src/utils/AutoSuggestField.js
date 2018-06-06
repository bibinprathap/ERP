import React, {Component, PropTypes} from 'react'
import {observer} from 'mobx-react'
//import Autosuggest from 'react-autosuggest';


@observer
export default class AutoSuggestField extends Component {
    constructor (props) {
        super(props)
        this.onChange = this.onChange.bind(this)
        
        this.getSuggestionValue = this.getSuggestionValue.bind(this)
        this.renderSuggestion = this.renderSuggestion.bind(this)
        this.getSuggestions = this.getSuggestions.bind(this)
        this.state = {    value: '',suggestions:[],languages :[]}
        window["sugetion" + this.props.name] = this;
   }
     

    // Teach Autosuggest how to calculate suggestions for any given input value.
     getSuggestions(value) {
        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;

        return inputLength === 0 ? [] :  languages.filter(lang =>
            lang.name.toLowerCase().slice(0, inputLength) === inputValue
        );
    }

    // When suggestion is clicked, Autosuggest needs to populate the input field
    // based on the clicked suggestion. Teach Autosuggest how to calculate the
    // input value for every given suggestion.
     getSuggestionValue(suggestion) {
        return suggestion.name;
    }

    // Use your imagination to render suggestions.
     renderSuggestion(suggestion) {
        return (
          <span>{suggestion.name}</span>
        );
    }
     onChange = (event, { newValue }) => {
       //  this.props.value = newValue;
         //this.setState({
         //    value: newValue
         //});
         this.props.onChange(this.props.name  , newValue)
     };
    //onChange (event) {
    //    this.props.onChange(event.target.name, event.target.value)
    //}
     // Autosuggest will call this function every time you need to update suggestions.
    // You already implemented this logic above, so just use it.
    onSuggestionsFetchRequested = ({ value }) => {
        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;
          var auto =  inputLength === 0 ? [] :  this.state.languages.filter(lang =>
            lang.name.toLowerCase().slice(0, inputLength) === inputValue
        );
       
        this.setState({
            suggestions: auto
        });
    };

    // Autosuggest will call this function every time you need to clear suggestions.
    onSuggestionsClearRequested = () => {
        this.setState({
            suggestions: []
        });
    };

    render () {
        const {  suggestions ,languages} = this.state;
        const iput = this.props
        // Autosuggest will pass through all these props to the input field.
        const inputProps = {
            id:iput.id,
            name:iput.name,
            onChange:this.onChange,
            type:iput.type,
            value:iput.value,  
            disabled:iput.disabled, 
            placeholder:iput.placeholder
        };

        // Finally, render it!
        return (
      <div></div>
);
 }
}

AutoSuggestField.propTypes = {
    onChange: PropTypes.func.isRequired
}

AutoSuggestField.defaultProps = {
    type: 'text'
}
