import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function TestimonialsSection() {
  return (
    <section className="p-8 md:p-16 px-4 md:px-8 lg:px-16 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">What Our Learners Say</h2>
        <Button className="bg-primary hover:bg-primary-hover text-black font-bold">
          View All
        </Button>
      </div>

      <div className="flex flex-wrap gap-6">
        <Card className="flex-1 min-w-[280px] p-6 rounded-2xl bg-card-purple border-purple-200 dark:border-purple-700/50">
          <CardContent className="p-0">
            <div className="text-lg relative mb-4">
              <span className="text-4xl font-bold">"</span>
              <p className="pl-4">
                Using QuizCatalyst AI in my classroom has been a game-changer. My students are more engaged, and managing lessons, notes, and quizzes has never been easier. The improvement in student participation and performance is incredible!
              </p>
            </div>
            <div className="flex items-center gap-3">
              <img 
                src="https://www.profilebakery.com/wp-content/uploads/2023/04/ai-job-application-photo-800x800.jpg"
                alt="Andrew Nair"
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <div className="font-semibold">Andrew Nair</div>
                <div className="text-sm text-muted-foreground">Teacher at Greenwood High School</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="flex-1 min-w-[280px] p-6 rounded-2xl bg-card-green">
          <CardContent className="p-0">
            <div className="text-lg relative mb-4">
              <span className="text-4xl font-bold">"</span>
              <p className="pl-4">
                QuizCatalyst AI has completely changed the way I learn. It's super easy to access notes, take quizzes, and stay organized. I feel way more confident in class now, and my performance has really improved!
              </p>
            </div>
            <div className="flex items-center gap-3">
              <img 
                src="https://www.jagranimages.com/images/02_05_2019-cbse-student_19187014_20450251.jpg"
                alt="Aarohi Sharma"
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <div className="font-semibold">Aarohi Sharma</div>
                <div className="text-sm text-muted-foreground">12th Grade Student, Delhi Public School</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="flex-1 min-w-[280px] p-6 rounded-2xl bg-card-orange">
          <CardContent className="p-0">
            <div className="text-lg relative mb-4">
              <span className="text-4xl font-bold">"</span>
              <p className="pl-4">
                I really like using QuizCatalyst AI! My teacher gives us quizzes and notes, and it's fun to learn. I feel more confident in class now. QuizCatalyst AI makes studying easy and exciting!
              </p>
            </div>
            <div className="flex items-center gap-3">
              <img 
                src="https://c.stocksy.com/a/ZRJ600/z9/1504713.jpg"
                alt="Vivaan Mehta"
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <div className="font-semibold">Vivaan Mehta</div>
                <div className="text-sm text-muted-foreground">5th Grade Student, Little Scholars Academy</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
