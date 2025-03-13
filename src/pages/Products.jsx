import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Card } from "react-bootstrap";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";



const Products = () => {
  // State for products
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedProductIndex, setSelectedProductIndex] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
  
    image: "",
  });

  // Load products from localStorage on component mount
  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
    setProducts(storedProducts);
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  // Handle file upload (JPG, PNG, PDF)
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProduct({ ...newProduct, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  // Add or Update Product
  const handleSubmit = (e) => {
    e.preventDefault();
    let updatedProducts;

    if (selectedProductIndex !== null) {
      // Update existing product
      updatedProducts = products.map((product, index) =>
        index === selectedProductIndex ? newProduct : product
      );
    } else {
      // Add new product
      updatedProducts = [...products, newProduct];
    }

    setProducts(updatedProducts);
    localStorage.setItem("products", JSON.stringify(updatedProducts));
    setNewProduct({ name: "", description: "",  image: "" });
    setShowModal(false); // Close modal after saving
    setSelectedProductIndex(null);
  };

  // Open Add Product Modal
  const handleAddProduct = () => {
    setSelectedProductIndex(null);
    setNewProduct({ name: "", description: "", price: "", image: "" });
    setShowModal(true);
  };

  // Open edit modal
  const handleEdit = (index) => {
    setSelectedProductIndex(index);
    setNewProduct(products[index]);
    setShowModal(true);
  };

  // Delete product
  const handleDelete = (index) => {
    const updatedProducts = products.filter((_, i) => i !== index);
    setProducts(updatedProducts);
    localStorage.setItem("products", JSON.stringify(updatedProducts));
  };

  // Open View Details Modal
  const handleViewDetails = (product) => {
    setSelectedProduct(product);
    setShowViewModal(true);
  };

  return (
    
    <div className="container mt-4">
           <h2 className="text-center mb-4 animate__animated animate__fadeInDown">
         Professional Certification
        </h2>
      <Button variant="primary" onClick={handleAddProduct}>
        Add Certificate
      </Button>
      <Navbar />
      {/* Responsive Table */}
      <Table striped bordered hover responsive className="mt-3">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Description</th>
         
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? (
            products.map((product, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{product.name}</td>
                <td>{product.description}</td>
              
                <td>
                  {product.image && (
                    <img
                      src={product.image}
                      alt="Product"
                      style={{ width: "50px", height: "50px", objectFit: "cover" }}
                    />
                  )}
                </td>
                <td>
                  <Button variant="info" onClick={() => handleViewDetails(product)}>
                    View
                  </Button>{" "}
                  <Button variant="warning" onClick={() => handleEdit(index)}>
                    Edit
                  </Button>{" "}
                  <Button variant="danger" onClick={() => handleDelete(index)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center">
                No products added yet.
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      {/* Modal for Add/Edit */}
      <Modal show={showModal} onHide={() => setShowModal(false)} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>{selectedProductIndex !== null ? "Edit Product" : "Add Certificate"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={newProduct.name}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                value={newProduct.description}
                onChange={handleChange}
                required
              />
            </Form.Group>

       

            <Form.Group className="mb-3">
              <Form.Label>Upload Image (JPG, PNG, PDF)</Form.Label>
              <Form.Control type="file" accept="image/png, image/jpeg, application/pdf" onChange={handleFileUpload} />
            </Form.Group>

            {newProduct.image && (
              <Card className="mb-3">
                <Card.Img variant="top" src={newProduct.image} style={{ maxHeight: "200px", objectFit: "cover" }} />
              </Card>
            )}

            <Button variant="primary" type="submit">
              {selectedProductIndex !== null ? "Update Certificate" : "Add Certificate"}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* View Product Details Modal */}
      <Modal show={showViewModal} onHide={() => setShowViewModal(false)} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Certificate Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedProduct && (
            <Card className="mb-3">
              {selectedProduct.image && (
                <Card.Img variant="top" src={selectedProduct.image} style={{ maxHeight: "300px", objectFit: "cover" }} />
              )}
              <Card.Body>
                <Card.Title>{selectedProduct.name}</Card.Title>
                <Card.Text>{selectedProduct.description}</Card.Text>
              </Card.Body>
            </Card>
          )}
        </Modal.Body>
      </Modal>
      

      <div className="d-flex justify-content-center mt-5">
          <button onClick={() => navigate("/home")} className="btn btn-secondary px-4 py-2">
            Back to Dashboard
          </button>
        </div>
    </div>
  );
};

export default Products;
