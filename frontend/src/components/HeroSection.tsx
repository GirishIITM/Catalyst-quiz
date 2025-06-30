// @ts-nocheck
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { leaningboy, landinggirlpic } from "@/assets";
import { routes } from "@/types/routes";
import { motion } from "framer-motion";

export function HeroSection() {
  return (
    <section className="flex flex-col-reverse md:flex-row justify-between items-center p-12 px-4 md:px-8 lg:px-16 max-w-7xl mx-auto pt-24 md:pt-32">
      <motion.div 
        className="max-w-full md:max-w-[50%] text-center md:text-left"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
      >
        <motion.h1 
          className="text-4xl md:text-5xl font-bold mb-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="inline-flex items-center gap-2">
            Accelerate <motion.img 
              src={leaningboy} 
              alt="learning boy" 
              className="w-12 h-auto"
              initial={{ rotate: -10, scale: 0.8 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            />
          </span>
          <br />
          <span className="text-foreground">Learning with QuizCatalyst AI</span>
        </motion.h1>
        
        <motion.p 
          className="text-base text-muted-foreground mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Connecting students and teachers through AI grading, handwriting recognition, smart feedback, and plagiarism detection. Personalized quiz generation adapts to every learner's needs.
        </motion.p>
        
        <motion.div 
          className="space-y-4 md:space-y-0 md:space-x-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Button className="bg-primary hover:bg-primary-hover text-black font-bold">
              How it Works?
            </Button>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Button asChild className="md:hidden bg-primary hover:bg-primary-hover text-black font-bold">
              <Link to={routes.register}>Start Today</Link>
            </Button>
          </motion.div>
        </motion.div>

        <motion.div 
          className="flex flex-wrap gap-6 mt-8 justify-center md:justify-start"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <motion.div
            whileHover={{ scale: 1.02, y: -5 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <Card className="bg-card-purple dark:bg-purple-900/30 border-purple-200 dark:border-purple-700/50 p-6 rounded-xl w-full sm:w-48 text-center shadow-lg">
              <CardContent className="p-0">
                <motion.div 
                  className="bg-yellow-100 dark:bg-yellow-900/40 text-yellow-800 dark:text-yellow-200 rounded-lg px-3 py-2 inline-block font-bold mb-4 text-sm"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  ⭐⭐⭐⭐⭐ 5.0
                </motion.div>
                <div className="text-3xl font-bold text-purple-700 dark:text-purple-300 mb-1">180K+</div>
                <div className="text-sm text-purple-600 dark:text-purple-400 font-medium">Learner Reviews</div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02, y: -5 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <Card className="bg-card-green dark:bg-green-900/30 border-green-200 dark:border-green-700/50 p-6 rounded-xl w-full sm:w-48 text-center shadow-lg">
              <CardContent className="p-0">
                <div className="flex justify-center gap-1 mb-4">
                  {[44, 46, 47, 48].map((id, index) => (
                    <motion.div 
                      key={id}
                      className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-green-600 border-2 border-white dark:border-green-800 shadow-sm flex items-center justify-center text-white text-xs font-bold"
                      initial={{ scale: 0, rotate: 180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ 
                        duration: 0.5, 
                        delay: 1 + index * 0.1,
                        type: "spring",
                        stiffness: 200
                      }}
                      whileHover={{ scale: 1.2, rotate: 10 }}
                    >
                      {String.fromCharCode(65 + (id % 26))}
                    </motion.div>
                  ))}
                </div>
                <div className="text-3xl font-bold text-green-700 dark:text-green-300 mb-1">25K+</div>
                <div className="text-sm text-green-600 dark:text-green-400 font-medium">Active Teachers<br />Creating Classrooms</div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.div 
        className="md:hidden lg:block max-w-xs md:max-w-sm lg:max-w-md"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <motion.div 
          className="md:bg-gradient-to-r md:from-primary md:to-primary-light md:p-8 md:rounded-lg md:flex md:items-center md:justify-center mb-8 md:mb-0"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <motion.img 
            src={landinggirlpic} 
            alt="Girl holding books" 
            className="w-full"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
