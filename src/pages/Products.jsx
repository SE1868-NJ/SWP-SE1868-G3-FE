import { useEffect, useState } from 'react';
import Card from '../components/Card';
import { productService } from '../services/productService';
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	TextField,
	Stack
  } from '@mui/material'; 

function Products() {
	const [products, setProducts] = useState([]);
	const [open, setOpen] = useState(false);
	const [form, setForm] = useState({ title: '', price: '',category_id:1 });
	const [isEditing, setIsEditing] = useState(false);
  
	const fetchProducts = async () => {
	  try {
		const response = await productService.getProducts();
		setProducts(response);
	  } catch (error) {
		console.error('Error fetching products:', error);
	  }
	};
  
	useEffect(() => {
	  fetchProducts();
	}, []);
  
	const handleClose = () => {
	  setOpen(false);
	  setForm({  title: '', price: '',category_id:1 });
	};
  
	const handleSave = async () => {
    const newDataForm = {
      product_name: form.title,
      sale_price: form.price,
      category_id: 1,
      supplier_id: 1,
      shop_id: 1, 
      stock_quantity: 1,
      SKU: "fdd",
      import_price: form.price
    };
	  try {
		if (isEditing) {
		  await productService.updateProduct(form.id, newDataForm);
		} else {
		  await productService.createProduct(newDataForm);
		}
		handleClose();
		fetchProducts();
	  } catch (error) {
		console.error('Error saving product:', error);
	  }
	};
  
	const handleDelete = async (id) => {
	  try {
		await productService.deleteProduct(id);
		fetchProducts();
	  } catch (error) {
		console.error('Error deleting product:', error);
	  }
	};
  
	const handleEdit = (product) => {
	  setForm({
        id : product.id,
        title: product.product_name,
        price: product.import_price,
        category_id: product.category_id
    });
	  setIsEditing(true);
	  setOpen(true);
	};
  
	const handleAdd = () => {
	  setIsEditing(false);
	  setForm({ title: '', price: '',category_id:1 });
	  setOpen(true);
	};

  return (
    <Card>
      <Card.Header className="d-flex gap-2">
        <button type="button" className="btn btn-primary" onClick={() => {
          handleAdd();
        }}>
          Add Product
        </button>
      </Card.Header>
      <Card.Body>
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={index}>
                <td>{product.id}</td>
                <td>{product.product_name}</td>
                <td>{product.import_price}</td>
                <td>
                  <button className="btn btn-warning mx-1" onClick={() => handleEdit(product)}>
                    Edit
                  </button>
                  <button className="btn btn-danger" onClick={() => handleDelete(product.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card.Body>
      <Dialog 
        open={open} 
        onClose={handleClose}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {isEditing ? 'Edit Product' : 'New Product'}
        </DialogTitle>
        <DialogContent>
		<Stack spacing={3} sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
            <TextField
              fullWidth
              label="Price"
              type="number"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              InputProps={{
                startAdornment: '$'
              }}
            />
          </Stack>
        </DialogContent>
        <DialogActions className="p-4">
          <Button onClick={handleClose} color="inherit">
            Cancel
          </Button>
          <Button 
            onClick={handleSave} 
            variant="contained" 
            color="primary"
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
}

export default Products;
