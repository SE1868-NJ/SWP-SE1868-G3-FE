import React, { useState, useEffect } from 'react';
import { Button, Table, Form, Modal } from 'react-bootstrap';
import { shopService } from "../../../services/shopService";  // Using shopService as requested

const EmailTemplateManagement = () => {
  const [templates, setTemplates] = useState([]);
  const [emailTypes, setEmailTypes] = useState([]); // Lưu loại email
  const [showModal, setShowModal] = useState(false);
  const [templateToEdit, setTemplateToEdit] = useState(null);
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');
  const [type, setType] = useState('');
  const [errors, setErrors] = useState({});
  const [showFullContent, setShowFullContent] = useState(null);

  // Fetch email types và templates khi component mount
  useEffect(() => {
    const fetchEmailTypes = async () => {
      try {
        const response = await shopService.getEmailTypes();  // Gọi API getEmailTypes
        setEmailTypes(response.data);  // Lưu loại email vào state
      } catch (error) {
        console.error('Failed to fetch email types:', error);
      }
    };
    
    const fetchTemplates = async () => {
      try {
        const response = await shopService.getAllEmailTemplates(); // Gọi API lấy tất cả templates
        setTemplates(response.data);
      } catch (error) {
        console.error('Failed to fetch templates:', error);
      }
    };

    fetchEmailTypes();
    fetchTemplates();
  }, []);

  const validateForm = () => {
    const newErrors = {};

    if (!subject) newErrors.subject = 'Subject is required';
    if (!content) newErrors.content = 'Content is required';
    if (!type) newErrors.type = 'Type is required';

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleEditTemplate = (template) => {
    setTemplateToEdit(template);
    setSubject(template.subject);
    setContent(template.content);
    setType(template.type);
    setShowModal(true);
  };

  const handleDeleteTemplate = async (templateId) => {
    if (window.confirm('Are you sure you want to delete this template?')) {
      try {
        await shopService.deleteEmailTemplate(templateId);
        console.log('Template deleted successfully');
        setTemplates(templates.filter(template => template.id !== templateId));
      } catch (error) {
        console.error('Failed to delete template', error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const templateData = { subject, content, type };

    try {
      if (templateToEdit) {
        await shopService.updateEmailTemplate(templateToEdit.id, templateData);
        console.log('Template updated successfully');
      } else {
        await shopService.createEmailTemplate(templateData);
        console.log('Template created successfully');
      }
      setShowModal(false);
      setTemplateToEdit(null);
      setSubject('');
      setContent('');
      setType('');
      const response = await shopService.getAllEmailTemplates();
      setTemplates(response.data);
    } catch (error) {
      const errorMessage = error?.response?.data?.message || 'Loại template đã tồn tại!';
      alert(`Failed to ${templateToEdit ? 'update' : 'create'} template: ${errorMessage}`);
    }
  };

  const handleCancel = () => {
    setShowModal(false);
    setTemplateToEdit(null);
    setSubject('');
    setContent('');
    setType('');
  };

  // Helper for rendering truncated content with expand option
  const renderContent = (content, templateId) => {
    const maxLength = 100;
    const isExpanded = showFullContent === templateId;
    
    if (!content) return '-';
    
    if (isExpanded || content.length <= maxLength) {
      return (
        <div>
          <pre className="template-content">{content}</pre>
          {content.length > maxLength && (
            <Button 
              size="sm" 
              variant="link" 
              onClick={() => setShowFullContent(null)}
            >
              Show Less
            </Button>
          )}
        </div>
      );
    }
    
    return (
      <div>
        <pre className="template-content">{content.substring(0, maxLength)}...</pre>
        <Button 
          size="sm" 
          variant="link" 
          onClick={() => setShowFullContent(templateId)}
        >
          Show More
        </Button>
      </div>
    );
  };

  return (
    <div className="email-template-container">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Email Template Management</h3>
        <Button variant="primary" onClick={() => setShowModal(true)}>
          Create New Template
        </Button>
      </div>

      <Table striped bordered hover responsive className="mt-3">
        <thead>
          <tr>
            <th width="5%">ID</th>
            <th width="20%">Subject</th>
            <th width="45%">Content</th>
            <th width="15%">Type</th>
            <th width="15%">Actions</th>
          </tr>
        </thead>
        <tbody>
          {templates.length > 0 ? (
            templates.map((template) => (
              <tr key={template.id}>
                <td>{template.id}</td>
                <td>{template.subject}</td>
                <td>{renderContent(template.content, template.id)}</td>
                <td>{template.type}</td>
                <td>
                  <Button 
                    variant="outline-primary" 
                    size="sm" 
                    className="me-2"
                    onClick={() => handleEditTemplate(template)}
                  >
                    Edit
                  </Button>
                  <Button 
                    variant="outline-danger" 
                    size="sm"
                    onClick={() => handleDeleteTemplate(template.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">
                No templates found. Create one to get started.
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleCancel} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{templateToEdit ? 'Edit' : 'Create'} Email Template</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formSubject" className="mb-3">
              <Form.Label>Subject</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter email subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                isInvalid={!!errors.subject}
                required
              />
              <Form.Control.Feedback type="invalid">
                {errors.subject}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formContent" className="mb-3">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                rows={6}
                placeholder="Enter email content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                isInvalid={!!errors.content}
                required
              />
              <Form.Text className="text-muted">
                You can use placeholders like {'{name}'}, {'{order_id}'}, etc. that will be replaced with actual values when sending.
              </Form.Text>
              <Form.Control.Feedback type="invalid">
                {errors.content}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formType" className="mb-3">
              <Form.Label>Type</Form.Label>
              <Form.Control
                as="select"
                value={type}
                onChange={(e) => setType(e.target.value)}
                isInvalid={!!errors.type}
                disabled={templateToEdit} // Disable type selection when editing
                required
              >
                <option value="">Select Type</option>
                {emailTypes.map((emailType, index) => (
                  <option key={index} value={emailType}>
                    {emailType}
                  </option>
                ))}
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                {errors.type}
              </Form.Control.Feedback>
            </Form.Group>

            <div className="d-flex justify-content-end">
              <Button variant="secondary" onClick={handleCancel} className="me-2">
                Cancel
              </Button>
              <Button variant="primary" type="submit">
                {templateToEdit ? 'Update' : 'Create'} Template
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      <style jsx="true">{`
        .email-template-container {
          padding: 20px;
        }
        .template-content {
          white-space: pre-wrap;
          font-family: inherit;
          margin: 0;
          font-size: 0.9rem;
          background: none;
          border: none;
          padding: 0;
        }
      `}</style>
    </div>
  );
};

export default EmailTemplateManagement;