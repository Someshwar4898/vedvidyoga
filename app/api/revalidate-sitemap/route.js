import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");

  const expectedSecret = process.env.REVALIDATION_SECRET || "vedvidyoga-sitemap-secret-123";

  if (secret !== expectedSecret) {
    return NextResponse.json({ message: "Invalid secret token" }, { status: 401 });
  }

  try {
    // Purge cache for all sitemap routes
    revalidatePath("/sitemap.xml");
    revalidatePath("/sitemap/pages.xml");
    revalidatePath("/sitemap/blog.xml");
    revalidatePath("/sitemap/categories.xml");
    revalidatePath("/sitemap/posts.xml");
    revalidatePath("/sitemap/case-studies.xml");
    revalidatePath("/sitemap/posts-images.xml");
    revalidatePath("/sitemap/case-studies-images.xml");

    return NextResponse.json({
      revalidated: true,
      timestamp: new Date().toISOString(),
      message: "Sitemap cache successfully cleared",
    });
  } catch (err) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
