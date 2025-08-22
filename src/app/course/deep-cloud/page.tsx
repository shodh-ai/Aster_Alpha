// src/app/course/deep-cloud/page.tsx

"use client";

import { ArrowRightIcon, DownloadIcon, MenuIcon, XIcon } from "lucide-react";
import React, { JSX, useEffect, useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "../../../components/badge";
import { Button } from "../../../components/button";
import { Card, CardContent } from "../../../components/card";
import { Separator } from "../../../components/separator";
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";


// ==============================================================================
// SHARED LAYOUT COMPONENTS (Header, Footer, Container)
// ==============================================================================

const navItems = ["ALUMNI", "PROGRAMS", "RESOURCES", "FAQS"];

const ContentContainer = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
    <div className={`w-full max-w-[91%] sm:max-w-[88%] mx-auto px-4 ${className}`}>
        {children}
    </div>
);

const PageHeader = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="relative z-20 pt-9 w-full">
            <ContentContainer className="flex items-center justify-between gap-8">
                <Link href="/" aria-label="Go to homepage">
                    <Image width={219} height={40} className="w-[180px] sm:w-[219px] h-auto" alt="Aestr Alpha Logo" src="/logo.svg" />
                </Link>
                <div className="hidden lg:flex flex-col lg:flex-row items-center gap-9">
                    <nav className="flex items-center gap-9">
                        {navItems.map((item, index) => (
                            <button key={index} className="font-sans font-medium text-white text-base whitespace-nowrap">{item}</button>
                        ))}
                    </nav>
                    <div className="flex items-center gap-3">
                        <Button variant="outline" className="w-[99px] h-[50px] rounded-[6px] border border-solid border-white bg-transparent flex items-center justify-center">
                            <span className="font-sans font-bold text-white text-sm tracking-[1.40px]">LOGIN</span>
                        </Button>
                        <Button className="w-[161px] h-[50px] px-6 rounded-[6px] bg-[#3a8dff] flex items-center justify-center">
                            <span className="font-sans font-bold text-white text-sm tracking-[1.40px]">GET IN TOUCH</span>
                        </Button>
                    </div>
                </div>
                <div className="lg:hidden">
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white">
                        {isMenuOpen ? <XIcon className="w-8 h-8" /> : <MenuIcon className="w-8 h-8" />}
                    </button>
                </div>
            </ContentContainer>
            {isMenuOpen && (
                <div className="lg:hidden absolute top-full left-0 w-full bg-black/90 backdrop-blur-md z-30 mt-4">
                    <ContentContainer className="flex flex-col items-center gap-6 py-8">
                        <nav className="flex flex-col items-center gap-6">
                            {navItems.map((item, index) => (
                                <button key={index} className="font-sans font-medium text-white text-lg">{item}</button>
                            ))}
                        </nav>
                        <div className="flex flex-col items-center gap-4 w-full">
                            <Button variant="outline" className="w-full h-[50px] rounded-[6px] border border-solid border-white bg-transparent">
                                <span className="font-sans font-bold text-white text-sm tracking-[1.40px]">LOGIN</span>
                            </Button>
                            <Button className="w-full h-[50px] px-6 rounded-[6px] bg-[#3a8dff]">
                                <span className="font-sans font-bold text-white text-sm tracking-[1.40px]">GET IN TOUCH</span>
                            </Button>
                        </div>
                    </ContentContainer>
                </div>
            )}
        </header>
    );
};

const PageFooter = () => (
    <footer style={{ background: '#4187F7' }} className="font-sans text-white flex items-center justify-center p-4 sm:p-8">
      <ContentContainer className="h-full flex flex-col justify-center">
        <div className="flex flex-col lg:flex-row justify-between items-start py-8 border-b border-white/50 gap-8">
          <div className="flex flex-col gap-8">
            {/* ==================================================================== */}
            {/* START OF THE FIX: Replaced <img> with next/image <Image> */}
            {/* ==================================================================== */}
            <Image src="/logo.svg" alt="AESTR Alpha Logo" width={150} height={28} className="h-8 w-auto" />
            {/* ==================================================================== */}
            {/* END OF THE FIX */}
            {/* ==================================================================== */}
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
            <h2 className="text-xl sm:text-2xl font-bold leading-tight">CONFUSED ABOUT YOUR PATH? TALK TO OUR AI ENGINEER, NOT A COUNSELLOR.</h2>
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

// ==============================================================================
// PAGE-SPECIFIC SECTION COMPONENTS
// ==============================================================================

const HeroSection = (): JSX.Element => {
    const programDetails = [
        { label: "PROGRAM DURATION", value: "12 MONTHS" },
        { label: "APPLICATION PROCESS", value: "HIGHLY SELECTIVE" },
        { label: "TIME COMMITMENT", value: "12-15 HRS/WEEK" },
        { label: "LEARNING FORMAT", value: "LIVE CLASS" },
    ];

    return (
        <section className="flex flex-col items-start gap-12 w-full">
            <div className="flex flex-col items-start gap-8">
                <div className="flex flex-wrap items-start gap-4">
                    <div className="inline-flex items-center justify-center gap-2.5 px-4 py-3 bg-[#0c1c33] rounded-[100px]">
                        <span className="bg-[linear-gradient(90deg,rgba(153,196,255,1)_0%,rgba(255,255,255,1)_100%)] [-webkit-background-clip:text] bg-clip-text [-webkit-text-fill-color:transparent] [text-fill-color:transparent] font-bold text-transparent text-sm tracking-[1.40px] leading-5 text-center md:whitespace-nowrap">
                            BUILD PRODUCTION-GRADE CLOUD INFRASTRUCTURE.
                        </span>
                    </div>
                    <div className="inline-flex items-center justify-center gap-2.5 px-4 py-3 bg-[#0c1c33] rounded-[100px]">
                        <span className="bg-[linear-gradient(90deg,rgba(153,196,255,1)_0%,rgba(255,255,255,1)_100%)] [-webkit-background-clip:text] bg-clip-text [-webkit-text-fill-color:transparent] [text-fill-color:transparent] font-bold text-transparent text-sm tracking-[1.40px] leading-5 text-center md:whitespace-nowrap">
                            NEXT BATCH STARTS IN SEPTEMBER
                        </span>
                    </div>
                </div>
                <h1 className="font-semibold text-white text-4xl sm:text-5xl tracking-wide leading-tight">
                    DEEP CLOUD &amp; MULTI-CLOUD ENGINEERING
                </h1>
            </div>
            <Image
                width={1200}
                height={420}
                className="w-full h-auto max-h-[250px] sm:max-h-[420px] object-cover rounded-xl"
                alt="Aircraft in a futuristic hangar, symbolizing cloud infrastructure"
                src="/deep.svg"
            />
            <p className="text-white/60 font-medium text-base tracking-widest leading-relaxed">
                THE TECH LANDSCAPE IS EVOLVING, AND THE DEMAND IS SHIFTING FROM MERE CERTIFICATIONS TO VISIONARY ARCHITECTS WHO CAN DESIGN THE FUTURE. OUR PROGRAM OFFERS A RIGOROUS, FULL-DAY IMMERSION FROM 9 AM TO 9 PM, WHERE YOU WILL DIVE DEEP INTO THE INTRICACIES OF DESIGNING, CONSTRUCTING, AND AUTOMATING ROBUST, SCALABLE INFRASTRUCTURE THAT SUPPORTS LEADING TECH ENTERPRISES. COLLABORATE WITH INDUSTRY EXPERTS AT OUR PARTNER ORGANIZATION, SHODH AI, AND GAIN HANDS-ON EXPERIENCE THROUGH REAL-WORLD PROJECTS. BY THE END OF THIS PROGRAM, YOU WILL HAVE A COMPREHENSIVE PORTFOLIO SHOWCASING YOUR PRODUCTION-READY WORK, READY TO IMPRESS POTENTIAL EMPLOYERS.
            </p>
            <Card className="w-full h-auto rounded-xl border border-[#484848] bg-[#1a1a1a80] backdrop-blur-100 flex items-center">
                <CardContent className="p-6 sm:p-8 w-full">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8 w-full">
                        {programDetails.map((detail, index) => (
                            <React.Fragment key={detail.label}>
                                <div className="flex flex-1 flex-col items-center gap-4 text-center w-full">
                                    <div className="text-white/60 text-sm sm:text-base tracking-widest font-medium leading-5 uppercase">
                                        {detail.label}
                                    </div>
                                    <div className="font-semibold text-white text-lg sm:text-xl tracking-normal leading-6">
                                        {detail.value}
                                    </div>
                                </div>
                                {index < programDetails.length - 1 && (
                                   <>
                                    <Separator orientation="vertical" className="hidden md:block h-12 bg-gray-700" />
                                    <Separator orientation="horizontal" className="block md:hidden w-full bg-gray-700" />
                                   </>
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </section>
    );
};

const WhyChooseProgramSection = (): JSX.Element => {
    const features = [
        { icon: "/project1.svg", title: "REAL-WORLD PROJECTS", description: "GAIN HANDS-ON EXPERIENCE DESIGNING AND AUTOMATING PRODUCTION-GRADE INFRASTRUCTURE WITH INDUSTRY PARTNERS." },
        { icon: "/career1.svg", title: "CAREER LAUNCH", description: "JOIN TARGETED MONTHLY DRIVES CONNECTING YOU DIRECTLY WITH HIGH-GROWTH COMPANIES." },
        { icon: "/step1.svg", title: "STEP-BY-STEP MASTERY", description: "MASTER CLOUD ENGINEERING STEP-BY-STEP, FROM CORE AUTOMATION TO ADVANCED MULTI-CLOUD ARCHITECTURES." },
    ];

    return (
        <section className="flex flex-col w-full items-center gap-12 sm:gap-16 relative">
            <h2 className="w-full text-3xl sm:text-5xl text-center tracking-[0.96px] leading-tight font-semibold text-white">WHY CHOOSE THIS PROGRAM</h2>
            <Card className="w-full bg-[#3a8dff] rounded-xl border-0">
                <CardContent className="p-0 relative">
                    <div className="flex flex-col md:grid md:grid-cols-3">
                        {features.map((feature, index) => (
                            <React.Fragment key={index}>
                                <div className="flex flex-col items-center justify-start text-center p-8 sm:p-12 gap-10">
                                    <Image width={96} height={96} className="w-20 h-20 sm:w-24 sm:h-24" alt="" src={feature.icon} />
                                    <div className="flex flex-col items-center gap-6">
                                        <h3 className="text-xl sm:text-2xl font-semibold text-white tracking-[0] leading-6">{feature.title}</h3>
                                        <p className="font-medium text-white text-sm tracking-[1.40px] leading-5">{feature.description}</p>
                                    </div>
                                </div>
                                {index < features.length - 1 && (
                                    <>
                                        <Separator orientation="vertical" className="hidden md:block absolute top-0 bottom-0 w-px bg-white/20" style={{ left: `${((index + 1) * 100) / 3}%` }} />
                                        <Separator orientation="horizontal" className="block md:hidden w-full bg-white/20" />
                                    </>
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </section>
    );
};

const AlumniLeadSection = (): JSX.Element => {
    const logos = [
        { src: "/citoh.svg", alt: "C.ITOH Logo" }, { src: "/medium.svg", alt: "Medium Logo" }, { src: "/business.svg", alt: "Business Insider Logo" },
        { src: "/forbes.svg", alt: "Forbes Logo" }, { src: "/quatrz.svg", alt: "Quartz Logo" }, { src: "/citoh.svg", alt: "C.ITOH Logo" },
        { src: "/medium.svg", alt: "Medium Logo" }, { src: "/business.svg", alt: "Business Insider Logo" }, { src: "/forbes.svg", alt: "Forbes Logo" },
        { src: "/quatrz.svg", alt: "Quartz Logo" },
    ];

    const [emblaRef] = useEmblaCarousel({ loop: true, align: 'start', slidesToScroll: 1, }, [Autoplay({ delay: 2000, stopOnInteraction: false, stopOnMouseEnter: true })]);

    return (
        <section className="w-full">
            <Card className="h-auto rounded-xl border border-[#2a2a2a] bg-[#1a1a1a]/80 backdrop-blur-md">
                <CardContent className="p-8 md:p-12">
                    <div className="flex flex-col items-center justify-center gap-10">
                        <h3 className="font-sans font-semibold text-center text-lg sm:text-[20px] leading-[24px] tracking-normal text-white/80 uppercase">
                            OUR ALUMNI LEAD IN GLOBAL TECH
                        </h3>
                        <div className="overflow-hidden w-full" ref={emblaRef}>
                            <div className="flex">
                                {logos.map((logo, index) => (
                                    <div key={index} className="flex-[0_0_50%] sm:flex-[0_0_33.33%] md:flex-[0_0_20%] min-w-0 px-4 flex items-center justify-center">
                                        <Image width={100} height={32} className="h-5 sm:h-6 md:h-8 w-auto" alt={logo.alt} src={logo.src} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </section>
    );
};

const CurriculumTimelineSection = (): JSX.Element => {
    const phases = [
        { id: 1, badge: "PHASE 1 (WEEKS 1-8)", title: "THE EVOLUTIONARY INVENTION", description: "This foundational phase is a hands-on immersion into building and automating secure, scalable cloud infrastructure. You will move beyond the console and learn to command the cloud through code.", details: "ADVANCED VPC & NETWORK DESIGN\nIDENTITY AND ACCESS MANAGEMENT (IAM)\nINFRASTRUCTURE AS CODE (IAC) WITH TERRAFORM\nCONFIGURATION MANAGEMENT WITH ANSIBLE\nCI/CD PIPELELINES FOR INFRASTRUCTURE" },
        { id: 2, badge: "PHASE 2 (WEEKS 9-16)", title: "THE TRANSFORMATIVE DEPLOYMENT", description: "This phase focuses on deploying applications and services onto your cloud infrastructure. You'll dive into containerization, orchestration, and continuous integration.", details: "DOCKER AND CONTAINERIZATION\nKUBERNETES FOR ORCHESTRATION\nMONITORING AND LOGGING\nDISASTER RECOVERY PLANNING" },
        { id: 3, badge: "PHASE 3 (WEEKS 17-24)", title: "THE INNOVATIVE INTEGRATION", description: "In this phase, you will integrate advanced services and tools, enhancing application capabilities and user experiences. Focus on serverless architecture and microservices.", details: "SERVERLESS COMPUTING WITH AWS LAMBDA\nAPI GATEWAY AND MICROSERVICES\nDATABASE DESIGN AND OPTIMIZATION\nSECURITY IN THE CLOUD" },
        { id: 4, badge: "PHASE 4 (WEEKS 25-32)", title: "THE MASTERY OF SCALABILITY", description: "The final phase emphasizes optimizing and scaling your cloud solutions to handle increased demand. You will learn about cost management, and advanced networking.", details: "COST OPTIMIZATION STRATEGIES\nADVANCED NETWORKING SOLUTIONS\nCLOUD-NATIVE SECURITY PRACTICES\nFUTURE-PROOFING CLOUD ARCHITECTURE" },
    ];

    const timelineRef = useRef<HTMLDivElement>(null);
    const phaseRefs = useRef<(HTMLDivElement | null)[]>([]);
    const [lineHeight, setLineHeight] = useState(0);
    const [maxLineHeight, setMaxLineHeight] = useState(0);
    const [activePhaseId, setActivePhaseId] = useState(1);

    useLayoutEffect(() => {
        const calculateMaxHeight = () => {
            if (phaseRefs.current.length > 1) {
                const firstPhase = phaseRefs.current[0];
                const lastPhase = phaseRefs.current[phaseRefs.current.length - 1];
                if (firstPhase && lastPhase) {
                    const firstPhaseTop = firstPhase.getBoundingClientRect().top + window.scrollY;
                    const lastPhaseTop = lastPhase.getBoundingClientRect().top + window.scrollY;
                    const height = lastPhaseTop - firstPhaseTop;
                    setMaxLineHeight(height);
                }
            }
        };
        const timeoutId = setTimeout(calculateMaxHeight, 150);
        window.addEventListener('resize', calculateMaxHeight);
        return () => { window.removeEventListener('resize', calculateMaxHeight); clearTimeout(timeoutId); };
    }, [phases.length]);

    useEffect(() => {
        const handleScroll = () => {
            const firstPhaseRef = phaseRefs.current[0];
            if (timelineRef.current && firstPhaseRef && maxLineHeight > 0) {
                const windowHeight = window.innerHeight;
                const activationPoint = windowHeight * 0.5;
                let latestActiveId = 1;
                phaseRefs.current.forEach((phaseRef, index) => {
                    if (phaseRef && phaseRef.getBoundingClientRect().top < activationPoint) {
                        latestActiveId = index + 1;
                    }
                });
                setActivePhaseId(latestActiveId);
                const activePhaseRef = phaseRefs.current[latestActiveId - 1];
                if (activePhaseRef) {
                    const firstPhaseTop = firstPhaseRef.getBoundingClientRect().top + window.scrollY;
                    const activePhaseTop = activePhaseRef.getBoundingClientRect().top + window.scrollY;
                    setLineHeight(activePhaseTop - firstPhaseTop);
                }
            }
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, [maxLineHeight]);
    
    return (
        <section className="flex flex-col w-full items-start gap-12 sm:gap-16 relative">
            <h2 className="font-semibold text-white text-3xl sm:text-5xl tracking-[0.96px] leading-tight">COURSE CURRICULUM</h2>
            <div ref={timelineRef} className="relative w-full">
                <div className="absolute left-[14px] sm:left-[18px] top-2 w-1 bg-white/10 -translate-x-1/2 z-0" style={{ height: `${maxLineHeight}px` }} />
                <div className="absolute left-[14px] sm:left-[18px] top-2 w-1 bg-[#3a8dff] -translate-x-1/2 transition-all duration-500 ease-in-out z-0" style={{ height: `${lineHeight}px` }} />
                {phases.map((phase, index) => (
                    <div key={phase.id} ref={(el) => { phaseRefs.current[index] = el; }} className="relative flex items-start gap-4 sm:gap-6 pb-16 sm:pb-20">
                        <div className="relative w-7 h-7 sm:w-9 sm:h-9 flex-shrink-0 mt-2 z-10">
                             <div className={`w-full h-full rounded-full flex items-center justify-center border-2 transition-colors duration-500 ${phase.id <= activePhaseId ? 'bg-[#3a8dff] border-[#3a8dff]' : 'border-gray-500 bg-black'}`}>
                                <div className="w-2 h-2 sm:w-3 sm:h-3 bg-white rounded-full" />
                            </div>
                        </div>
                        <article className="flex-1 flex flex-col items-start gap-6 sm:gap-7">
                            <Badge variant="outline" className="border-white/20 text-white bg-transparent hover:bg-transparent h-auto w-fit px-4 py-2 rounded-full text-xs sm:text-sm whitespace-nowrap">
                                {phase.badge}
                            </Badge>
                            <h3 className="font-semibold text-white text-2xl sm:text-3xl">{phase.title}</h3>
                            <p className="opacity-60 font-medium text-white text-base tracking-wider leading-relaxed">{phase.description}</p>
                            <ul className="list-disc pl-5 opacity-60 font-medium text-white text-base tracking-wider leading-relaxed space-y-2">
                                {phase.details.split('\n').map((detail, i) => (
                                    <li key={i}>{detail}</li>
                                ))}
                            </ul>
                        </article>
                    </div>
                ))}
            </div>
        </section>
    );
};

const MentorSection = (): JSX.Element => {
    const testimonials = [
        { image: "/aarav.svg", quote: "THE INNOVATIVE STRATEGIES THEY IMPLEMENTED INCREASED OUR ONLINE VISIBILITY AND SALES SIGNIFICANTLY.", name: "AISHA KHAN", title: "GREENTECH'S CEO" },
        { image: "/sanket.svg", quote: "THEIR TAILORED APPROACH TO SOCIAL MEDIA MANAGEMENT DROVE ENGAGEMENT AND BUILT A LOYAL COMMUNITY AROUND OUR BRAND.", name: "RAHUL GUPTA", title: "TRENDYWEAR'S FOUNDER" },
        { image: "/aarav.svg", quote: "THE INNOVATIVE STRATEGIES THEY IMPLEMENTED INCREASED OUR ONLINE VISIBILITY AND SALES SIGNIFICANTLY.", name: "AISHA KHAN", title: "GREENTECH'S CEO" },
        { image: "/sanket.svg", quote: "THEIR TAILORED APPROACH TO SOCIAL MEDIA MANAGEMENT DROVE ENGAGEMENT AND BUILT A LOYAL COMMUNITY AROUND OUR BRAND.", name: "RAHUL GUPTA", title: "TRENDYWEAR'S FOUNDER" },
        { image: "/sanket.svg", quote: "THEIR TAILORED APPROACH TO SOCIAL MEDIA MANAGEMENT DROVE ENGAGEMENT AND BUILT A LOYAL COMMUNITY AROUND OUR BRAND.", name: "RAHUL GUPTA", title: "TRENDYWEAR'S CEO" },
    ];

    const responsive = {
        desktop: { breakpoint: { max: 3000, min: 1024 }, items: 2, partialVisibilityGutter: 40 },
        tablet: { breakpoint: { max: 1024, min: 768 }, items: 1, partialVisibilityGutter: 30 },
        mobile: { breakpoint: { max: 768, min: 0 }, items: 1, partialVisibilityGutter: 20 },
    };

    return (
        <section className="flex flex-col w-full items-start gap-12 sm:gap-[60px] relative">
            <h2 className="relative self-stretch font-semibold text-white text-3xl sm:text-5xl tracking-[0.96px] leading-tight">
                MEET YOUR MENTORS
            </h2>
            <div className="w-full">
                <Carousel
                    responsive={responsive}
                    infinite={true}
                    autoPlay={true}
                    autoPlaySpeed={3000}
                    keyBoardControl={true}
                    customTransition="transform 500ms ease-in-out"
                    transitionDuration={500}
                    containerClass="carousel-container"
                    removeArrowOnDeviceType={["tablet", "mobile", "desktop"]}
                    dotListClass="custom-dot-list-style"
                    partialVisible
                >
                    {testimonials.map((testimonial, index) => (
                        <div key={index} className="px-2 h-full">
                            <div className={`grid grid-rows-[200px_1fr] sm:flex sm:flex-row w-full h-[450px] sm:h-[248px] items-center p-4 rounded-[12px] gap-4 sm:gap-2.5 relative backdrop-blur-[50px] bg-[#1a1a1a] border border-[#484848]`}>
                                <div className="w-full sm:w-2/5 h-full flex-shrink-0">
                                    <Image width={200} height={232} className="w-full h-full object-cover rounded-lg" alt={testimonial.name} src={testimonial.image} />
                                </div>
                                <div className="w-full sm:w-3/5 h-full flex flex-col justify-between py-1 gap-4">
                                    <p className="opacity-60 font-medium text-white text-sm sm:text-base leading-relaxed">
                                        &ldquo;{testimonial.quote}&rdquo;
                                    </p>
                                    <div className="flex flex-col items-start gap-2">
                                        <h3 className="font-semibold text-white text-lg sm:text-xl leading-6">{testimonial.name}</h3>
                                        <p className="font-medium text-white text-base leading-5 whitespace-nowrap">{testimonial.title}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </Carousel>
            </div>
        </section>
    );
};

const CallToActionSection = (): JSX.Element => {
    return (
        <section className="w-full">
            <Card className="h-auto rounded-xl border border-[#484848] bg-[#1a1a1a80] backdrop-blur-md">
                <CardContent className="p-8 md:p-12 lg:p-16">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
                        <div className="flex-1 text-center lg:text-left">
                            <h2 className="font-sans font-semibold text-xl sm:text-[28px] leading-snug sm:leading-[34px] tracking-normal uppercase text-white">
                                Join our live Data Science classes to master data analysis, machine learning, and predictive modeling, and take your career to the next level!
                            </h2>
                        </div>
                        <div className="flex w-full lg:w-auto flex-col items-center justify-center gap-4">
                            <Button size="lg" className="w-full max-w-sm lg:w-[400px] h-[64px] justify-between px-7 py-6 bg-[#3a8dff] hover:bg-[#2a7def] rounded-md">
                                <span className="font-extrabold text-white text-sm tracking-[1.40px]">BOOK LIVE CLASS</span>
                                <ArrowRightIcon className="w-6 h-6 text-white" />
                            </Button>
                            <Button size="lg" variant="outline" className="w-full max-w-sm lg:w-[400px] h-[64px] justify-between px-7 py-6 border-white text-white bg-transparent hover:bg-white/10 rounded-md">
                                <span className="font-extrabold text-white text-sm tracking-[1.40px] flex-1 min-w-0 whitespace-normal text-left">DOWNLOAD BROCHURE</span>
                                <DownloadIcon className="w-5 h-5 text-white flex-shrink-0" />
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </section>
    );
};

const SurveySection = (): JSX.Element => {
    return (
        <section className="w-full">
            <Card className="h-auto rounded-xl border border-[#484848] bg-[#1a1a1a]/80 backdrop-blur-md">
                <CardContent className="p-8 md:p-12 lg:p-16">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
                        <div className="flex-1 text-center lg:text-left">
                            <h2 className="font-sans font-semibold text-xl sm:text-[28px] leading-snug sm:leading-[34px] tracking-normal uppercase text-white">
                                We have surveyed about 100 Data Scientists to get to know what’s best, don’t wait book a class
                            </h2>
                        </div>
                        <div className="flex w-full lg:w-auto flex-col items-center justify-center">
                            <Button size="lg" className="w-full max-w-sm lg:w-[400px] h-[64px] justify-between px-7 py-6 bg-[#3a8dff] hover:bg-[#2a7def] rounded-md">
                                <span className="font-extrabold text-white text-sm tracking-[1.40px]">BOOK LIVE CLASS</span>
                                <ArrowRightIcon className="w-6 h-6 text-white" />
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </section>
    );
};

const WhySection = (): JSX.Element => {
    const featuredItems = [
        { image: "/program.svg", title: "SECURING YOUR BUSINESS AND\nEMPLOYEES IS ALWAYS OUR PRIORITY", description: "LOREM IPSUM DOLOR SIT AMET CONSECTETUR. MASSA DAPIBUS SED LACINIA ODIO AMET. NEQUE EGET COMMODO AMET ADIPISCING EGESTAS FAUCIBUS DIGNISSIM LOBORTIS VITAE." },
        { image: "/program.svg", title: "HOW WE HELPED A\nBRAND FROM A POTENTIAL THEFT", description: "LOREM IPSUM DOLOR SIT AMET CONSECTETUR. MASSA DAPIBUS SED LACINIA ODIO AMET. NEQUE EGET COMMODO AMET ADIPISCING EGESTAS FAUCIBUS DIGNISSIM LOBORTIS VITAE." },
    ];

    return (
        <section className="w-full relative">
            <div className="flex flex-col items-start gap-12 md:gap-16 w-full max-w-full mx-auto">
                <h2 className="w-full font-semibold text-white text-3xl md:text-4xl lg:text-5xl tracking-wide leading-tight">
                    WHY AESTR ALPHA DATA SCIENCE PROGRAM?
                </h2>
                <div className="flex flex-col lg:flex-row w-full items-start justify-between gap-12 lg:gap-16">
                    {featuredItems.map((item, index) => (
                        <div key={index} className="flex flex-col items-start gap-8 flex-1 w-full">
                            <Image width={600} height={600} className="w-full h-auto max-h-[300px] sm:max-h-[600px] object-cover rounded-lg" alt="Featured item" src={item.image} />
                            <h3 className="w-full [-webkit-text-stroke:1px_#ffffff33] font-semibold text-white text-xl md:text-2xl tracking-normal leading-snug whitespace-pre-line">
                                {item.title}
                            </h3>
                            <p className="w-full opacity-60 font-medium text-white text-base tracking-[1.60px] leading-relaxed">
                                {item.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};


// ==============================================================================
// MAIN PAGE COMPONENT
// ==============================================================================
export default function DeepCloudCoursePage(): JSX.Element {
    return (
        <div className="bg-black w-full min-h-screen font-sans overflow-x-hidden">
            <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 opacity-30 sm:opacity-50">
                <Image width={800} height={800} src="/Bottomcircle.svg" alt="" className="absolute bottom-[-20%] left-[-35%] sm:left-[-15%] w-[80%] sm:w-1/2" />
            </div>

            <div className="relative z-10">
                <PageHeader />
                <main className="py-16 sm:py-24">
                    <ContentContainer className="space-y-24 sm:space-y-32">
                        <HeroSection />
                        <CallToActionSection />
                        <CurriculumTimelineSection />
                        <MentorSection />
                        <AlumniLeadSection />
                        <WhyChooseProgramSection />
                        <AlumniLeadSection />
                        <SurveySection />
                        <WhySection />
                    </ContentContainer>
                </main>
                <PageFooter />
            </div>
        </div>
    );
}