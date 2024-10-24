import multer from 'multer';

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Folder where files will be saved
  },
  filename: function (req, file, cb) {
    let extArray = file.mimetype.split('/');
    let extension = extArray[extArray.length - 1];
    const uniqueSuffix = Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + '.' + extension);
  }
});

export const upload = multer({ storage: storage });


// Use multer in your route handler
// app.post('/your-api-endpoint', upload.single('file'), createRestaurantHandler);

