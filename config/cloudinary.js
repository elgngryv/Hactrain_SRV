import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "dcr2i1tj6", // Sənin cloud name
  api_key: "611668817792792", // Sənin API key
  api_secret: "_1090KIECz2w11EFM-XKFXBsvyA", // Sənin API secret
  secure: true,
});

export default cloudinary;
