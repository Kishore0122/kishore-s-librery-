import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';
import adminIcon from "../assets/pointing.png";
import { FaUser, FaIdCard, FaEdit, FaCamera, FaShieldAlt } from 'react-icons/fa';
import { loadUser } from '../store/slices/authSlice';

const AdminProfile = () => {
  const { user } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  
  const [formData, setFormData] = useState({
    name: user?.name || '',
    profilePic: null
  });
  
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(user?.avatar?.url || null);
  
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        profilePic: null
      });
      setPreviewUrl(user.avatar?.url || null);
    }
  }, [user]);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        profilePic: file
      }));
      
      // Create a preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setIsLoading(true);
    
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      
      if (formData.profilePic) {
        formDataToSend.append('profile', formData.profilePic);
      }
      
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/api/v1/user/profile/update`,
        formDataToSend,
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      
      if (response.data.success) {
        toast.success("Profile updated successfully");
        setIsEditing(false);
        
        // Reload user data to get the updated profile
        dispatch(loadUser());
      }
    } catch (error) {
      console.error("Profile update error:", error);
      toast.error(error.response?.data?.message || "Failed to update profile");
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <h2 className="text-2xl font-bold text-gray-800">Admin Profile</h2>
            <FaShieldAlt className="text-indigo-600 ml-2" />
          </div>
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition-colors"
            >
              <FaEdit className="mr-2" />
              Edit Profile
            </button>
          )}
        </div>
        
        {isEditing ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex flex-col items-center">
                <div className="relative w-40 h-40 mb-4">
                  <img
                    src={previewUrl || adminIcon}
                    alt="Profile"
                    className="w-40 h-40 rounded-full object-cover border-4 border-indigo-100"
                  />
                  <label htmlFor="profile-pic" className="absolute bottom-0 right-0 bg-indigo-600 text-white p-2 rounded-full cursor-pointer hover:bg-indigo-700 transition-colors">
                    <FaCamera />
                    <input
                      type="file"
                      id="profile-pic"
                      name="profilePic"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                </div>
                <p className="text-sm text-gray-500">Click the camera icon to change your profile picture</p>
              </div>
              
              <div className="flex-1 space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input
                    type="text"
                    value={user?.email || ''}
                    className="w-full p-2 border border-gray-300 rounded-md bg-gray-50"
                    disabled
                  />
                  <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                  <div className="flex items-center p-2 border border-gray-300 rounded-md bg-gray-50">
                    <FaShieldAlt className="text-indigo-600 mr-2" />
                    <span>{user?.roll || 'Admin'}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => {
                  setIsEditing(false);
                  setFormData({
                    name: user?.name || '',
                    profilePic: null
                  });
                  setPreviewUrl(user?.avatar?.url || null);
                }}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                disabled={isLoading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:bg-indigo-400"
                disabled={isLoading}
              >
                {isLoading ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>
        ) : (
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex flex-col items-center">
              <img
                src={user?.avatar?.url || adminIcon}
                alt="Profile"
                className="w-40 h-40 rounded-full object-cover border-4 border-indigo-100 mb-4"
              />
              <div className="bg-indigo-100 text-indigo-700 px-4 py-1 rounded-full text-sm font-medium">
                Administrator
              </div>
            </div>
            
            <div className="flex-1 space-y-4">
              <div className="flex items-center border-b border-gray-100 pb-3">
                <FaUser className="text-indigo-600 mr-3" />
                <div>
                  <p className="text-sm text-gray-600">Name</p>
                  <p className="font-medium text-gray-900">{user?.name}</p>
                </div>
              </div>
              
              <div className="flex items-center border-b border-gray-100 pb-3">
                <FaIdCard className="text-indigo-600 mr-3" />
                <div>
                  <p className="text-sm text-gray-600">Role</p>
                  <p className="font-medium text-gray-900">{user?.roll}</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="text-sm text-gray-500 italic mt-4">
                  As an administrator, you have privileges to manage books, users, and library operations.
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminProfile; 