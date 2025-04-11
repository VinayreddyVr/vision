// Main App Component
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import axios from "axios";

export default function CareerGPSApp() {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [education, setEducation] = useState("");
  const [careerGoal, setCareerGoal] = useState("");
  const [skillLevel, setSkillLevel] = useState("");
  const [portfolio, setPortfolio] = useState("");
  const [resume, setResume] = useState(null);
  const [certification, setCertification] = useState(null);
  const [courses, setCourses] = useState("");
  const [roadmap, setRoadmap] = useState([]);
  const [progress, setProgress] = useState(20);
  const [badge, setBadge] = useState("");
  const [funFact, setFunFact] = useState("");

  const tips = [
    "📊 SQL is a must-have skill for Data Analysts.",
    "💼 Building projects is better than just watching tutorials.",
    "🎯 Small weekly goals lead to big career wins!",
    "🧠 Learn by teaching someone else.",
    "📈 Consistency beats intensity."
  ];

  const resources = [
    { title: "Intro to SQL - YouTube", link: "https://www.youtube.com/watch?v=HXV3zeQKqGY" },
    { title: "Google Data Analytics Course - Coursera", link: "https://www.coursera.org/professional-certificates/google-data-analytics" },
    { title: "Data Science Handbook (PDF)", link: "https://github.com/jakevdp/PythonDataScienceHandbook" }
  ];

  useEffect(() => {
    const random = Math.floor(Math.random() * tips.length);
    setFunFact(tips[random]);

    // Badge Logic
    if (progress === 20) setBadge("🎓 Started Your Journey");
    else if (progress >= 40) setBadge("📘 Learning in Progress");
    if (progress >= 60) setBadge("🏅 Skill Builder");
    if (progress >= 80) setBadge("🎖 Certification Earned");
    if (progress === 100) setBadge("🏆 Career Ready");
  }, [progress]);

  const handleStart = () => setStep(2);
  const handleContinue = () => setStep(3);

  const handleGenerateRoadmap = async () => {
    try {
      const prompt = Generate a personalized, step-by-step skill development roadmap for a student named ${name} who is studying ${education} and wants to become a ${careerGoal}. Their current skills are: ${skillLevel}. Courses taken: ${courses}. Portfolio: ${portfolio}. Include online resources from YouTube, Coursera, edX, and PDFs. Include real-world project suggestions.;

      const response = await axios.post("/api/generate-roadmap", {
        prompt
      });

      const reply = response.data.roadmap;
      const roadmapSteps = reply.split(/\n(?=\d+\.|-)/).filter(Boolean);
      setRoadmap(roadmapSteps);
      setStep(4);
    } catch (error) {
      setRoadmap(["⚠ Error generating roadmap. Please try again later."]);
      setStep(4);
    }
  };

  const handleTrackProgress = () => {
    const newProgress = Math.min(progress + 20, 100);
    setProgress(newProgress);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 p-4">
      <h1 className="text-3xl font-bold text-center mb-6 text-indigo-800 animate-pulse">🎓 Career GPS for Students 🚀</h1>
      <div className="max-w-2xl mx-auto">
        {step === 1 && (
          <Card className="animate-fade-in">
            <CardContent className="p-6 flex flex-col gap-4">
              <p className="text-lg">👋 Welcome! Let's build your path to your dream job.</p>
              <Button onClick={handleStart}>Get Started</Button>
            </CardContent>
          </Card>
        )}

        {step === 2 && (
          <Card className="animate-fade-in">
            <CardContent className="p-6 flex flex-col gap-4">
              <label>Your Name:</label>
              <Input placeholder="e.g. Riya Sharma" value={name} onChange={(e) => setName(e.target.value)} />
              <label>Your Current Education Level:</label>
              <Input placeholder="e.g. 2nd Year B.Tech in Computer Science" value={education} onChange={(e) => setEducation(e.target.value)} />
              <Button onClick={handleContinue}>Next</Button>
            </CardContent>
          </Card>
        )}

        {step === 3 && (
          <Card className="animate-fade-in">
            <CardContent className="p-6 flex flex-col gap-4">
              <p className="text-lg">Hi <strong>{name}</strong>! Let's personalize your roadmap. 🎯</p>
              <label>Your Dream Career Role:</label>
              <Input placeholder="e.g. Data Analyst" value={careerGoal} onChange={(e) => setCareerGoal(e.target.value)} />
              <label>Your Current Skill Level:</label>
              <Input placeholder="e.g. Intermediate in Excel, Beginner in SQL" value={skillLevel} onChange={(e) => setSkillLevel(e.target.value)} />
              <label>Past Courses Taken (comma separated):</label>
              <Input placeholder="e.g. Intro to Python, Data Science Basics" value={courses} onChange={(e) => setCourses(e.target.value)} />
              <label>Portfolio Link (optional):</label>
              <Input placeholder="e.g. https://github.com/yourprofile" value={portfolio} onChange={(e) => setPortfolio(e.target.value)} />
              <label>Upload Resume (PDF):</label>
              <Input type="file" accept=".pdf" onChange={(e) => setResume(e.target.files[0])} />
              <label>Upload Certification (PDF):</label>
              <Input type="file" accept=".pdf" onChange={(e) => setCertification(e.target.files[0])} />
              <Button onClick={handleGenerateRoadmap}>Generate My Roadmap 🚀</Button>
            </CardContent>
          </Card>
        )}

        {step === 4 && (
          <Card className="animate-fade-in">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4 text-indigo-700">Hi {name}, Here's Your Personalized Roadmap</h2>
              <p className="mb-2 text-gray-700">🎓 Education: {education}</p>
              <p className="mb-2 text-gray-700">🎯 Goal: {careerGoal}</p>
              <ul className="list-disc ml-5 space-y-2">
                {roadmap.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
              <div className="mt-6">
                <Progress value={progress} />
                <p className="text-sm text-gray-600 mt-2">Progress: {progress}% - Keep going, {name.split(" ")[0]}!</p>
                <p className="text-md mt-1">🏅 Your Badge: <strong>{badge}</strong></p>
                <Button onClick={handleTrackProgress} className="mt-2">Mark Step Completed ✅</Button>
              </div>

              <div className="mt-6 p-4 bg-white rounded-xl shadow text-indigo-700">
                💡 <strong>Motivation:</strong> {funFact}
              </div>

              <div className="mt-6 p-4 bg-indigo-100 rounded-xl shadow">
                <h3 className="font-semibold text-indigo-800 mb-2">📚 Helpful Resources</h3>
                <ul className="list-disc ml-5 text-indigo-700 space-y-1">
                  {resources.map((res, idx) => (
                    <li key={idx}>
                      <a href={res.link} target="_blank" rel="noopener noreferrer" className="underline text-indigo-700 hover:text-indigo-900">{res.title}</a>
                    </li>
                  ))}
                </ul>
              </div>

              {certification && (
                <div className="mt-4 text-sm text-green-700">
                  ✅ Certification uploaded: <strong>{certification.name}</strong>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}