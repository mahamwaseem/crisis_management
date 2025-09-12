import User from "../models/users";


export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone || "N/A",
      cnic: user.cnic || "N/A",
      address: user.address || "N/A",
      memberSince: user.createdAt,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
