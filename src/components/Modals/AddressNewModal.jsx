import React, { useState, useEffect } from "react";
import { addressService } from "../../services/addressService";

const AddressNewModal = ({ show, onHide, onSave }) => {
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [loading, setLoading] = useState(false);

  const [newAddress, setNewAddress] = useState({
    name: "",
    phone: "",
    province: "",
    district: "",
    ward: "",
    streetAddress: "",
    addressType: "Nhà Riêng",
    isDefault: false,
    isPickupAddress: false
  });

  useEffect(() => {
    const fetchProvinces = async () => {
      if (!show) return;

      try {
        setLoading(true);
        const response = await addressService.getAllProvince();
        if (response.status === 'success') {
          setProvinces(response.data);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching provinces:', error);
        setLoading(false);
      }
    };

    fetchProvinces();
  }, [show]);

  useEffect(() => {
    const fetchDistricts = async () => {
      if (!newAddress.province) {
        setDistricts([]);
        setNewAddress(prev => ({ ...prev, district: "", ward: "" }));
        return;
      }

      try {
        setLoading(true);
        const selectedProvince = provinces.find(p => p.name === newAddress.province);
        if (selectedProvince) {
          const response = await addressService.getDistricByProvince(selectedProvince.id);
          if (response.status === 'success') {
            setDistricts(response.data);
          }
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching districts:', error);
        setLoading(false);
      }
    };

    fetchDistricts();
  }, [newAddress.province, provinces]);

  useEffect(() => {
    const fetchWards = async () => {
      if (!newAddress.district) {
        setWards([]);
        setNewAddress(prev => ({ ...prev, ward: "" }));
        return;
      }

      try {
        setLoading(true);
        const selectedDistrict = districts.find(d => d.name === newAddress.district);
        if (selectedDistrict) {
          const response = await addressService.getWardsByDistrict(selectedDistrict.id);
          if (response.status === 'success') {
            setWards(response.data);
          }
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching wards:', error);
        setLoading(false);
      }
    };

    fetchWards();
  }, [newAddress.district, districts]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewAddress({
      ...newAddress,
      [name]: type === "checkbox" ? checked : value
    });
  };


  const handleSave = async () => {
    try {
      setLoading(true);

      // Get IDs from names
      const selectedProvince = provinces.find(p => p.name === newAddress.province);
      const selectedDistrict = districts.find(d => d.name === newAddress.district);
      const selectedWard = wards.find(w => w.name === newAddress.ward);

      // Create the address data object
      const addressData = {
        name: newAddress.name,
        phone: newAddress.phone,
        provinceId: selectedProvince?.id,
        provinceName: newAddress.province,
        districtId: selectedDistrict?.id,
        districtName: newAddress.district,
        wardId: selectedWard?.id,
        wardName: newAddress.ward,
        streetAddress: newAddress.streetAddress,
        addressType: newAddress.addressType,
        isDefault: newAddress.isDefault,
        isPickupAddress: newAddress.isPickupAddress
      };

      // Save address to backend
      const response = await addressService.addNew(addressData);

      // Format the address for frontend display
      const completeAddress = {
        ...response.data,
        id: response.data.id,
        province: newAddress.province,
        district: newAddress.district,
        ward: newAddress.ward,
        wardDistrict: `Phường ${newAddress.ward}, Quận ${newAddress.district}, ${newAddress.province}`
      };

      onSave(completeAddress);

      // Reset form
      setNewAddress({
        name: "",
        phone: "",
        province: "",
        district: "",
        ward: "",
        streetAddress: "",
        addressType: "Nhà Riêng",
        isDefault: false,
        isPickupAddress: false
      });

      setLoading(false);
      onHide();
    } catch (error) {
      console.error('Error saving address:', error);
      setLoading(false);
      // You might want to show an error message to the user
    }
  };

  if (!show) return null;

  return (
    <div className="modal show d-block" tabIndex="-1" style={{ zIndex: 1060 }}>
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Địa chỉ mới</h5>
            <button type="button" className="btn-close" onClick={onHide}></button>
          </div>
          <div className="modal-body">
            {loading && <div className="text-center my-2">Đang tải...</div>}
            <form>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label">Họ và tên</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={newAddress.name}
                    onChange={handleInputChange}
                    placeholder="Họ và tên"
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Số điện thoại</label>
                  <input
                    type="text"
                    className="form-control"
                    name="phone"
                    value={newAddress.phone}
                    onChange={handleInputChange}
                    placeholder="Số điện thoại"
                  />
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">Tỉnh/Thành phố</label>
                <select
                  className="form-select"
                  name="province"
                  value={newAddress.province}
                  onChange={handleInputChange}
                >
                  <option value="">Chọn Tỉnh/Thành phố</option>
                  {provinces.map(province => (
                    <option key={province.id} value={province.name}>
                      {province.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label">Quận/Huyện</label>
                  <select
                    className="form-select"
                    name="district"
                    value={newAddress.district}
                    onChange={handleInputChange}
                    disabled={!newAddress.province}
                  >
                    <option value="">Chọn Quận/Huyện</option>
                    {districts.map(district => (
                      <option key={district.id} value={district.name}>
                        {district.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-md-6">
                  <label className="form-label">Phường/Xã</label>
                  <select
                    className="form-select"
                    name="ward"
                    value={newAddress.ward}
                    onChange={handleInputChange}
                    disabled={!newAddress.district}
                  >
                    <option value="">Chọn Phường/Xã</option>
                    {wards.map(ward => (
                      <option key={ward.id} value={ward.name}>
                        {ward.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">Địa chỉ cụ thể</label>
                <textarea
                  className="form-control"
                  name="streetAddress"
                  value={newAddress.streetAddress}
                  onChange={handleInputChange}
                  rows="3"
                  placeholder="Số nhà, tên đường..."
                ></textarea>
              </div>

              <div className="mb-3">
                <label className="form-label">Loại địa chỉ:</label>
                <div className="d-flex gap-3">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="addressType"
                      id="homeAddress"
                      value="Nhà Riêng"
                      checked={newAddress.addressType === "Nhà Riêng"}
                      onChange={handleInputChange}
                    />
                    <label className="form-check-label" htmlFor="homeAddress">
                      Nhà Riêng
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="addressType"
                      id="officeAddress"
                      value="Văn Phòng"
                      checked={newAddress.addressType === "Văn Phòng"}
                      onChange={handleInputChange}
                    />
                    <label className="form-check-label" htmlFor="officeAddress">
                      Văn Phòng
                    </label>
                  </div>
                </div>
              </div>

              <div className="mb-3 d-flex gap-5">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="isDefault"
                    id="defaultAddress"
                    checked={newAddress.isDefault}
                    onChange={handleInputChange}
                  />
                  <label className="form-check-label" htmlFor="defaultAddress">
                    Đặt làm địa chỉ mặc định
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="isPickupAddress"
                    id="pickupAddress"
                    checked={newAddress.isPickupAddress}
                    onChange={handleInputChange}
                  />
                  <label className="form-check-label" htmlFor="pickupAddress">
                    Đặt làm địa chỉ lấy hàng
                  </label>
                </div>
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={onHide}
              disabled={loading}
            >
              Trở Lại
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={handleSave}
              disabled={loading || !newAddress.name || !newAddress.phone || !newAddress.streetAddress || !newAddress.province || !newAddress.district || !newAddress.ward}
            >
              {loading ? 'Đang xử lý...' : 'Hoàn thành'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddressNewModal;