import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form'
import { bindActionCreators } from 'redux'
import GenreCheckboxes from './genreCheckboxes'
import InstrumentCheckboxes from './instrumentCheckboxes'
import loginUser from '../actions/loginUser'
import axios from 'axios'
import checkboxHelper from '../helpers/checkboxHelper'

class EditProfile extends Component {
  static contextTypes = {
    router: PropTypes.object
  }

  otherFunc(props) {
    var genres = checkboxHelper().genres
    var instruments = checkboxHelper().instruments
    var user = Object.assign({}, props, {id: this.props.currentUser.id}, {genres: genres.join(' ')}, {instruments: instruments.join(' ')})
    var userJSON = JSON.stringify(user)
    axios({method: 'post', url: 'http://localhost:3000/user', data: userJSON}).then(response => {
      this.props.loginUser(response.data)
      this.context.router.push('/profile')
    })
  }
  render() {
    var user = this.props.currentUser
    const {fields: {name, zipcode, age, bio}, handleSubmit} = this.props;
    return (
      <form onSubmit={handleSubmit(this.otherFunc.bind(this))}>
        Name: <input type='text' value={user.name} {...name}/>
        Zipcode: <input type='tel' value={user.zip} {...zipcode}/>
        Age: <input type='number' value={user.age} {...age}/>
        Bio: <textarea value={user.bio} {...bio}/>
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
  return bindActionCreators({loginUser}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SmartForm)
