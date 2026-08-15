import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function ProfilePage() {
  const API_URL = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const token = localStorage.getItem("token");

  const fetchProfile = async () => {
    try {
      const res = await fetch(`${API_URL}/api/user/profile`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        return;
      }

      setUser(data.user);
      setName(data.user.name);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const updateProfile = async () => {
    try {
      const res = await fetch(`${API_URL}/api/user/update`, {
        method: "PUT",

        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },

        body: JSON.stringify({
          name,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message);
        return;
      }

      toast.success("Profile updated");

      fetchProfile();
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const changePassword = async () => {
    if (!oldPassword || !newPassword) {
      toast.error("Both password fields are required");
      return;
    }

    try {
      const res = await fetch(`${API_URL}/api/user/change-password`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({
          oldPassword,
          newPassword,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Unable to change password");
        return;
      }

      toast.success(data.message || "Password updated");
      setOldPassword("");
      setNewPassword("");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const deleteAccount = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete your account? This cannot be undone."
    );

    if (!confirmed) {
      return;
    }

    try {
      const res = await fetch(`${API_URL}/api/user/delete`, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Unable to delete account");
        return;
      }

      toast.success(data.message || "Account deleted");
      localStorage.removeItem("token");
      navigate("/signup");
      window.location.reload();
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="page-card profile-page">
      <div className="profile-header">
        <div className="profile-avatar large-avatar">
          {user?.name?.charAt(0).toUpperCase()}
        </div>

        <div>
          <h2>My Profile</h2>

          <p>Update your personal information</p>
        </div>
      </div>

      <div className="profile-fields">
        <div className="profile-field">
          <label>Name</label>

          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="profile-field">
          <label>Email</label>

          <input value={user?.email || ""} disabled />
        </div>
      </div>

      <button className="primary-button" onClick={updateProfile}>
        Save Changes
      </button>

      <div className="profile-section">
        <h3>Change Password</h3>

        <div className="profile-fields">
          <div className="profile-field">
            <label>Old Password</label>

            <input
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </div>

          <div className="profile-field">
            <label>New Password</label>

            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
        </div>

        <button className="secondary-button" onClick={changePassword}>
          Change Password
        </button>
      </div>

      <div className="profile-section danger-section">
        <h3>Delete Account</h3>

        <p className="empty-state">
          This will permanently delete your account.
        </p>

        <button className="danger-button" onClick={deleteAccount}>
          Delete Account
        </button>
      </div>
    </div>
  );
}

export default ProfilePage;