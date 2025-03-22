import React from 'react';

function ShopRatingOverview({ stats, negativeCount }) {
  return (
    <div className='card mb-4 bg-white rounded-3 shadow-sm p-3'>
      <div className='card-body'>
        <div className='d-flex justify-content-between align-items-center mb-3'>
          <h5 className='mb-0'>
            Đánh Giá Shop{' '}
            <span className='text-danger'>{stats.averageRating}</span>/5
          </h5>
        </div>

        <div className='row g-3'>
          <div className='col-md-6'>
            <div
              className='p-3 border rounded-3 shadow-sm'
              style={{ margin: '10px 0' }}
            >
              <div className='d-flex justify-content-between align-items-center'>
                <div>
                  <h6>Tổng lượt đánh giá</h6>
                  <h3 className='mb-0'>{stats.totalCount}</h3>
                </div>
              </div>
            </div>
          </div>

          <div className='col-md-6'>
            <div
              className='p-3 border rounded-3 shadow-sm'
              style={{ margin: '10px 0' }}
            >
              <div className='d-flex justify-content-between align-items-center'>
                <div>
                  <h6>Tỷ lệ đánh giá tốt</h6>
                  <h3 className='mb-0'>{stats.goodRatioPercent}%</h3>
                </div>
                <div className='text-danger'>
                  <small>↓0%</small>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='row mt-4'>
          <div className='col-md-6'>
            <div className='card bg-white rounded-3 shadow-sm p-3'>
              <div className='card-body'>
                <h6>Đánh giá tiêu cực cần phản hồi</h6>
                <div className='d-flex align-items-center'>
                  <h3 className='mb-0 me-2'>{negativeCount}</h3>
                  <button className='btn text-primary btn-sm fw-bold'>
                    Xem
                  </button>
                </div>
                <small className='text-muted'>
                  Các đánh giá có 1 & 2 sao cần bạn phản hồi
                </small>
              </div>
            </div>
          </div>

          <div className='col-md-6'>
            <div className='card bg-white rounded-3 shadow-sm p-3'>
              <div className='card-body'>
                <h6>Đánh giá gần đây</h6>
                <div className='d-flex align-items-center'>
                  <h3 className='mb-0 me-2'>{stats.totalCount}</h3>
                  <button className='btn text-primary btn-sm fw-bold '>
                    Xem
                  </button>
                </div>
                <small className='text-muted'>
                  Đánh giá mới được cập nhật từ lần truy cập trước
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShopRatingOverview;