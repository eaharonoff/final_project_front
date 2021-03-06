export default function currentUser(state = {}, action){
  var newState
  var idx
  var requests
  switch(action.type){
    case 'ADD_USER':
      return {name: action.name, city: action.city, email: action.email, password: action.password, picture: action.picture}
    case 'UPDATE_USER':
      var allFriends = [].concat(action.payload.inverse_friends).concat(action.payload.friends)
      return Object.assign(action.payload, {allFriends})
    case 'ADD_FRIEND_REQUEST':
      newState = Object.assign({}, state)
      newState.sent_requests.push(action.payload)
      return newState
    case 'ADD_FRIENDSHIP':
      newState = Object.assign({}, state)
      requests = newState.received_requests
      idx = requests.indexOf(requests.find(request => request.id === action.payload.id))
      newState.received_requests.splice(idx, 1)
      newState.allFriends.push(action.payload.sender)
      return newState
    case 'SAVE_CONVO':
      newState = Object.assign({}, state)
      newState.all_conversations.push(action.payload)
      return newState
    case 'DELETE_CONVO':
      newState = Object.assign({}, state)
      var conversations = newState.all_conversations
      var toRemove = conversations.find(conversation => conversation.id === parseInt(action.payload))
      conversations.splice(conversations.indexOf(toRemove), 1)
      return newState
    case 'DECLINE_FRIEND_REQUEST':
      newState = Object.assign({}, state)
      requests = newState.received_requests
      idx = requests.indexOf(requests.find(request => request.id === action.payload.id))
      newState.received_requests.splice(idx, 1)
      return newState
    case 'DELETE_USER':
      return {}
    default:
      return state
  }
}
