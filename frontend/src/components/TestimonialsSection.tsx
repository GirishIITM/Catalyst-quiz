// @ts-nocheck
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

export function TestimonialsSection() {
	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.2,
			},
		},
	};

	const cardVariants = {
		hidden: { opacity: 0, y: 60, scale: 0.9 },
		visible: {
			opacity: 1,
			y: 0,
			scale: 1,
			transition: {
				duration: 0.6,
				ease: [0.04, 0.62, 0.23, 0.98],
			},
		},
	};

	return (
		<section className="p-8 md:p-16 px-4 md:px-8 lg:px-16 max-w-7xl mx-auto">
			<motion.div
				className="flex justify-between items-center mb-8"
				initial={{ opacity: 0, y: 30 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true, margin: "-100px" }}
				transition={{ duration: 0.8 }}
			>
				<motion.h2
					className="text-3xl font-bold"
					initial={{ opacity: 0, x: -30 }}
					whileInView={{ opacity: 1, x: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6, delay: 0.2 }}
				>
					What Our Learners Say
				</motion.h2>
				<motion.div
					initial={{ opacity: 0, x: 30 }}
					whileInView={{ opacity: 1, x: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6, delay: 0.4 }}
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
				>
					<Button className="bg-primary hover:bg-primary-hover text-black font-bold">
						View All
					</Button>
				</motion.div>
			</motion.div>

			<motion.div
				className="flex flex-wrap gap-6"
				variants={containerVariants}
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true, margin: "-50px" }}
			>
				<motion.div variants={cardVariants} className="flex-1 min-w-[280px]">
					<motion.div
						whileHover={{
							scale: 1.02,
							y: -8,
							boxShadow: "0 15px 30px rgba(147,51,234,0.15)",
						}}
						transition={{ type: "spring", stiffness: 300, damping: 20 }}
					>
						<Card className="p-6 rounded-2xl bg-card-purple border-purple-200 dark:border-purple-700/50 h-full">
							<CardContent className="p-0">
								<motion.div
									className="text-lg relative mb-4"
									initial={{ opacity: 0 }}
									whileInView={{ opacity: 1 }}
									viewport={{ once: true }}
									transition={{ duration: 0.6, delay: 0.3 }}
								>
									<motion.span
										className="text-4xl font-bold"
										whileHover={{ scale: 1.2, rotate: 5 }}
										transition={{ type: "spring", stiffness: 400, damping: 17 }}
									>
										"
									</motion.span>
									<p className="pl-4">
										Using QuizCatalyst AI in my classroom has been a game-changer.
										My students are more engaged, and managing lessons, notes, and
										quizzes has never been easier. The improvement in student
										participation and performance is incredible!
									</p>
								</motion.div>
								<motion.div
									className="flex items-center gap-3"
									initial={{ opacity: 0, x: -20 }}
									whileInView={{ opacity: 1, x: 0 }}
									viewport={{ once: true }}
									transition={{ duration: 0.6, delay: 0.5 }}
								>
									<motion.img
										src="https://www.profilebakery.com/wp-content/uploads/2023/04/ai-job-application-photo-800x800.jpg"
										alt="Andrew Nair"
										className="w-12 h-12 rounded-full object-cover"
										whileHover={{ scale: 1.1 }}
										transition={{ type: "spring", stiffness: 400, damping: 17 }}
									/>
									<div>
										<div className="font-semibold">Andrew Nair</div>
										<div className="text-sm text-muted-foreground">
											Teacher at Greenwood High School
										</div>
									</div>
								</motion.div>
							</CardContent>
						</Card>
					</motion.div>
				</motion.div>

				<motion.div variants={cardVariants} className="flex-1 min-w-[280px]">
					<motion.div
						whileHover={{
							scale: 1.02,
							y: -8,
							boxShadow: "0 15px 30px rgba(34,197,94,0.15)",
						}}
						transition={{ type: "spring", stiffness: 300, damping: 20 }}
					>
						<Card className="p-6 rounded-2xl bg-card-green h-full">
							<CardContent className="p-0">
								<motion.div
									className="text-lg relative mb-4"
									initial={{ opacity: 0 }}
									whileInView={{ opacity: 1 }}
									viewport={{ once: true }}
									transition={{ duration: 0.6, delay: 0.3 }}
								>
									<motion.span
										className="text-4xl font-bold"
										whileHover={{ scale: 1.2, rotate: 5 }}
										transition={{ type: "spring", stiffness: 400, damping: 17 }}
									>
										"
									</motion.span>
									<p className="pl-4">
										QuizCatalyst AI has completely changed the way I learn. It's
										super easy to access notes, take quizzes, and stay organized. I
										feel way more confident in class now, and my performance has
										really improved!
									</p>
								</motion.div>
								<motion.div
									className="flex items-center gap-3"
									initial={{ opacity: 0, x: -20 }}
									whileInView={{ opacity: 1, x: 0 }}
									viewport={{ once: true }}
									transition={{ duration: 0.6, delay: 0.5 }}
								>
									<motion.img
										src="https://www.jagranimages.com/images/02_05_2019-cbse-student_19187014_20450251.jpg"
										alt="Aarohi Sharma"
										className="w-12 h-12 rounded-full object-cover"
										whileHover={{ scale: 1.1 }}
										transition={{ type: "spring", stiffness: 400, damping: 17 }}
									/>
									<div>
										<div className="font-semibold">Aarohi Sharma</div>
										<div className="text-sm text-muted-foreground">
											12th Grade Student, Delhi Public School
										</div>
									</div>
								</motion.div>
							</CardContent>
						</Card>
					</motion.div>
				</motion.div>

				<motion.div variants={cardVariants} className="flex-1 min-w-[280px]">
					<motion.div
						whileHover={{
							scale: 1.02,
							y: -8,
							boxShadow: "0 15px 30px rgba(255,152,0,0.15)",
						}}
						transition={{ type: "spring", stiffness: 300, damping: 20 }}
					>
						<Card className="p-6 rounded-2xl bg-card-orange h-full">
							<CardContent className="p-0">
								<motion.div
									className="text-lg relative mb-4"
									initial={{ opacity: 0 }}
									whileInView={{ opacity: 1 }}
									viewport={{ once: true }}
									transition={{ duration: 0.6, delay: 0.3 }}
								>
									<motion.span
										className="text-4xl font-bold"
										whileHover={{ scale: 1.2, rotate: 5 }}
										transition={{ type: "spring", stiffness: 400, damping: 17 }}
									>
										"
									</motion.span>
									<p className="pl-4">
										I really like using QuizCatalyst AI! My teacher gives us
										quizzes and notes, and it's fun to learn. I feel more confident
										in class now. QuizCatalyst AI makes studying easy and exciting!
									</p>
								</motion.div>
								<motion.div
									className="flex items-center gap-3"
									initial={{ opacity: 0, x: -20 }}
									whileInView={{ opacity: 1, x: 0 }}
									viewport={{ once: true }}
									transition={{ duration: 0.6, delay: 0.5 }}
								>
									<motion.img
										src="https://c.stocksy.com/a/ZRJ600/z9/1504713.jpg"
										alt="Vivaan Mehta"
										className="w-12 h-12 rounded-full object-cover"
										whileHover={{ scale: 1.1 }}
										transition={{ type: "spring", stiffness: 400, damping: 17 }}
									/>
									<div>
										<div className="font-semibold">Vivaan Mehta</div>
										<div className="text-sm text-muted-foreground">
											5th Grade Student, Little Scholars Academy
										</div>
									</div>
								</motion.div>
							</CardContent>
						</Card>
					</motion.div>
				</motion.div>
			</motion.div>
		</section>
	);
}
