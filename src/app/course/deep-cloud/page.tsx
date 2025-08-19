"use client";

import { ArrowRightIcon, DownloadIcon } from "lucide-react";
import React, { JSX, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Badge } from "../../../components/badge";
import { Button } from "../../../components/button";
import { Card, CardContent } from "../../../components/card";
import { Separator } from "../../../components/separator";
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";


//==============================================================================
// IDENTICAL HEADER & FOOTER
// To ensure an identical look and feel, these are copied from your main page.tsx
//==============================================================================

const navItems = ["ALUMNI", "PROGRAMS", "RESOURCES", "FAQS"];

const ContentContainer = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
    <div className={`w-full max-w-[70%] mx-auto px-4 sm:px-8 ${className}`}>
        {children}
    </div>
);

const PageHeader = () => (
    <header className="relative z-10 pt-9 w-full">
        <ContentContainer className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <a href="/" aria-label="Go to homepage">
                <img className="w-[219px] h-7" alt="Aestr Alpha Logo" src="/logo.svg" />
            </a>
            <div className="flex flex-col lg:flex-row items-center gap-9">
                <nav className="flex items-center gap-9">
                    {navItems.map((item, index) => (
                        <button
                            key={index}
                            className="font-sans font-medium text-white text-base whitespace-nowrap"
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
                        <span className="font-sans font-bold text-white text-sm tracking-[1.40px]">
                            LOGIN
                        </span>
                    </Button>
                    <Button className="w-[161px] h-[50px] px-6 rounded-[6px] bg-[#3a8dff] flex items-center justify-center">
                        <span className="font-sans font-bold text-white text-sm tracking-[1.40px]">
                            GET IN TOUCH
                        </span>
                    </Button>
                </div>
            </div>
        </ContentContainer>
    </header>
);

const PageFooter = () => (
    <footer style={{ background: '#4187F7' }} className="font-sans text-white flex items-center justify-center p-8">
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
                            <ArrowRightIcon className="w-5 h-5 ml-4" />
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


//==============================================================================
// SECTION 1: Hero & Course Details
//==============================================================================
const HeroSection = (): JSX.Element => {
    const heroBadges = [
        {
            text: "BUILD PRODUCTION-GRADE CLOUD INFRASTRUCTURE.",
            className: "bg-[#0C1C33]/90 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-white"
        },
        {
            text: "NEXT BATCH STARTS IN SEPTEMBER",
            className: "bg-white text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-500"
        },
    ];

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
                    {heroBadges.map((badge, index) => (
                        <Badge
                            key={index}
                            className={`inline-flex items-center justify-center gap-2.5 px-4 py-3 rounded-full font-bold text-sm tracking-wider leading-5 whitespace-nowrap ${badge.className}`}
                        >
                            {badge.text}
                        </Badge>
                    ))}
                </div>
                <h1 className="font-semibold text-white text-5xl tracking-wide leading-tight">
                    DEEP CLOUD &amp; MULTI-CLOUD ENGINEERING
                </h1>
            </div>
            <img
                className="w-full h-auto max-h-[420px] object-cover rounded-xl"
                alt="Aircraft in a futuristic hangar, symbolizing cloud infrastructure"
                src="/deep.svg"
            />
            <p className="text-white/60 font-medium text-base tracking-widest leading-relaxed">
                THE TECH LANDSCAPE IS EVOLVING, AND THE DEMAND IS SHIFTING FROM MERE CERTIFICATIONS TO VISIONARY ARCHITECTS WHO CAN DESIGN THE FUTURE. OUR PROGRAM OFFERS A RIGOROUS, FULL-DAY IMMERSION FROM 9 AM TO 9 PM, WHERE YOU WILL DIVE DEEP INTO THE INTRICACIES OF DESIGNING, CONSTRUCTING, AND AUTOMATING ROBUST, SCALABLE INFRASTRUCTURE THAT SUPPORTS LEADING TECH ENTERPRISES. COLLABORATE WITH INDUSTRY EXPERTS AT OUR PARTNER ORGANIZATION, SHODH AI, AND GAIN HANDS-ON EXPERIENCE THROUGH REAL-WORLD PROJECTS. BY THE END OF THIS PROGRAM, YOU WILL HAVE A COMPREHENSIVE PORTFOLIO SHOWCASING YOUR PRODUCTION-READY WORK, READY TO IMPRESS POTENTIAL EMPLOYERS.
            </p>
            {/* --- CARD HEIGHT MODIFICATION --- */}
            <Card className="w-full h-auto md:h-[172px] rounded-xl border border-[#484848] bg-[#1a1a1a] backdrop-blur-md flex items-center">
                <CardContent className="p-8 w-full">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8 w-full">
                        {programDetails.map((detail, index) => (
                            <React.Fragment key={detail.label}>
                                <div className="flex flex-1 flex-col items-start md:items-center gap-4 text-center md:text-left">
                                    <div className="text-white/60 text-base tracking-widest font-medium leading-5 uppercase">
                                        {detail.label}
                                    </div>
                                    <div className="font-semibold text-white text-xl tracking-normal leading-6">
                                        {detail.value}
                                    </div>
                                </div>
                                {index < programDetails.length - 1 && (
                                    <Separator
                                        orientation="vertical"
                                        className="hidden md:block h-12 bg-gray-700"
                                    />
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                </CardContent>
            </Card>
            {/* --- END OF MODIFICATION --- */}
        </section>
    );
};

//==============================================================================
// SECTION 2: Why Choose This Program Section
//==============================================================================
const WhyChooseProgramSection = (): JSX.Element => {
    const features = [
        { icon: "/project1.svg", title: "REAL-WORLD PROJECTS", description: "GAIN HANDS-ON EXPERIENCE DESIGNING AND AUTOMATING PRODUCTION-GRADE INFRASTRUCTURE WITH INDUSTRY PARTNERS." },
        { icon: "/career1.svg", title: "CAREER LAUNCH", description: "JOIN TARGETED MONTHLY DRIVES CONNECTING YOU DIRECTLY WITH HIGH-GROWTH COMPANIES." },
        { icon: "/step1.svg", title: "STEP-BY-STEP MASTERY", description: "MASTER CLOUD ENGINEERING STEP-BY-STEP, FROM CORE AUTOMATION TO ADVANCED MULTI-CLOUD ARCHITECTURES." },
    ];

    return (
        <section className="flex flex-col w-full items-center gap-16 relative">
            <h2 className="w-full text-5xl text-center tracking-[0.96px] leading-tight font-semibold text-white">WHY CHOOSE THIS PROGRAM</h2>
            <Card className="w-full bg-[#3a8dff] rounded-xl border-0"><CardContent className="p-0 relative"><div className="grid grid-cols-1 md:grid-cols-3">{features.map((feature, index) => (<React.Fragment key={index}><div className="flex flex-col items-center justify-start text-center p-12 gap-10"><img className="w-24 h-24" alt="" src={feature.icon} /><div className="flex flex-col items-center gap-6"><h3 className="text-2xl font-semibold text-white tracking-[0] leading-6">{feature.title}</h3><p className="font-medium text-white text-sm tracking-[1.40px] leading-5">{feature.description}</p></div></div>{index < features.length - 1 && (<Separator orientation="vertical" className="hidden md:block absolute top-0 bottom-0 w-px bg-white/20" style={{ left: `${((index + 1) * 100) / 3}%` }} />)}</React.Fragment>))}</div></CardContent></Card>
        </section>
    );
};

//==============================================================================
// SECTION: Alumni Lead Section (MODIFIED)
//==============================================================================
const AlumniLeadSection = (): JSX.Element => {
    // Duplicated logos for a seamless loop effect
    const logos = [
        { src: "/citoh.svg", alt: "C.ITOH Logo" },
        { src: "/medium.svg", alt: "Medium Logo" },
        { src: "/business.svg", alt: "Business Insider Logo" },
        { src: "/forbes.svg", alt: "Forbes Logo" },
        { src: "/quatrz.svg", alt: "Quartz Logo" },
        { src: "/citoh.svg", alt: "C.ITOH Logo" },
        { src: "/medium.svg", alt: "Medium Logo" },
        { src: "/business.svg", alt: "Business Insider Logo" },
        { src: "/forbes.svg", alt: "Forbes Logo" },
        { src: "/quatrz.svg", alt: "Quartz Logo" },
    ];

    const [emblaRef] = useEmblaCarousel({
        loop: true,
        align: 'start',
    }, [Autoplay({ delay: 2000, stopOnInteraction: false, stopOnMouseEnter: true })]);

    return (
        <section className="w-full">
            <Card className="h-auto rounded-xl border border-[#2a2a2a] bg-[#1a1a1a]/80 backdrop-blur-md">
                <CardContent className="p-8 md:p-12 lg:p-16">
                    <div className="flex flex-col items-center justify-center gap-10">
                        <h3 className="font-plus-jakarta-sans font-semibold text-[20px] leading-[24px] tracking-normal text-white/80 text-center uppercase">
                            OUR ALUMNI LEAD IN GLOBAL TECH
                        </h3>
                        {/* Embla Carousel Container */}
                        <div className="overflow-hidden w-full" ref={emblaRef}>
                            <div className="flex">
                                {logos.map((logo, index) => (
                                    // Each slide takes up 20% of the width (5 slides visible)
                                    <div key={index} className="flex-[0_0_20%] min-w-0 px-4 flex items-center justify-center">
                                        <img className="h-6 md:h-8" alt={logo.alt} src={logo.src} />
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


//==============================================================================
// SECTION 3: Curriculum Timeline Section
//==============================================================================
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
                    // Correctly calculate height to reach the center of the last dot
                    const height = lastPhase.offsetTop - firstPhase.offsetTop;
                    setMaxLineHeight(height);
                }
            }
        };

        calculateMaxHeight();
        window.addEventListener('resize', calculateMaxHeight);
        return () => window.removeEventListener('resize', calculateMaxHeight);
    }, [phases.length]);

    useEffect(() => {
        const handleScroll = () => {
            if (timelineRef.current && maxLineHeight > 0 && phases.length > 1) {
                const windowHeight = window.innerHeight;

                // 1. Determine which phase is currently active
                // The activation point is the vertical center of the screen
                const activationPoint = windowHeight * 0.5;
                let latestActiveId = 1;
                phaseRefs.current.forEach((phaseRef, index) => {
                    // If the top of a phase element has passed the activation point
                    if (phaseRef && phaseRef.getBoundingClientRect().top <= activationPoint) {
                        latestActiveId = index + 1;
                    }
                });

                // 2. Update the active phase state (for styling the dots)
                setActivePhaseId(latestActiveId);

                // 3. Calculate the target height for the line based on the active phase
                // The height will now "snap" to defined steps rather than growing continuously.
                const segmentHeight = maxLineHeight / (phases.length - 1);
                const targetHeight = (latestActiveId - 1) * segmentHeight;

                setLineHeight(targetHeight);
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Initial call to set state correctly on load

        return () => window.removeEventListener('scroll', handleScroll);
    }, [maxLineHeight, phases.length]);

    return (
        <section className="flex flex-col w-full items-start gap-16 relative">
            <h2 className="font-semibold text-white text-5xl tracking-[0.96px] leading-tight">COURSE CURRICULUM</h2>
            <div ref={timelineRef} className="relative w-full">
                <div
                    className="absolute left-4 top-2 w-1 bg-white/10 rounded-full"
                    style={{ height: `${maxLineHeight}px` }}
                />
                <div
                    className="absolute left-4 top-2 w-1 bg-[#3a8dff] rounded-full transition-height duration-1000 ease-in-out"
                    style={{ height: `${lineHeight}px` }}
                />

                {phases.map((phase, index) => (
                    <div key={phase.id} ref={el => phaseRefs.current[index] = el} className="relative pl-12 pb-20">
                        <div
                            className={`
                                absolute left-4 top-2 w-9 h-9 rounded-full flex items-center justify-center border-2
                                -translate-x-1/2 transition-colors duration-500
                                ${phase.id <= activePhaseId ? 'bg-[#3a8dff] border-[#3a8dff]' : 'border-gray-500 bg-black'}
                            `}
                        >
                            <div className="w-3 h-3 bg-white rounded-full" />
                        </div>
                        <article className="flex flex-col items-start gap-7">
                            <Badge variant="outline" className="border-white/20 text-white bg-transparent hover:bg-transparent w-[175px] h-[45px] rounded-[100px]">{phase.badge}</Badge>
                            <h3 className="font-semibold text-white text-3xl">{phase.title}</h3>
                            <p className="opacity-60 font-medium text-white text-base tracking-wider leading-relaxed">{phase.description}</p>
                            <ul className="list-disc pl-5 opacity-60 font-medium text-white text-base tracking-wider leading-relaxed">
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
//==============================================================================
// SECTION 4: Mentors & Alumni Section
//==============================================================================
const AlumniSection = (): JSX.Element => {
    const mentors = [
        { name: "ZARA MEHTA", title: "SPECIALIST AT ZOOMTECH", testimonial: "As a technical specialist, I aspired to transition into AI/ML but felt overwhelmed. Aestr Alpha's structured curriculum and interactive workshops provided the clarity and skills I needed.", image: "/zara.svg", icon: "/google.svg" },
        { name: "AARAV MEHTA", title: "TECHNICAL AT ZOOMTECH", testimonial: "The hands-on projects were the best part. They weren't toy examples; we built real, production-grade infrastructure that I could confidently showcase to employers.", image: "/aarav.svg", icon: "/google.svg" },
        { name: "SANKET SHARMA", title: "SPECIALIST AT GOOGLE", testimonial: "The monthly placement drives are a game-changer. I had multiple offers before I even officially completed the program. It truly bridges the gap between education and career.", image: "/sanket.svg", icon: "/google.svg" },
        { name: "ANNA IVANOVA", title: "LEAD ENGINEER AT TECHCORP", testimonial: "The mentorship I received was invaluable. My mentor guided me through complex topics and helped me build a strong portfolio.", image: "/zara.svg", icon: "/google.svg" },
        { name: "MIKE PETERSON", title: "DATA SCIENTIST AT DATANET", testimonial: "The curriculum is very well-structured and up-to-date with the latest industry trends. I felt well-prepared for my job interviews.", image: "/aarav.svg", icon: "/google.svg" },
    ];

    const [emblaRef] = useEmblaCarousel({
        loop: true,
        slidesToScroll: 1,
        align: 'start',
    }, [Autoplay({ delay: 3500 })]);

    return (
        <section className="flex flex-col w-full items-start gap-16 relative">
            <h2 className="font-semibold text-white text-5xl tracking-[0.96px] leading-tight">HEAR YOUR ALUMNI</h2>
            <div className="overflow-hidden w-full" ref={emblaRef}>
                <div className="flex">
                    {mentors.map((mentor, index) => (
                        <div key={index} className="flex-shrink-0 w-full md:w-1/2 lg:w-1/3 p-3">
                            <Card className="relative w-full h-[580px] rounded-xl overflow-hidden bg-white/5 border-white/10">
                                <CardContent className="p-0 h-full">
                                    <img className="absolute w-full h-3/5 top-0 left-0 object-cover pt-[20px] px-[20px] rounded-[10px]" alt={`Portrait of ${mentor.name}`} src={mentor.image} />
                                    <div className="absolute bottom-0 left-0 p-6 w-full h-2/5 flex flex-col justify-end">
                                        <div className="flex flex-col items-start gap-3">
                                            <h3 className="text-xl font-semibold text-white">{mentor.name}</h3>
                                            <p className="font-medium text-white/80 text-base tracking-wider">{mentor.title}</p>
                                        </div>
                                        <p className="mt-4 opacity-60 font-medium text-white text-base tracking-wider leading-relaxed">{mentor.testimonial}</p>
                                    </div>
                                    <img className="absolute w-20 h-20 top-1/2 left-[calc(100%-110px)] translate-y-4 " alt="Quote icon" src={mentor.icon} />
                                </CardContent>
                            </Card>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};



//==============================================================================
// SECTION 5: Call to Action Section
//==============================================================================
const CallToActionSection = (): JSX.Element => {
    return (
        <section className="w-full">
            <Card className="h-auto rounded-xl border border-[#484848] bg-[#1a1a1a]/80 backdrop-blur-md">
                <CardContent className="p-8 md:p-12 lg:p-16">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
                        <div className="flex-1">
                        <h2 className="max-w-2xl font-sans font-semibold text-[28px] leading-[34px] tracking-normal uppercase text-white">
                        Join our live Data Science classes to master data analysis, machine learning, and predictive modeling, and take your career to the next level!
</h2>
                        </div>
                        <div className="flex w-full max-w-sm flex-col items-start justify-center gap-4">
                            <Button size="lg" className="w-full md:w-[400px] h-[64px] justify-between px-7 py-6 bg-[#3a8dff] hover:bg-[#2a7def] rounded-md">
                                <span className="font-extrabold text-white text-sm tracking-[1.40px]">BOOK LIVE CLASS</span>
                                <ArrowRightIcon className="w-6 h-6 text-white" />
                            </Button>
                            <Button size="lg" variant="outline" className="w-full md:w-[400px] h-[64px] justify-between px-7 py-6 border-white text-white bg-transparent hover:bg-white/10 rounded-md">
                                <span className="font-extrabold text-white text-sm tracking-[1.40px]">DOWNLOAD BROCHURE</span>
                                <DownloadIcon className="w-5 h-5 text-white" />
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </section>
    );
};

//==============================================================================
// Survey Section
//==============================================================================
const SurveySection = (): JSX.Element => {
    return (
        <section className="w-full">
            <Card className="h-auto rounded-xl border border-[#484848] bg-[#1a1a1a]/80 backdrop-blur-md">
                <CardContent className="p-8 md:p-12 lg:p-16">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
                        <div className="flex-1">
                        <h2 className="max-w-2xl font-sans font-semibold text-[28px] leading-[34px] tracking-normal uppercase text-white">
                        We have surveyed about 100 Data Scientist to get to know what’s best, don’t wait book a class
</h2>
                        </div>
                        <div className="flex w-full max-w-sm flex-col items-start justify-center gap-4">
                            <Button size="lg" className="w-full md:w-[400px] h-[64px] justify-between px-7 py-6 bg-[#3a8dff] hover:bg-[#2a7def] rounded-md">
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
//==============================================================================
// Mentor Section
//==============================================================================
const MentorSection = (): JSX.Element => {
    const testimonials = [
        {
          image: "https://c.animaapp.com/meid0islaUbQOI/img/rectangle-2713.png",
          quote:
            "THE INNOVATIVE STRATEGIES THEY IMPLEMENTED INCREASED OUR ONLINE VISIBILITY AND SALES SIGNIFICANTLY.",
          name: "AISHA KHAN",
          title: "CEO OF GREENTECH SOLUTIONS",
          imageWidth: "w-[190px]",
        },
        {
          image: "https://c.animaapp.com/meid0islaUbQOI/img/rectangle-3987.svg",
          quote:
            "THEIR TAILORED APPROACH TO SOCIAL MEDIA MANAGEMENT DROVE ENGAGEMENT AND BUILT A LOYAL COMMUNITY AROUND OUR BRAND.",
          name: "RAHUL GUPTA",
          title: "FOUNDER OF TRENDYWEAR",
          imageWidth: "w-[190px]",
        },

        {
          image: "https://c.animaapp.com/meid0islaUbQOI/img/rectangle-2713.png",
          quote:
            "THE INNOVATIVE STRATEGIES THEY IMPLEMENTED INCREASED OUR ONLINE VISIBILITY AND SALES SIGNIFICANTLY.",
          name: "AISHA KHAN",
          title: "CEO OF GREENTECH SOLUTIONS",
          imageWidth: "w-[190px]",
        },
        {
          image: "https://c.animaapp.com/meid0islaUbQOI/img/rectangle-3987.svg",
          quote:
            "THEIR TAILORED APPROACH TO SOCIAL MEDIA MANAGEMENT DROVE ENGAGEMENT AND BUILT A LOYAL COMMUNITY AROUND OUR BRAND.",
          name: "RAHUL GUPTA",
          title: "FOUNDER OF TRENDYWEAR",
          imageWidth: "w-[190px]",
        },
        {
            image: "https://c.animaapp.com/meid0islaUbQOI/img/rectangle-2713.png",
            quote:
              "THE INNOVATIVE STRATEGIES THEY IMPLEMENTED INCREASED OUR ONLINE VISIBILITY AND SALES SIGNIFICANTLY.",
            name: "AISHA KHAN",
            title: "CEO OF GREENTECH SOLUTIONS",
            imageWidth: "w-[190px]",
          },
          {
            image: "https://c.animaapp.com/meid0islaUbQOI/img/rectangle-3987.svg",
            quote:
              "THEIR TAILORED APPROACH TO SOCIAL MEDIA MANAGEMENT DROVE ENGAGEMENT AND BUILT A LOYAL COMMUNITY AROUND OUR BRAND.",
            name: "RAHUL GUPTA",
            title: "FOUNDER OF TRENDYWEAR",
            imageWidth: "w-[190px]",
          },
  
          {
            image: "https://c.animaapp.com/meid0islaUbQOI/img/rectangle-2713.png",
            quote:
              "THE INNOVATIVE STRATEGIES THEY IMPLEMENTED INCREASED OUR ONLINE VISIBILITY AND SALES SIGNIFICANTLY.",
            name: "AISHA KHAN",
            title: "CEO OF GREENTECH SOLUTIONS",
            imageWidth: "w-[190px]",
          },
          {
            image: "https://c.animaapp.com/meid0islaUbQOI/img/rectangle-3987.svg",
            quote:
              "THEIR TAILORED APPROACH TO SOCIAL MEDIA MANAGEMENT DROVE ENGAGEMENT AND BUILT A LOYAL COMMUNITY AROUND OUR BRAND.",
            name: "RAHUL GUPTA",
            title: "FOUNDER OF TRENDYWEAR",
            imageWidth: "w-[190px]",
          },
      ];
    
      // React Multi Carousel responsive config
      const responsive = {
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 3,
          partialVisibilityGutter: 40,
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2,
          partialVisibilityGutter: 20,
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1,
          partialVisibilityGutter: 10,
        },
      };
    
      return (
        <section className="flex flex-col w-full items-start gap-[60px] relative">
          <h2 className="relative self-stretch mt-[-1.00px] [font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-white text-5xl tracking-[0.96px] leading-[52.8px]">
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
              itemClass="carousel-item-padding-40-px"
            
              partialVisible
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="px-2">
                  <div
                    className={`flex flex-col w-full h-[248px] items-start gap-2.5 p-4 relative rounded-xl border-[none] backdrop-blur-[50px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(50px)_brightness(100%)] bg-[linear-gradient(115deg,rgba(255,255,255,0.1)_0%,rgba(255,255,255,0)_100%)] before:content-[''] before:absolute before:inset-0 before:p-px before:rounded-xl before:[background:linear-gradient(91deg,rgba(255,255,255,0.2)_0%,rgba(255,255,255,0.13)_35%,rgba(255,255,255,0)_65%,rgba(255,255,255,0.2)_100%)] before:[-webkit-mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)] before:[-webkit-mask-composite:xor] before:[mask-composite:exclude] before:z-[1] before:pointer-events-none`}
                  >
                    <div className="p-0">
                      <div className="inline-flex items-center gap-5 relative flex-[0_0_auto]">
                        <img
                          className={`relative ${testimonial.imageWidth} h-[216px]`}
                          alt="Rectangle"
                          src={testimonial.image}
                        />
    
                        <div className="flex flex-col w-[374px] h-[216px] items-start justify-between pt-5 pb-4 px-0 relative">
                          <div className="relative self-stretch mt-[-1.00px] opacity-60 [font-family:'Plus_Jakarta_Sans',Helvetica] font-medium text-white text-base tracking-[1.60px] leading-5">
                            "{testimonial.quote}"
                          </div>
    
                          <div className="inline-flex flex-col items-start gap-3 relative flex-[0_0_auto]">
                            <div className="relative self-stretch mt-[-1.00px] [font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-white text-xl tracking-[0] leading-6">
                              {testimonial.name}
                            </div>
    
                            <div className="relative w-fit [font-family:'Plus_Jakarta_Sans',Helvetica] font-medium text-white text-base tracking-[1.60px] leading-5 whitespace-nowrap">
                              {testimonial.title}
                            </div>
                          </div>
                        </div>
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


//==============================================================================
// Why Section (MODIFIED FOR RESPONSIVENESS)
//==============================================================================

export const WhySection = (): JSX.Element => {
  const featuredItems = [
    {
      image: "https://c.animaapp.com/meid0islaUbQOI/img/rectangle-72.png",
      title: "SECURING YOUR BUSINESS AND\nEMPLOYEES IS ALWAYS OUR PRIORITY",
      description:
        "LOREM IPSUM DOLOR SIT AMET CONSECTETUR. MASSA DAPIBUS SED LACINIA ODIO AMET. NEQUE EGET COMMODO AMET ADIPISCING EGESTAS FAUCIBUS DIGNISSIM LOBORTIS VITAE.",
    },
    {
      image: "https://c.animaapp.com/meid0islaUbQOI/img/rectangle-71.png",
      title: "HOW WE HELPED A\nBRAND FROM A POTENTIAL THEFT",
      description:
        "LOREM IPSUM DOLOR SIT AMET CONSECTETUR. MASSA DAPIBUS SED LACINIA ODIO AMET. NEQUE EGET COMMODO AMET ADIPISCING EGESTAS FAUCIBUS DIGNISSIM LOBORTIS VITAE.",
    },
    
  ];

  return (
    <section className="w-full relative">
      <div className="flex flex-col items-start gap-12 md:gap-16 w-full max-w-full mx-auto">
        <h2 className="w-full max-w-[673px] [font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-white text-3xl md:text-4xl lg:text-5xl tracking-wide leading-tight">
          WHY AESTR ALPHA DATA SCIENCE PROGRAM?
        </h2>

        <div className="flex flex-col lg:flex-row w-full items-start justify-between gap-12 lg:gap-16">
          {featuredItems.map((item, index) => (
            <div
              key={index}
              className={`inline-flex flex-col items-start gap-8 flex-1 w-full`}
            >
              <img
                className="w-full h-auto md:h-[500px] lg:h-[600px] object-cover rounded-lg"
                alt="Featured item"
                src={item.image}
              />

              <h3 className="w-full [-webkit-text-stroke:1px_#ffffff33] [font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-white text-xl md:text-2xl tracking-normal leading-snug whitespace-pre-line">
                {item.title}
              </h3>

              <p className="w-full opacity-60 [font-family:'Plus_Jakarta_Sans',Helvetica] font-medium text-white text-base tracking-[1.60px] leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};



//==============================================================================
// MAIN PAGE COMPONENT
//==============================================================================
export default function DeepCloudCoursePage(): JSX.Element {
    return (
        <div className="bg-black w-full min-h-screen font-sans">
            {/* Background decorative elements */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 opacity-50">
                <img src="/Rightcircle.svg" alt="" className="absolute top-[-20%] right-[-15%] w-1/2" />
                <img src="/Bottomcircle.svg" alt="" className="absolute bottom-[-20%] left-[-15%] w-1/2" />
            </div>
            
            {/* Main content wrapper */}
            <div className="relative z-10 ">
                <PageHeader />
                <main className="py-24 ">
                    <ContentContainer className="space-y-32">
                        <HeroSection />
                        <WhyChooseProgramSection />
                        <AlumniLeadSection />
                        <CallToActionSection />
                        <CurriculumTimelineSection />
                        <AlumniSection />
                        <SurveySection />
                        <MentorSection />
                        <WhySection />
                    </ContentContainer>
                </main>
                <PageFooter />
            </div>
        </div>
    );
}