const express = require('express');

const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/organizations', require('./routes/organizationRoutes'));
app.use('/api/service-category', require('./routes/serviceCategoryRoutes'));
app.use('/api/position-category', require('./routes/positionCategoryRoutes'));
app.use('/api/status-category', require('./routes/statusCategoryRoutes'));
app.use('/api/payment-method', require('./routes/paymentMethodRoutes'));
app.use('/api/employees', require('./routes/employeesRoutes'));

// Health
app.get('/', (req, res) => res.send('Beauty booking server ажиллаж байна'));

// Start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server http://localhost:${PORT}`));

