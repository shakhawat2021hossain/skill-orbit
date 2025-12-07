import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { getUserInfo } from "@/services/user/getUser";
import { addCourse } from "@/services/course/addCourse";
import { redirect } from "next/navigation";
import { UserRole } from "@/types/user";

export default async function AddCoursePage() {
  const user = await getUserInfo();

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto text-center">
            <div className="bg-white rounded-xl border p-8">
              <h2 className="text-xl font-bold mb-2">Please Sign In</h2>
              <p className="text-gray-600 mb-6">Sign in to access the instructor dashboard</p>
              <Button asChild className="bg-blue-600 hover:bg-blue-700">
                <Link href="/login">Sign In</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (user.role !== UserRole.INSTRUCTOR) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto text-center">
            <div className="bg-white rounded-xl border p-8">
              <h2 className="text-xl font-bold mb-2">Unauthorized</h2>
              <p className="text-gray-600 mb-6">You must be an instructor to access this page.</p>
              <Button asChild>
                <Link href="/">Back to home</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* Server action - receives the form submit on the server */
  async function handleCreate(formData: FormData) {
    "use server";

    const title = String(formData.get("title") || "");
    const description = String(formData.get("description") || "");
    const price = Number(formData.get("price") || 0);
    const category = String(formData.get("category") || "");
    const thumbnail = String(formData.get("thumbnail") || "");

    const payload = { title, description, price, category, thumbnail };

    const result = await addCourse(payload);

    if (result) {
      redirect("/dashboard");
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <Card>
          <CardHeader>
            <CardTitle>Create New Course</CardTitle>
          </CardHeader>
          <CardContent>
            <form action={handleCreate} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <Input name="title" required />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <Textarea name="description" rows={6} required />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Price (USD)</label>
                  <Input name="price" type="number" step="0.01" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Category</label>
                  <Input name="category" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Thumbnail URL</label>
                  <Input name="thumbnail" />
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Button type="submit" className="bg-blue-600">Create Course</Button>
                <Button variant="ghost" asChild>
                  <Link href="/dashboard">Cancel</Link>
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
