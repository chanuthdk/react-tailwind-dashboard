const Component = require('../models/Component');

// In-memory storage fallback
let memoryStorage = {
  header: {
    title: 'My Awesome Website',
    image: 'https://via.placeholder.com/80x80/4F46E5/FFFFFF?text=LOGO'
  },
  navbar: {
    links: [
      { text: 'Home', url: '/' },
      { text: 'About Us', url: '/about' },
      { text: 'Contact', url: '/contact' }
    ]
  },
  footer: {
    email: 'contact@example.com',
    phone: '+1 (555) 123-4567',
    address: '123 Main St, City, State 12345'
  }
};

// Get components data
const getComponents = async (req, res) => {
  try {
    if (process.env.MONGODB_URI && mongoose.connection.readyState === 1) {
      // Use MongoDB
      let component = await Component.findOne().sort({ createdAt: -1 });
      
      if (!component) {
        component = new Component(memoryStorage);
        await component.save();
      }
      
      res.json({
        success: true,
        data: {
          header: component.header,
          navbar: component.navbar,
          footer: component.footer
        },
        source: 'database'
      });
    } else {
      // Use memory storage
      res.json({
        success: true,
        data: memoryStorage,
        source: 'memory'
      });
    }
  } catch (error) {
    console.error('Get components error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch components',
      message: error.message
    });
  }
};

// Save components data
const saveComponents = async (req, res) => {
  try {
    const { header, navbar, footer } = req.body;

    // Validation
    if (!header || !navbar || !footer) {
      return res.status(400).json({
        success: false,
        error: 'Missing required data',
        message: 'Please provide header, navbar, and footer data'
      });
    }

    if (!navbar.links || navbar.links.length !== 3) {
      return res.status(400).json({
        success: false,
        error: 'Invalid navbar data',
        message: 'Navbar must contain exactly 3 links'
      });
    }

    const componentData = { header, navbar, footer };

    if (process.env.MONGODB_URI && mongoose.connection.readyState === 1) {
      // Save to MongoDB
      const component = new Component(componentData);
      const savedComponent = await component.save();
      
      res.json({
        success: true,
        message: 'Components saved successfully to database',
        data: {
          header: savedComponent.header,
          navbar: savedComponent.navbar,
          footer: savedComponent.footer
        },
        source: 'database'
      });
    } else {
      // Save to memory
      memoryStorage = componentData;
      
      res.json({
        success: true,
        message: 'Components saved successfully to memory',
        data: componentData,
        source: 'memory'
      });
    }
  } catch (error) {
    console.error('Save components error:', error);
    
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: errors
      });
    }
    
    res.status(500).json({
      success: false,
      error: 'Failed to save components',
      message: error.message
    });
  }
};

// Reset components to default
const resetComponents = async (req, res) => {
  try {
    const defaultData = {
      header: {
        title: 'My Awesome Website',
        image: 'https://via.placeholder.com/80x80/4F46E5/FFFFFF?text=LOGO'
      },
      navbar: {
        links: [
          { text: 'Home', url: '/' },
          { text: 'About Us', url: '/about' },
          { text: 'Contact', url: '/contact' }
        ]
      },
      footer: {
        email: 'contact@example.com',
        phone: '+1 (555) 123-4567',
        address: '123 Main St, City, State 12345'
      }
    };

    if (process.env.MONGODB_URI && mongoose.connection.readyState === 1) {
      const component = new Component(defaultData);
      await component.save();
    } else {
      memoryStorage = defaultData;
    }

    res.json({
      success: true,
      message: 'Components reset to default values',
      data: defaultData
    });
  } catch (error) {
    console.error('Reset components error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to reset components',
      message: error.message
    });
  }
};

module.exports = {
  getComponents,
  saveComponents,
  resetComponents
};