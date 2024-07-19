import React from 'react';
import { ListGroup, Container, Row, Col, Card, Button } from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';
import './UserList.css';

const UserList = ({ users, onSelectUser, onDeleteUser }) => {
  return (
    <Container className="user-list-container">
      <Row className="justify-content-md-center">
        <Col md="12">
          <Card>
            <Card.Body>
              <Card.Title className="text-center">All Users</Card.Title>
              <ListGroup>
                {users.map(user => (
                  <ListGroup.Item key={user.Id} className="d-flex justify-content-between align-items-center">
                    <span onClick={() => onSelectUser(user.Id)} style={{ cursor: 'pointer' }}>
                      {user.Name}
                    </span>
                    <Button variant="danger" size="sm" onClick={() => onDeleteUser(user.Id)}>
                      <FaTrash />
                    </Button>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default UserList;