import connectDB from "@/lib/db";
import PackageModel from "@/model/create-package.model";

import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { packageName, packageAmount, packageDailyPercentage, status } =
      await request.json();
    // console.log(
    //   "package Data",
    //   packageName,
    //   packageAmount,
    //   packageDailyPercentage
    // );
    // Connect to DB
    await connectDB();

    // Check if package already exists
    const existedPackage = await PackageModel.findOne({ packageName, packageAmount });
    if (existedPackage) {
      return NextResponse.json(
        { error: "Package already exists" },
        { status: 409 }
      );
    }

    // Create package
    const newPackage = await PackageModel.create({
      packageName,
      packageAmount,
      packageDailyPercentage,
      status: status || "active",
    });
    if (newPackage) {
      const packageData = {
        _id: newPackage._id,
        packageName: newPackage.packageName,
        packageAmount: newPackage.packageAmount,
        packageDailyPercentage: newPackage.packageDailyPercentage,
        status: newPackage.status,
      };

      return NextResponse.json(
        { message: "Package created successfully", package: packageData },
        { status: 201 }
      );
      // console.log("Package created successfully:", packageData);
    }
  } catch (error) {
    // console.log("Error creating package:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
export async function PUT(request) {
  try {
    const { id, updatedPackageName, updatedPackageAmount } = await request.json();

    if (!id || !updatedPackageName || !updatedPackageAmount) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    await connectDB();

    // Find and update only name and amount
    const updatedPackage = await PackageModel.findByIdAndUpdate(
      id,
      { packageName: updatedPackageName, packageAmount: updatedPackageAmount },
      { new: true } // returns the updated document
    );

    if (!updatedPackage) {
      return NextResponse.json(
        { error: "Package not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "Package updated successfully",
        package: updatedPackage,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating package:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
export async function DELETE(request) {
  try {
    const { id } = await request.json();

    if (!id) {
      return NextResponse.json(
        { error: "Package ID is required" },
        { status: 400 }
      );
    }

    await connectDB();

    const deletedPackage = await PackageModel.findByIdAndDelete(id);

    if (!deletedPackage) {
      return NextResponse.json(
        { error: "Package not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Package deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting package:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}