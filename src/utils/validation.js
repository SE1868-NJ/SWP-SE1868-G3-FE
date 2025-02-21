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
      if (!value.trim()) error = 'Số điện thoại không được để trống';
      else if (!/^\d{10,11}$/.test(value)) error = 'Số điện thoại không hợp lệ';
      break;
    default:
      break;
  }

  return error;
};

const validateForm = (data) => {
  const errors = {};
  Object.keys(data).forEach((key) => {
    const error = validateField(key, data[key]);
    if (error) errors[key] = error;
  });
  return errors;
};

export { validateField, validateForm };
