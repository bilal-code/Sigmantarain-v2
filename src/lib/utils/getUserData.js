

export const getUserData = async (userId) => {
  try {
    const res = await fetch("/api/user/getSingleUser", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userId}`, // userId token bhejna
      },
    });

    const data = await res.json();
    console.log("User data fetched successfully:", data.user);
    // setUserData(data?.user);
    return data?.user;

    if (!res.ok) {
      throw new Error(data.error || "Failed to fetch user data");
    }

    return data.user; // user object return karega
  } catch (error) {
    console.error("❌ Error fetching user:", error.message);
    return null;
  }
};