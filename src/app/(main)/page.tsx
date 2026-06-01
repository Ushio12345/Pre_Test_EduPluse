import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BrainCircuit, Target, ArrowRight, GraduationCap } from "lucide-react";
import LandingNavbar from "@/components/public/landing-navbar";
import LandingFooter from "@/components/public/landing-footer";


export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/20 selection:text-primary overflow-x-hidden">
      <LandingNavbar />

      <main>
        <section className="pt-32 pb-20 md:pt-40 md:pb-28 px-4 max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-6 border border-primary/20 tracking-wide uppercase">
            <GraduationCap className="h-3.5 w-3.5" />
            Hệ thống quản lý học tập thông minh
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight max-w-4xl mx-auto text-foreground">
            Nâng cao tri thức, làm chủ kỹ năng <br className="hidden md:block" />
            <span className="text-primary">hiệu quả và khoa học hơn.</span>
          </h1>

          <p className="text-base md:text-lg text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
            Tối ưu hóa phương pháp tiếp thu kiến thức nhờ sự kết hợp bài bản giữa
            bài học tương tác, hệ thống trắc nghiệm định giá và thẻ ghi nhớ ôn tập dài hạn.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link href="/courses" className="w-full sm:w-auto">
              <Button
                size="lg"
                className="w-full text-base h-12 px-8 rounded-xl shadow-sm transition-all group font-medium"
              >
                Bắt đầu học ngay
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/courses" className="w-full sm:w-auto">
              <Button
                size="lg"
                variant="outline"
                className="w-full text-base h-12 px-8 rounded-xl border-border hover:bg-muted font-medium"
              >
                Tìm hiểu lộ trình
              </Button>
            </Link>
          </div>

          <div className="mt-16 max-w-5xl mx-auto border border-border rounded-2xl p-2 bg-muted/30">
            <img
              src="https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?q=80&w=2070"
              alt="Không gian học tập và nghiên cứu thực tế"
              className="rounded-xl border border-border object-cover w-full h-[300px] md:h-[500px]"
            />
          </div>
        </section>

        {/* Features Section */}
        <section
          id="features"
          className="py-25 bg-card border-y border-border transition-colors"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4 tracking-tight text-foreground">
                Phương pháp giáo dục chuẩn sư phạm
              </h2>
              <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
                Ứng dụng các quy chuẩn tư duy hiện đại giúp người học chủ động theo dõi tiến độ, đánh giá năng lực và tăng khả năng ghi nhớ cốt lõi.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-background p-8 rounded-xl border border-border group hover:border-primary/40 transition-all duration-300">
                <div className="w-10 h-10 bg-primary/10 text-primary rounded-lg flex items-center justify-center mb-6 border border-primary/20">
                  <GraduationCap className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2.5">Bài học chuyên sâu</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Nội dung bài giảng được chia nhỏ theo mô-đun khoa học, tích hợp sơ đồ tiến trình giúp bạn quản lý khối lượng kiến thức một cách mạch lạc.
                </p>
              </div>

              <div className="bg-background p-8 rounded-xl border border-border group hover:border-primary/40 transition-all duration-300">
                <div className="w-10 h-10 bg-primary/10 text-primary rounded-lg flex items-center justify-center mb-6 border border-primary/20">
                  <Target className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2.5">Kiểm tra năng lực</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Đề kiểm tra trắc nghiệm bám sát nội dung, giới hạn thời gian thực tế cùng hệ thống chấm điểm tự động, chỉ rõ các lỗ hổng cần bù đắp.
                </p>
              </div>

              <div className="bg-background p-8 rounded-xl border border-border group hover:border-primary/40 transition-all duration-300">
                <div className="w-10 h-10 bg-primary/10 text-primary rounded-lg flex items-center justify-center mb-6 border border-primary/20">
                  <BrainCircuit className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2.5">Thẻ ghi nhớ thông minh</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Ứng dụng cơ chế lặp lại ngắt quãng định kỳ. Hỗ trợ ghi nhớ nhanh thuật ngữ khó, công thức toán lý và từ vựng ngoại ngữ bền vững.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <LandingFooter />
    </div>
  );
}