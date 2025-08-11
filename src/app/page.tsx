import React from "react";
import { Badge } from "../components/badge";
import { Button } from "../components/button";
import { Card, CardContent } from "../components/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "../components/select";

export const AestrAlpha = (): JSX.Element => {
  // ===========================================
  // DATA SECTION - All component data centralized
  // ===========================================

  // Timeline phase data - Removed 'position' as we'll use Flexbox
  const timelinePhases = [
    {
      phase: "PHASE 1",
      duration: "(WEEKS 1-8)",
      title: "CORE INFRASTRUCTURE & AUTOMATION",
      active: true,
    },
    {
      phase: "PHASE 2",
      duration: "(WEEKS 9-12)",
      title: "CONTAINERS & ORCHESTRATION AT SCALE",
      active: true,
    },
    {
      phase: "PHASE 3",
      duration: "(WEEKS 13-16)",
      title: "ADVANCED & MULTI-CLOUD STRATEGIES",
      active: true,
      isHighlighted: true,
    },
    {
      phase: "PHASE 4",
      duration: "(MONTHS 5+)",
      title: "CAREER LAUNCH & PLACEMENT",
      active: false,
    },
  ];

  // Navigation items
  const navItems = ["ALUMNI", "PROGRAMS", "RESOURCES", "FAQS"];

  // Stats data for hero section
  const stats = [
    {
      value: "300+",
      label: "RESOURCES AVAILABLE",
    },
    {
      value: "12K+",
      label: "TOTAL DOWNLOADS",
    },
    {
      value: "10K+",
      label: "ACTIVE USERS",
    },
  ];

  // Course data
  const courses = [
    {
      id: "cloud",
      featured: true,
      badge: "MOST POPULAR",
      title: "DEEP CLOUD & MULTI-CLOUD ENGINEERING",
      description:
        "IN THIS PROGRAM, YOU WILL BUILD A SCALABLE, MULTI-REGION WEB APPLICATION WITH AUTOMATED FAILOVER, A CI/CD PIPELINE USING INFRASTRUCTURE AS CODE (IAC) TO MANAGE PRODUCTION ENVIRONMENTS, AND A SERVERLESS DATA PROCESSING WORKFLOW FOR REAL-TIME ANALYTICS.",
      duration: "6-MONTH INTENSIVE TRACK",
      projects: "4+ LIVE PRODUCTION PROJECTS",
      image: "/rectangle-178.png",
      size: "large",
    },
    {
      id: "robotics",
      featured: false,
      badge: "LATEST",
      title: "ROBOTIC & ROS ENGINEERING",
      description:
        "GIVE MACHINES INTELLIGENCE. DESIGN, SIMULATE, AND DEPLOY THE SOFTWARE THAT MAKES ROBOTS SEE, NAVIGATE, AND ACT IN THE REAL WORLD.",
      duration: "4-MONTH",
      projects: "3+ (SIMULATION + HARDWARE)",
      image: "/demo2.svg",
      size: "medium",
    },
    {
      id: "fintech",
      featured: false,
      title: "FINTECH ENGINEERING",
      description: "BUILD THE FUTURE OF MONEY.",
      image: null,
      icon: "/cpu.svg",
      size: "small",
    },
    {
      id: "uiux",
      featured: false,
      title: "UI/UX WITH BLENDER",
      size: "mini",
    },
    {
      id: "riscv",
      featured: false,
      title: "RISC-V CPU DESIGN & VERIFICATION",
      size: "mini",
    },
  ];

  // Info badges for main content section
  const infoBadges = [
    {
      icon: "/comp.svg",
      text: "19 LIVE CLASSES",
    },
    {
      icon: "/file.svg",
      text: "2+ PROJECTS",
    },
  ];

  // Topic badges for main content section
  const topicBadges = [
    "SINGULAR VALUE DECOMPOSITION",
    "INDEPENDENT COMPONENT ANALYSIS",
    "T-DISTRIBUTED STOCHASTIC NEIGHBOR EMBEDDING",
    "MULTIDIMENSIONAL SCALING",
    "LINEAR DISCRIMINANT ANALYSIS",
    "FACTOR ANALYSIS",
    "AUTOENCODERS",
    "KERNEL PCA",
    "NON-NEGATIVE MATRIX FACTORIZATION",
    "GAUSSIAN MIXTURE MODELS",
    "LATENT DIRICHLET ALLOCATION",
    "RANDOM PROJECTION",
    "UNIFORM MANIFOLD APPROXIMATION AND PROJECTION",
    "ISOMAP",
    "LAPLACIAN EIGENMAPS",
    "SELF-ORGANIZING MAPS",
  ];

  // Select options for popular courses section
  const selectOptions = [
    {
      id: "course",
      label: "SELECT THE COURSE",
      icon: "/projectwhite.svg",
      placeholder: "Select a course",
      options: [],
    },
    {
      id: "difficulty",
      label: "SELECT DIFFICULTY",
      icon: "/graph.svg",
      placeholder: "Select difficulty",
      options: [],
    },
  ];

  // Common glass card style
  const glassCardStyle =
    "rounded-xl border-[none] backdrop-blur-[50px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(50px)_brightness(100%)] bg-[linear-gradient(115deg,rgba(255,255,255,0.1)_0%,rgba(255,255,255,0)_100%)] before:content-[''] before:absolute before:inset-0 before:p-px before:rounded-xl before:[background:linear-gradient(91deg,rgba(255,255,255,0.2)_0%,rgba(255,255,255,0.13)_35%,rgba(255,255,255,0)_65%,rgba(255,255,255,0.2)_100%)] before:[-webkit-mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)] before:[-webkit-mask-composite:xor] before:[mask-composite:exclude] before:z-[1] before:pointer-events-none";

  // ===========================================
  // RENDER SECTION - Component JSX
  // ===========================================

  return (
    <div className="bg-black w-full min-h-screen">
      <div className="bg-black overflow-hidden relative w-full min-h-screen">
        
        {/* ===========================================
            HEADER/NAVIGATION SECTION
            =========================================== */}
        <header className="relative z-10 pt-9 px-[86px] flex items-center justify-between w-full">
          <img className="w-[219px] h-7" alt="Logo" src="/logo.svg" />

          <div className="flex items-center gap-9">
            <nav className="flex items-center gap-9">
              {navItems.map((item, index) => (
                <button
                  key={index}
                  className="font-alpha-secondary-1 font-[number:var(--alpha-secondary-1-font-weight)] text-white text-[length:var(--alpha-secondary-1-font-size)] tracking-[var(--alpha-secondary-1-letter-spacing)] leading-[var(--alpha-secondary-1-line-height)] whitespace-nowrap [font-style:var(--alpha-secondary-1-font-style)]"
                >
                  {item}
                </button>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                className="px-6 py-5 rounded-md border border-solid border-white bg-transparent"
              >
                <span className="font-['Plus_Jakarta_Sans',Helvetica] font-bold text-white text-sm tracking-[1.40px]">
                  LOGIN
                </span>
              </Button>

              <Button className="px-6 py-5 rounded-md bg-[#3a8dff]">
                <span className="font-['Plus_Jakarta_Sans',Helvetica] font-bold text-white text-sm tracking-[1.40px]">
                  GET IN TOUCH
                </span>
              </Button>
            </div>
          </div>
        </header>

        {/* ===========================================
            MAIN CONTENT AREA
            =========================================== */}
        <main>
          
          {/* ===========================================
              HERO/TIMELINE SECTION
              =========================================== */}
          <section className="relative w-full mt-[180px]">
            <img
              className="absolute w-[599px] h-[1350px] top-[47px] left-0 pointer-events-none"
              alt="Left Circle"
              src="/Leftcircle.svg"
            />
            {/* Flex container for content and image */}
            <div className="relative w-full max-w-[1269px] mx-auto flex items-center justify-between gap-12 px-8 md:px-12">
              {/* Hero Content */}
              <div className="flex flex-col w-full max-w-[656px] items-start gap-[60px] relative z-10">
                <div className="flex flex-col items-start gap-12 w-full">
                  <div className="flex flex-col items-start gap-8">
                    <div className="inline-flex items-center justify-center gap-2.5 px-4 py-3 bg-[#0c1c33] rounded-[100px]">
                      <span className="bg-[linear-gradient(90deg,rgba(153,196,255,1)_0%,rgba(255,255,255,1)_100%)] [-webkit-background-clip:text] bg-clip-text [-webkit-text-fill-color:transparent] [text-fill-color:transparent] [font-family:'Plus_Jakarta_Sans',Helvetica] font-bold text-transparent text-sm tracking-[1.40px] leading-5 whitespace-nowrap">
                        UPGRADE YOUR SKILLS. LAND HIGH-IMPACT ROLES
                      </span>
                    </div>

                    <h2 className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-white text-[64px] tracking-[1.28px] leading-[76.8px]">
                      Have The Degree, But Not The Career?
                    </h2>
                  </div>

                  <p className="opacity-80 [font-family:'Plus_Jakarta_Sans',Helvetica] font-medium text-white text-lg tracking-[0.36px] leading-6 max-w-[636px]">
                    Aestr Alpha Turns Your Degree Into A 10–15 Lpa Career With 9–9
                    Hands-on Training, Real Industry Projects, And Monthly Placement
                    Drives Into High-impact Companies.
                  </p>
                </div>

                <Button className="w-[200px] px-6 py-5 bg-[#3a8dff] rounded-md hover:bg-[#3a8dff]/90">
                  <span className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-bold text-white text-sm tracking-[1.40px] leading-[normal] whitespace-nowrap">
                    GET IN TOUCH
                  </span>
                </Button>

                <div className="flex items-start gap-12">
                  {stats.map((stat, index) => (
                    <Card key={index} className="bg-transparent border-none">
                      <CardContent className="flex flex-col items-start gap-[18px] p-0">
                        <span className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#3a8dff] text-4xl tracking-[0.72px] leading-[39.6px] whitespace-nowrap">
                          {stat.value}
                        </span>
                        <span className="opacity-60 [font-family:'Plus_Jakarta_Sans',Helvetica] font-medium text-white text-sm tracking-[1.40px] leading-5 whitespace-nowrap">
                          {stat.label}
                        </span>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Hero Image */}
              <div className="w-full max-w-[500px] flex-shrink-0 relative z-10">
                <img
                  className="w-full h-auto"
                  alt="Group"
                  src="/main.svg"
                />
              </div>
            </div>
          </section>

          {/* ===========================================
              POPULAR COURSES SECTION
              =========================================== */}
          <section className="flex flex-col w-full max-w-[1268px] items-center gap-[60px] mx-auto mt-[200px]">
            <h2 className="relative [font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-white text-5xl text-center tracking-[0.96px] leading-[52.8px]">
              OUR POPULAR COURSES
            </h2>

            <div className="relative w-full h-[880px]">
              {/* Large featured course card */}
              <Card className={`relative w-full h-[431px] ${glassCardStyle}`}>
                <CardContent className="p-0 h-full">
                  <div className="absolute w-[530px] h-[407px] top-3 left-3 bg-[url(/demo1.svg)] bg-[100%_100%]">
                    <Badge className="absolute top-5 left-5 bg-[#ffffff4c] rounded-sm font-bold text-white text-xs tracking-[1.20px] leading-5">
                      MOST POPULAR
                    </Badge>
                  </div>

                  <div className="flex flex-col w-[606px] items-start gap-8 absolute top-[47px] left-[601px]">
                    <div className="inline-flex items-center gap-9 relative flex-[0_0_auto]">
                      <div className="inline-flex items-center gap-2 relative flex-[0_0_auto]">
                        <img
                          className="relative w-5 h-5"
                          alt="Calendar today"
                          src="/calendar_today.svg"
                        />
                        <span className="relative w-fit [font-family:'Plus_Jakarta_Sans',Helvetica] font-medium text-[#3a8dff] text-sm tracking-[1.40px] leading-5 whitespace-nowrap">
                          6-MONTH INTENSIVE TRACK
                        </span>
                      </div>

                      <div className="inline-flex items-center gap-2 relative flex-[0_0_auto]">
                        <img
                          className="relative w-5 h-5"
                          alt="Frame"
                          src="/project.svg"
                        />
                        <span className="relative w-fit [font-family:'Plus_Jakarta_Sans',Helvetica] font-medium text-[#3a8dff] text-sm tracking-[1.40px] leading-5 whitespace-nowrap">
                          4+ LIVE PRODUCTION PROJECTS
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col items-start gap-8 relative self-stretch w-full flex-[0_0_auto]">
                      <h3 className="relative self-stretch mt-[-1.00px] [font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-white text-[28px] tracking-[0] leading-[30.8px]">
                        DEEP CLOUD & MULTI-CLOUD ENGINEERING
                      </h3>

                      <p className="relative w-[582px] opacity-60 [font-family:'Plus_Jakarta_Sans',Helvetica] font-medium text-white text-sm tracking-[1.40px] leading-5">
                        IN THIS PROGRAM, YOU WILL BUILD A SCALABLE, MULTI-REGION WEB
                        APPLICATION WITH AUTOMATED FAILOVER, A CI/CD PIPELINE USING
                        INFRASTRUCTURE AS CODE (IAC) TO MANAGE PRODUCTION
                        ENVIRONMENTS, AND A SERVERLESS DATA PROCESSING WORKFLOW FOR
                        REAL-TIME ANALYTICS.
                      </p>
                    </div>
                  </div>

                  <div className="flex w-[646px] items-center gap-4 absolute top-[338px] left-[601px]">
                    <Button
                      variant="outline"
                      className="flex h-16 items-center justify-between pl-7 pr-6 py-2.5 relative flex-1 grow rounded-md border border-solid border-[#ffffffcc] bg-transparent"
                    >
                      <span className="relative w-fit [font-family:'Plus_Jakarta_Sans',Helvetica] font-extrabold text-[#ffffffcc] text-sm tracking-[1.40px] leading-5 whitespace-nowrap">
                        BROCHURE
                      </span>
                      <img
                        className="relative w-6 h-6"
                        alt="Frame"
                        src="/download.svg"
                      />
                    </Button>

                    <Button className="flex h-16 items-center justify-between pl-7 pr-5 py-2.5 relative flex-1 grow bg-[#3a8dff] rounded-md">
                      <span className="relative w-fit [font-family:'Plus_Jakarta_Sans',Helvetica] font-extrabold text-white text-sm tracking-[1.40px] leading-5 whitespace-nowrap">
                        APPLY NOW
                      </span>
                      <img
                        className="relative w-6 h-6"
                        alt="Frame"
                        src="/arrow.svg"
                      />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Medium robotics course card */}
              <Card
                className={`absolute w-[790px] h-[336px] top-[447px] left-0 ${glassCardStyle}`}
              >
                <CardContent className="p-0 h-full">
                  <div className="absolute w-[280px] h-[312px] top-3 left-3 bg-[url(/demo2.svg)] bg-[100%_100%]">
                    <Badge className="absolute top-4 left-4 bg-[#ffffff4c] rounded-sm font-bold text-white text-xs tracking-[1.20px] leading-5">
                      LATEST
                    </Badge>
                  </div>

                  <div className="inline-flex items-center gap-9 absolute top-[41px] left-[327px]">
                    <div className="inline-flex items-center gap-2 relative flex-[0_0_auto]">
                      <img
                        className="relative w-5 h-5"
                        alt="Calendar today"
                        src="/calendar_today.svg"
                      />
                      <span className="relative w-fit [font-family:'Plus_Jakarta_Sans',Helvetica] font-medium text-[#3a8dff] text-sm tracking-[1.40px] leading-5 whitespace-nowrap">
                        4-MONTH
                      </span>
                    </div>

                    <div className="inline-flex items-center gap-2 relative flex-[0_0_auto]">
                      <img
                        className="relative w-5 h-5"
                        alt="Frame"
                        src="/project.svg"
                      />
                      <span className="relative w-fit [font-family:'Plus_Jakarta_Sans',Helvetica] font-medium text-[#3a8dff] text-sm tracking-[1.40px] leading-5 whitespace-nowrap">
                        3+ (SIMULATION + HARDWARE)
                      </span>
                    </div>
                  </div>

                  <h3 className="absolute top-[85px] left-[327px] [font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-white text-2xl tracking-[0] leading-[26.4px] whitespace-nowrap">
                    ROBOTIC & ROS ENGINEERING
                  </h3>

                  <p className="absolute w-[387px] top-[127px] left-[327px] opacity-60 font-alpha-secondary-1 font-[number:var(--alpha-secondary-1-font-weight)] text-white text-[length:var(--alpha-secondary-1-font-size)] tracking-[var(--alpha-secondary-1-letter-spacing)] leading-[var(--alpha-secondary-1-line-height)] [font-style:var(--alpha-secondary-1-font-style)]">
                    GIVE MACHINES INTELLIGENCE. DESIGN, SIMULATE, AND DEPLOY THE
                    SOFTWARE THAT MAKES ROBOTS SEE, NAVIGATE, AND ACT IN THE REAL
                    WORLD.
                  </p>

                  <div className="flex w-[442px] items-center gap-4 absolute top-[251px] left-[327px]">
                    <Button
                      variant="outline"
                      className="flex h-16 items-center justify-between pl-7 pr-6 py-2.5 relative flex-1 grow rounded-md border border-solid border-[#ffffffcc] bg-transparent"
                    >
                      <span className="relative w-fit [font-family:'Plus_Jakarta_Sans',Helvetica] font-extrabold text-[#ffffffcc] text-sm tracking-[1.40px] leading-5 whitespace-nowrap">
                        BROCHURE
                      </span>
                      <img
                        className="relative w-6 h-6"
                        alt="Frame"
                        src="/download.svg"
                      />
                    </Button>

                    <Button className="flex h-16 items-center justify-between pl-7 pr-5 py-2.5 relative flex-1 grow bg-[#3a8dff] rounded-md">
                      <span className="relative w-fit [font-family:'Plus_Jakarta_Sans',Helvetica] font-extrabold text-white text-sm tracking-[1.40px] leading-5 whitespace-nowrap">
                        APPLY NOW
                      </span>
                      <img
                        className="relative w-6 h-6"
                        alt="Frame"
                        src="/arrow.svg"
                      />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Small fintech course card */}
              <Card
                className={`absolute w-[462px] h-[336px] top-[447px] left-[806px] ${glassCardStyle}`}
              >
                <CardContent className="p-0 h-full">
                  <img
                    className="absolute w-[76px] h-[76px] top-[43px] left-[19px]"
                    alt="Cpu"
                    src="/Cpu.svg"
                  />

                  <h3 className="absolute top-[167px] left-[19px] [font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-white text-2xl tracking-[0] leading-[26.4px] whitespace-nowrap">
                    FINTECH ENGINEERING
                  </h3>

                  <p className="absolute top-[209px] left-[19px] opacity-60 font-alpha-secondary-1 font-[number:var(--alpha-secondary-1-font-weight)] text-white text-[length:var(--alpha-secondary-1-font-size)] tracking-[var(--alpha-secondary-1-letter-spacing)] leading-[var(--alpha-secondary-1-line-height)] whitespace-nowrap [font-style:var(--alpha-secondary-1-font-style)]">
                    BUILD THE FUTURE OF MONEY.
                  </p>

                  <div className="flex w-[422px] items-center gap-4 absolute top-[251px] left-[19px]">
                    <Button
                      variant="outline"
                      className="flex h-16 items-center justify-between pl-7 pr-6 py-2.5 relative flex-1 grow rounded-md border border-solid border-[#ffffffcc] bg-transparent"
                    >
                      <span className="relative w-fit [font-family:'Plus_Jakarta_Sans',Helvetica] font-extrabold text-[#ffffffcc] text-sm tracking-[1.40px] leading-5 whitespace-nowrap">
                        BROCHURE
                      </span>
                      <img
                        className="relative w-6 h-6"
                        alt="Frame"
                        src="/download.svg"
                      />
                    </Button>

                    <Button className="flex h-16 items-center justify-between pl-7 pr-5 py-2.5 relative flex-1 grow bg-[#3a8dff] rounded-md">
                      <span className="relative w-fit [font-family:'Plus_Jakarta_Sans',Helvetica] font-extrabold text-white text-sm tracking-[1.40px] leading-5 whitespace-nowrap">
                        APPLY NOW
                      </span>
                      <img
                        className="relative w-6 h-6"
                        alt="Frame"
                        src="/arrow.svg"
                      />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Mini course cards */}
              <Card
                className={`absolute w-[462px] h-[78px] top-[799px] left-0 ${glassCardStyle}`}
              >
                <CardContent className="p-0 h-full">
                  <h3 className="absolute top-[26px] left-[35px] [font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-white text-xl tracking-[0] leading-6 whitespace-nowrap">
                    UI/UX WITH BLENDER
                  </h3>
                  <div className="absolute w-[30px] h-[30px] top-6 left-[404px] bg-[#3a8dff] rounded-[15px]">
                    <img
                      className="absolute w-3.5 h-3.5 top-2 left-2"
                      alt="Frame"
                      src="/arrow.svg"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card
                className={`absolute w-[790px] h-[78px] top-[799px] left-[478px] ${glassCardStyle}`}
              >
                <CardContent className="p-0 h-full">
                  <h3 className="absolute top-[26px] left-[35px] [font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-white text-xl tracking-[0] leading-6 whitespace-nowrap">
                    RISC-V CPU DESIGN & VERIFICATION
                  </h3>
                  <div className="absolute w-[30px] h-[30px] top-6 left-[732px] bg-[#3a8dff] rounded-[15px]">
                    <img
                      className="absolute w-3.5 h-3.5 top-2 left-2"
                      alt="Frame"
                      src="/arrow.svg"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* ===========================================
              COURSE LEARNING TIMELINE SECTION (REFACTORED)
              =========================================== */}
          <section className="relative w-full mt-32 mb-32">
            <div className="relative w-full ">
              {/* Background elements */}
              <div className="absolute w-[824px] h-[824px] top-0 right-1/2 translate-x-1/2 rotate-90 opacity-70">
                <div className="relative w-[867px] h-[805px] top-[41px] left-[-22px]">
                  
                  <div className="absolute w-[543px] h-[543px] top-[99px] left-[162px] rounded-[271.44px] border-[7.54px] border-solid border-white rotate-[-120deg] blur-[22.62px] opacity-80" />
                </div>
              </div>

              {/* Main content container with glass effect */}
              <div className={`relative mx-auto w-full max-w-[1269px] p-8 md:p-12 ${glassCardStyle}`}>
                {/* Timeline heading */}
                <h2 className="text-center mb-8 font-['Plus_Jakarta_Sans',Helvetica] font-semibold text-white text-4xl md:text-5xl tracking-[0.96px] leading-[1.2]">
                  COURSE LEARNINGS TIMELINE
                </h2>

                {/* Dropdowns */}
                <div className="flex flex-col md:flex-row w-full items-center gap-5 relative px-4 md:px-[60px] my-8">
                  {selectOptions.map((option) => (
                    <div
                      key={option.id}
                      className="w-full md:flex-1 rounded-md overflow-hidden relative
                        before:content-[''] before:absolute before:inset-0 before:p-px before:rounded-md 
                        before:[background:linear-gradient(91deg,rgba(255,255,255,0.2)_0%,rgba(255,255,255,0.13)_35%,rgba(255,255,255,0)_65%,rgba(255,255,255,0.2)_100%)] 
                        before:[-webkit-mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)] 
                        before:[-webkit-mask-composite:xor] before:[mask-composite:exclude] 
                        before:z-[1] before:pointer-events-none"
                    >
                      <Select>
                        <SelectTrigger
                          className="flex items-center justify-between pl-5 pr-4 py-4 w-full border-none
                            backdrop-blur-[5px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(5px)_brightness(100%)]
                            bg-[linear-gradient(157deg,rgba(255,255,255,0.1)_0%,rgba(255,255,255,0)_100%)]
                            focus:ring-0 focus:ring-offset-0"
                        >
                          <div className="inline-flex items-center gap-3 relative">
                            <img className="w-6 h-6" alt="Icon" src={option.icon} />
                            <div className="opacity-60 font-alpha-secondary-1 font-[number:var(--alpha-secondary-1-font-weight)] text-white text-[length:var(--alpha-secondary-1-font-size)] tracking-[var(--alpha-secondary-1-letter-spacing)] leading-[var(--alpha-secondary-1-line-height)] whitespace-nowrap [font-style:var(--alpha-secondary-1-font-style)]">
                              {option.label}
                            </div>
                          </div>
                          <img className="w-8 h-8" alt="Dropdown" src="/dropdown.svg" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="placeholder">{option.placeholder}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  ))}
                </div>
                
                {/* Timeline visualization */}
                <div className="relative w-full px-4 md:px-12 py-16">
                    {/* Background Line */}
                    <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full h-0.5 bg-white/20"></div>
                    {/* Active Progress Line */}
                    <div className="absolute top-1/2 left-0 -translate-y-1/2 w-2/3 h-0.5 bg-[#3a8dff]"></div>

                    {/* Phase Markers */}
                    <div className="relative flex justify-between items-center">
                        {timelinePhases.map((phase, index) => (
                        <div
                            key={index}
                            className={`flex flex-col items-center text-center w-1/4 ${phase.active ? "" : "opacity-40"}`}
                        >
                            {/* Phase Text */}
                            <div className="flex flex-col items-center gap-1 mb-3">
                                <div className="font-['Plus_Jakarta_Sans',Helvetica] font-extrabold text-white text-xs md:text-sm tracking-widest">
                                    {phase.phase}
                                </div>
                                <div className="font-['Plus_Jakarta_Sans',Helvetica] font-extrabold text-white text-xs md:text-sm tracking-widest">
                                    {phase.duration}
                                </div>
                            </div>

                            {/* Marker Dot */}
                            {phase.isHighlighted ? (
                            <div className="relative w-8 h-8 bg-[#3a8dff] rounded-2xl flex items-center justify-center">
                                <div className="absolute w-full h-full bg-[#ffffff4c] rounded-2xl blur-[5px] opacity-40" />
                                <div className="absolute w-2 h-2 bg-white rounded" />
                            </div>
                            ) : (
                            <div className="relative w-8 h-8 bg-black rounded-2xl border border-solid border-[#3a8dff] flex items-center justify-center">
                                <div className={`w-5 h-5 ${phase.active ? "bg-[#3a8dff4c]" : "bg-[#ffffff4c]"} rounded-full flex items-center justify-center`}>
                                <div className={`w-2 h-2 ${phase.active ? "bg-[#3a8dff]" : "bg-white/40"} rounded`}/>
                                </div>
                            </div>
                            )}

                             {/* Title Text */}
                            <div className="mt-3 font-['Plus_Jakarta_Sans',Helvetica] font-extrabold text-white text-xs md:text-sm text-center tracking-widest">
                                {phase.title}
                            </div>
                        </div>
                        ))}
                    </div>
                </div>

                {/* ===========================================
                    MAIN CONTENT SECTION (Phase Details)
                    =========================================== */}
                <section className="flex flex-col items-start gap-8 w-full mt-8 px-4 md:px-7">
                    <div className="flex flex-col items-start gap-6 w-full">
                    <div className="flex flex-wrap items-start gap-4">
                        {infoBadges.map((badge, index) => (
                        <div
                            key={`info-badge-${index}`}
                            className="flex items-center justify-center gap-2 pl-6 pr-7 py-2.5 bg-[#0c1c3380] rounded-[100px] border border-solid border-[#ffffff1a]"
                        >
                            <img className="w-5 h-5" alt="Icon" src={badge.icon} />
                            <div className="w-fit bg-[linear-gradient(90deg,rgba(153,196,255,1)_0%,rgba(255,255,255,1)_100%)] [-webkit-background-clip:text] bg-clip-text [-webkit-text-fill-color:transparent] [text-fill-color:transparent] [font-family:'Plus_Jakarta_Sans',Helvetica] font-bold text-transparent text-sm tracking-[1.40px] leading-5 whitespace-nowrap">
                            {badge.text}
                            </div>
                        </div>
                        ))}
                    </div>

                    <h2 className="w-fit [font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-white text-2xl tracking-[0] leading-6 whitespace-nowrap">
                        CORE INFRASTRUCTURE & AUTOMATION
                    </h2>

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
                        <Badge
                        key={`topic-badge-${index}`}
                        variant="outline"
                        className="px-5 py-4 rounded-[100px] border border-solid border-[#ffffff1a] bg-transparent hover:bg-[#ffffff0a]"
                        >
                        <span className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-medium text-white text-sm tracking-[1.40px] leading-5 whitespace-nowrap">
                            {topic}
                        </span>
                        </Badge>
                    ))}
                    </div>
                </section>
              </div>
            </div>
          </section>

          {/* ===========================================
              BOTTOM DECORATIVE ELEMENT
              =========================================== */}
          <div className="relative w-full h-0">
            <div className="absolute w-[936px] h-[936px] left-[-382px] -rotate-180">
              <div className="relative w-[896px] h-[949px] top-[-7px] left-[-7px]">
                <img
                  className="absolute w-[561px] h-[949px] top-0 left-0 rotate-180"
                  alt="Ellipse"
                  src="/Bottomcircle.svg"
                />
                <div className="absolute w-[617px] h-[617px] top-[166px] left-[166px] rounded-[308.34px] border-[7.54px] border-solid border-white rotate-[-120deg] blur-[22.62px] opacity-80" />
              </div>
            </div>
          </div>
        </main>
        <footer style={{ background: '#4187F7' }} className="font-['Plus_Jakarta_Sans',Helvetica] text-white">
          <div className="w-4/5 mx-auto pt-12 pb-8">
            <div className="flex justify-between items-start pb-8 border-b border-white/50">
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

            <div className="flex justify-between items-center pt-6 text-xs font-normal">
              <p>2025 AESTR ALPHA</p>
              <div className="flex gap-8">
                <a href="#" className="hover:underline">PRIVACY POLICY</a>
                <a href="#" className="hover:underline">TERMS & CONDITIONS</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default AestrAlpha;