import React from 'react'
import { Route } from 'react-router'
import App from './App'
import SmartSignUp from './components/signUp'
import SmartSignUp2 from './components/signUp2'
import SignIn from './components/signIn'
import CurrentUserProfile from './components/currentUserProfile'
import EditProfile from './components/editProfile'
import Search from './components/search'
import ViewUserProfile from './components/viewUserProfile'
import FriendRequests from './components/friendRequests'
import Conversations from './components/conversations'
import Conversation from './components/conversation'
import Home from './components/home'
import FilteredUsers from './components/filteredUsers'


export default (

    <Route path='/' component={App}>
      <Route path="/home" component={Home} />
      <Route path="/signup" component={SmartSignUp} />
      <Route path="/signup2" component={SmartSignUp2} />
      <Route path="/signin" component={SignIn} />
      <Route path="/profile" component={CurrentUserProfile}/>
      <Route path="/profile/edit" component={EditProfile}/>
      <Route path="/search" component={Search} >
        <Route path="/results" component={FilteredUsers} />
      </Route>

      <Route path="/users/foo" component={ViewUserProfile}/>
      <Route path="/requests" component={FriendRequests} />
      <Route path="/conversations" component={Conversations}>
        <Route path="/conversation" component={Conversation} />
      </Route>
    </Route>

  )
