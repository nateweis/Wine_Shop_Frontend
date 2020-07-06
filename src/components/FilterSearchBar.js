import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {addToFilter} from '../actions/filter'


class FilterSearchBar extends Component{
    constructor(props) {
        super(props)
        this.state = {
            filter:{}
        }
    }

    filterSearch = (e) => {
        
        const catigory = e.target.name, value = e.target.value, checked = e.target.checked
        this.setState((pre) => {
            if(pre.filter[catigory]){
                if(checked) pre.filter[catigory] = [value, ...pre.filter[catigory]]
                else {
                    pre.filter[catigory].splice(pre.filter[catigory].indexOf(value),1)
                    if(pre.filter[catigory].length === 0) delete pre.filter[catigory]
                }
            }
            else pre.filter[catigory] = [value]
            
            return {filter: pre.filter}
        }
        )
    }

    submitFilter = (e) => {
        e.preventDefault();
        this.props.addToFilter(this.state.filter)
    }
    

    render(){
        return(
            <>
                <h4>Filter Options</h4>
                    <form onSubmit={this.submitFilter}>
                        <label htmlFor="checkbox-red">Red</label>
                        <input type="checkbox" name="color" id="checkbox-red" value="red" onChange={this.filterSearch}/>
                        <label htmlFor="checkbox-white">White</label>
                        <input type="checkbox" name="color" id="checkbox-white" value="white" onChange={this.filterSearch}/>
                        <label htmlFor="checkbox-rose">Rose</label>
                        <input type="checkbox" name="color" id="checkbox-rose" value="rose" onChange={this.filterSearch}/>

                        <label htmlFor="checkbox-italy">Italy</label>
                        <input type="checkbox" name="origin" id="checkbox-italy" value="italy" onChange={this.filterSearch}/>
                        <label htmlFor="checkbox-california">California</label>
                        <input type="checkbox" name="origin" id="checkbox-california" value="california" onChange={this.filterSearch}/>

                        <input type="submit"/>
                    </form>
            </>
        )
    }
}

const style = {

}

FilterSearchBar.propTypes = {
    addToFilter : PropTypes.func
}

const mapStateToProps = (state) => ({
   
});


export default connect(null, {addToFilter})(FilterSearchBar)