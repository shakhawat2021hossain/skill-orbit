import CoursePlayer from "@/components/dashboard/student/CoursePlayer";
import { getMyCourseDeatils } from "@/services/student/getMyCourseDetails";

const MyCourseDetails = async ({
    params,
}: {
    params: Promise<{ id: string }>;
}) => {
    const { id } = await params;
    const details = await getMyCourseDeatils(id);

    if (!details) {
        return <div>No detail found</div>
    }

    return (
        <div className="">
            <CoursePlayer
                enrollment={details?.enrollment}
                course={details?.course}
            />
        </div>
    );
};

export default MyCourseDetails;
