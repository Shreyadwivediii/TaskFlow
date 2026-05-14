import { useEffect, useState } from "react";
import { toast } from "react-toastify";

function ProfilePage() {

  const [user, setUser] = useState(null);

  const [name, setName] = useState("");

  const token = localStorage.getItem("token");

  const fetchProfile = async () => {

    try {

      const res = await fetch(
        "http://localhost:5000/api/user/profile",
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

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

      const res = await fetch(
        "http://localhost:5000/api/user/update",
        {
          method: "PUT",

          headers: {
            "Content-Type": "application/json",

            Authorization: "Bearer " + token,
          },

          body: JSON.stringify({
            name,
          }),
        }
      );

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

  return (
    <div className="page-card profile-page">

      <div className="profile-header">

        <div className="profile-avatar large-avatar">

          {user?.name?.charAt(0).toUpperCase()}

        </div>

        <div>

          <h2>My Profile</h2>

          <p>
            Update your personal information
          </p>

        </div>

      </div>

      <div className="profile-fields">

        <div className="profile-field">

          <label>Name</label>

          <input
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
          />

        </div>

        <div className="profile-field">

          <label>Email</label>

          <input
            value={user?.email || ""}
            disabled
          />

        </div>

      </div>

      <button
        className="primary-button"
        onClick={updateProfile}
      >
        Save Changes
      </button>

    </div>
  );
}

export default ProfilePage;