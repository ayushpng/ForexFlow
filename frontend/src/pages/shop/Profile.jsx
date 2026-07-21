import { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { getProfile } from "../../services/shopService";
import toast from "react-hot-toast";

function Profile() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const data = await getProfile();
      setProfile(data);
    } catch (err) {
      toast.error("Failed to load profile.");
    }
  };

  if (!profile) {
    return (
      <DashboardLayout role="shopkeeper">
        <div className="bg-white rounded-xl shadow p-8">Loading...</div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout role="shopkeeper">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-4xl">
        <h1 className="text-3xl font-bold mb-2">My Profile</h1>

        <p className="text-gray-500 mb-8">Shopkeeper account information.</p>

        <div className="grid grid-cols-2 gap-y-5 gap-x-10">
          <div>
            <p className="text-gray-500 text-sm">Full Name</p>
            <p className="font-semibold">{profile.full_name}</p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">Email</p>
            <p className="font-semibold">{profile.email}</p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">Phone</p>
            <p className="font-semibold">{profile.phone}</p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">Shop Name</p>
            <p className="font-semibold">{profile.shop_name}</p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">Shop Address</p>
            <p className="font-semibold">{profile.shop_address}</p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">License Number</p>
            <p className="font-semibold">{profile.license_number}</p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">Status</p>
            <p className="font-semibold capitalize">{profile.status}</p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">Joined</p>
            <p className="font-semibold">
              {new Date(profile.created_at).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Profile;
