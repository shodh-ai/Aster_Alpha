// src/app/page.tsx

"use client";
import React, { JSX, useState } from "react";
import Link from "next/link";
import Image from "next/image"; // ADDED: Import Next.js Image component
import { Menu, X } from "lucide-react";
import { Badge } from "../components/badge";
import { Button } from "../components/button";
import { Card, CardContent } from "../components/card";
import { PushToTalkButton } from "../components/PushToTalkButton";

// ===========================================
// DATA & CONSTANTS SECTION
// ===========================================
const navItems = ["ALUMNI", "PROGRAMS", "RESOURCES", "FAQS"];
const stats = [
  { value: "300+", label: "RESOURCES AVAILABLE" },
  { value: "12K+", label: "TOTAL DOWNLOADS" },
  { value: "10K+", label: "ACTIVE USERS" },
];
// REMOVED: Unused 'selectOptions' variable

// ===========================================
// PAGE COMPONENTS
// ===========================================

const ContentContainer = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
  <div className={`w-full max-w-[92%] sm:max-w-[88%] lg:max-w-[88%] mx-auto px-2 sm:px-4 ${className}`}>
    {children}
  </div>
);

const PageHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="relative z-20 pt-9 w-full">
      <ContentContainer className="flex items-center justify-between gap-8">
        <Link href="/">
          {/* FIXED: Replaced <img> with Image */}
          <Image width={219} height={40} className="w-[180px] sm:w-[219px] h-auto" alt="Logo" src="/logo.svg" />
        </Link>

        <div className="hidden lg:flex items-center gap-9">
          <nav className="flex items-center gap-9">
            {navItems.map((item, index) => (
              <button key={index} className="font-sans font-medium text-white text-base whitespace-nowrap">{item}</button>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="w-[99px] h-[50px] rounded-[6px]"><span className="font-sans font-bold text-white text-sm tracking-[1.40px]">LOGIN</span></Button>
            <Button className="w-[161px] h-[50px] px-6 rounded-[6px] bg-[#3a8dff]"><span className="font-sans font-bold text-white text-sm tracking-[1.40px]">GET IN TOUCH</span></Button>
          </div>
        </div>

        <div className="lg:hidden"><button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white">{isMenuOpen ? <X size={28} /> : <Menu size={28} />}</button></div>
      </ContentContainer>

      {isMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-black/95 backdrop-blur-sm z-30 mt-4 shadow-lg">
          <div className="flex flex-col items-center gap-6 py-8">
            <nav className="flex flex-col items-center gap-6">
              {navItems.map((item, index) => (<button key={index} className="font-sans font-medium text-white text-lg">{item}</button>))}
            </nav>
            <div className="flex flex-col items-center gap-4 w-full px-8 mt-4">
              <Button variant="outline" className="w-full h-[50px]"><span className="font-sans font-bold text-white text-sm tracking-[1.40px]">LOGIN</span></Button>
              <Button className="w-full h-[50px] bg-[#3a8dff]"><span className="font-sans font-bold text-white text-sm tracking-[1.40px]">GET IN TOUCH</span></Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

const HeroSection = () => (
  <section className="relative w-full mt-16 lg:mt-[180px]">
    <Image width={599} height={1350} className="absolute w-[599px] h-[1350px] top-[47px] left-0 pointer-events-none hidden lg:block" alt="Left Circle" src="/Leftcircle.svg" />
    <ContentContainer className="relative flex flex-col lg:flex-row items-center justify-between gap-12">
      <div className="flex flex-col w-full lg:max-w-4xl items-start gap-12 lg:gap-[60px] relative z-10 text-center lg:text-left">
        <div className="flex flex-col items-center lg:items-start gap-12 w-full">
          <div className="flex flex-col items-center lg:items-start gap-8">
            {/* ==================================================================== */}
            {/* START OF THE FIX */}
            {/* ==================================================================== */}
            <div className="inline-flex items-center justify-center gap-2.5 px-4 py-3 bg-[#0c1c33] rounded-[100px]">
              <span className="bg-[linear-gradient(90deg,rgba(153,196,255,1)_0%,rgba(255,255,255,1)_100%)] [-webkit-background-clip:text] bg-clip-text [-webkit-text-fill-color:transparent] [text-fill-color:transparent] font-bold text-transparent text-sm tracking-[1.40px] leading-5 text-center md:whitespace-nowrap">
                UPGRADE YOUR SKILLS. LAND HIGH-IMPACT ROLES
              </span>
            </div>
            {/* ==================================================================== */}
            {/* END OF THE FIX */}
            {/* ==================================================================== */}
            <h2 className="font-semibold text-white capitalize text-4xl sm:text-5xl md:text-7xl lg:text-8xl leading-tight tracking-tight">Have The Degree, <br /> But Not The Career?</h2>
          </div>
          <p className="font-medium text-white/80 text-base leading-6 uppercase tracking-wider">Aestr Alpha Turns Your Degree Into A 10–15 Lpa Career With 9–9 Hands-on Training, Real Industry Projects, And Monthly Placement Drives Into High-impact Companies.</p>
        </div>
        <Button className="w-[200px] h-[50px] px-6 rounded-[6px] bg-[#3a8dff] flex items-center justify-center self-center lg:self-start"><span className="font-sans font-bold text-white text-sm tracking-[1.40px]">GET IN TOUCH</span></Button>
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-10 sm:gap-12 w-full justify-center lg:justify-start">
          {stats.map((stat, index) => (<Card key={index} className="bg-transparent border-none"><CardContent className="flex flex-col items-center sm:items-start gap-[16px] p-0"><span className="font-semibold text-[#3a8dff] text-4xl tracking-[0.72px] leading-[39.6px] whitespace-nowrap">{stat.value}</span><span className="opacity-60 font-medium text-white text-sm tracking-[1.40px] leading-5 whitespace-nowrap">{stat.label}</span></CardContent></Card>))}
        </div>
      </div>
      <div className="w-full sm:max-w-[38%] flex-shrink-0 relative z-10 flex flex-col items-center gap-6 mt-12 lg:mt-0">
        <div className="w-full relative aspect-square">
          <PushToTalkButton />
        </div>
      </div>
    </ContentContainer>
  </section>
);

const VideoSection = () => (
  <section className="w-full mt-24 lg:mt-40">
    <ContentContainer>
      <Card className="w-full h-[250px] sm:h-[400px] lg:h-[700px] bg-[#1A1A1A] border border-solid border-[#484848] rounded-xl flex items-center justify-center">
        <CardContent className="w-full h-full p-2 sm:p-4"><div className="w-full h-full bg-black rounded-lg flex items-center justify-center"><span className="text-white font-semibold text-lg sm:text-2xl">Video Content Area</span></div></CardContent>
      </Card>
    </ContentContainer>
  </section>
);

const PopularCoursesSection = () => (
  <section className="w-full mt-24 lg:mt-[200px]">
    <ContentContainer className="flex flex-col items-center gap-12 lg:gap-[60px]">
      <h2 className="relative font-sans font-semibold text-white text-4xl md:text-5xl text-center tracking-[0.96px] leading-tight">
        OUR POPULAR COURSES
      </h2>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-[16px]">
        <Card className="w-full md:min-h-[431px] md:col-span-2 lg:col-span-3 rounded-xl border border-solid border-[#484848] bg-[#1A1A1A] overflow-hidden">
          <CardContent className="p-3 flex flex-col md:flex-row h-full gap-3">
            <div className="relative w-full md:w-5/12 h-64 md:h-full min-h-[200px] bg-[url(/demo1.svg)] bg-cover bg-center rounded-md">
              <Badge variant="custom" className="absolute top-5 left-5">MOST POPULAR</Badge>
            </div>
            <div className="flex flex-col w-full md:w-7/12 p-7">
              <div>
                <div className="flex flex-wrap items-center gap-x-9 gap-y-4">
                  {/* FIXED: Replaced <img> with Image */}
                  <div className="inline-flex items-center gap-2"><Image width={20} height={20} className="w-5 h-5" alt="Calendar" src="/calendar_today.svg" /><span className="font-sans font-medium text-[#3a8dff] text-sm tracking-widest leading-5">6-MONTH INTENSIVE TRACK</span></div>
                  <div className="inline-flex items-center gap-2"><Image width={20} height={20} className="w-5 h-5 " alt="Project" src="/project.svg" /><span className="font-sans font-medium text-[#3a8dff] text-sm tracking-widest leading-5">4+ LIVE PRODUCTION PROJECTS</span></div>
                </div>
                <div className="flex flex-col items-start gap-4 my-8">
                  <h3 className="font-sans font-semibold text-white text-2xl sm:text-[28px] tracking-[0] leading-tight text-left">DEEP CLOUD & MULTI-CLOUD ENGINEERING</h3>
                  <p className="opacity-60 font-sans font-medium text-white text-sm tracking-widest leading-relaxed text-left">IN THIS PROGRAM, YOU WILL BUILD A SCALABLE, MULTI-REGION WEB APPLICATION WITH AUTOMATED FAILOVER, A CI/CD PIPELINE USING INFRASTRUCTURE AS CODE (IAC) TO MANAGE PRODUCTION ENVIRONMENTS, AND A SERVERLESS DATA PROCESSING WORKFLOW FOR REAL-TIME ANALYTICS.</p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-6 mt-auto">
                <Button variant="outline" className="w-full h-14 sm:h-16 flex items-center justify-between pl-7 pr-6 py-2"><span className="font-sans font-extrabold text-[#ffffffcc] text-sm tracking-[1.40px]">BROCHURE</span><Image width={18} height={18} className="w-[18px] h-[18px]" alt="Download" src="/download.svg" /></Button>
                <Button className="w-full h-14 sm:h-16 flex items-center justify-between pl-7 pr-5 py-2.5 bg-[#3a8dff]"><span className="font-sans font-extrabold text-white text-sm tracking-[1.40px]">APPLY NOW</span><Image width={18} height={18} className="w-[18px] h-[18px]" alt="Apply" src="/arrow.svg" /></Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="w-full md:col-span-2 lg:col-span-2 rounded-xl border border-solid border-[#484848] bg-[#1a1a1a] overflow-hidden">
          <CardContent className="p-3 flex flex-col md:flex-row h-full gap-3">
            <div className="relative w-full md:w-2/5 h-64 md:h-full min-h-[300px] flex-shrink-0 bg-[url(/demo2.svg)] bg-cover bg-center rounded-md">
              <Badge variant="custom" className="absolute top-4 left-4 w-[90px]">LATEST</Badge>
            </div>
            <div className="flex flex-col w-full flex-grow pt-7 px-7 pr-[20px] pb-5">
              <div>
                <div className="flex flex-wrap items-center gap-x-9 gap-y-4">
                  {/* FIXED: Replaced <img> with Image */}
                  <div className="inline-flex items-center gap-2"><Image width={20} height={20} className="w-5 h-5" alt="Calendar" src="/calendar_today.svg" /><span className="font-medium text-[#3a8dff] text-sm tracking-widest leading-5">4-MONTH</span></div>
                  <div className="inline-flex items-center gap-2"><Image width={20} height={20} className="w-5 h-5" alt="Project" src="/project.svg" /><span className="font-medium text-[#3a8dff] text-sm tracking-widest leading-5">3+ (SIMULATION + HARDWARE)</span></div>
                </div>
                <div className="my-6">
                  <h3 className="font-semibold text-white text-2xl tracking-[0] leading-tight text-left">ROBOTIC & ROS ENGINEERING</h3>
                  <p className="opacity-60 font-medium text-white text-sm tracking-widest leading-relaxed text-left mt-4">GIVE MACHINES INTELLIGENCE. DESIGN, SIMULATE, AND DEPLOY THE SOFTWARE THAT MAKES ROBOTS SEE, NAVIGATE, AND ACT IN THE REAL WORLD.</p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-4 mt-auto">
                <Button variant="outline" className="w-full h-14 sm:h-16 flex items-center justify-between px-6 sm:pl-7 sm:pr-6 py-2.5"><span className="font-extrabold text-[#ffffffcc] text-xs sm:text-sm tracking-[1.40px]">BROCHURE</span><Image width={18} height={18} className="w-4 h-4 sm:w-[18px] sm:h-[18px]" alt="Download" src="/download.svg" /></Button>
                <Button className="w-full h-14 sm:h-16 flex items-center justify-between px-6 sm:pl-7 sm:pr-5 py-2.5 bg-[#3a8dff]"><span className="font-extrabold text-white text-xs sm:text-sm tracking-[1.40px]">APPLY NOW</span><Image width={18} height={18} className="w-4 h-4 sm:w-[18px] sm:h-[18px]" alt="Apply" src="/arrow.svg" /></Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="w-full lg:col-span-1 rounded-xl border border-solid border-[#484848] bg-[#1a1a1a]">
          <CardContent className="pt-7 px-7 pb-5 flex flex-col h-full text-left">
            <div>
              {/* FIXED: Replaced <img> with Image */}
              <Image width={76} height={76} className="w-[76px] h-[76px]" alt="Cpu" src="/Cpu.svg" />
              <div className="my-8">
                <h3 className="font-semibold text-white text-2xl tracking-[0] leading-tight">FINTECH ENGINEERING</h3>
                <p className="opacity-60 font-medium text-white text-sm tracking-widest leading-relaxed">BUILD THE FUTURE OF MONEY.</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-4 pb-3 mt-auto">
              <Button variant="outline" className="w-full h-14 sm:h-16 flex items-center justify-between px-6 sm:pl-7 sm:pr-6 py-2.5"><span className="font-extrabold text-[#ffffffcc] text-xs sm:text-sm tracking-[1.40px]">BROCHURE</span><Image width={18} height={18} className="w-4 h-4 sm:w-[18px] sm:h-[18px]" alt="Download" src="/download.svg" /></Button>
              <Button className="w-full h-14 sm:h-16 flex items-center justify-between px-6 sm:pl-7 sm:pr-5 py-2.5 bg-[#3a8dff]"><span className="font-extrabold text-white text-xs sm:text-sm tracking-[1.40px]">APPLY NOW</span><Image width={18} height={18} className="w-4 h-4 sm:w-[18px] sm:h-[18px]" alt="Apply" src="/arrow.svg" /></Button>
            </div>
          </CardContent>
        </Card>

        <Card className="w-full lg:col-span-1 rounded-xl border border-solid border-[#484848] bg-[#1a1a1a]">
          <CardContent className="p-7 h-full flex items-center justify-between">
            <h3 className="font-semibold text-white text-lg sm:text-xl tracking-[0] leading-6 text-left">UI/UX WITH BLENDER</h3>
            <div className="w-[30px] h-[30px] flex-shrink-0 bg-[#3a8dff] rounded-full flex items-center justify-center">
              {/* FIXED: Replaced <img> with Image */}
              <Image width={14} height={14} className="w-[14px] h-[14px]" alt="Arrow" src="/arrow.svg" />
            </div>
          </CardContent>
        </Card>

        <Card className="w-full md:col-span-2 lg:col-span-2 rounded-xl border border-solid border-[#484848] bg-[#1a1a1a]">
          <CardContent className="p-7 h-full flex items-center justify-between">
            <h3 className="font-semibold text-white text-lg sm:text-xl tracking-[0] leading-6 text-left">RISC-V CPU DESIGN & VERIFICATION</h3>
            <div className="w-[30px] h-[30px] flex-shrink-0 bg-[#3a8dff] rounded-full flex items-center justify-center">
              {/* FIXED: Replaced <img> with Image */}
              <Image width={14} height={14} className="w-[14px] h-[14px]" alt="Arrow" src="/arrow.svg" />
            </div>
          </CardContent>
        </Card>
      </div>
    </ContentContainer>
  </section>
);
const TimelineSection = () => {
  const detailedTimelineData = [
    {
      phase: "PHASE 1",
      duration: "(WEEKS 1-8)",
      title: "CORE INFRASTRUCTURE & AUTOMATION",
      infoBadges: [{ icon: "/comp.svg", text: "19 LIVE CLASSES" }, { icon: "/file.svg", text: "2+ PROJECTS" }],
      description: "THIS FOUNDATIONAL PHASE IS AN INTENSIVE, HANDS-ON IMMERSION INTO BUILDING AND AUTOMATING SECURE, SCALABLE CLOUD INFRASTRUCTURE. YOU WILL MOVE BEYOND THE CONSOLE AND LEARN TO COMMAND THE CLOUD THROUGH CODE. THE GOAL IS TO THINK LIKE A SENIOR CLOUD ENGINEER, WHERE EVERY COMPONENT IS REPRODUCIBLE, VERSION-CONTROLLED, AND AUTOMATED.",
      topics: ["ADVANCED VPC & NETWORK DESIGN", "IDENTITY AND ACCESS MANAGEMENT (IAM)", "INFRASTRUCTURE AS CODE (IAC) WITH TERRAFORM", "CONFIGURATION MANAGEMENT WITH ANSIBLE", "CI/CD PIPELINES FOR INFRASTRUCTURE", "ADVANCED GIT & VERSION CONTROL"],
    },
    {
      phase: "PHASE 2",
      duration: "(WEEKS 9-12)",
      title: "CONTAINERS & ORCHESTRATION AT SCALE",
      infoBadges: [{ icon: "/comp.svg", text: "15 LIVE CLASSES" }, { icon: "/file.svg", text: "1+ PROJECT" }],
      description: "FOCUS ON PACKAGING APPLICATIONS AND THEIR DEPENDENCIES INTO CONTAINERS. YOU WILL LEARN TO DEPLOY, MANAGE, AND SCALE CONTAINERIZED APPLICATIONS USING INDUSTRY-STANDARD ORCHESTRATION TOOLS, PREPARING YOU FOR MODERN DEVOPS WORKFLOWS.",
      topics: ["DOCKER FUNDAMENTALS", "BUILDING & OPTIMIZING DOCKER IMAGES", "KUBERNETES ARCHITECTURE (K8S)", "DEPLOYING APPLICATIONS ON K8S", "STATEFUL SETS & STORAGE", "HELM CHARTS FOR PACKAGE MANAGEMENT"],
    },
    {
      phase: "PHASE 3",
      duration: "(WEEKS 13-16)",
      title: "ADVANCED & MULTI-CLOUD STRATEGIES",
      infoBadges: [{ icon: "/comp.svg", text: "20 LIVE CLASSES" }, { icon: "/file.svg", text: "1+ CAPSTONE" }],
      description: "GO BEYOND A SINGLE CLOUD PROVIDER. THIS PHASE COVERS ADVANCED NETWORKING, SECURITY, AND COST OPTIMIZATION TECHNIQUES. YOU WILL LEARN HOW TO DESIGN AND IMPLEMENT A ROBUST MULTI-CLOUD STRATEGY THAT ENSURES HIGH AVAILABILITY AND AVOIDS VENDOR LOCK-IN.",
      topics: ["MULTI-CLOUD TERRAFORM STRATEGIES", "CLOUD COST MANAGEMENT & OPTIMIZATION", "ADVANCED CLOUD SECURITY & COMPLIANCE", "SERVERLESS ARCHITECTURES", "MONITORING & OBSERVABILITY AT SCALE", "DISASTER RECOVERY PLANNING"],
    },
    {
      phase: "PHASE 4",
      duration: "(MONTHS 5+)",
      title: "CAREER LAUNCH & PLACEMENT",
      infoBadges: [{ icon: "/comp.svg", text: "CAREER SESSIONS" }, { icon: "/file.svg", text: "PORTFOLIO REVIEW" }],
      description: "TRANSITION FROM LEARNING TO EARNING. THIS FINAL PHASE IS DEDICATED TO PREPARING YOU FOR THE JOB MARKET. WE CONDUCT MOCK INTERVIEWS, OPTIMIZE YOUR RESUME AND ONLINE PROFILES, AND CONNECT YOU WITH OUR HIRING PARTNERS THROUGH MONTHLY PLACEMENT DRIVES.",
      topics: ["RESUME BUILDING & LINKEDIN OPTIMIZATION", "TECHNICAL MOCK INTERVIEWS", "BEHAVIORAL INTERVIEW PREPARATION", "SALARY NEGOTIATION WORKSHOPS", "SYSTEM DESIGN INTERVIEW PRACTICE", "EXCLUSIVE PLACEMENT DRIVES"],
    },
  ];

  const [activePhaseIndex, setActivePhaseIndex] = useState(0);
  const activePhaseData = detailedTimelineData[activePhaseIndex];
  const progressWidthPercentage = activePhaseIndex > 0 ? (activePhaseIndex / (detailedTimelineData.length - 1)) * 100 : 0;

  return (
    <section className="relative w-full my-24 lg:my-32">
      <div className="absolute w-[824px] h-[824px] top-0 right-1/2 translate-x-1/2 rotate-90 opacity-70 hidden lg:block"><div className="relative w-[867px] h-[805px] top-[41px] left-[-22px]"><div className="absolute w-[543px] h-[543px] top-[99px] left-[162px] rounded-[271.44px] border-[7.54px] border-solid border-white rotate-[-120deg] blur-[22.62px] opacity-80" /></div></div>
      <ContentContainer>
        <Card className="relative mx-auto w-full rounded-xl border border-solid border-[#484848] bg-[#1a1a1a]">
          <CardContent className="p-4 sm:p-8 md:p-12">
            <h2 className="text-center mb-8 font-sans font-semibold text-white text-3xl md:text-5xl tracking-[0.96px] leading-tight">COURSE LEARNINGS TIMELINE</h2>
            
            <div className="relative w-full px-0 sm:px-4 md:px-12 py-8 flex flex-col">
              {/* Row 1: Top text labels */}
              <div className="flex justify-between w-full">
                {detailedTimelineData.map((phase) => (
                  <div key={`${phase.phase}-top`} className="w-1/4 text-center">
                    <div className="flex flex-col justify-end items-center gap-1 mb-2 sm:mb-3 min-h-12">
                      <div className="font-sans font-extrabold text-white text-[9px] sm:text-xs md:text-sm tracking-normal sm:tracking-widest">{phase.phase}</div>
                      <div className="font-sans font-extrabold text-white text-[9px] sm:text-xs md:text-sm tracking-normal sm:tracking-widest">{phase.duration}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Row 2: The actual buttons and timeline bar */}
              <div className="relative flex justify-between items-center w-full">
                <div className="absolute top-1/2 -translate-y-1/2 w-[75%] left-[12.5%] h-0.5 z-0">
                  <div className="w-full h-full bg-white/20"></div>
                  <div className="absolute top-0 left-0 h-full bg-[#3a8dff] transition-all duration-500" style={{ width: `${progressWidthPercentage}%` }}></div>
                </div>
                {detailedTimelineData.map((phase, index) => (
                  <div key={phase.phase} className="relative z-10 w-1/4 flex justify-center">
                    <button
                      onClick={() => setActivePhaseIndex(index)}
                      className={`relative w-6 h-6 sm:w-8 sm:h-8 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                        index === activePhaseIndex ? 'bg-[#3a8dff] scale-110' : index < activePhaseIndex ? 'bg-black border border-solid border-[#3a8dff]' : 'bg-gray-800 border border-solid border-gray-600'
                      }`}
                    >
                      {index === activePhaseIndex ? (
                        <><div className="absolute w-full h-full bg-[#ffffff4c] rounded-2xl blur-[5px] opacity-40" /><div className="absolute w-2 h-2 bg-white rounded" /></>
                      ) : index < activePhaseIndex ? (
                        <div className="w-4 h-4 sm:w-5 sm:h-5 bg-[#3a8dff4c] rounded-full flex items-center justify-center"><div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#3a8dff] rounded" /></div>
                      ) : (
                        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-500 rounded-full" />
                      )}
                    </button>
                  </div>
                ))}
              </div>

              {/* Row 3: Bottom text labels */}
              <div className="flex justify-between w-full">
                {detailedTimelineData.map((phase) => (
                  <div key={`${phase.phase}-bottom`} className="w-1/4 text-center">
                    <div className="min-h-16 mt-2 sm:mt-3 flex items-start justify-center">
                      <div className="font-sans font-extrabold text-white text-[9px] sm:text-xs md:text-sm text-center tracking-normal sm:tracking-widest break-words">
                        {phase.title}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <section className="flex flex-col items-start gap-8 w-full mt-0 sm:mt-8 px-0 sm:px-4 md:px-7">
              <div className="flex flex-col items-start gap-6 w-full">
                <div className="flex flex-wrap items-start gap-4">
                  {activePhaseData.infoBadges.map((badge) => (
                    <div key={badge.text} className="flex items-center justify-center gap-2 pl-6 pr-7 py-2.5 bg-[#0c1c3380] rounded-[100px] border border-solid border-[#ffffff1a]"><Image width={20} height={20} className="w-5 h-5" alt="Icon" src={badge.icon} /><div className="w-fit bg-[linear-gradient(90deg,rgba(153,196,255,1)_0%,rgba(255,255,255,1)_100%)] [-webkit-background-clip:text] bg-clip-text [-webkit-text-fill-color:transparent] [text-fill-color:transparent] font-bold text-transparent text-sm tracking-[1.40px] leading-5 whitespace-nowrap">{badge.text}</div></div>
                  ))}
                </div>
                
                {/* ==================================================================== */}
                {/* START OF THE FIX */}
                {/* ==================================================================== */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between w-full gap-4">
                  <h2 className="flex-1 min-w-0 font-semibold text-white text-xl sm:text-2xl tracking-[0] leading-6 text-left">
                    {activePhaseData.title}
                  </h2>
                  <Link href="/course/deep-cloud" className="w-full sm:w-auto flex-shrink-0">
                    <Button variant="outline" className="w-full sm:w-auto h-auto px-5 py-3 rounded-md border border-solid border-white bg-transparent flex items-center justify-center gap-3 text-white hover:bg-white/10 hover:text-white">
                      <span className="font-bold text-sm tracking-[1.40px]">KNOW MORE</span>
                      <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.49744 1.16699L13.3308 6.00033V8.00033L8.49744 12.8337L7.08077 11.417L9.93077 8.58366H1.33077V6.41699H9.93077L7.08077 3.58366L8.49744 1.16699Z" fill="currentColor" /></svg>
                    </Button>
                  </Link>
                </div>
                {/* ==================================================================== */}
                {/* END OF THE FIX */}
                {/* ==================================================================== */}

                <p className="w-full opacity-60 font-medium text-white text-sm tracking-widest leading-5 text-left">{activePhaseData.description}</p>
              </div>
              <div className="grid w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {activePhaseData.topics.map((topic) => (
                  <Badge 
                    key={topic} 
                    variant="outline" 
                    className="w-full h-full justify-center text-center px-5 py-4 rounded-[100px] border border-solid border-[#ffffff1a] bg-transparent hover:bg-[#ffffff0a]"
                  >
                    <span className="font-medium text-white text-sm tracking-[1.40px] leading-5">
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
};
const PageFooter = () => (
  <footer style={{ background: '#4187F7' }} className="font-sans text-white flex items-center justify-center p-4 sm:p-8">
    <ContentContainer className="h-full flex flex-col justify-center">
      <div className="flex flex-col lg:flex-row justify-between items-start py-8 border-b border-white/50 gap-8">
        <div className="flex flex-col gap-8">
          {/* Replace the text with your SVG logo */}
          <img src="/logo.svg" alt="AESTR Alpha Logo" className="h-8 w-auto" /> {/* Adjust height and width as needed */}
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
          <p className="font-normal text-xs leading-5 tracking-wider">AESTR ALPHA TURNS YOUR DEGREE INTO A 10-15 LPA CAREER WITH HANDS-ON TRAINING, REAL PROJECTS, AND MONTHLY PLACEMENTS.</p>
          <h2 className="text-xl sm:text-2xl font-bold leading-tight">CONFUSED ABOUT YOUR PATH? TALK TO AN OUR AI ENGINEER, NOT A COUNSELLOR.</h2>
          <Button
            variant="secondary"
            className="bg-white text-black hover:bg-gray-200 px-6 py-2 rounded-md mt-2 h-16 w-full max-w-[213px] sm:w-[213px]"
          >
            <div className="flex items-center justify-between w-full">
              <span
                style={{
                  fontFamily: '"Plus Jakarta Sans", sans-serif',
                  fontWeight: 800,
                  fontSize: '14px',
                  lineHeight: '20px',
                  letterSpacing: '10%',
                  textTransform: 'uppercase',
                  color: '#3A8DFF',
                }}
              >
                TALK NOW
              </span>
              <Image
                width={20} height={20}
                src="/arrowright.svg"
                alt="Arrow"
                className="w-5 h-5"
              />
            </div>
          </Button>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row justify-between items-center text-center sm:text-left pt-6 text-xs font-normal gap-4">
        <p>2025 AESTR ALPHA</p>
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
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
  return (
    <div className="bg-black w-full min-h-screen font-sans">
      <div className="bg-black overflow-x-hidden relative w-full min-h-screen">
        <PageHeader />
        <main>
          <HeroSection />
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