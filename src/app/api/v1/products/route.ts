import { productService } from "@/backend/services/product/product";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const products = await productService.getAllProducts();
    return NextResponse.json({
      success: true,
      message: "Products fetched successfully",
      data: products,
    });
  } catch (e) {
    console.log(e);
  }
}


