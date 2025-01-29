/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import axios from 'axios';
import { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import Modal from 'react-modal';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import Footer from 'examples/Footer';
import MDButton from 'components/MDButton';
import MDBox from 'components/MDBox';
import { Typography, Dialog, DialogContent, DialogTitle, TextField, Button } from '@mui/material';
Modal.setAppElement('#app');
ModuleRegistry.registerModules([AllCommunityModule]);

function Tables() {
  const [usersColumnDef, setusersColumnDef] = useState([
    { field: 'id' },
    { field: 'name' },
    { field: 'email' },
    { field: 'created_at' },
  ]);
  const [ordersColumnDef, setordersColumnDef] = useState([
    { field: 'id' },
    { field: 'user_id' },
    { field: 'amount' },
    { field: 'order_date' },
    { field: 'status' },
  ]);
  const [usersRowData, setUsersRowData] = useState([]);
  const [OrdersRowData, setOrdersRowData] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [formData, setFormData] = useState({ id: '', user_id: '', amount: '', status: '' });
  const fetchUsers = () => {
    axios
      .get('http://localhost:3000/api/users')
      .then((response) => {
        setUsersRowData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const fetchOrders = () => {
    axios
      .get('http://localhost:3000/api/orders')
      .then((response) => {
        setOrdersRowData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleAddRecord = (event) => {
    event.preventDefault();
    const newOrder = { user_id: formData.user_id, amount: formData.amount };
    axios
      .post('http://localhost:3000/api/orders', newOrder)
      .then((response) => {
        fetchOrders();
        setIsAddModalOpen(false);
        setFormData({ id: '', user_id: '', amount: '', status: '' });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleEditRecord = (event) => {
    event.preventDefault();
    const updatedOrder = { amount: formData.amount, status: formData.status };
    axios
      .put(`http://localhost:3000/api/orders/${formData.id}`, updatedOrder)
      .then((response) => {
        fetchOrders();
        setIsEditModalOpen(false);
        setFormData({ id: '', user_id: '', amount: '', status: '' });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleDeleteRecord = (event) => {
    event.preventDefault();
    axios
      .delete(`http://localhost:3000/api/orders/${formData.id}`)
      .then((response) => {
        fetchOrders();
        setIsDeleteModalOpen(false);
        setFormData({ id: '', user_id: '', amount: '', status: '' });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    fetchUsers();
    fetchOrders();
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox p={3}>
        <MDBox mb={3} display='flex' justifyContent='flex-start'>
          <MDButton onClick={() => setIsAddModalOpen(true)} color='info'>
            Добавить заказ
          </MDButton>
          <MDButton
            onClick={() => setIsEditModalOpen(true)}
            color='warning'
            style={{ marginLeft: '30px' }}>
            Изменить заказ
          </MDButton>
          <MDButton
            onClick={() => setIsDeleteModalOpen(true)}
            color='error'
            style={{ marginLeft: '30px' }}>
            Удалить заказ
          </MDButton>
        </MDBox>
        <MDBox className={`ag-theme-alpine`} style={{ height: 400, width: '100%' }}>
          <AgGridReact columnDefs={usersColumnDef} rowData={usersRowData} />
        </MDBox>
        <MDBox className={`ag-theme-alpine`} style={{ height: 400, width: '100%' }}>
          <AgGridReact columnDefs={ordersColumnDef} rowData={OrdersRowData} />
        </MDBox>
      </MDBox>
      <Footer />

      {/* Add Record Modal */}
      <Dialog open={isAddModalOpen} onClose={() => setIsAddModalOpen(false)}>
        <DialogTitle>Добавить запись</DialogTitle>
        <DialogContent>
          <form onSubmit={handleAddRecord}>
            <TextField
              label='User ID'
              type='number'
              fullWidth
              margin='normal'
              name='user_id'
              value={formData.user_id}
              onChange={handleInputChange}
            />
            <TextField
              label='Amount'
              type='number'
              fullWidth
              margin='normal'
              name='amount'
              value={formData.amount}
              onChange={handleInputChange}
            />
            <MDBox display='flex' justifyContent='space-between' mt={2}>
              <Button type='submit' variant='contained' color='info'>
                Добавить
              </Button>
              <Button
                onClick={() => setIsAddModalOpen(false)}
                variant='contained'
                color='secondary'>
                Отмена
              </Button>
            </MDBox>
          </form>
        </DialogContent>
      </Dialog>

      {/* Edit Record Modal */}
      <Dialog open={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
        <DialogTitle>Изменить запись</DialogTitle>
        <DialogContent>
          <form onSubmit={handleEditRecord}>
            <TextField
              label='ID'
              type='number'
              fullWidth
              margin='normal'
              name='id'
              value={formData.id}
              onChange={handleInputChange}
            />
            <TextField
              label='Amount'
              type='number'
              fullWidth
              margin='normal'
              name='amount'
              value={formData.amount}
              onChange={handleInputChange}
            />
            <TextField
              label='Status'
              select
              fullWidth
              margin='normal'
              SelectProps={{
                native: true,
              }}
              name='status'
              value={formData.status}
              onChange={handleInputChange}>
              <option value='pending'>Pending</option>
              <option value='completed'>Completed</option>
            </TextField>
            <MDBox display='flex' justifyContent='space-between' mt={2}>
              <Button type='submit' variant='contained' color='warning'>
                Изменить
              </Button>
              <Button
                onClick={() => setIsEditModalOpen(false)}
                variant='contained'
                color='secondary'>
                Отмена
              </Button>
            </MDBox>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Record Modal */}
      <Dialog open={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)}>
        <DialogTitle>Удалить запись</DialogTitle>
        <DialogContent>
          <form onSubmit={handleDeleteRecord}>
            <TextField
              label='ID'
              type='number'
              fullWidth
              margin='normal'
              name='id'
              value={formData.id}
              onChange={handleInputChange}
            />
            <MDBox display='flex' justifyContent='space-between' mt={2}>
              <Button type='submit' variant='contained' color='error'>
                Удалить
              </Button>
              <Button
                onClick={() => setIsDeleteModalOpen(false)}
                variant='contained'
                color='secondary'>
                Отмена
              </Button>
            </MDBox>
          </form>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}

export default Tables;
