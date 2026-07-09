import { Suspense } from "react";
import { LoadingState } from "@/components/common/LoadingState";
import CoursePageClient from "./CoursePageClient";

export default function CoursePage() {
  return (
    <Suspense fallback={<LoadingState fullScreen message="코스 정보를 불러오는 중..." />}>
      <CoursePageClient />
    </Suspense>
  );
}
