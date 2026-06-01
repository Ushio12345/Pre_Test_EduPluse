import { Button } from "./button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
export default function BackButton() {
  const router = useRouter();
  return (
    <Button
      variant="ghost"
      className="gap-2 hover:text-primary-500  text-text-primary "
      onClick={() => router.back()}
    >
      <ArrowLeft className="h-4 w-4" />
      Trở về trang trước
    </Button>
  );
}
