import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, CheckCircle } from "lucide-react";

interface Question {
  id: string;
  type: "likert" | "mcq" | "scenario";
  question: string;
  options?: string[];
  scenarios?: {
    situation: string;
    options: string[];
  };
}

interface Section {
  id: string;
  title: string;
  description: string;
  icon: any;
  questions: Question[];
}

interface AssessmentSectionProps {
  section: Section;
  onComplete: (data: any) => void;
}

export const AssessmentSection = ({ section, onComplete }: AssessmentSectionProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses] = useState<Record<string, any>>({});

  // Sample questions for each section
  const getSectionQuestions = (sectionId: string): Question[] => {
    switch (sectionId) {
      case "intro_gdd":
        return [
          {
            id: "intro_1",
            type: "mcq",
            question: "What best describes your typical role in group decisions?",
            options: [
              "I usually lead the discussion and guide the group",
              "I contribute ideas and support others' suggestions",
              "I listen carefully and provide thoughtful input",
              "I help synthesize different viewpoints into solutions"
            ]
          }
        ];
      
      case "comm_intel_gdd":
        return [
          {
            id: "clarity_1",
            type: "likert",
            question: "I explain my ideas clearly and check that others understand."
          },
          {
            id: "listening_1", 
            type: "scenario",
            question: "In a heated discussion, what do you typically do?",
            scenarios: {
              situation: "Your team is having an intense debate about project direction, and emotions are running high.",
              options: [
                "Actively paraphrase others' points to show understanding",
                "Wait for my turn to speak and then present my perspective",
                "Try to calm everyone down before continuing",
                "Ask clarifying questions to better understand the concerns"
              ]
            }
          },
          {
            id: "tone_1",
            type: "mcq",
            question: "When you need to disagree politely in a meeting, what tone do you adopt?",
            options: [
              "Direct but respectful: 'I see it differently because...'",
              "Collaborative: 'What if we considered this angle...'",
              "Questioning: 'Help me understand why we think...'",
              "Bridge-building: 'I appreciate that view, and I'd also like to add...'"
            ]
          },
          {
            id: "feedback_1",
            type: "likert",
            question: "When receiving feedback, I listen without becoming defensive."
          }
        ];
      
      case "collab_intel_gdd":
        return [
          {
            id: "adaptability_1",
            type: "scenario",
            question: "Your group decides on a plan you disagree with. What do you do?",
            scenarios: {
              situation: "After extensive discussion, your team chooses an approach you believe is suboptimal.",
              options: [
                "Adapt and fully support the team's decision",
                "Express my concerns once more, then support the decision",
                "Support it publicly but continue advocating for changes privately",
                "Ask to revisit the decision with additional information"
              ]
            }
          },
          {
            id: "trust_1",
            type: "likert",
            question: "I am dependable and open with my team members."
          },
          {
            id: "conflict_1",
            type: "scenario",
            question: "Two team members clash during decision-making. How do you handle it?",
            scenarios: {
              situation: "Two colleagues are having a strong disagreement that's affecting the whole team's progress.",
              options: [
                "Step in to mediate and find common ground",
                "Suggest taking a break to cool down",
                "Redirect focus to shared goals and objectives",
                "Address each person's concerns individually"
              ]
            }
          },
          {
            id: "ownership_1",
            type: "likert",
            question: "I support my teammates and share credit fairly."
          }
        ];

      case "context_gdd":
        return [
          {
            id: "one_on_one_1",
            type: "likert",
            question: "During one-on-ones, I confirm understanding and show empathy."
          },
          {
            id: "group_meeting_1",
            type: "likert",
            question: "I contribute to building group cohesion and encourage quieter voices."
          },
          {
            id: "conflict_zone_1",
            type: "mcq",
            question: "When discussions get tense, how do you keep your tone constructive?",
            options: [
              "Stay calm and speak slowly",
              "Remain assertive but respectful",
              "Step back and observe before responding",
              "Focus on facts rather than emotions"
            ]
          },
          {
            id: "digital_1",
            type: "likert",
            question: "I respond thoughtfully and promptly to digital communications."
          }
        ];

      case "coach_gdd":
        return [
          {
            id: "clarity_coach",
            type: "likert",
            question: "I clearly express ideas and check understanding with my team."
          },
          {
            id: "openness_coach",
            type: "likert",
            question: "I accept constructive feedback gracefully and learn from it."
          },
          {
            id: "alignment_coach",
            type: "likert",
            question: "I consider team emotions and goals when communicating."
          },
          {
            id: "conflict_coach",
            type: "likert",
            question: "I resolve conflicts calmly without escalation."
          },
          {
            id: "harmony_coach",
            type: "likert",
            question: "I help maintain team harmony and complete agreed tasks."
          }
        ];

      default:
        return [];
    }
  };

  const questions = getSectionQuestions(section.id);
  const question = questions[currentQuestion];

  const handleResponse = (value: any) => {
    setResponses(prev => ({
      ...prev,
      [question.id]: value
    }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      onComplete(responses);
    }
  };

  const canProceed = responses[question?.id] !== undefined;
  const isLastQuestion = currentQuestion === questions.length - 1;

  if (!question) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardContent className="p-8 text-center">
          <p>No questions available for this section.</p>
          <Button onClick={() => onComplete({})} className="mt-4">
            Continue
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-3xl mx-auto border-0 shadow-xl bg-card/80 backdrop-blur">
      <CardHeader className="pb-6">
        <div className="flex items-center justify-between mb-4">
          <Badge variant="outline" className="px-3 py-1">
            Question {currentQuestion + 1} of {questions.length}
          </Badge>
          {canProceed && (
            <div className="flex items-center gap-2 text-success">
              <CheckCircle className="h-4 w-4" />
              <span className="text-sm">Answered</span>
            </div>
          )}
        </div>
        <CardTitle className="text-xl leading-relaxed">{question.question}</CardTitle>
        {question.scenarios && (
          <CardDescription className="text-base mt-4 p-4 bg-muted/50 rounded-lg border-l-4 border-accent">
            <strong>Scenario:</strong> {question.scenarios.situation}
          </CardDescription>
        )}
      </CardHeader>

      <CardContent className="pb-8">
        <div className="space-y-6">
          {question.type === "likert" && (
            <div className="space-y-6">
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Strongly Disagree</span>
                <span>Strongly Agree</span>
              </div>
              <div className="px-4">
                <Slider
                  value={[responses[question.id] || 3]}
                  onValueChange={(value) => handleResponse(value[0])}
                  max={5}
                  min={1}
                  step={1}
                  className="w-full"
                />
              </div>
              <div className="flex justify-between text-xs text-muted-foreground">
                {[1, 2, 3, 4, 5].map(num => (
                  <span key={num} className="w-8 text-center">{num}</span>
                ))}
              </div>
            </div>
          )}

          {(question.type === "mcq" || question.type === "scenario") && (
            <RadioGroup value={responses[question.id]} onValueChange={handleResponse}>
              <div className="space-y-3">
                {(question.options || question.scenarios?.options || []).map((option, index) => (
                  <div key={index} className="flex items-center space-x-3 p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                    <RadioGroupItem value={option} id={`option-${index}`} />
                    <Label 
                      htmlFor={`option-${index}`} 
                      className="flex-1 cursor-pointer leading-relaxed"
                    >
                      {option}
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>
          )}
        </div>

        <div className="flex justify-between items-center mt-8 pt-6 border-t border-border">
          <div className="text-sm text-muted-foreground">
            Progress: {Math.round(((currentQuestion + 1) / questions.length) * 100)}%
          </div>
          
          <Button 
            onClick={handleNext}
            disabled={!canProceed}
            className="px-6 py-2 font-semibold"
          >
            {isLastQuestion ? "Complete Section" : "Next Question"}
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};