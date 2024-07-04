import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Avatar,
  Button,
  Typography,
  TextField,
  Snackbar,
  SnackbarContent,
  CircularProgress,
} from "@mui/material";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import validator from "validator";
import axiosInstance from "../../util/axiosInstance";
import { setUserDetail } from "../../redux/auth/authSlice";
import { useDispatch } from "react-redux";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: "1px 1px 10px",
  p: 4,
};

const EditProfile = ({ onClose }) => {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    type: "",
    address: "",
    city: "",
    state: "",
    country: "",
    zip: "",
    phone: "",
  });
  const dispatch = useDispatch();
  const [profilePicture, setProfilePicture] = useState(null);
  const [oldProfilePictureUrl, setOldProfilePictureUrl] = useState(null);
  const [profilePictureFile, setProfilePictureFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {
    setLoading(true);
    try {
      const { data } = await axiosInstance.get("user/profile");
      if (data.status && data.profile) {
        const { profile: userProfile } = data;
        setProfile({
          name: userProfile.name || "",
          email: userProfile.email || "",
          type: userProfile.address.type,
          address: userProfile.address?.addressLine1 || "",
          city: userProfile.address?.city || "",
          state: userProfile.address?.state || "",
          country: userProfile.address?.country || "",
          zip: userProfile.address?.zip || "",
          phone: userProfile.phone || "",
        });
        setProfilePicture(`https://api.digibulkmarketing.com${userProfile.profile}`);
        setOldProfilePictureUrl(userProfile.profile);
      }
    } catch (error) {
      console.error("Error fetching profile data", error);
    }
    setLoading(false);
  };

  const MAX_FILE_SIZE = 800 * 1024;

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        alert(
          "File size exceeds the 800 KB limit. Please upload a smaller file."
        );
        return;
      }
      const fileUrl = URL.createObjectURL(file);
      setProfilePictureFile(file);
      setProfilePicture(fileUrl);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const validateFields = () => {
    const errors = {};
    if (!validator.isAlpha(profile.name.replace(/\s/g, ""))) {
      errors.name = "Name must contain only letters";
    }
    if (!validator.isEmail(profile.email)) {
      errors.email = "Invalid email address";
    }
    if (!validator.isNumeric(profile.zip)) {
      errors.zip = "Zip code must contain only numbers";
    }
    if (!validator.isAlpha(profile.state.replace(/\s/g, ""))) {
      errors.state = "State must contain only letters";
    }
    if (!validator.isAlpha(profile.country.replace(/\s/g, ""))) {
      errors.country = "Country must contain only letters";
    }
    if (!validator.isAlpha(profile.city.replace(/\s/g, ""))) {
      errors.city = "City must contain only letters";
    }
    return errors;
  };

  const uploadProfilePicture = async () => {
    if (!profilePictureFile) return null;

    try {
      const formData = new FormData();
      formData.append("type", "profile");
      formData.append("file", profilePictureFile);

      const { data } = await axiosInstance.post("app/upload-image", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      URL.revokeObjectURL(profilePicture);
      return data.downloadUrl;
    } catch (error) {
      console.error("Error uploading profile picture", error);
      return null;
    }
  };

  const updateProfile = async (profilePictureUrl) => {
    const formData = {
      name: profile.name,
      email: profile.email,
      address: {
        country: profile.country,
        type: profile.type,
        addressLine1: profile.address,
        city: profile.city,
        state: profile.state,
        zip: profile.zip,
      },
      profile: profilePictureUrl || oldProfilePictureUrl,
    };

    try {
      const { data } = await axiosInstance.post("auth/set-profile", formData);
      dispatch(setUserDetail(formData));
      onClose();
    } catch (error) {
      console.error("Error updating profile", error);
    }
  };

  const handleSave = async () => {
    const validationErrors = validateFields();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setSnackbarMessage("Please correct the highlighted errors");
      setSnackbarOpen(true);
    } else {
      setLoading(true);
      const profilePictureUrl = await uploadProfilePicture();
      await updateProfile(profilePictureUrl);
      setLoading(false);
    }
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <Box
    sx={{
      ...style,
      width: "90%",
      maxWidth: { xs: 250, md: 600 },
      height: { xs: "70vh", md: "auto" },
      overflow: "auto",
    }}
  >
    <Typography fontSize={"26px"} fontWeight={300} gutterBottom>
      Edit Profile
    </Typography>
    <Grid container spacing={2}>
      <Grid item xs={12} md={3} sx={{ textAlign: "center" }}>
        <Avatar
          alt="Profile"
          src={profilePicture}
          sx={{
            width: 100,
            height: 100,
            margin: "0 auto",
            cursor: "pointer",
          }}
          onClick={() =>
            document.getElementById("profile-picture-upload").click()
          }
        />
        <input
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          id="profile-picture-upload"
          onChange={handleFileChange}
        />
      </Grid>
      <Grid item xs={12} md={9} container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Name"
            name="name"
            value={profile.name}
            variant="outlined"
            required
            error={!!errors.name}
            helperText={errors.name}
            onChange={handleInputChange}
            size="small"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <PhoneInput
            inputStyle={{
              width: "100%",
              height: "40px",
              fontFamily: "Monospace",
              border: "1px solid #AEB4BE",
            }}
            country={"in"}
            value={profile.phone}
            onChange={(phone) =>
              setProfile((prevProfile) => ({
                ...prevProfile,
                phone,
              }))
            }
            inputProps={{
              name: "phone",
              required: true,
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Email Address"
            name="email"
            value={profile.email}
            required
            error={!!errors.email}
            helperText={errors.email}
            onChange={handleInputChange}
            size="small"
          />
        </Grid>
      </Grid>
      <Grid item xs={12} container spacing={2}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Your Address"
            name="address"
            multiline
            rows={5}
            required
            value={profile.address}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                size="small"
                label="Your City"
                name="city"
                value={profile.city}
                required
                error={!!errors.city}
                helperText={errors.city}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Your State"
                size="small"
                name="state"
                value={profile.state}
                required
                error={!!errors.state}
                helperText={errors.state}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Country"
                size="small"
                name="country"
                value={profile.country}
                required
                error={!!errors.country}
                helperText={errors.country}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Zip Code"
                size="small"
                name="zip"
                value={profile.zip}
                required
                error={!!errors.zip}
                helperText={errors.zip}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={6}>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                onClick={handleSave}
              >
                Save
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
    <Snackbar
      open={snackbarOpen}
      autoHideDuration={6000}
      onClose={handleSnackbarClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
    >
      <SnackbarContent
        message={snackbarMessage}
        sx={{ backgroundColor: "#0084fe", color: "#fff" }}
      />
    </Snackbar>
  </Box>
  );
};

export default EditProfile;
