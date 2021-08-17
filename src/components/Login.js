import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'
import { Link, Redirect } from 'react-router-dom'


class Login extends Component {
  state= {
    selectedUser: '',
    toHome: false
  }
  handleChange = (e) => {
    e.preventDefault()
    const { dispatch, users } = this.props
    this.setState({ selectedUser: e.target.value})
  }

  handleSubmit = () => {
    const { dispatch, users } = this.props
    if (this.state.selectedUser === '') return;
    dispatch(
      setAuthedUser(this.state.selectedUser)
    );
    this.setState(() => ({
      toHome: true
    }))
  }
  render() {
    const {  users } = this.props
    console.log(this.props)
    if (this.state.toHome === true) {
      return <Redirect to='/Home' />
    }
    return (
      <div className='login'>
        <select type="select" name="select" value={this.state.selectedUser} onChange={this.handleChange}>
          <option className='es' value='Select user'>Select user:</option>

          {users && users.map((user) => (
           
              <option key={user.id} value={user.id}>
              {user.id}
            </option>
            
           
          ))}   
        </select>
        <button onClick={this.handleSubmit} >
            Submit 
        </button>
      </div>
    )
  }
}


function mapStateToProps({ users }) {
  if (JSON.stringify(users) !== "{}")
    return {
      users: Object.values(users).sort(
        (b, a) =>
          a.questions.length +
          Object.keys(a.answers).length -
          (b.questions.length + Object.keys(b.answers).length)
      ),
    };
  else return {};
}



export default connect(mapStateToProps)(Login)


 
// import React, { PureComponent } from 'react';
// import { Button, Form, FormGroup, Label, Input, Row, Col } from 'reactstrap';
// import { connect } from 'react-redux'
// import PropTypes from 'prop-types'
// import { setAuthedUser } from '../actions/authedUser'

// class Login extends PureComponent {
//   static propTypes = {
//     users: PropTypes.object.isRequired,
//     setAuthedUser: PropTypes.func.isRequired
//   }
//   state = {
//     userId : ''
//   }

//   onUserChange = (userId) => { this.setState({ userId })}

//   onLogin = () => {
//     const { userId } = this.state;
//     const { setAuthedUser } = this.props;
//     if (userId) {
//       setAuthedUser(userId);
//     }
//   }

//   render() {
//     const { users } = this.props;
//     const { userId } = this.state;
//     return (
//       <Row>
//         <Col sm="12" md={{ size: 6, offset: 3 }}>
//           <Form>
//             <FormGroup>
//               <Label for="userSelect">Select User</Label>
//               <Input type="select" name="select" value={userId} onChange={(event) => this.onUserChange(event.target.value)}>
//                 <option value="" disabled>Please select</option>
//                 {
//                   Object.keys(users).map(user =>
//                   <option key={user} value={user}>
//                     {users[user].name}
//                   </option>)
//                 }
//               </Input>
//             </FormGroup>
//             <Button onClick={this.onLogin} disabled={!userId}>Login</Button>
//           </Form>
//         </Col>
//       </Row>
//     );
//   }
// }

// function mapStateToProps ({ users }) {
//   return {
//     users
//   }
// }

// function mapDispatchToProps(dispatch) {
//   return {
//     setAuthedUser: (id) => {
//       dispatch(setAuthedUser(id))
//     }
//   }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(Login)
