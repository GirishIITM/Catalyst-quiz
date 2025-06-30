import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { leaningboy, landinggirlpic } from "@/assets";
import { routes } from "@/types/routes";

export function HeroSection() {
  return (
    <section className="flex flex-col-reverse md:flex-row justify-between items-center p-12 px-4 md:px-8 lg:px-16 max-w-7xl mx-auto pt-24 md:pt-32">
      <div className="max-w-full md:max-w-[50%] text-center md:text-left">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          <span className="inline-flex items-center gap-2">
            Accelerate <img src={leaningboy} alt="learning boy" className="w-12 h-auto" />
          </span>
          <br />
          <span className="text-foreground">Learning with QuizCatalyst AI</span>
        </h1>
        <p className="text-base text-muted-foreground mb-6">
          Connecting students and teachers through AI grading, handwriting recognition, smart feedback, and plagiarism detection. Personalized quiz generation adapts to every learner's needs.
        </p>
        <div className="space-y-4 md:space-y-0 md:space-x-4">
          <Button className="bg-primary hover:bg-primary-hover text-black font-bold">
            How it Works?
          </Button>
          <Button asChild className="md:hidden bg-primary hover:bg-primary-hover text-black font-bold">
            <Link to={routes.register}>Start Today</Link>
          </Button>
        </div>

        <div className="flex flex-wrap gap-6 mt-8 justify-center md:justify-start">
          <Card className="bg-card-purple dark:bg-purple-900/30 border-purple-200 dark:border-purple-700/50 p-6 rounded-xl w-full sm:w-48 text-center shadow-lg">
            <CardContent className="p-0">
              <div className="bg-yellow-100 dark:bg-yellow-900/40 text-yellow-800 dark:text-yellow-200 rounded-lg px-3 py-2 inline-block font-bold mb-4 text-sm">
                ⭐⭐⭐⭐⭐ 5.0
              </div>
              <div className="text-3xl font-bold text-purple-700 dark:text-purple-300 mb-1">180K+</div>
              <div className="text-sm text-purple-600 dark:text-purple-400 font-medium">Learner Reviews</div>
            </CardContent>
          </Card>

          <Card className="bg-card-green dark:bg-green-900/30 border-green-200 dark:border-green-700/50 p-6 rounded-xl w-full sm:w-48 text-center shadow-lg">
            <CardContent className="p-0">
              <div className="flex justify-center gap-1 mb-4">
                {[44, 46, 47, 48].map((id) => (
                  <div 
                    key={id}
                    className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-green-600 border-2 border-white dark:border-green-800 shadow-sm flex items-center justify-center text-white text-xs font-bold"
                  >
                    {String.fromCharCode(65 + (id % 26))}
                  </div>
                ))}
              </div>
              <div className="text-3xl font-bold text-green-700 dark:text-green-300 mb-1">25K+</div>
              <div className="text-sm text-green-600 dark:text-green-400 font-medium">Active Teachers<br />Creating Classrooms</div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="md:hidden lg:block max-w-xs md:max-w-sm lg:max-w-md">
        <div className="md:bg-gradient-to-r md:from-primary md:to-primary-light md:p-8 md:rounded-lg md:flex md:items-center md:justify-center mb-8 md:mb-0">
          <img src={landinggirlpic} alt="Girl holding books" className="w-full" />
        </div>
      </div>
    </section>
  );
}
