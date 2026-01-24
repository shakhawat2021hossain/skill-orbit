import { Button } from "@/components/ui/button";
import { Filter,} from "lucide-react";
import { getCourses } from "@/services/course/getCourses";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Courses from "@/components/modules/course/Courses";



export default async function CoursesPage() {
    const res = await getCourses(1, 5);

    return (
        <div className="min-h-screen bg-linear-to-b from-gray-50 to-white">
            {/* Hero Section */}
            <div className="bg-white">
                <div className="container mx-auto px-4 py-12">
                    <div className="max-w-2xl mx-auto text-center">
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Master New Skills
                            <span className="text-blue-600 block">
                                From Industry Experts
                            </span>
                        </h1>
                        <p className="text-gray-600 mb-8">
                            Learn in-demand skills with project-based courses taught by professionals.
                        </p>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-10 py-12">
                {/* Filters & Categories */}
                <div className="mb-12">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">
                                Browse Courses
                            </h2>
                            <p className="text-gray-600">
                                Find the perfect course for your goals
                            </p>
                        </div>
                        <div className="flex items-center gap-3">
                            <Button variant="outline" className="gap-2">
                                <Filter className="h-4 w-4" />
                                Filters
                            </Button>
                            <Tabs defaultValue="all">
                                <TabsList>
                                    <TabsTrigger value="all">All</TabsTrigger>
                                    <TabsTrigger value="popular">Popular</TabsTrigger>
                                    <TabsTrigger value="new">New</TabsTrigger>
                                    <TabsTrigger value="trending">Trending</TabsTrigger>
                                </TabsList>
                            </Tabs>
                        </div>
                    </div>
                </div>
                <Courses
                    initialCourses={res?.data ?? []}
                    initialMeta={res?.meta}
                />
                

                
            </div>
        </div>
    );
}


// import Courses from "@/components/modules/course/Courses";
// import { getCourses } from "@/services/course/getCourses";

// export default async function CoursesPage() {

//   const res = await getCourses(1, 3);

//   return (
//     <div className="min-h-screen bg-gray-50 p-4 md:p-6">
        
//       <div className="max-w-7xl mx-auto">
//         <h1 className="text-3xl font-bold text-gray-900 mb-4">All Courses</h1>

        
//       </div>
//     </div>
//   );
// }

