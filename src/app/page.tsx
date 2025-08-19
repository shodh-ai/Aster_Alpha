"use client";
import React, { JSX, useState } from "react";
// ADD THIS IMPORT AT THE TOP
import Link from "next/link";
import { Badge } from "../components/badge";
import { Button } from "../components/button";
import { Card, CardContent } from "../components/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/select";
import { PushToTalkButton } from "../components/PushToTalkButton";

// ===========================================
// DATA & CONSTANTS SECTION
// (Your existing data here... no changes needed)
// ===========================================
const timelinePhases = [
  { phase: "PHASE 1", duration: "(WEEKS 1-8)", title: "CORE INFRASTRUCTURE & AUTOMATION", active: true },
  { phase: "PHASE 2", duration: "(WEEKS 9-12)", title: "CONTAINERS & ORCHESTRATION AT SCALE", active: true },
  { phase: "PHASE 3", duration: "(WEEKS 13-16)", title: "ADVANCED & MULTI-CLOUD STRATEGIES", active: true, isHighlighted: true },
  { phase: "PHASE 4", duration: "(MONTHS 5+)", title: "CAREER LAUNCH & PLACEMENT", active: false },
];
const navItems = ["ALUMNI", "PROGRAMS", "RESOURCES", "FAQS"];
const stats = [
  { value: "300+", label: "RESOURCES AVAILABLE" },
  { value: "12K+", label: "TOTAL DOWNLOADS" },
  { value: "10K+", label: "ACTIVE USERS" },
];
const infoBadges = [
  { icon: "/comp.svg", text: "19 LIVE CLASSES" },
  { icon: "/file.svg", text: "2+ PROJECTS" },
];
const topicBadges = [
  "SINGULAR VALUE DECOMPOSITION", "INDEPENDENT COMPONENT ANALYSIS", "T-DISTRIBUTED STOCHASTIC NEIGHBOR EMBEDDING",
  "MULTIDIMENSIONAL SCALING", "LINEAR DISCRIMINANT ANALYSIS", "FACTOR ANALYSIS", "AUTOENCODERS", "KERNEL PCA",
  "NON-NEGATIVE MATRIX FACTORIZATION", "GAUSSIAN MIXTURE MODELS", "LATENT DIRICHLET ALLOCATION", "RANDOM PROJECTION",
  "UNIFORM MANIFOLD APPROXIMATION AND PROJECTION", "ISOMAP", "LAPLACIAN EIGENMAPS", "SELF-ORGANIZING MAPS",
];
const selectOptions = [
  { id: "course", label: "SELECT THE COURSE", icon: "/projectwhite.svg", placeholder: "Select a course" },
  { id: "difficulty", label: "SELECT DIFFICULTY", icon: "/graph.svg", placeholder: "Select difficulty" },
];


// ===========================================
// INTERNAL SUB-COMPONENTS
// (Your existing sub-components here... no changes needed)
// ===========================================
const ContentContainer = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
  <div className={`w-full max-w-[70%] mx-auto px-4 sm:px-8 ${className}`}>
    {children}
  </div>
);
const PageHeader = () => (
    <header className="relative z-10 pt-9 w-full">
    <ContentContainer className="flex flex-col lg:flex-row items-center justify-between gap-8">
      <img className="w-[219px] h-7" alt="Logo" src="/logo.svg" />
      <div className="flex flex-col lg:flex-row items-center gap-9">
        <nav className="flex items-center gap-9">
          {navItems.map((item, index) => (
            <button
              key={index}
              className="font-['Plus_Jakarta_Sans',Helvetica] font-medium text-white text-base whitespace-nowrap"
            >
              {item}
            </button>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            className="w-[99px] h-[50px] rounded-[6px] border border-solid border-white bg-transparent flex items-center justify-center"
          >
            <span className="font-['Plus_Jakarta_Sans',Helvetica] font-bold text-white text-sm tracking-[1.40px]">
              LOGIN
            </span>
          </Button>
          <Button className="w-[161px] h-[50px] px-6 rounded-[6px] bg-[#3a8dff] flex items-center justify-center">
            <span className="font-['Plus_Jakarta_Sans',Helvetica] font-bold text-white text-sm tracking-[1.40px]">
              GET IN TOUCH
            </span>
          </Button>
        </div>
      </div>
    </ContentContainer>
  </header>
);

const HeroSection = ({ agentMode, setAgentMode }: { agentMode: string, setAgentMode: (mode: string) => void }) => (
  <section className="relative w-full mt-20 lg:mt-[180px]">
    <img
      className="absolute w-[599px] h-[1350px] top-[47px] left-0 pointer-events-none hidden lg:block"
      alt="Left Circle"
      src="/Leftcircle.svg"
    />
    <ContentContainer className="relative flex flex-col lg:flex-row items-center justify-between gap-12">
      <div className="flex flex-col w-full max-w-4xl items-start gap-[60px] relative z-10">
        <div className="flex flex-col items-start gap-12 w-full">
          <div className="flex flex-col items-start gap-8">
            <div className="inline-flex items-center justify-center gap-2.5 px-4 py-3 bg-[#0c1c33] rounded-[100px]">
              <span className="bg-[linear-gradient(90deg,rgba(153,196,255,1)_0%,rgba(255,255,255,1)_100%)] [-webkit-background-clip:text] bg-clip-text [-webkit-text-fill-color:transparent] [text-fill-color:transparent] font-bold text-transparent text-sm tracking-[1.40px] leading-5 whitespace-nowrap">
                UPGRADE YOUR SKILLS. LAND HIGH-IMPACT ROLES
              </span>
            </div>
            <h2 className="font-semibold text-white capitalize text-5xl md:text-7xl lg:text-8xl leading-tight tracking-tight">
              Have The Degree, <br /> But Not The Career?
            </h2>
          </div>
          <p className="font-medium text-white/80 text-base leading-6 uppercase" style={{ letterSpacing: '2%' }}>
            Aestr Alpha Turns Your Degree Into A 10–15 Lpa Career With 9–9 Hands-on Training, Real Industry Projects, And Monthly Placement Drives Into High-impact Companies.
          </p>
        </div>
        <Button className="w-[200px] h-[50px] px-6 rounded-[6px] bg-[#3a8dff] flex items-center justify-center">
          <span className="font-['Plus_Jakarta_Sans',Helvetica] font-bold text-white text-sm tracking-[1.40px]">
            GET IN TOUCH
          </span>
        </Button>
        <div className="flex items-start gap-12">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-transparent border-none">
              <CardContent className="flex flex-col items-start gap-[18px] p-0">
                <span className="font-semibold text-[#3a8dff] text-4xl tracking-[0.72px] leading-[39.6px] whitespace-nowrap">
                  {stat.value}
                </span>
                <span className="opacity-60 font-medium text-white text-sm tracking-[1.40px] leading-5 whitespace-nowrap">
                  {stat.label}
                </span>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="w-full max-w-[500px] flex-shrink-0 relative z-10 flex flex-col items-center gap-6 mt-12 lg:mt-0">
        <div className="w-full max-w-[300px]">
          <label className="block text-center text-sm text-white/70 mb-2">
            CHOOSE AN AI ASSISTANT
          </label>
          <Select value={agentMode} onValueChange={setAgentMode}>
            <SelectTrigger className="w-full bg-white/5 border-white/20 text-white">
              <SelectValue placeholder="Select a mode" />
            </SelectTrigger>
            <SelectContent className="bg-black border-white/30 text-white">
              <SelectItem value="overall">Overall Assistant</SelectItem>
              <SelectItem value="counsellor">Career Counsellor</SelectItem>
              <SelectItem value="administration">Administration</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="w-full relative aspect-square">
          <PushToTalkButton mode={agentMode} />
        </div>
      </div>
    </ContentContainer>
  </section>
);
const VideoSection = () => (
  <section className="w-full mt-24 lg:mt-40">
    <ContentContainer>
      <Card className="w-full h-[700px] bg-[#1A1A1A] border border-solid border-[#484848] rounded-xl flex items-center justify-center">
        <CardContent className="w-full h-full p-4">
          <div className="w-full h-full bg-black rounded-lg flex items-center justify-center">
            <span className="text-white font-semibold text-2xl">Video Content Area</span>
          </div>
        </CardContent>
      </Card>
    </ContentContainer>
  </section>
);
const PopularCoursesSection = () => (
  <section className="w-full mt-[200px]">
    <ContentContainer className="flex flex-col items-center gap-[60px]">
      <h2 className="relative [font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-white text-4xl md:text-5xl text-center tracking-[0.96px] leading-[52.8px]">
        OUR POPULAR COURSES
      </h2>
      <div className="w-full lg:grid lg:grid-cols-3 lg:gap-[16px]">
        <Card className="w-full mb-0 lg:col-span-3 rounded-xl border border-solid border-[#484848] bg-[#1A1A1A] overflow-hidden">
          <CardContent className="p-3 flex flex-col md:flex-row h-full gap-3">
            <div className="relative w-full md:w-5/12 h-64 md:h-auto min-h-[300px] bg-[url(/demo1.svg)] bg-cover bg-center rounded-md">
              <Badge variant="custom" className="absolute top-5 left-5">MOST POPULAR</Badge>
            </div>
            <div className="flex flex-col w-full md:w-7/12 justify-center gap-8 p-6 sm:p-8">
              <div className="flex flex-wrap items-center gap-x-9 gap-y-4">
                <div className="inline-flex items-center gap-2">
                  <img className="w-5 h-5" alt="Calendar" src="/calendar_today.svg" />
                  <span className="font-['Plus_Jakarta_Sans',Helvetica] font-medium text-[#3a8dff] text-sm tracking-[1.40px] leading-5 whitespace-nowrap">6-MONTH INTENSIVE TRACK</span>
                </div>
                <div className="inline-flex items-center gap-2">
                  <img className="w-5 h-5 " alt="Project" src="/project.svg" />
                  <span className="font-['Plus_Jakarta_Sans',Helvetica] font-medium text-[#3a8dff] text-sm tracking-[1.40px] leading-5 whitespace-nowrap">4+ LIVE PRODUCTION PROJECTS</span>
                </div>
              </div>
              <div className="flex flex-col items-start gap-4">
                <h3 className="font-['Plus_Jakarta_Sans',Helvetica] font-semibold text-white text-[28px] tracking-[0] leading-[30.8px]">DEEP CLOUD & MULTI-CLOUD ENGINEERING</h3>
                <p className="opacity-60 font-['Plus_Jakarta_Sans',Helvetica] font-medium text-white text-sm tracking-[1.40px] leading-5">IN THIS PROGRAM, YOU WILL BUILD A SCALABLE, MULTI-REGION WEB APPLICATION WITH AUTOMATED FAILOVER, A CI/CD PIPELINE USING INFRASTRUCTURE AS CODE (IAC) TO MANAGE PRODUCTION ENVIRONMENTS, AND A SERVERLESS DATA PROCESSING WORKFLOW FOR REAL-TIME ANALYTICS.</p>
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <Button variant="outline" className="w-full h-16 flex items-center justify-between pl-7 pr-6 py-2.5 rounded-md border border-solid border-[#484848] bg-transparent">
                  <span className="font-['Plus_Jakarta_Sans',Helvetica] font-extrabold text-[#ffffffcc] text-sm tracking-[1.40px] leading-5">BROCHURE</span>
                  <img className="w-[18px] h-[18px]" alt="Download" src="/download.svg" />
                </Button>
                <Button className="w-full h-16 flex items-center justify-between pl-7 pr-5 py-2.5 bg-[#3a8dff] rounded-md">
                  <span className="font-['Plus_Jakarta_Sans',Helvetica] font-extrabold text-white text-sm tracking-[1.40px] leading-5">APPLY NOW</span>
                  <img className="w-[18px] h-[18px]" alt="Apply" src="/arrow.svg" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="w-full mb-0 lg:col-span-2 rounded-xl border border-solid border-[#484848] bg-[#1a1a1a] overflow-hidden">
          <CardContent className="p-3 flex flex-col md:flex-row h-full gap-3">
            <div className="relative w-full md:w-[280px] h-64 md:h-auto min-h-[300px] flex-shrink-0 bg-[url(/demo2.svg)] bg-cover bg-center rounded-md">
              <Badge variant="custom" className="absolute top-4 left-4 w-[90px]">LATEST</Badge>
            </div>
            <div className="flex flex-col flex-grow justify-center gap-6 p-6 sm:p-8">
              <div className="flex flex-wrap items-center gap-x-9 gap-y-4">
                <div className="inline-flex items-center gap-2">
                  <img className="relative w-5 h-5" alt="Calendar" src="/calendar_today.svg" />
                  <span className="relative w-fit [font-family:'Plus_Jakarta_Sans',Helvetica] font-medium text-[#3a8dff] text-sm tracking-[1.40px] leading-5 whitespace-nowrap">4-MONTH</span>
                </div>
                <div className="inline-flex items-center gap-2">
                  <img className="relative w-5 h-5" alt="Project" src="/project.svg" />
                  <span className="relative w-fit [font-family:'Plus_Jakarta_Sans',Helvetica] font-medium text-[#3a8dff] text-sm tracking-[1.40px] leading-5 whitespace-nowrap">3+ (SIMULATION + HARDWARE)</span>
                </div>
              </div>
              <h3 className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-white text-2xl tracking-[0] leading-[26.4px]">ROBOTIC & ROS ENGINEERING</h3>
              <p className="opacity-60 [font-family:'Plus_Jakarta_Sans',Helvetica] font-medium text-white text-sm tracking-[1.40px] leading-5">GIVE MACHINES INTELLIGENCE. DESIGN, SIMULATE, AND DEPLOY THE SOFTWARE THAT MAKES ROBOTS SEE, NAVIGATE, AND ACT IN THE REAL WORLD.</p>
              <div className="flex flex-col sm:flex-row items-center gap-4 mt-auto">
                <Button variant="outline" className="w-full h-16 flex items-center justify-between pl-7 pr-6 py-2.5 rounded-md border border-solid border-[#484848] bg-transparent">
                  <span className="relative w-fit [font-family:'Plus_Jakarta_Sans',Helvetica] font-extrabold text-[#ffffffcc] text-sm tracking-[1.40px] leading-5 whitespace-nowrap">BROCHURE</span>
                  <img className="relative w-[18px] h-[18px]" alt="Download" src="/download.svg" />
                </Button>
                <Button className="w-full h-16 flex items-center justify-between pl-7 pr-5 py-2.5 bg-[#3a8dff] rounded-md">
                  <span className="relative w-fit [font-family:'Plus_Jakarta_Sans',Helvetica] font-extrabold text-white text-sm tracking-[1.40px] leading-5 whitespace-nowrap">APPLY NOW</span>
                  <img className="relative w-[18px] h-[18px]" alt="Apply" src="/arrow.svg" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="w-full mb-0 lg:col-span-1 rounded-xl border border-solid border-[#484848] bg-[#1a1a1a]">
          <CardContent className="p-3 flex flex-col h-full">
            <img className="w-[76px] h-[76px]" alt="Cpu" src="/Cpu.svg" />
            <div className="flex-grow flex flex-col justify-start gap-2 mt-8">
              <h3 className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-white text-2xl tracking-[0] leading-[26.4px]">FINTECH ENGINEERING</h3>
              <p className="opacity-60 [font-family:'Plus_Jakarta_Sans',Helvetica] font-medium text-white text-sm tracking-[1.40px] leading-5">BUILD THE FUTURE OF MONEY.</p>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-4 mt-auto pt-8">
              <Button variant="outline" className="w-full h-16 flex items-center justify-between pl-7 pr-6 py-2.5 rounded-md border border-solid border-[#484848] bg-transparent">
                <span className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-extrabold text-[#ffffffcc] text-sm tracking-[1.40px] leading-5">BROCHURE</span>
                <img className="w-[18px] h-[18px]" alt="Download" src="/download.svg" />
              </Button>
              <Button className="w-full h-16 flex items-center justify-between pl-7 pr-5 py-2.5 bg-[#3a8dff] rounded-md">
                <span className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-extrabold text-white text-sm tracking-[1.40px] leading-5">APPLY NOW</span>
                <img className="w-[18px] h-[18px]" alt="Apply" src="/arrow.svg" />
              </Button>
            </div>
          </CardContent>
        </Card>
        <Card className="w-full mb-0 lg:col-span-1 rounded-xl border border-solid border-[#484848] bg-[#1a1a1a]">
          <CardContent className="p-6 h-full flex items-center justify-between">
            <h3 className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-white text-xl tracking-[0] leading-6 whitespace-nowrap">UI/UX WITH BLENDER</h3>
            <div className="w-[30px] h-[30px] flex-shrink-0 bg-[#3a8dff] rounded-full flex items-center justify-center">
              <img className="w-[14px] h-[14px]" alt="Arrow" src="/arrow.svg" />
            </div>
          </CardContent>
        </Card>
        <Card className="w-full mb-0 lg:col-span-2 rounded-xl border border-solid border-[#484848] bg-[#1a1a1a]">
          <CardContent className="p-6 h-full flex items-center justify-between">
            <h3 className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-white text-xl tracking-[0] leading-6 whitespace-nowrap">RISC-V CPU DESIGN & VERIFICATION</h3>
            <div className="w-[30px] h-[30px] flex-shrink-0 bg-[#3a8dff] rounded-full flex items-center justify-center">
              <img className="w-[14px] h-[14px]" alt="Arrow" src="/arrow.svg" />
            </div>
          </CardContent>
        </Card>
      </div>
    </ContentContainer>
  </section>
);

const TimelineSection = () => (
  <section className="relative w-full mt-32 mb-32">
    <div className="absolute w-[824px] h-[824px] top-0 right-1/2 translate-x-1/2 rotate-90 opacity-70">
      <div className="relative w-[867px] h-[805px] top-[41px] left-[-22px]">
        <div className="absolute w-[543px] h-[543px] top-[99px] left-[162px] rounded-[271.44px] border-[7.54px] border-solid border-white rotate-[-120deg] blur-[22.62px] opacity-80" />
      </div>
    </div>
    <ContentContainer>
      <Card className="relative mx-auto w-full rounded-xl border border-solid border-[#484848] bg-[#1a1a1a]">
        <CardContent className="p-8 md:p-12">
          <h2 className="text-center mb-0 font-['Plus_Jakarta_Sans',Helvetica] font-semibold text-white text-4xl md:text-5xl tracking-[0.96px] leading-[1.2]">
            COURSE LEARNINGS TIMELINE
          </h2>
          <div className="flex flex-col md:flex-row w-full items-center gap-5 relative px-4 md:px-[60px] my-8">
            {selectOptions.map((option) => (
              <div
                key={option.id}
                className="w-full md:flex-1 rounded-md border border-[#484848]"
              >
                <Select>
                  <SelectTrigger className="flex items-center justify-between pl-5 pr-4 py-4 w-full border-none focus:ring-0 focus:ring-offset-0">
                    <div className="inline-flex items-center gap-3 relative">
                      <img className="w-[18px] h-[18px]" alt="Icon" src={option.icon} />
                      <div className="opacity-60 [font-family:'Plus_Jakarta_Sans',Helvetica] font-medium text-white text-sm tracking-wide whitespace-nowrap">
                        {option.label}
                      </div>
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="placeholder">{option.placeholder}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            ))}
          </div>
          <div className="relative w-full px-4 md:px-12 py-8">
            <div className="relative flex justify-between items-center">
              <div className="absolute top-1/2 -translate-y-1/2 w-[75%] left-[12.5%] h-0.5 bg-white/20 z-0"></div>
              <div className="absolute top-1/2 -translate-y-1/2 w-[50%] left-[12.5%] h-0.5 bg-[#3a8dff] z-0"></div>
              {timelinePhases.map((phase, index) => (
                <div key={index} className={`relative z-10 flex flex-col items-center text-center w-1/4 ${phase.active ? "" : "opacity-40"}`}>
                  <div className="h-16 flex flex-col justify-end items-center gap-1 mb-3">
                    <div className="font-['Plus_Jakarta_Sans',Helvetica] font-extrabold text-white text-xs md:text-sm tracking-widest">{phase.phase}</div>
                    <div className="font-['Plus_Jakarta_Sans',Helvetica] font-extrabold text-white text-xs md:text-sm tracking-widest">{phase.duration}</div>
                  </div>
                  {phase.isHighlighted ? (
                    <div className="relative w-8 h-8 bg-[#3a8dff] rounded-2xl flex items-center justify-center">
                      <div className="absolute w-full h-full bg-[#ffffff4c] rounded-2xl blur-[5px] opacity-40" />
                      <div className="absolute w-2 h-2 bg-white rounded" />
                    </div>
                  ) : (
                    <div className="relative w-8 h-8 bg-black rounded-2xl border border-solid border-[#3a8dff] flex items-center justify-center">
                      <div className={`w-5 h-5 ${phase.active ? "bg-[#3a8dff4c]" : "bg-[#ffffff4c]"} rounded-full flex items-center justify-center`}>
                        <div className={`w-2 h-2 ${phase.active ? "bg-[#3a8dff]" : "bg-white/40"} rounded`} />
                      </div>
                    </div>
                  )}
                  <div className="h-16 mt-3 flex items-start justify-center">
                    <div className="font-['Plus_Jakarta_Sans',Helvetica] font-extrabold text-white text-xs md:text-sm text-center tracking-widest">{phase.title}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <section className="flex flex-col items-start gap-8 w-full mt-8 px-4 md:px-7">
            <div className="flex flex-col items-start gap-6 w-full">
              <div className="flex flex-wrap items-start gap-4">
                {infoBadges.map((badge, index) => (
                  <div key={`info-badge-${index}`} className="flex items-center justify-center gap-2 pl-6 pr-7 py-2.5 bg-[#0c1c3380] rounded-[100px] border border-solid border-[#ffffff1a]">
                    <img className="w-5 h-5" alt="Icon" src={badge.icon} />
                    <div className="w-fit bg-[linear-gradient(90deg,rgba(153,196,255,1)_0%,rgba(255,255,255,1)_100%)] [-webkit-background-clip:text] bg-clip-text [-webkit-text-fill-color:transparent] [text-fill-color:transparent] [font-family:'Plus_Jakarta_Sans',Helvetica] font-bold text-transparent text-sm tracking-[1.40px] leading-5 whitespace-nowrap">
                      {badge.text}
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between w-full gap-4">
                <h2 className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-white text-2xl tracking-[0] leading-6 whitespace-nowrap">
                  CORE INFRASTRUCTURE & AUTOMATION
                </h2>
                {/*
                  ============================================================
                  THIS IS THE ONLY PART YOU NEED TO CHANGE IN THIS SECTION
                  ============================================================
                */}
                <Link href="/course/deep-cloud">
                  <Button variant="outline" className="w-full sm:w-auto h-auto px-5 py-3 rounded-md border border-solid border-white bg-transparent flex items-center justify-center gap-3 text-white hover:bg-white/10 hover:text-white">
                    <span className="font-['Plus_Jakarta_Sans',Helvetica] font-bold text-sm tracking-[1.40px]">
                      KNOW MORE
                    </span>
                    <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8.49744 1.16699L13.3308 6.00033V8.00033L8.49744 12.8337L7.08077 11.417L9.93077 8.58366H1.33077V6.41699H9.93077L7.08077 3.58366L8.49744 1.16699Z" fill="currentColor" />
                    </svg>
                  </Button>
                </Link>
                {/* ================= END OF CHANGE ================= */}
              </div>
              <p className="w-full opacity-60 [font-family:'Plus_Jakarta_Sans',Helvetica] font-medium text-white text-sm tracking-[1.40px] leading-5">
                THIS FOUNDATIONAL PHASE IS AN INTENSIVE, HANDS-ON IMMERSION INTO
                BUILDING AND AUTOMATING SECURE, SCALABLE CLOUD INFRASTRUCTURE. YOU
                WILL MOVE BEYOND THE CONSOLE AND LEARN TO COMMAND THE CLOUD THROUGH
                CODE. THE GOAL IS TO THINK LIKE A SENIOR CLOUD ENGINEER, WHERE EVERY
                COMPONENT IS REPRODUCIBLE, VERSION-CONTROLLED, AND AUTOMATED.
              </p>
            </div>
            <div className="flex flex-wrap w-full items-start gap-[12px]">
              {topicBadges.map((topic, index) => (
                <Badge key={`topic-badge-${index}`} variant="outline" className="px-5 py-4 rounded-[100px] border border-solid border-[#ffffff1a] bg-transparent hover:bg-[#ffffff0a]">
                  <span className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-medium text-white text-sm tracking-[1.40px] leading-5 whitespace-nowrap">
                    {topic}
                  </span>
                </Badge>
              ))}
            </div>
          </section>
        </CardContent>
      </Card>
    </ContentContainer>
  </section>
);

const PageFooter = () => (
  <footer style={{ background: '#4187F7' }} className="font-['Plus_Jakarta_Sans',Helvetica] text-white flex items-center justify-center p-8">
    <ContentContainer className="h-full flex flex-col justify-center">
      <div className="flex flex-col lg:flex-row justify-between items-start py-8 border-b border-white/50 gap-8">
        <div className="flex flex-col gap-8">
          <div className="font-semibold text-2xl">AESTR Alpha</div>
          <div className="flex gap-16 text-sm font-normal">
            <div className="flex flex-col gap-3">
              <a href="#" className="hover:underline">HOME</a>
              <a href="#" className="hover:underline">RESOURCES</a>
              <a href="#" className="hover:underline">CONTACT US</a>
            </div>
            <div className="flex flex-col gap-3">
              <a href="#" className="hover:underline">PROGRAMS</a>
              <a href="#" className="hover:underline">CONTACT US</a>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-start gap-4 text-left max-w-xl">
          <p className="font-normal text-xs leading-5 tracking-wider">
            AESTR ALPHA TURNS YOUR DEGREE INTO A 10-15 LPA CAREER WITH HANDS-ON TRAINING, REAL PROJECTS, AND MONTHLY PLACEMENTS.
          </p>
          <h2 className="text-2xl font-bold leading-tight">
            CONFUSED ABOUT YOUR PATH? TALK TO AN OUR AI ENGINEER, NOT A COUNSELLOR.
          </h2>
          <Button variant="secondary" className="bg-white text-black hover:bg-gray-200 px-6 py-2 rounded-md mt-2">
            <div className="flex items-center">
              <span className="font-bold text-sm">TALK NOW</span>
              <span className="font-bold text-xl ml-4">&gt;</span>
            </div>
          </Button>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row justify-between items-center pt-6 text-xs font-normal gap-4">
        <p>2025 AESTR ALPHA</p>
        <div className="flex gap-8">
          <a href="#" className="hover:underline">PRIVACY POLICY</a>
          <a href="#" className="hover:underline">TERMS & CONDITIONS</a>
        </div>
      </div>
    </ContentContainer>
  </footer>
);

// ===========================================
// MAIN COMPONENT EXPORT
// ===========================================
const AestrAlpha = (): JSX.Element => {
  const [agentMode, setAgentMode] = useState("overall");

  return (
    <div className="bg-black w-full min-h-screen font-['Plus_Jakarta_Sans',Helvetica]">
      <div className="bg-black overflow-x-hidden relative w-full min-h-screen">
        <PageHeader />
        <main>
          <HeroSection agentMode={agentMode} setAgentMode={setAgentMode} />
          <VideoSection />
          <PopularCoursesSection />
          <TimelineSection />
        </main>
        <PageFooter />
      </div>
    </div>
  );
};

export default AestrAlpha;