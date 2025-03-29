const validateField = (name, value) => {
  let error = '';

  switch (name) {
    case 'supplier_name':
      if (!value.trim()) error = 'Tên nhà cung cấp không được để trống';
      break;
    case 'delivery_time':
      if (value === '' || Number(value) <= 0) error = 'Thời gian giao hàng phải lớn hơn 0';
      break;
    case 'address':
      if (!value.trim()) error = 'Địa chỉ không được để trống';
      break;
    case 'contact_name':
      if (!value.trim()) error = 'Họ và tên không được để trống';
      break;
    case 'phone_number':
      if (!value.trim()) {
        error = 'Số điện thoại không được để trống';
      } else if (!/^\d+$/.test(value)) {
        error = 'Số điện thoại chỉ được chứa chữ số';
      } else if (!value.startsWith('0')) {
        error = 'Số điện thoại phải bắt đầu bằng số 0';
      } else if (value.length < 10 || value.length > 11) {
        error = 'Số điện thoại phải có 10-11 chữ số';
      }
      break;
    case 'supplier_code':
      if (!value || value === 'NCC-') error = 'Mã nhà cung cấp không được để trống';
      break;
    case 'account_number':
      if (value && !/^\d+$/.test(value)) error = 'Số tài khoản chỉ được chứa chữ số';
      break;
    default:
      break;
  }

  return error;
};

const validateForm = (data) => {
  const errors = {};

  // Validate các trường bắt buộc
  const requiredFields = ['supplier_name', 'delivery_time', 'contact_name', 'phone_number'];
  requiredFields.forEach(field => {
    const error = validateField(field, data[field] || '');
    if (error) errors[field] = error;
  });

  // Kiểm tra supplier_code
  if (!data.supplier_code || data.supplier_code === 'NCC-') {
    errors.supplier_code = 'Mã nhà cung cấp không được để trống';
  }

  // Kiểm tra địa chỉ nếu có
  if (data.address === '') {
    errors.address = 'Địa chỉ không được để trống';
  }

  // Kiểm tra ngân hàng và số tài khoản
  if (data.bank_name && !data.account_number) {
    errors.account_number = 'Vui lòng nhập số tài khoản khi đã chọn ngân hàng';
  }

  if (!data.bank_name && data.account_number) {
    errors.bank_name = 'Vui lòng chọn ngân hàng khi đã nhập số tài khoản';
  }

  if (data.account_number && !/^\d+$/.test(data.account_number)) {
    errors.account_number = 'Số tài khoản chỉ được chứa chữ số';
  }

  // Kiểm tra chi tiết số điện thoại
  if (data.phone_number) {
    if (!/^\d+$/.test(data.phone_number)) {
      errors.phone_number = 'Số điện thoại chỉ được chứa chữ số';
    } else if (!data.phone_number.startsWith('0')) {
      errors.phone_number = 'Số điện thoại phải bắt đầu bằng số 0';
    } else if (data.phone_number.length < 10 || data.phone_number.length > 11) {
      errors.phone_number = 'Số điện thoại phải có 10-11 chữ số';
    }
  }

  return errors;
};

export { validateField, validateForm };