import axios from "axios";

export const fetchChildCommissions = async (code) => {
    if (!code) {
      // console.error("❌ code is required");
      return;
    }

    try {
      const response = await axios.post("/api/user/child-commission", {
        code,
      });

      if (response.data.success) {
        // console.log("✅ Child commissions data:", response.data?.totalCommissionBy3Children);
        // setChildCommissions(response.data);
        return response.data?.totalCommissionBy3Children;
      } else {
        // console.warn("⚠️ No data found:", response.data);
        // setChildCommissions(null);
      }
    } catch (error) {
      // console.error("❌ Error fetching child commissions:", error);
    //   setChildCommissions(null);
    } 
  };