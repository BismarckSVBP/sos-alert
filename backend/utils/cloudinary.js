// import { v2 as cloudinary } from "cloudinary";

// import { Readable } from "stream";

// import dotenv from "dotenv";

// dotenv.config();

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// export default cloudinary;


// export const uploadToCloudinary = (base64Data, sessionId) => {
//   return new Promise((resolve, reject) => {
//     const uploadStream = cloudinary.uploader.upload_stream(
//       {
//         folder: `sos/streams/${sessionId}`,
//         resource_type: "video",
//       },
//       (error, result) => {
//         if (error) reject(error);
//         else resolve(result);
//       }
//     );

//     const buffer = Buffer.from(base64Data.split(",")[1], "base64");
//     Readable.from(buffer).pipe(uploadStream);
//   });
// };
// backend/utils/cloudinary.js
import { v2 as cloudinary } from "cloudinary";
import { Readable } from "stream";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
export default cloudinary;

export const uploadToCloudinary = (base64Data, sessionId) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: `sos/streams/${sessionId}`,
        resource_type: "video",
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );

    const buffer = Buffer.from(base64Data.split(",")[1], "base64");
    Readable.from(buffer).pipe(uploadStream);
  });
};
