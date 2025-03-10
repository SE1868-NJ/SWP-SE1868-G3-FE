import React, { useState, useEffect } from 'react';
import { shopService } from '../../services/shopService';
import ProductCard from './ProductCard';

const PopularProducts = ({ shopId }) => {
  const [popularProducts, setPopularProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPopularProducts = async () => {
      try {
        setLoading(true);
        const response = await shopService.getProductsByShopAndCategory(shopId);

        if (response?.status === "success" && response?.data?.products && Array.isArray(response.data.products)) {
          const sorted = response.data.products
            .sort((a, b) => b.sold_count - a.sold_count || b.average_rating - a.average_rating)
            .slice(0, 6);

          setPopularProducts(sorted);
        } else {
          setPopularProducts([]);
        }
      } catch (err) {
        console.error("Error fetching popular products:", err);
        setPopularProducts([]);
      } finally {
        setLoading(false);
      }
    };

    if (shopId) {
      fetchPopularProducts();
    }
  }, [shopId]);

  if (loading) {
    return (
      <div style={{
        backgroundColor: 'white',
        padding: '20px 25px',
        margin: '0 0 15px',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.08)',
        border: '1px solid #e8e8e8',
        textAlign: 'center'
      }}>
        <p>Đang tải sản phẩm nổi bật...</p>
      </div>
    );
  }

  if (popularProducts.length === 0) return null;

  const formatNumber = (num) => new Intl.NumberFormat('vi-VN').format(parseFloat(num || 0));

  return (
    <div style={{
      backgroundColor: 'white',
      padding: '20px 25px',
      margin: '0 0 15px',
      boxShadow: '0 2px 5px rgba(0, 0, 0, 0.08)',
      border: '1px solid #e8e8e8',
    }}>
      <h4 style={{
        fontSize: '16px',
        fontWeight: '700',
        marginBottom: '15px',
        color: '#333',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
      }}>
        <span style={{ color: '#ee4d2d' }}>🔥</span> Sản Phẩm Nổi Bật
      </h4>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
        gap: '15px',
      }}>
        {popularProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default PopularProducts;