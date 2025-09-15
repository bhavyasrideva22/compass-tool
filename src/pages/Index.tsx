import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { AssessmentSection } from "@/components/AssessmentSection";
import { ResultsDashboard } from "@/components/ResultsDashboard";
import { CheckCircle, Users, MessageSquare, Brain, Target, BarChart3 } from "lucide-react";

type AssessmentState = "landing" | "assessment" | "results";

const Index = () => {
  const [currentState, setCurrentState] = useState<AssessmentState>("landing");
  const [currentSection, setCurrentSection] = useState(0);
  const [assessmentData, setAssessmentData] = useState({});

  const sections = [
    {
      id: "intro_gdd",
      title: "Introduction",
      description: "Understanding Group Decision Dynamics",
      icon: Users,
      questions: []
    },
    {
      id: "comm_intel_gdd",
      title: "Communication Intelligence",
      description: "How effectively do you express ideas and listen?",
      icon: MessageSquare,
      questions: []
    },
    {
      id: "collab_intel_gdd", 
      title: "Collaboration Intelligence",
      description: "Your approach to teamwork and shared goals",
      icon: Brain,
      questions: []
    },
    {
      id: "context_gdd",
      title: "Contextual Intelligence",
      description: "Adapting your style to different situations",
      icon: Target,
      questions: []
    },
    {
      id: "coach_gdd",
      title: "COACH Framework",
      description: "Comprehensive collaboration assessment",
      icon: BarChart3,
      questions: []
    }
  ];

  const handleStartAssessment = () => {
    setCurrentState("assessment");
    setCurrentSection(0);
  };

  const handleSectionComplete = (sectionData: any) => {
    setAssessmentData(prev => ({
      ...prev,
      [sections[currentSection].id]: sectionData
    }));

    if (currentSection < sections.length - 1) {
      setCurrentSection(prev => prev + 1);
    } else {
      setCurrentState("results");
    }
  };

  const progressPercentage = ((currentSection + 1) / sections.length) * 100;

  if (currentState === "results") {
    return <ResultsDashboard data={assessmentData} onRestart={() => {
      setCurrentState("landing");
      setCurrentSection(0);
      setAssessmentData({});
    }} />;
  }

  if (currentState === "assessment") {
    const CurrentIcon = sections[currentSection].icon;
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20">
        <div className="container mx-auto px-4 py-8">
          {/* Progress Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <CurrentIcon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-foreground">
                    {sections[currentSection].title}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Section {currentSection + 1} of {sections.length}
                  </p>
                </div>
              </div>
              <Badge variant="outline" className="px-3 py-1">
                {Math.round(progressPercentage)}% Complete
              </Badge>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>

          <AssessmentSection
            section={sections[currentSection]}
            onComplete={handleSectionComplete}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
            <CheckCircle className="h-4 w-4" />
            Professional Assessment Platform
          </div>
          
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Group Decision Dynamics
          </h1>
          
          <h2 className="text-2xl font-semibold text-foreground mb-4">
            Collaboration & Communication Intelligence Assessment
          </h2>
          
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed max-w-3xl mx-auto">
            Discover your unique strengths in group decision-making contexts. This comprehensive assessment 
            reveals how you communicate, collaborate, and adapt in various team situations to enhance your 
            leadership capacity and team productivity.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button 
              size="lg" 
              onClick={handleStartAssessment}
              className="px-8 py-3 text-lg font-semibold bg-gradient-to-r from-primary to-accent hover:from-primary-hover hover:to-accent-hover"
            >
              Start Assessment
            </Button>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <CheckCircle className="h-4 w-4 text-success" />
              ~25 minutes to complete
            </div>
          </div>
        </div>

        {/* Assessment Overview */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {sections.slice(1).map((section, index) => {
            const Icon = section.icon;
            return (
              <Card key={section.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-card/50 backdrop-blur">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <Badge variant="secondary">{index + 1}</Badge>
                  </div>
                  <CardTitle className="text-xl">{section.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">
                    {section.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Key Benefits */}
        <div className="mt-16 max-w-4xl mx-auto">
          <h3 className="text-2xl font-semibold text-center mb-8">What You'll Discover</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-start gap-4 p-6 rounded-lg bg-card/30 border border-border/50">
              <div className="p-2 rounded-lg bg-success/10 flex-shrink-0">
                <CheckCircle className="h-5 w-5 text-success" />
              </div>
              <div>
                <h4 className="font-semibold mb-2">Communication Style & Strengths</h4>
                <p className="text-muted-foreground">
                  Understand how you express ideas, listen actively, and adapt your tone in different contexts.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-4 p-6 rounded-lg bg-card/30 border border-border/50">
              <div className="p-2 rounded-lg bg-accent/10 flex-shrink-0">
                <Users className="h-5 w-5 text-accent" />
              </div>
              <div>
                <h4 className="font-semibold mb-2">Collaboration Personality</h4>
                <p className="text-muted-foreground">
                  Discover your team adaptability, trust-building abilities, and conflict management style.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-4 p-6 rounded-lg bg-card/30 border border-border/50">
              <div className="p-2 rounded-lg bg-warning/10 flex-shrink-0">
                <Target className="h-5 w-5 text-warning" />
              </div>
              <div>
                <h4 className="font-semibold mb-2">Growth Opportunities</h4>
                <p className="text-muted-foreground">
                  Identify specific areas for development with personalized recommendations and techniques.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-4 p-6 rounded-lg bg-card/30 border border-border/50">
              <div className="p-2 rounded-lg bg-primary/10 flex-shrink-0">
                <BarChart3 className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold mb-2">Team Role Alignment</h4>
                <p className="text-muted-foreground">
                  Get insights into optimal team environments and role recommendations based on your profile.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;