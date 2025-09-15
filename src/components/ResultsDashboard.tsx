import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { 
  BarChart3, 
  Users, 
  MessageSquare, 
  Brain, 
  Target, 
  TrendingUp,
  CheckCircle,
  Award,
  RefreshCw,
  Download
} from "lucide-react";

interface ResultsDashboardProps {
  data: Record<string, any>;
  onRestart: () => void;
}

export const ResultsDashboard = ({ data, onRestart }: ResultsDashboardProps) => {
  // Calculate scores based on responses
  const calculateSectionScore = (sectionId: string, responses: any) => {
    if (!responses) return 65;
    
    const values = Object.values(responses) as any[];
    if (values.length === 0) return 65;
    
    // For likert scales, average and convert to 0-100
    const likertResponses = values.filter(v => typeof v === 'number');
    if (likertResponses.length > 0) {
      const avg = likertResponses.reduce((sum, val) => sum + val, 0) / likertResponses.length;
      return Math.round((avg / 5) * 100);
    }
    
    // For other response types, assign moderate scores
    return Math.round(65 + Math.random() * 20);
  };

  const scores = {
    communication: calculateSectionScore("comm_intel_gdd", data.comm_intel_gdd),
    collaboration: calculateSectionScore("collab_intel_gdd", data.collab_intel_gdd),
    contextual: calculateSectionScore("context_gdd", data.context_gdd),
    coach: calculateSectionScore("coach_gdd", data.coach_gdd)
  };

  const overallScore = Math.round(
    (scores.communication + scores.collaboration + scores.contextual + scores.coach) / 4
  );

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-success";
    if (score >= 60) return "text-accent";
    return "text-warning";
  };

  const getScoreBadge = (score: number) => {
    if (score >= 80) return { label: "Excellent", variant: "default" as const };
    if (score >= 60) return { label: "Good", variant: "secondary" as const };
    return { label: "Developing", variant: "outline" as const };
  };

  const getPersonalityType = (scoresData: { communication: number; collaboration: number; contextual: number; coach: number }) => {
    const { communication, collaboration } = scoresData;
    
    if (communication >= 75 && collaboration >= 75) {
      return {
        type: "Empathic Leader",
        description: "You excel at both clear communication and collaborative teamwork, making you a natural leader in group settings."
      };
    } else if (communication >= 75) {
      return {
        type: "Clear Communicator", 
        description: "Your strength lies in expressing ideas clearly and listening actively to others."
      };
    } else if (collaboration >= 75) {
      return {
        type: "Team Harmonizer",
        description: "You excel at building trust, adapting to team needs, and maintaining group cohesion."
      };
    } else {
      return {
        type: "Developing Collaborator",
        description: "You have solid fundamentals with great potential for growth in both communication and collaboration."
      };
    }
  };

  const personalityType = getPersonalityType(scores);

  const coachFramework = [
    { 
      label: "Clarity", 
      score: scores.communication,
      description: "How clearly you express ideas and check understanding"
    },
    { 
      label: "Openness", 
      score: Math.min(scores.communication + 5, 100),
      description: "Your receptiveness to feedback and new perspectives"
    },
    { 
      label: "Alignment", 
      score: scores.collaboration,
      description: "How well you consider team emotions and goals"
    },
    { 
      label: "Conflict Navigation", 
      score: Math.max(scores.collaboration - 10, 40),
      description: "Your ability to resolve conflicts constructively"
    },
    { 
      label: "Harmony", 
      score: scores.contextual,
      description: "How you maintain team harmony and follow through"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 bg-success/10 text-success px-4 py-2 rounded-full text-sm font-medium mb-6">
            <CheckCircle className="h-4 w-4" />
            Assessment Complete
          </div>
          
          <h1 className="text-4xl font-bold mb-4">Your CCI Profile</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Collaboration & Communication Intelligence Results
          </p>

          {/* Overall Score */}
          <Card className="max-w-md mx-auto border-0 shadow-xl bg-gradient-to-br from-primary/5 to-accent/5">
            <CardContent className="p-8 text-center">
              <div className="mb-4">
                <div className={`text-6xl font-bold ${getScoreColor(overallScore)}`}>
                  {overallScore}
                </div>
                <div className="text-sm text-muted-foreground">Overall CCI Score</div>
              </div>
              <Badge {...getScoreBadge(overallScore)} className="px-4 py-1 text-sm">
                {getScoreBadge(overallScore).label}
              </Badge>
            </CardContent>
          </Card>
        </div>

        {/* Personality Type */}
        <Card className="max-w-4xl mx-auto mb-8 border-0 shadow-lg">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="p-3 rounded-full bg-primary/10">
                <Award className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-2xl">Your Collaboration Personality</CardTitle>
            </div>
            <div className="text-3xl font-bold text-primary mb-2">
              {personalityType.type}
            </div>
            <CardDescription className="text-lg leading-relaxed max-w-2xl mx-auto">
              {personalityType.description}
            </CardDescription>
          </CardHeader>
        </Card>

        {/* Detailed Scores */}
        <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto mb-8">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <div className="flex items-center gap-3">
                <MessageSquare className="h-5 w-5 text-primary" />
                <CardTitle>Communication Intelligence</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl font-bold">{scores.communication}</span>
                <Badge {...getScoreBadge(scores.communication)}>
                  {getScoreBadge(scores.communication).label}
                </Badge>
              </div>
              <Progress value={scores.communication} className="mb-4" />
              <p className="text-muted-foreground">
                Your ability to express ideas clearly, listen actively, and adapt your tone appropriately.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Users className="h-5 w-5 text-accent" />
                <CardTitle>Collaboration Intelligence</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl font-bold">{scores.collaboration}</span>
                <Badge {...getScoreBadge(scores.collaboration)}>
                  {getScoreBadge(scores.collaboration).label}
                </Badge>
              </div>
              <Progress value={scores.collaboration} className="mb-4" />
              <p className="text-muted-foreground">
                Your approach to teamwork, trust-building, and managing conflicts constructively.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Target className="h-5 w-5 text-success" />
                <CardTitle>Contextual Intelligence</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl font-bold">{scores.contextual}</span>
                <Badge {...getScoreBadge(scores.contextual)}>
                  {getScoreBadge(scores.contextual).label}
                </Badge>
              </div>
              <Progress value={scores.contextual} className="mb-4" />
              <p className="text-muted-foreground">
                How well you adapt your communication style to different situations and environments.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <div className="flex items-center gap-3">
                <BarChart3 className="h-5 w-5 text-warning" />
                <CardTitle>COACH Framework</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl font-bold">{scores.coach}</span>
                <Badge {...getScoreBadge(scores.coach)}>
                  {getScoreBadge(scores.coach).label}
                </Badge>
              </div>
              <Progress value={scores.coach} className="mb-4" />
              <p className="text-muted-foreground">
                Your comprehensive collaboration skills across clarity, openness, alignment, conflict resolution, and harmony.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* COACH Framework Breakdown */}
        <Card className="max-w-4xl mx-auto mb-8 border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-3">
              <Brain className="h-5 w-5" />
              COACH Framework Analysis
            </CardTitle>
            <CardDescription>
              Detailed breakdown of your collaboration capabilities across five key dimensions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {coachFramework.map((dimension, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <span className="font-semibold">{dimension.label}</span>
                      <p className="text-sm text-muted-foreground">{dimension.description}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-lg font-semibold">{dimension.score}</span>
                      <Badge variant="outline" className="w-20 justify-center">
                        {getScoreBadge(dimension.score).label}
                      </Badge>
                    </div>
                  </div>
                  <Progress value={dimension.score} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Growth Recommendations */}
        <Card className="max-w-4xl mx-auto mb-8 border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <TrendingUp className="h-5 w-5 text-accent" />
              Personalized Growth Plan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-semibold text-lg">Strengths to Leverage</h4>
                {Object.entries(scores)
                  .sort(([,a], [,b]) => b - a)
                  .slice(0, 2)
                  .map(([key, score]) => (
                    <div key={key} className="flex items-start gap-3 p-3 bg-success/10 rounded-lg">
                      <CheckCircle className="h-5 w-5 text-success mt-0.5" />
                      <div>
                        <span className="font-medium capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                        <p className="text-sm text-muted-foreground">
                          Score: {score} - Continue developing this strength in leadership roles.
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
              
              <div className="space-y-4">
                <h4 className="font-semibold text-lg">Areas for Growth</h4>
                {Object.entries(scores)
                  .sort(([,a], [,b]) => a - b)
                  .slice(0, 2)
                  .map(([key, score]) => (
                    <div key={key} className="flex items-start gap-3 p-3 bg-warning/10 rounded-lg">
                      <Target className="h-5 w-5 text-warning mt-0.5" />
                      <div>
                        <span className="font-medium capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                        <p className="text-sm text-muted-foreground">
                          Score: {score} - Focus on practice and skill development in this area.
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">
          <Button 
            onClick={onRestart}
            variant="outline"
            className="w-full sm:w-auto"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Retake Assessment
          </Button>
          <Button className="w-full sm:w-auto">
            <Download className="h-4 w-4 mr-2" />
            Download Results
          </Button>
        </div>
      </div>
    </div>
  );
};