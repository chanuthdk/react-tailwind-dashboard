const express = require('express');
const router = express.Router();
const {
  getComponents,
  saveComponents,
  resetComponents
} = require('../Controllers/componentController');

// GET /api/components - Get all component data
router.get('/', getComponents);

// POST /api/components - Save component data
router.post('/', saveComponents);

// PUT /api/components/reset - Reset to defaults
router.put('/reset', resetComponents);

module.exports = router;