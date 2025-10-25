"use client";
import React, { useEffect, useState } from "react";
import {
  FaSortUp,
  FaSortDown,
  FaBox,
  FaCheckCircle,
  FaSpinner,
  FaEdit,
  FaTrash,
} from "react-icons/fa";
import axios from "axios";

const PackageDetailsPage = () => {
  const [packageData, setPackageData] = useState([]);
  const [view, setView] = useState("list");
  const [loading, setLoading] = useState(true);
  const [expandedIdIndex, setExpandedIdIndex] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, packageId: null, packageName: "" });
  const [updateModal, setUpdateModal] = useState({ isOpen: false, package: null });
  const [formData, setFormData] = useState({ packageName: "", packageAmount: "" });
  const [loadingAction, setLoadingAction] = useState(false);

  useEffect(() => {
    fetchPackageDetails();
  }, []);

  const fetchPackageDetails = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/user/get-package");
      setPackageData(response.data.packages || []);
    } catch (error) {
      console.error("Error fetching package details:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePackage = async () => {
    try {
      setLoadingAction(true);
      const response = await axios.delete("/api/admin/create-package", {
        data: { id: deleteModal.packageId }
      });

      if (response.status === 200) {
        // Remove the deleted package from state
        setPackageData(prev => prev.filter(pkg => pkg._id !== deleteModal.packageId));
        closeDeleteModal();
      }
    } catch (error) {
      console.error("Error deleting package:", error);
      alert(error.response?.data?.error || "Failed to delete package");
    } finally {
      setLoadingAction(false);
    }
  };

  const handleUpdatePackage = async () => {
    if (!formData.packageName.trim() || !formData.packageAmount) {
      alert("Please fill in all fields");
      return;
    }

    try {
      setLoadingAction(true);
      const response = await axios.put("/api/admin/create-package", {
        id: updateModal.package._id,
        updatedPackageName: formData.packageName,
        updatedPackageAmount: formData.packageAmount
      });

      if (response.status === 200) {
        // Update the package in state
        setPackageData(prev => 
          prev.map(pkg => 
            pkg._id === updateModal.package._id 
              ? { ...pkg, packageName: formData.packageName, packageAmount: formData.packageAmount }
              : pkg
          )
        );
        closeUpdateModal();
      }
    } catch (error) {
      console.error("Error updating package:", error);
      alert(error.response?.data?.error || "Failed to update package");
    } finally {
      setLoadingAction(false);
    }
  };

  const handleDeleteClick = (pkg) => {
    setDeleteModal({
      isOpen: true,
      packageId: pkg._id,
      packageName: pkg.packageName
    });
  };

  const handleUpdateClick = (pkg) => {
    setUpdateModal({
      isOpen: true,
      package: pkg
    });
    setFormData({
      packageName: pkg.packageName,
      packageAmount: pkg.packageAmount
    });
  };

  const closeDeleteModal = () => {
    setDeleteModal({ isOpen: false, packageId: null, packageName: "" });
  };

  const closeUpdateModal = () => {
    setUpdateModal({ isOpen: false, package: null });
    setFormData({ packageName: "", packageAmount: "" });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Enhanced loading component
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header Skeleton */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
            <div className="h-8 w-64 bg-gray-200 rounded-lg animate-pulse mb-4 lg:mb-0"></div>
            <div className="h-10 w-32 bg-gray-200 rounded-lg animate-pulse"></div>
          </div>

          {/* Stats Cards Skeleton */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-6 w-16 bg-gray-300 rounded animate-pulse"></div>
                  </div>
                  <div className="h-10 w-10 bg-gray-200 rounded-full animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>

          {/* Table Skeleton */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <div className="h-6 w-48 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="p-6 space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex items-center justify-between py-3">
                  <div className="flex items-center space-x-4">
                    <div className="h-10 w-10 bg-gray-200 rounded-lg animate-pulse"></div>
                    <div className="space-y-2">
                      <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
                      <div className="h-3 w-24 bg-gray-100 rounded animate-pulse"></div>
                    </div>
                  </div>
                  <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const getArrowClass = (key, direction) => {
    const isActive =
      sortConfig.key === key && sortConfig.direction === direction;
    return `h-3 w-3 transition-colors duration-200 ${
      isActive ? "text-blue-600" : "text-gray-400"
    }`;
  };

  const sortedPackages = [...packageData].sort((a, b) => {
    if (!sortConfig.key) return 0;
    let aVal = a[sortConfig.key];
    let bVal = b[sortConfig.key];

    if (
      sortConfig.key === "packageAmount" ||
      sortConfig.key === "packageDailyPercentage"
    ) {
      aVal = parseFloat(aVal);
      bVal = parseFloat(bVal);
    }
    if (sortConfig.key === "createdAt") {
      aVal = new Date(aVal).getTime();
      bVal = new Date(bVal).getTime();
    }

    if (sortConfig.direction === "asc") {
      return aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
    }
    return aVal > bVal ? -1 : aVal < bVal ? 1 : 0;
  });

  const totalPackages = packageData.length;
  const activePackages = packageData.filter(
    (pkg) => pkg.status === "active"
  ).length;
  const totalAmount = packageData.reduce(
    (sum, pkg) => sum + parseFloat(pkg.packageAmount || 0),
    0
  );
  const avgDailyPercentage =
    packageData.length > 0
      ? (
          packageData.reduce(
            (sum, pkg) => sum + parseFloat(pkg.packageDailyPercentage || 0),
            0
          ) / packageData.length
        ).toFixed(2)
      : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col justify-center items-center text-center mb-6 sm:mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              Package Management
            </h1>
            <p className="text-sm sm:text-base text-gray-600">
              Manage and monitor all investment packages
            </p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 w-[380px] sm:w-[580px] md:w-[470px] lg:w-full gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Packages
                </p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {totalPackages}
                </p>
              </div>
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <FaBox className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Active Packages
                </p>
                <p className="text-2xl font-bold text-green-600 mt-1">
                  {activePackages}
                </p>
              </div>
              <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                <FaCheckCircle className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Amount
                </p>
                <p className="text-2xl font-bold text-purple-600 mt-1">
                  ${totalAmount.toLocaleString()}
                </p>
              </div>
              <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <span className="text-lg font-bold text-purple-600">$</span>
              </div>
            </div>
          </div>
        </div>

        {/* Table */}
        {view === "list" && (
          <div className="bg-white w-[380px] sm:w-[580px] md:w-[470px] lg:w-full rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">
                All Packages
              </h2>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    {[
                      // { key: "_id", label: "ID" },
                      { key: "packageName", label: "Package" },
                      { key: "packageAmount", label: "Amount" },
                      { key: "packageDailyPercentage", label: "Tokens" },
                      { key: "createdAt", label: "Created" },
                      { key: "actions", label: "Actions" },
                    ].map(({ key, label }) => (
                      <th
                        key={key}
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors duration-150"
                        onClick={() => key !== "actions" && setSortConfig({
                          key,
                          direction:
                            sortConfig.key === key &&
                            sortConfig.direction === "asc"
                              ? "desc"
                              : "asc",
                        })}
                      >
                        <span className="flex items-center space-x-1">
                          <span>{label}</span>
                          {key !== "actions" && (
                            <span className="flex flex-col">
                              <FaSortUp className={getArrowClass(key, "asc")} />
                              <FaSortDown
                                className={getArrowClass(key, "desc")}
                              />
                            </span>
                          )}
                        </span>
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody className="bg-white divide-y divide-gray-200">
                  {sortedPackages.length > 0 ? (
                    sortedPackages.map((pkg, index) => (
                      <tr
                        key={index}
                        className="hover:bg-gray-50 transition-colors duration-150"
                      >
                        {/* <td className="px-6 py-4 whitespace-nowrap">
                          <div
                            className="text-sm font-medium text-gray-900 cursor-pointer hover:text-blue-600 transition-colors duration-150"
                            onClick={() =>
                              setExpandedIdIndex(
                                expandedIdIndex === index ? null : index
                              )
                            }
                            title="Click to toggle full ID"
                          >
                            {pkg._id ? (
                              expandedIdIndex === index ? (
                                <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                                  {pkg._id}
                                </code>
                              ) : (
                                `${pkg._id.slice(0, 8)}...`
                              )
                            ) : (
                              `#PKG${index + 1}`
                            )}
                          </div>
                        </td> */}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-semibold text-gray-900">
                            {pkg.packageName}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-semibold text-green-600">
                            $
                            {parseFloat(pkg.packageAmount).toLocaleString(
                              undefined,
                              {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              }
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-semibold text-blue-600">
                            {pkg.packageDailyPercentage} tokens
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">
                            {pkg.createdAt
                              ? new Date(pkg.createdAt).toLocaleDateString(
                                  "en-US",
                                  {
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric",
                                  }
                                )
                              : "-"}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => handleUpdateClick(pkg)}
                              className="bg-blue-500 cursor-pointer hover:bg-blue-600 text-white p-2 rounded-lg transition-colors duration-200 flex items-center justify-center"
                              title="Update Package"
                            >
                              <FaEdit className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteClick(pkg)}
                              className="bg-red-500 cursor-pointer hover:bg-red-600 text-white p-2 rounded-lg transition-colors duration-200 flex items-center justify-center"
                              title="Delete Package"
                            >
                              <FaTrash className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="px-6 py-12 text-center">
                        <div className="flex flex-col items-center justify-center text-gray-400">
                          <FaBox className="h-12 w-12 mb-3 opacity-50" />
                          <p className="text-lg font-medium">
                            No packages found
                          </p>
                          <p className="text-sm mt-1">
                            Create your first package to get started
                          </p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {deleteModal.isOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl max-w-md w-full p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Delete Package
              </h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete the package{" "}
                <span className="font-semibold">"{deleteModal.packageName}"</span>? 
                This action cannot be undone.
              </p>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={closeDeleteModal}
                  disabled={loadingAction}
                  className="px-4 py-2 cursor-pointer text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200 disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeletePackage}
                  disabled={loadingAction}
                  className="px-4 py-2 cursor-pointer text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-lg transition-colors duration-200 disabled:opacity-50 flex items-center"
                >
                  {loadingAction ? (
                    <>
                      <FaSpinner className="animate-spin h-4 w-4 mr-2" />
                      Deleting...
                    </>
                  ) : (
                    "Delete"
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Update Package Modal */}
        {updateModal.isOpen && updateModal.package && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl max-w-md w-full p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Update Package
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Package Name
                  </label>
                  <input
                    type="text"
                    name="packageName"
                    value={formData.packageName}
                    onChange={handleInputChange}
                    className="w-full text-black px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter package name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Package Amount ($)
                  </label>
                  <input
                    type="number"
                    name="packageAmount"
                    value={formData.packageAmount}
                    onChange={handleInputChange}
                    className="w-full text-black px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter package amount"
                    step="0.01"
                    min="0"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={closeUpdateModal}
                  disabled={loadingAction}
                  className="px-4 py-2 cursor-pointer text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200 disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdatePackage}
                  disabled={loadingAction}
                  className="px-4 py-2 cursor-pointer text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors duration-200 disabled:opacity-50 flex items-center"
                >
                  {loadingAction ? (
                    <>
                      <FaSpinner className="animate-spin h-4 w-4 mr-2" />
                      Updating...
                    </>
                  ) : (
                    "Update"
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PackageDetailsPage;