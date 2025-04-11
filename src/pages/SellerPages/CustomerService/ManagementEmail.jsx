import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Form, Table, Alert, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import { shopService } from "../../../services/shopService";
import { useAuth } from '../../../hooks/contexts/AuthContext';

const ManagementEmail = () => {
  const [followers, setFollowers] = useState([]);
  const [selectedFollowerIds, setSelectedFollowerIds] = useState([]);
  const [promoTitle, setPromoTitle] = useState("");
  const [promoContent, setPromoContent] = useState("");
  const [status, setStatus] = useState({ loading: false, message: "", type: "" });
  const { user } = useAuth();
  const [shopId, setShopId] = useState(null);

  useEffect(() => {
    const fetchShopIdAndFollowers = async () => {
      try {
        const res = await shopService.getShopsByUser(user.id);
        console.log("getShopsByUser response:", res);

        const shop = Array.isArray(res) ? res[0] : res;
        console.log("shop lấy ra:", shop);

        if (shop?.shop_id) {
          setShopId(shop.shop_id);
          const followersRes = await shopService.getFollowersByShopId(shop.shop_id);
          setFollowers(Array.isArray(followersRes) ? followersRes : []);
        } else {
          toast.error("Không tìm thấy shop của bạn");
        }
      } catch (err) {
        console.error("Lỗi khi lấy shop hoặc followers:", err);
        toast.error("Lỗi khi lấy thông tin shop hoặc người theo dõi");
      }
    };

    if (user?.id) {
      fetchShopIdAndFollowers();
    }
  }, [user]);

  const handleSelect = (followerId) => {
    setSelectedFollowerIds((prev) =>
      prev.includes(followerId)
        ? prev.filter((id) => id !== followerId)
        : [...prev, followerId]
    );
  };

  const handleSelectAll = () => {
    if (selectedFollowerIds.length === followers.length) {
      setSelectedFollowerIds([]);
    } else {
      setSelectedFollowerIds(followers.map((f) => f.user_id));
    }
  };

  const handleSend = async () => {
    if (!promoTitle || !promoContent || selectedFollowerIds.length === 0) {
      return setStatus({
        message: "Vui lòng nhập đủ tiêu đề, nội dung và chọn ít nhất 1 người nhận.",
        type: "warning",
      });
    }

    setStatus({ loading: true });

    try {
      const res = await axios.post("http://localhost:4000/api/email/send-promotion-to-followers", {
        shop_id: shopId,
        follower_ids: selectedFollowerIds,
        promo_title: promoTitle,
        promo_content: promoContent,
      });

      setStatus({ message: res.data.data.message, type: "success", loading: false });
      setPromoTitle("");
      setPromoContent("");
      setSelectedFollowerIds([]);
    } catch (err) {
      console.error("Lỗi khi gửi email:", err);
      setStatus({
        message: err.response?.data?.data?.message || "Đã xảy ra lỗi",
        type: "danger",
        loading: false,
      });
    }
  };

  return (
    <div className="container mt-4">
      <h4>Gửi khuyến mãi đến người theo dõi</h4>

      {status.message && (
        <Alert variant={status.type} className="mt-3">
          {status.message}
        </Alert>
      )}

      <Form className="mt-3">
        <Form.Group>
          <Form.Label>Tiêu đề khuyến mãi</Form.Label>
          <Form.Control
            type="text"
            value={promoTitle}
            onChange={(e) => setPromoTitle(e.target.value)}
            placeholder="VD: Giảm giá 50% toàn bộ sản phẩm"
          />
        </Form.Group>

        <Form.Group className="mt-2">
          <Form.Label>Nội dung khuyến mãi</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            value={promoContent}
            onChange={(e) => setPromoContent(e.target.value)}
            placeholder="VD: Chỉ trong 3 ngày, hãy nhanh tay đến shop để nhận ưu đãi cực sốc."
          />
        </Form.Group>
      </Form>

      <h5 className="mt-4">Người theo dõi</h5>

      <Table bordered hover className="mt-2">
        <thead>
          <tr>
            <th>
              <Form.Check
                type="checkbox"
                onChange={handleSelectAll}
                checked={
                  Array.isArray(followers) &&
                  Array.isArray(selectedFollowerIds) &&
                  selectedFollowerIds.length === followers.length &&
                  followers.length > 0
                }
              />
            </th>
            <th>Tên</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(followers) && followers.length > 0 ? (
            followers.map((follower) => (
              <tr key={follower.user_id}>
                <td>
                  <Form.Check
                    type="checkbox"
                    checked={selectedFollowerIds.includes(follower.user_id)}
                    onChange={() => handleSelect(follower.user_id)}
                  />
                </td>
                <td>{follower.full_name}</td>
                <td>{follower.email}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="text-center text-muted">
                Không có người theo dõi nào.
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      <Button
        variant="primary"
        className="mt-3"
        onClick={handleSend}
        disabled={status.loading}
      >
        {status.loading ? <Spinner size="sm" animation="border" /> : "Gửi email khuyến mãi"}
      </Button>
    </div>
  );
};

export default ManagementEmail;
