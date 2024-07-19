import React, { useState, useEffect } from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { getUserProfiles, createUserProfile, updateUserProfile, getUser, deleteUserProfile } from './Services/UserProfileService';
//import LoginForm from './LoginForm';
import UserList from './UserList';
import UserForm from './UserForm';
import logo from './logo.svg';
import './App.css';

function App() {
  const [userProfiles, setUserProfiles] = useState([]);

  //const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  //for consistent mapping with server response
  const normalizeKeys = (user) => {
    return {
      Id: user.Id,
      Name: user.Name,
      Email: user.Email,
      Phone: user.Phone,
      Address: user.Address,
      PortfolioUrl: user.PortfolioUrl,
      ProfileImage: user.ProfileImage,
    };
  };

  const fetchUsers = async () => {
    try {
      const response = await getUserProfiles();
      const normalizedUsers = response.data.map(normalizeKeys);
      console.log('Fetched users:', normalizedUsers);
      setUsers(normalizedUsers);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleUserSelect = async (id) => {
    try {
      const response = await getUser(id);
      const normalizedUser = normalizeKeys(response.data);
      console.log('Selected user:', normalizedUser);
      setSelectedUser(normalizedUser);
    } catch (error) {
      console.error('Error selecting user:', error);
    }
  };

  // useEffect(() => {
  //   if (user) {
  //       fetchUsers();
  //   }
  // }, [user]); //When login req

  const handleUserAdd = () => {
    console.log('Adding new user');
    setSelectedUser({ Id: 0, Name: '', Email: '', Phone: '', Address: '', PortfolioUrl: '', ProfileImage: null });
  };

  const handleUserSave = async (user) => {
    try {
      if (user.Id === 0) {
        await createUserProfile(user);
        alert('User added successfully');
      } else {
        await updateUserProfile(user);
        alert('User updated successfully');
      }
      fetchUsers();
      setSelectedUser(null);
    } catch (error) {
      console.error('Error saving user:', error);
    }
  };

  const handleUserDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await deleteUserProfile(id);
        alert('User deleted successfully');
        fetchUsers();
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);


  // return (
  //   <div>
  //       {!user ? (
  //           <LoginForm onLogin={setUser} />
  //       ) : (
  //           <>
  //               <UserList users={users} onSelectUser={handleUserSelect} />
  //               {selectedUser && <UserForm user={selectedUser} />}
  //           </>
  //       )}
  //   </div>
  // );
  return (
    <Container>
      <Row className="justify-content-center my-3">
        <Col xs="auto">
          <img src={logo} className="App-logo" alt="logo" />
        </Col>
      </Row>
      <Row className="justify-content-center mb-3">
        <Col md="8">
          <Button variant="primary" onClick={handleUserAdd} className="mb-3">Add New User</Button>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          <UserList users={users} onSelectUser={handleUserSelect} onDeleteUser={handleUserDelete} />
          {selectedUser && <UserForm user={selectedUser} onUserSave={handleUserSave} />}
        </Col>
      </Row>
    </Container>
  );
}

export default App;
