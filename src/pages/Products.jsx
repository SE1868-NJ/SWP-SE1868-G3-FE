import { useEffect, useState, useMemo } from 'react';
import { 
  Card, 
  Button, 
  Dialog, 
  DialogActions, 
  DialogContent, 
  DialogTitle, 
  TextField, 
  Stack, 
  Box, 
  MenuItem, 
  Select, 
  InputLabel, 
  FormControl,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper
} from '@mui/material';

function Products() {
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [form, setForm] = useState({
    id: '',
    supplier_id: '',
    category: '',
    shop_id: '',
    product_name: '',
    description: '',
    sku: '',
    image: '',
    price: '',
    sale_price: '',
    stock_quantity: '',
    status: 'active',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(''); // State cho phân loại sản phẩm
  const [selectedTab, setSelectedTab] = useState('Hàng hóa'); // Tab footer
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const categories = ['Đồ ăn', 'Đồ uống', 'Đồ chay', 'Đồ tươi sống'];
  const footerTabs = ['Đối tác', 'Hàng hóa', 'Sổ quỹ'];

  // Dữ liệu mẫu (bạn có thể thay bằng API)
  const fetchProducts = async () => {
    // Giả lập dữ liệu (thay bằng API call thực tế)
    const mockProducts = [
      { id: 1, supplier_id: 1, category: 'Đồ ăn', shop_id: 1, product_name: 'Bánh mì', description: 'Bánh mì tươi', sku: 'BM001', image: 'https://example.com/banhmi.jpg', price: 5000, sale_price: 4500, stock_quantity: 100, status: 'active', createdAt: '2023-01-01', updatedAt: '2023-02-01' },
      { id: 2, supplier_id: 2, category: 'Đồ uống', shop_id: 1, product_name: 'Trà sữa', description: 'Trà sữa thơm ngon', sku: 'TS001', image: 'https://example.com/trasua.jpg', price: 25000, sale_price: 22000, stock_quantity: 50, status: 'active', createdAt: '2023-01-02', updatedAt: '2023-02-02' },
    ];
    setProducts(mockProducts);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleClose = () => {
    setOpen(false);
    setForm({
      id: '',
      supplier_id: '',
      category: '',
      shop_id: '',
      product_name: '',
      description: '',
      sku: '',
      image: '',
      price: '',
      sale_price: '',
      stock_quantity: '',
      status: 'active',
    });
  };

  const handleSave = async () => {
    try {
      if (isEditing) {
        // Logic cập nhật sản phẩm (API call)
        const updatedProducts = products.map(p => 
          p.id === form.id ? { ...form, updatedAt: new Date().toISOString() } : p
        );
        setProducts(updatedProducts);
      } else {
        // Logic thêm sản phẩm (API call)
        const newProduct = { 
          ...form, 
          id: products.length + 1, 
          createdAt: new Date().toISOString(), 
          updatedAt: new Date().toISOString() 
        };
        setProducts([...products, newProduct]);
      }
      handleClose();
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  const handleDelete = (id) => {
    setProducts(products.filter(p => p.id !== id));
  };

  const handleEdit = (product) => {
    setForm(product);
    setIsEditing(true);
    setOpen(true);
  };

  const handleAdd = () => {
    setIsEditing(false);
    setForm({
      id: '',
      supplier_id: '',
      category: '',
      shop_id: '',
      product_name: '',
      description: '',
      sku: '',
      image: '',
      price: '',
      sale_price: '',
      stock_quantity: '',
      status: 'active',
    });
    setOpen(true);
  };

  const filteredProducts = useMemo(() => {
    return products.filter((product) =>
      product.product_name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory ? product.category === selectedCategory : true) && // Lọc theo danh mục
      (selectedTab === 'Hàng hóa' ? true : false) // Chỉ lọc khi tab là 'Hàng hóa'
    );
  }, [products, searchTerm, selectedCategory, selectedTab]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  return (
    <div style={{ padding: '20px' }}>
      {/* Header */}
      <Box sx={{ bgcolor: '#007bff', color: 'white', p: 2, mb: 2, borderRadius: 1 }}>
        <h2 style={{ margin: 0 }}>Quản lý sản phẩm</h2>
      </Box>

      {/* Search và Add Product */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <TextField
          label="Tìm kiếm sản phẩm..."
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ width: '300px' }}
        />
        <Button variant="contained" color="primary" onClick={handleAdd}>
          Thêm sản phẩm
        </Button>
      </Box>

      {/* Phân loại sản phẩm (nút lọc danh mục) */}
      <Box display="flex" justifyContent="space-between" mb={2}>
        {categories.map((category) => (
          <Button 
            key={category} 
            variant="outlined" 
            onClick={() => setSelectedCategory(category)} 
            style={{ margin: '0 5px' }}
            sx={{
              bgcolor: selectedCategory === category ? '#007bff' : 'transparent',
              color: selectedCategory === category ? 'white' : 'black',
            }}
          >
            {category}
          </Button>
        ))}
        <Button 
          variant="outlined" 
          onClick={() => setSelectedCategory('')} 
          style={{ margin: '0 5px' }}
        >
          Tất cả
        </Button>
      </Box>

      {/* Bảng sản phẩm */}
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Supplier ID</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Shop ID</TableCell>
              <TableCell>Product Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>SKU</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Sale Price</TableCell>
              <TableCell>Stock Quantity</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell>Updated At</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentProducts.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.id}</TableCell>
                <TableCell>{product.supplier_id}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>{product.shop_id}</TableCell>
                <TableCell>{product.product_name}</TableCell>
                <TableCell>{product.description}</TableCell>
                <TableCell>{product.sku}</TableCell>
                <TableCell><img src={product.image} alt={product.product_name} width="50" /></TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell>{product.sale_price}</TableCell>
                <TableCell>{product.stock_quantity}</TableCell>
                <TableCell>{product.status}</TableCell>
                <TableCell>{product.createdAt}</TableCell>
                <TableCell>{product.updatedAt}</TableCell>
                <TableCell>
                  <Button variant="contained" color="warning" onClick={() => handleEdit(product)} sx={{ mr: 1 }}>
                    Sửa
                  </Button>
                  <Button variant="contained" color="error" onClick={() => handleDelete(product.id)}>
                    Xóa
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      {/* Phân trang */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
        <Button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
          variant="outlined"
          sx={{ mr: 1 }}
        >
          Trang trước
        </Button>
        <span>{currentPage} / {totalPages}</span>
        <Button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
          variant="outlined"
          sx={{ ml: 1 }}
        >
          Trang sau
        </Button>
      </Box>

      {/* Dialog thêm/sửa sản phẩm */}
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>{isEditing ? 'Sửa sản phẩm' : 'Thêm sản phẩm'}</DialogTitle>
        <DialogContent>
          <Stack spacing={3} sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Tên sản phẩm"
              value={form.product_name}
              onChange={(e) => setForm({ ...form, product_name: e.target.value })}
            />
            <TextField
              fullWidth
              label="Mô tả"
              multiline
              rows={3}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
            <TextField
              fullWidth
              label="SKU"
              value={form.sku}
              onChange={(e) => setForm({ ...form, sku: e.target.value })}
            />
            <TextField
              fullWidth
              label="URL hình ảnh"
              value={form.image}
              onChange={(e) => setForm({ ...form, image: e.target.value })}
            />
            <TextField
              fullWidth
              label="Giá gốc"
              type="number"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
            />
            <TextField
              fullWidth
              label="Giá khuyến mãi"
              type="number"
              value={form.sale_price}
              onChange={(e) => setForm({ ...form, sale_price: e.target.value })}
            />
            <TextField
              fullWidth
              label="Số lượng tồn kho"
              type="number"
              value={form.stock_quantity}
              onChange={(e) => setForm({ ...form, stock_quantity: e.target.value })}
            />
            <FormControl fullWidth>
              <InputLabel>Trạng thái</InputLabel>
              <Select
                label="Trạng thái"
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
              >
                <MenuItem value="active">Hoạt động</MenuItem>
                <MenuItem value="inactive">Không hoạt động</MenuItem>
              </Select>
            </FormControl>
            <TextField
              fullWidth
              label="Supplier ID"
              type="number"
              value={form.supplier_id}
              onChange={(e) => setForm({ ...form, supplier_id: e.target.value })}
            />
            <FormControl fullWidth>
              <InputLabel>Danh mục</InputLabel>
              <Select
                label="Danh mục"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
              >
                {categories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              fullWidth
              label="Shop ID"
              type="number"
              value={form.shop_id}
              onChange={(e) => setForm({ ...form, shop_id: e.target.value })}
            />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={handleClose} color="inherit">
            Hủy
          </Button>
          <Button onClick={handleSave} variant="contained" color="primary">
            Lưu
          </Button>
        </DialogActions>
      </Dialog>

      {/* Footer */}
      <Box sx={{ bgcolor: '#f5f5f5', p: 2, mt: 2, borderRadius: 1, display: 'flex', justifyContent: 'space-around' }}>
        {footerTabs.map((tab) => (
          <Button
            key={tab}
            variant={selectedTab === tab ? 'contained' : 'outlined'}
            onClick={() => setSelectedTab(tab)}
            sx={{ bgcolor: selectedTab === tab ? '#007bff' : 'transparent', color: selectedTab === tab ? 'white' : 'black' }}
          >
            {tab}
          </Button>
        ))}
      </Box>
    </div>
  );
}

export default Products;