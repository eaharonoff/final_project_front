import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form'
import { bindActionCreators } from 'redux'
import GenreCheckboxes from './genreCheckboxes'
import InstrumentCheckboxes from './instrumentCheckboxes'
import updateUser from '../actions/updateUser'
import axios from 'axios'
import checkboxHelper from '../helpers/checkboxHelper'

class EditProfile extends Component {
  static contextTypes = {
    router: PropTypes.object
  }

  otherFunc(props) {
    var genres = checkboxHelper().genres
    var instruments = checkboxHelper().instruments
    var zipcode = props.zipcode
    axios({method: 'get', url: `https://maps.googleapis.com/maps/api/geocode/json?address=${zipcode}&key=AIzaSyA4X16Aq4qYw7WrqcvZGzdKgeeL26E5irc`}).then(response => {
      var city = response.data.results[0].formatted_address
      var data = this.props.values
      data.city = {}
      data.city.name = city
      var user = Object.assign({}, data, {id: this.props.currentUser.id}, {genres: genres.join(' ')}, {instruments: instruments.join(' ')})
      var userJSON = JSON.stringify(user)
      axios({method: 'post', url: 'http://localhost:3000/user', data: userJSON}).then(response => {
        this.props.updateUser(response.data)
        this.context.router.push('/profile')
      })
    }
  )}
  render() {
    var user = this.props.currentUser
    const {fields: {name, zipcode, age, bio}, handleSubmit} = this.props;
    return (
      <form onSubmit={handleSubmit(this.otherFunc.bind(this))}>
        Name: <input type='text' placeholder={user.name} {...name}/>
        Zipcode: <input type='text' placeholder={user.zip} {...zipcode}/>
        Age: <input type='number' placeholder={user.age} {...age}/>
        Bio: <textarea placeholder={user.bio} {...bio}/>
        Choose Genres: <GenreCheckboxes/>
        Choose Instruments: <InstrumentCheckboxes/>
        <input type='submit'/>
      </form>
    )
  }
}

var SmartForm = reduxForm({
  form: 'signUp',
  fields: ['name', 'zipcode', 'age', 'bio']
})(EditProfile);

function mapStateToProps(state) {
  return {currentUser: state.currentUser}
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({updateUser}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SmartForm)
