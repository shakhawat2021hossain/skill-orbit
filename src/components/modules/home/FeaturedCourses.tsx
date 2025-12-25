import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Clock, Users, BookOpen, Heart, TrendingUp } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const courses = [
  
  {
    id: 2,
    title: "Python & Data Science Masterclass",
    instructor: "Dr. Michael Chen",
    rating: 4.8,
    reviews: 8923,
    students: 32000,
    duration: "56 hours",
    lectures: 450,
    price: "$99.99",
    originalPrice: "$229.99",
    category: "Data Science",
    isBestSeller: true,
    level: "Intermediate",
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=225&fit=crop",
    instructorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
  },
  {
    id: 3,
    title: "UI/UX Design Fundamentals",
    instructor: "Emma Wilson",
    rating: 4.7,
    reviews: 7564,
    students: 28000,
    duration: "36 hours",
    lectures: 280,
    price: "$79.99",
    originalPrice: "$179.99",
    category: "Design",
    isBestSeller: false,
    level: "All Levels",
    image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=225&fit=crop",
    instructorImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop",
  },
  {
    id: 4,
    title: "Digital Marketing Pro Certificate",
    instructor: "Alex Rodriguez",
    rating: 4.6,
    reviews: 15432,
    students: 35000,
    duration: "28 hours",
    lectures: 210,
    price: "$69.99",
    originalPrice: "$149.99",
    category: "Marketing",
    isBestSeller: true,
    level: "Beginner",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=225&fit=crop",
    instructorImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
  },
  {
    id: 5,
    title: "React Native Mobile Development",
    instructor: "James Miller",
    rating: 4.9,
    reviews: 10432,
    students: 29000,
    duration: "38 hours",
    lectures: 310,
    price: "$94.99",
    originalPrice: "$209.99",
    category: "Mobile Dev",
    isBestSeller: true,
    level: "Intermediate",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=225&fit=crop",
    instructorImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
  },
  // {
  //   id: 6,
  //   title: "Cloud Computing with AWS",
  //   instructor: "Lisa Taylor",
  //   rating: 4.8,
  //   reviews: 9234,
  //   students: 27000,
  //   duration: "44 hours",
  //   lectures: 340,
  //   price: "$109.99",
  //   originalPrice: "$249.99",
  //   category: "Cloud",
  //   isBestSeller: false,
  //   level: "Advanced",
  //   image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=225&fit=crop",
  //   instructorImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
  // },
  
];

export default function FeaturedCourses() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-3">
              Most Popular Courses
            </h2>
            <p className="text-gray-600">
              Top-rated courses chosen by 1.2M+ learners
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <Button variant="outline" asChild>
              <Link href="/courses" className="flex items-center">
                <TrendingUp className="h-4 w-4 mr-2" />
                View All Courses
              </Link>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {courses.map((course) => (
            <Card key={course.id} className="group overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              {/* Course Image */}
              <div className="relative h-48 overflow-hidden">
                <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent z-10" />
                <Image
                  src={course.image}
                  alt={course.title}
                  width={400}
                  height={225}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                
                {/* Badges */}
                <div className="absolute top-3 left-3 z-20">
                  {course.isBestSeller && (
                    <Badge className="bg-yellow-500 hover:bg-yellow-600 text-white border-0">
                      Bestseller
                    </Badge>
                  )}
                </div>
                <div className="absolute top-3 right-3 z-20">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-full bg-white/90 hover:bg-white"
                  >
                    <Heart className="h-4 w-4 text-gray-600" />
                  </Button>
                </div>
                <div className="absolute bottom-3 left-3 z-20">
                  <Badge variant="secondary" className="bg-white/90 backdrop-blur-sm">
                    {course.category}
                  </Badge>
                </div>
              </div>

              <CardContent className="p-5">
                {/* Course Level */}
                <div className="flex items-center justify-between mb-3">
                  <Badge 
                    variant="outline" 
                    className={`text-xs ${
                      course.level === 'Beginner' ? 'border-green-200 text-green-700 bg-green-50' :
                      course.level === 'Intermediate' ? 'border-blue-200 text-blue-700 bg-blue-50' :
                      'border-purple-200 text-purple-700 bg-purple-50'
                    }`}
                  >
                    {course.level}
                  </Badge>
                  <div className="flex items-center text-sm font-medium">
                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-1" />
                    {course.rating}
                    <span className="text-gray-400 ml-1">({course.reviews.toLocaleString()})</span>
                  </div>
                </div>
                
                {/* Course Title */}
                <h3 className="font-bold text-lg mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                  {course.title}
                </h3>
                
                {/* Instructor */}
                <div className="flex items-center mb-4">
                  <div className="flex items-center">
                    <div className="h-6 w-6 rounded-full overflow-hidden mr-2">
                      <Image
                        src={course.instructorImage}
                        alt={course.instructor}
                        width={24}
                        height={24}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <span className="text-sm text-gray-600">{course.instructor}</span>
                  </div>
                </div>
                
                {/* Course Info */}
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {course.duration}
                    </div>
                    <div className="flex items-center">
                      <BookOpen className="h-4 w-4 mr-1" />
                      {course.lectures} lectures
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    {course.students.toLocaleString()}
                  </div>
                </div>
                
                {/* Price */}
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-bold text-gray-900">{course.price}</span>
                    <span className="text-sm text-gray-400 line-through ml-2">
                      {course.originalPrice}
                    </span>
                  </div>
                  <Badge className="bg-red-50 text-red-600 border-red-200">
                    Save {Math.round((1 - parseFloat(course.price.slice(1)) / parseFloat(course.originalPrice.slice(1))) * 100)}%
                  </Badge>
                </div>
              </CardContent>
              
              <CardFooter className="p-5 pt-0">
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  Add to Cart
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        

        <div className="text-center">
          <Button size="lg" className="px-8" asChild>
            <Link href="/courses">
              Browse All Courses
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}