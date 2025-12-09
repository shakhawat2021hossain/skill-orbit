import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Edit, MoreVertical, Eye, Settings, BarChart3, Trash2 } from "lucide-react";

interface CourseHeaderProps {
  course: {
    title: string;
    description: string;
    status: 'draft' | 'published' | 'archived';
    category: string;
  };
  onEdit: () => void;
  onPublish: () => void;
  onArchive: () => void;
  onDelete: () => void;
}

export default function CourseHeader({ 
  course, 
  onEdit, 
  onPublish, 
  onArchive, 
  onDelete 
}: CourseHeaderProps) {
  return (
    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <Badge variant={
                course.status === 'published' ? "default" : 
                course.status === 'draft' ? "secondary" : "destructive"
              }>
                {course.status.charAt(0).toUpperCase() + course.status.slice(1)}
              </Badge>
              <Badge className="bg-white text-indigo-600 hover:bg-white/90">
                {course.category}
              </Badge>
            </div>
            <h1 className="text-3xl font-bold mb-2">{course.title}</h1>
            <p className="text-indigo-100">{course.description}</p>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              onClick={onEdit}
            >
              <Edit className="h-4 w-4 mr-2" />
              Edit Course
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                  <MoreVertical className="h-4 w-4 mr-2" />
                  More
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={onPublish}>
                  <Eye className="h-4 w-4 mr-2" />
                  {course.status === 'published' ? 'Unpublish' : 'Publish'}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={onArchive}>
                  <Settings className="h-4 w-4 mr-2" />
                  {course.status === 'archived' ? 'Unarchive' : 'Archive'}
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <BarChart3 className="h-4 w-4 mr-2" />
                  View Analytics
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  className="text-red-600"
                  onClick={onDelete}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Course
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button className="bg-white text-indigo-600 hover:bg-white/90">
              <Eye className="h-4 w-4 mr-2" />
              Preview
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}