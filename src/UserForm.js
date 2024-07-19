import React, { useState, useEffect, useRef } from 'react';
import { Form, Button, Card, Container, Row, Col } from 'react-bootstrap';
import { FaTrashAlt } from 'react-icons/fa';
import './UserForm.css';

const UserForm = ({ user, onUserSave }) => {
  const [formData, setFormData] = useState({
    Id: user.Id || 0,
    Name: user.Name || '',
    Email: user.Email || '',
    Phone: user.Phone || '',
    Address: user.Address || '',
    PortfolioUrl: user.PortfolioUrl || '',
    ProfileImage: user.ProfileImage || null,
  });

  const fileInputRef = useRef(null);

  useEffect(() => {
    setFormData({
      Id: user.Id || 0,
      Name: user.Name || '',
      Email: user.Email || '',
      Phone: user.Phone || '',
      Address: user.Address || '',
      PortfolioUrl: user.PortfolioUrl || '',
      ProfileImage: user.ProfileImage || null,
    });
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      setFormData((prevData) => ({ ...prevData, ProfileImage: event.target.result.split(',')[1] }));
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setFormData((prevData) => ({ ...prevData, ProfileImage: null }));
    fileInputRef.current.value = null; // Clear the file input
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUserSave(formData);
  };

  const imageUrl = formData.ProfileImage ? `data:image/jpeg;base64,${formData.ProfileImage}` : null;

  return (
    <Container className="user-form-container">
      <Row className="justify-content-md-center">
        <Col md="12">
          <Card>
            <Card.Body>
              <Card.Title className="text-center">
                {formData.Id === 0 ? 'Add New User' : 'Edit User'}
              </Card.Title>
              <div className="image-preview text-center mb-3">
                <div
                  className="img-thumbnail rounded-circle"
                  style={{
                    width: '150px',
                    height: '150px',
                    backgroundColor: '#f8f9fa',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  onClick={() => fileInputRef.current.click()}
                >
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt="Profile"
                      className="rounded-circle"
                      style={{ width: '150px', height: '150px' }}
                    />
                  ) : (
                    <span>Click to add image</span>
                  )}
                </div>
                {imageUrl && (
                  <Button
                    variant="danger"
                    onClick={handleRemoveImage}
                    className="mt-2"
                    size="sm"
                  >
                    <FaTrashAlt />
                  </Button>
                )}
              </div>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="Name"
                    value={formData.Name}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="Email"
                    value={formData.Email}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formPhone">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    type="text"
                    name="Phone"
                    value={formData.Phone}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group controlId="formAddress">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    type="text"
                    name="Address"
                    value={formData.Address}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group controlId="formPortfolioUrl">
                  <Form.Label>Portfolio URL</Form.Label>
                  <Form.Control
                    type="text"
                    name="PortfolioUrl"
                    value={formData.PortfolioUrl}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Control
                    type="file"
                    name="ProfileImage"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    style={{ display: 'none' }} // Hide the actual file input
                  />
                </Form.Group>

                <Button variant="primary" type="submit">
                  {formData.Id === 0 ? 'Add User' : 'Save Changes'}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default UserForm;