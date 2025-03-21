import React, { useState, useRef } from 'react';

const AiAssistant = ({ chartData, rankingProducts, orders }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Xin chào! Bạn có thể hỏi tôi về dữ liệu doanh thu, sản phẩm, hoặc đơn hàng. Ví dụ: "Phân tích doanh thu theo giờ" hoặc "Top 3 sản phẩm bán chạy nhất là gì?"'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Hàm phân tích dữ liệu và trả lời
  const analyzeData = (query) => {
    setIsLoading(true);

    // Giả lập thời gian phản hồi
    setTimeout(() => {
      let response = '';

      // Phân tích doanh thu theo giờ
      if (query.toLowerCase().includes('doanh thu') && query.toLowerCase().includes('giờ')) {
        const totalRevenue = chartData.reduce((sum, item) => sum + item.revenue, 0);
        const peakTime = chartData.reduce((max, item) => item.revenue > max.revenue ? item : max, chartData[0]);

        response = `Doanh thu hôm nay đạt ${totalRevenue.toLocaleString('vi-VN')}đ. 
        Thời điểm cao nhất là ${peakTime.name} với ${peakTime.revenue.toLocaleString('vi-VN')}đ.
        Nhìn chung, doanh thu tăng dần từ sáng đến tối, với mức tăng đáng kể vào buổi chiều.`;
      }
      // Các sản phẩm bán chạy
      else if (query.toLowerCase().includes('sản phẩm') && (query.toLowerCase().includes('top') || query.toLowerCase().includes('bán chạy'))) {
        const top3 = rankingProducts.slice(0, 3);

        response = `Top 3 sản phẩm bán chạy nhất là:
        1. ${top3[0].name} (${top3[0].soldQuantity} sản phẩm, doanh thu ${top3[0].totalRevenue.toLocaleString('vi-VN')}đ)
        2. ${top3[1].name} (${top3[1].soldQuantity} sản phẩm, doanh thu ${top3[1].totalRevenue.toLocaleString('vi-VN')}đ)
        3. ${top3[2].name} (${top3[2].soldQuantity} sản phẩm, doanh thu ${top3[2].totalRevenue.toLocaleString('vi-VN')}đ)
        
        ${top3[0].name} đang là sản phẩm có doanh thu cao nhất, trong khi ${rankingProducts.sort((a, b) => b.soldQuantity - a.soldQuantity)[0].name} có số lượng bán ra cao nhất.`;
      }
      // Phân tích đơn hàng
      else if (query.toLowerCase().includes('đơn hàng') || query.toLowerCase().includes('orders')) {
        const statusCount = orders.reduce((acc, order) => {
          acc[order.status] = (acc[order.status] || 0) + 1;
          return acc;
        }, {});

        response = `Hiện có ${orders.length} đơn hàng gần đây:
        - ${statusCount.completed || 0} đơn hàng hoàn thành
        - ${statusCount.processing || 0} đơn hàng đang xử lý
        - ${statusCount.new || 0} đơn hàng mới
        - ${statusCount.cancelled || 0} đơn hàng đã hủy
        
        Giá trị đơn hàng lớn nhất là ${orders.sort((a, b) => {
          return parseInt(b.amount.replace(/\D/g, '')) - parseInt(a.amount.replace(/\D/g, ''));
        })[0].amount} từ khách hàng ${orders.sort((a, b) => {
          return parseInt(b.amount.replace(/\D/g, '')) - parseInt(a.amount.replace(/\D/g, ''));
        })[0].customer}.`;
      }
      // Dự đoán xu hướng
      else if (query.toLowerCase().includes('xu hướng') || query.toLowerCase().includes('dự đoán')) {
        response = `Dựa trên dữ liệu hiện tại, tôi thấy một số xu hướng:
        
        1. Doanh thu có xu hướng tăng vào buổi chiều và tối (từ 18:00-21:00)
        2. Sản phẩm về sức khỏe (Protinex, VitaGreen) đang có doanh số cao
        3. Thực phẩm hữu cơ (Organic Coffee, Natural Honey) cũng đang nhận được sự quan tâm
        
        Nếu xu hướng này tiếp tục, bạn nên tập trung vào việc quảng bá các sản phẩm sức khỏe và thực phẩm hữu cơ, đồng thời tăng cường khả năng xử lý đơn hàng vào buổi chiều và tối.`;
      }
      // Câu trả lời mặc định
      else {
        response = `Tôi chưa hiểu rõ câu hỏi của bạn. Bạn có thể hỏi về:
        - Phân tích doanh thu theo giờ
        - Top sản phẩm bán chạy nhất
        - Phân tích đơn hàng gần đây
        - Dự đoán xu hướng bán hàng`;
      }

      setMessages(prev => [...prev,
      { role: 'user', content: query },
      { role: 'assistant', content: response }
      ]);

      setIsLoading(false);
      scrollToBottom();
    }, 1000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    analyzeData(inputValue);
    setInputValue('');
  };

  return (
    <div className="card shadow-sm mb-4" style={{ transition: 'all 0.3s ease' }}>
      <div
        className="card-header bg-white d-flex justify-content-between align-items-center"
        style={{ cursor: 'pointer' }}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h4 className="mb-0 fw-bold d-flex align-items-center" style={{ color: '#2c3e50' }}>
          <i className="bi bi-robot me-2"></i>
          Trợ lý AI
        </h4>
        <button className="btn btn-sm" style={{ color: '#34495e' }}>
          <i className={`bi bi-chevron-${isExpanded ? 'up' : 'down'}`}></i>
        </button>
      </div>

      {isExpanded && (
        <div className="card-body">
          <div
            className="chat-messages p-3 mb-3"
            style={{
              height: '300px',
              overflowY: 'auto',
              backgroundColor: '#f8f9fa',
              borderRadius: '0.5rem'
            }}
          >
            {messages.map((message, index) => (
              <div
                key={index}
                className={`message mb-3 ${message.role === 'user' ? 'text-end' : ''}`}
              >
                <div
                  className={`d-inline-block p-3 rounded-3 ${message.role === 'user'
                      ? 'bg-primary text-white'
                      : 'bg-white shadow-sm'
                    }`}
                  style={{
                    maxWidth: '80%',
                    textAlign: 'left'
                  }}
                >
                  {message.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="message mb-3">
                <div className="d-inline-block p-3 rounded-3 bg-white shadow-sm">
                  <div className="spinner-border spinner-border-sm text-primary me-2" role="status">
                    <span className="visually-hidden">Đang xử lý...</span>
                  </div>
                  Đang phân tích...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Hỏi về dữ liệu của bạn..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                disabled={isLoading}
              />
              <button
                className="btn"
                type="submit"
                disabled={isLoading || !inputValue.trim()}
                style={{
                  backgroundColor: '#34495e',
                  color: 'white'
                }}
              >
                <i className="bi bi-send"></i>
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default AiAssistant;