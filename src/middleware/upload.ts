import multer from 'multer';

const storage = multer.memoryStorage(); // simpan di memori, bukan di disk

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // Maksimal 5MB
  },
  fileFilter: (req, file, cb) => {
  if (!file.mimetype.startsWith("image/")) {
    return cb(new Error("File harus berupa gambar") as any, false);
  }
  cb(null, true);
},

});

export default upload;
