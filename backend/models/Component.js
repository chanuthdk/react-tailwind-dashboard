const mongoose = require('mongoose');
// Define the Link schema
const LinkSchema = new mongoose.Schema({
  text: {
    type: String,
    required: [true, 'Link text is required'],
    trim: true,
    maxlength: [50, 'Link text cannot exceed 50 characters']
  },
  url: {
    type: String,
    required: [true, 'Link URL is required'],
    trim: true,
    validate: {
      validator: function(v) {
        return /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$|^\/.*/.test(v);
      },
      message: 'Please enter a valid URL'
    }
  }
});

// Define the Component schema
const ComponentSchema = new mongoose.Schema({
  header: {
    title: {
      type: String,
      required: [true, 'Header title is required'],
      trim: true,
      maxlength: [100, 'Title cannot exceed 100 characters'],
      default: 'My Awesome Website'
    },
    image: {
      type: String,
      default: 'https://via.placeholder.com/80x80/4F46E5/FFFFFF?text=LOGO',
      validate: {
        validator: function(v) {
          return /^https?:\/\/.+\.(jpg|jpeg|png|webp|gif)$/i.test(v) || v.includes('placeholder') || v.includes('cloudinary');
        },
        message: 'Please enter a valid image URL'
      }
    }
  },
  navbar: {
    links: {
      type: [LinkSchema],
      validate: {
        validator: function(v) {
          return v && v.length === 3;
        },
        message: 'Navbar must contain exactly 3 links'
      }
    }
  },
  footer: {
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
      validate: {
        validator: function(v) {
          return /^[\+]?[\d\s\-\(\)]+$/.test(v);
        },
        message: 'Please enter a valid phone number'
      }
    },
    address: {
      type: String,
      required: [true, 'Address is required'],
      trim: true,
      maxlength: [200, 'Address cannot exceed 200 characters']
    }
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Component', ComponentSchema);