import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminNavbar from '../AdminNavbar/AdminNavbar';
import Modal from 'react-modal';

export default function AdminViewMenu() {
  const [APIData, setAPIData] = useState([]);
  const [editFoodId, setEditFoodId] = useState('');
  const [editFoodName, setEditFoodName] = useState('');
  const [editPrice, setEditPrice] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [sortBy, setSortBy] = useState('foodId');
  const [sortOrder, setSortOrder] = useState('asc');
  const [isEditFormVisible, setIsEditFormVisible] = useState(false);

  useEffect(() => {
    axios
      .get('http://localhost:3100/food/get')
      .then((response) => {
        setAPIData(response.data.data);
      })
      .catch((error) => {
        console.error('Error fetching food data:', error);
      });
  }, []);

  const sortTable = (column) => {
    if (column === sortBy) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };

  const compareValues = (key, order = 'asc') => {
    return function (a, b) {
      if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
        return 0;
      }

      const varA = typeof a[key] === 'string' ? a[key].toUpperCase() : a[key];
      const varB = typeof b[key] === 'string' ? b[key].toUpperCase() : b[key];

      let comparison = 0;
      if (varA > varB) {
        comparison = 1;
      } else if (varA < varB) {
        comparison = -1;
      }

      return order === 'desc' ? comparison * -1 : comparison;
    };
  };

  const handleEdit = (food) => {
    setEditFoodId(food._id);
    setEditFoodName(food.food_name);
    setEditPrice(food.price);
    setEditDescription(food.description);
    setIsEditFormVisible(true);
  };

  const handleCloseEditForm = () => {
    setIsEditFormVisible(false);
  };

  const handleSubmitEdit = (event) => {
    event.preventDefault();

    const updatedFood = {
      foodId: editFoodId,
      foodName: editFoodName,
      price: editPrice,
      description: editDescription,
    };

    axios
      .put(`http://localhost:3100/food/update/${editFoodId}`, updatedFood)
      .then((response) => {
        console.log('Food updated successfully');
        // You may also update the local state or refetch the updated data if needed
        setIsEditFormVisible(false); // Hide the edit form after successful update
      })
      .catch((error) => {
        console.error('Error updating food:', error);
      });
  };

  const modalStyles = {
  content: {
    width: '320px',
    margin: 'auto',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    background: '#f9f9f9',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
    borderRadius: '8px',
  },
};

const formStyles = {
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
  width: '90%',
};

const inputStyles = {
  padding: '8px',
  border: '1px solid #ccc',
  borderRadius: '4px',
};

  return (
    <div>
      <AdminNavbar />
      <div className="menu-main pad-top-100 pad-bottom-100">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <div
                className="wow fadeIn"
                data-wow-duration="1s"
                data-wow-delay="0.1s"
              >
                <h2 className="block-title text-center">View Foods</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container mt-5 mb-5">
        <table>
          <thead>
            <tr>
              <th onClick={() => sortTable('foodId')}>Food ID</th>
              <th onClick={() => sortTable('foodName')}>Food Name</th>
              <th onClick={() => sortTable('price')}>Price</th>
              <th onClick={() => sortTable('description')}>Description</th>
              <th onClick={() => sortTable('status')}>Status</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {APIData.sort(compareValues(sortBy, sortOrder)).map((data) => (
              <tr key={data._id}>
                <td>{data._id}</td>
                <td>{data.food_name}</td>
                <td>{data.price}</td>
                <td>{data.description}</td>
                <td>{data.status_id.status_name}</td>
                <td>
                  <button onClick={() => handleEdit(data)}>Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Modal
          isOpen={isEditFormVisible}
          onRequestClose={handleCloseEditForm}
          style={modalStyles}
        >
          <button onClick={handleCloseEditForm}>Close</button>
          <form onSubmit={handleSubmitEdit} style={formStyles}>
            <input
              type="text"
              value={editFoodName}
              onChange={(event) => setEditFoodName(event.target.value)}
              placeholder="Food Name"
              style={inputStyles}
            />
            <input
              type="number"
              value={editPrice}
              onChange={(event) => setEditPrice(event.target.value)}
              placeholder="Price"
              style={inputStyles}
            />
            <textarea
              value={editDescription}
              onChange={(event) => setEditDescription(event.target.value)}
              placeholder="Description"
              style={{ ...inputStyles, height: '80px' }}
            ></textarea>
            <button type="submit">Save</button>
          </form>
        </Modal>
      </div>
    </div>
  );
}

