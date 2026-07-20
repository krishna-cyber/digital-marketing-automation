import { CalendarEventStatus, PillarContent } from "@/types/types"
import { EventInput } from "@fullcalendar/react"

const todayStr = new Date().toISOString().replace(/T.*$/, "") // YYYY-MM-DD of today
const tomorrowStr = new Date(Date.now() + 24 * 60 * 60 * 1000)
  .toISOString()
  .replace(/T.*$/, "")
const dayAfterTomorrowStr = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000)
  .toISOString()
  .replace(/T.*$/, "")

export type ExtendedEventInput = EventInput & {
  topic: string
  channel: string
  pillar: PillarContent
  color: string
  status: CalendarEventStatus
  subtopics: string[]
  keywords: string[]
  allDay: boolean
  research_insight: string
}

export const INITIAL_EVENTS: ExtendedEventInput[] = [
  {
    id: "83b88696-02a0-45c8-a6a6-5332a34e66e4",
    topic:
      "AI Staff Augmentation: Rising Trends and Strategic Implementation for 2026",
    channel: "social",
    pillar: "AI Staff Augmentation",
    start: "2026-07-20T16:00:00Z",
    end: "2026-07-20T17:00:00Z",
    allDay: false,
    color: "#3186F5",
    status: "publishing",
    subtopics: [
      "Explore the top three AI trends reshaping staff augmentation in 2026.",
      "Why AI-powered staffing is the key to scalable talent solutions this year.",
      "Harness AI to revolutionize your workforce: what 2026 holds for businesses.",
    ],
    keywords: [
      "AI staff augmentation",
      "technology trends 2026",
      "workforce automation",
      "scalable staffing",
      "artificial intelligence",
    ],
    research_insight:
      "In 2026, AI integration, global hiring models, and cost-efficient scaling are major trends in staff augmentation.",
  },
  {
    id: "bbaa8b3c-3866-4dff-be8c-ad533b121c5f",
    topic:
      "How AI Advancements Are Setting the Foundation for Next-Gen Automation",
    channel: "thought_leadership",
    pillar: "Behind the Build",
    start: "2026-07-21T19:00:00Z",
    end: "2026-07-21T20:00:00Z",
    allDay: false,
    color: "#C52BE4",
    status: "published",
    subtopics: [
      "Exploring the technological bricks of AI automation in 2026",
      "Behind-the-scenes of building AI: What the future holds",
      "The journey of groundbreaking AI tech and its industrial impact",
    ],
    keywords: [
      "AI automation",
      "next-gen technology",
      "industrial impact",
      "deep learning",
      "technological advancements",
    ],
    research_insight:
      "AI technologies have become more sophisticated by 2026, significantly impacting industries like healthcare, finance, and manufacturing with real-time processing and contextual understanding.",
  },
  {
    id: "06505e38-343e-4406-9d00-6b01c6a757c0",
    topic:
      "The Future of Hospitality: How AI Concierges are Enhancing Guest Experiences in 2026",
    channel: "blog",
    pillar: "Palm Concierge",
    start: "2026-07-21T19:00:00Z",
    end: "2026-07-21T20:00:00Z",
    allDay: false,
    color: "#F1CC12",
    status: "publishing",
    subtopics: [
      "Discover how AI concierge services are revolutionizing the hotel industry with enhanced guest experiences and operations efficiency.",
      "Explore the latest AI advancements in hospitality and their role in personalized guest interaction and service optimization.",
      "Dive into the world of AI-powered concierges and their impact on guest satisfaction and hotel operations in 2026.",
    ],
    keywords: [
      "AI concierge",
      "hospitality AI",
      "guest experience 2026",
      "hotel technology advancements",
      "AI in hotels",
    ],
    research_insight:
      "A Florida resort deployed an AI concierge to better support guests' needs and capture more bookings, showing a significant industry impact.",
  },
  {
    id: "054dac82-1845-49d6-b12e-ae01af5aa4c4",
    topic:
      "The Evolution of AI Concierge Services by 2026: Palm Mind's Role in Shaping Personalized Experiences",
    channel: "linkedin_article",
    pillar: "Palm Concierge",
    start: "2026-07-21T19:00:00Z",
    end: "2026-07-21T20:00:00Z",
    allDay: false,
    color: "#3EBFFF",
    status: "failed",
    subtopics: [
      "Experience the Future: How 3D AI Holographic Concierges Are Revolutionizing User Interaction",
      "AI Concierges as Digital Hosts: A New Era of Real-Time Guidance Without Devices",
      "Stepping into the Future: Palm Mind's Role in AI-Powered Personalized Assistance",
    ],
    keywords: [
      "AI concierge services",
      "3D holographic concierge",
      "personalized AI experiences",
      "user interaction",
      "real-time AI guidance",
    ],
    research_insight:
      "In 2026, AI concierge technology is advancing to include 3D AI holographic concierges that provide real-time guidance and interaction without the need for headsets or phones.",
  },
  {
    id: "b7db9c25-1428-41c9-b82b-fa734484ba88",
    topic: "Revolutionizing Hospitality with AI Concierge Services in 2026",
    channel: "social",
    pillar: "Palm Concierge",
    start: "2026-07-22T16:00:00Z",
    end: "2026-07-22T17:00:00Z",
    allDay: false,
    color: "#3186F5",
    status: "publishing",
    subtopics: [
      "Discover why AI is the new luxury concierge for hotels in 2026.",
      "How smart AI is quietly transforming the guest experience behind the scenes.",
      "Personalized services redefined: AI concierge tools every hotel needs.",
    ],
    keywords: [
      "AI concierge",
      "hospitality innovation",
      "guest experience",
      "personalization 2026",
      "smart hospitality tech",
    ],
    research_insight:
      "By 2026, 58% of hotel guests agree AI improves their stay, highlighting potential for expanded AI concierge services.",
  },
  {
    id: "54e6f930-d940-46e1-900f-97fde476a3c1",
    topic:
      "Navigating the Custom AI Solutions Landscape in 2026: Trends and Cost Insights",
    channel: "linkedin_article",
    pillar: "Custom AI Solutions",
    start: "2026-07-23T19:00:00Z",
    end: "2026-07-23T20:00:00Z",
    allDay: false,
    color: "#3EBFFF",
    status: "published",
    subtopics: [
      "Decoding AI Development Costs: Budgeting Strategies for Efficient AI Investment",
      "Custom AI in 2026: Transforming Business Operations Beyond the Basics",
      "Business Strategies: Crafting AI Solutions to Maximize ROI in 2026",
    ],
    keywords: [
      "custom AI solutions",
      "AI development costs",
      "business AI strategy",
      "AI ROI",
      "AI budgeting",
    ],
    research_insight:
      "In 2026, custom AI solutions are increasingly critical as business adoption accelerates, with a focus on agentic AI and multimodal AI shaping the landscape.",
  },
  {
    id: "bb9dc56a-42e5-4abd-a73d-1b46237c687d",
    topic: "Custom AI Solutions: Transforming Business Operations in 2026",
    channel: "blog",
    pillar: "Custom AI Solutions",
    start: "2026-07-23T19:00:00Z",
    end: "2026-07-23T20:00:00Z",
    allDay: false,
    color: "#F1CC12",
    status: "publishing",
    subtopics: [
      "Uncover the top custom AI trends shaping the way businesses operate in 2026.",
      "Explore the integration of custom AI tools that are driving productivity and innovation across various sectors.",
      "Learn how custom AI solutions are resolving workflow challenges and transforming operational efficiencies.",
    ],
    keywords: [
      "custom AI solutions",
      "AI business transformation",
      "AI productivity tools",
      "workflow automation 2026",
      "custom AI trends",
    ],
    research_insight:
      "Generative AI in 2026 is evolving beyond simple tasks and becoming crucial for coding, support, analytics, and business operations.",
  },
  {
    id: "cb978aa5-b89c-4f06-b696-b28e398e6369",
    topic: "The Changing Landscape of AI Adoption in 2026: What's New?",
    channel: "thought_leadership",
    pillar: "AI Adoption",
    start: "2026-07-23T19:00:00Z",
    end: "2026-07-23T20:00:00Z",
    allDay: false,
    color: "#C52BE4",
    status: "draft",
    subtopics: [
      "Unveiling top trends in global AI adoption this year",
      "Navigating through AI adoption hurdles in 2026",
      "How enterprises are truly leveraging AI investments now",
    ],
    keywords: [
      "AI adoption trends",
      "enterprise AI",
      "AI investment",
      "agentic commerce",
      "inference technology",
    ],
    research_insight:
      "In 2026, AI adoption is expanding beyond early movers, with more focus on proving ROI and shifting investments from training to inference.",
  },
  {
    id: "afccac73-287d-4577-9cb0-8e95c8ec0802",
    topic: "Enterprise AI Solutions: Unleashing New Opportunities in 2026",
    channel: "social",
    pillar: "Custom AI Solutions",
    start: "2026-07-24T16:00:00Z",
    end: "2026-07-24T17:00:00Z",
    allDay: false,
    color: "#3186F5",
    status: "draft",
    subtopics: [
      "How custom AI is transforming enterprise operations across industries.",
      "Unlock powerful AI benefits tailored for your business needs in 2026.",
      "Strategic AI adoption: Custom-built tools for today's enterprises.",
    ],
    keywords: [
      "enterprise AI solutions",
      "custom AI tools",
      "business innovation",
      "predictive analytics",
      "AI implementation",
    ],
    research_insight:
      "Enterprise AI solutions in 2026 include intelligent automation and predictive analytics, reshaping business operations and collaboration.",
  },
  {
    id: "316a4495-4a16-4aaf-946b-dd1928674358",
    topic: "AI Receptionists: The Future of Front-Desk Management",
    channel: "social",
    pillar: "AI Receptionist",
    start: "2026-07-27T16:00:00Z",
    end: "2026-07-27T17:00:00Z",
    allDay: false,
    color: "#3186F5",
    status: "draft",
    subtopics: [
      "Why AI receptionists are becoming indispensable for businesses in 2026.",
      "Cut costs and boost efficiency: The AI receptionist revolution is here.",
      "From small enterprises to large: How businesses are embracing AI receptionists.",
    ],
    keywords: [
      "AI receptionist",
      "front-desk automation",
      "business efficiency",
      "voice AI",
      "2026 technology trends",
    ],
    research_insight:
      "AI receptionist market projected to reach $14.6 billion by 2030, with significant cost reductions and increased appointment bookings driving adoption.",
  },
  {
    id: "d51cdf79-06ac-431f-96a1-072ece05c899",
    topic: "AI Receptionists: The New Face of Front Desk Operations",
    channel: "blog",
    pillar: "AI Receptionist",
    start: "2026-07-28T19:00:00Z",
    end: "2026-07-28T20:00:00Z",
    allDay: false,
    color: "#F1CC12",
    status: "publishing",
    subtopics: [
      "Explore the transformative impact of AI receptionists on businesses' front desk operations in 2026.",
      "Learn how companies are leveraging AI receptionists for cost savings and improved customer interactions.",
      "Discover the compelling metrics that highlight the ROI and strategic benefits of adopting AI receptionist solutions.",
    ],
    keywords: [
      "AI receptionist",
      "front desk automation",
      "business efficiency AI",
      "receptionist technology",
      "AI adoption metrics 2026",
    ],
    research_insight:
      "AI receptionists provide significant ROI and cost savings, with substantial adoption across North American businesses in 2026.",
  },
  {
    id: "135e4180-bba9-474f-bb32-e9c5ca093c7f",
    topic:
      "Visionary Insights: Janak Bhattrai's 2026 Outlook on AI's Role in BFSI",
    channel: "thought_leadership",
    pillar: "Founder's Journey & Vision",
    start: "2026-07-28T19:00:00Z",
    end: "2026-07-28T20:00:00Z",
    allDay: false,
    color: "#C52BE4",
    status: "draft",
    subtopics: [
      "Janak Bhattrai's futuristic AI vision in the BFSI industry",
      "Delving into Janak Bhattrai’s blueprint for AI-driven BFSI solutions",
      "How Janak Bhattrai sees AI revolutionizing finance services",
    ],
    keywords: [
      "Janak Bhattrai",
      "BFSI innovation",
      "AI vision",
      "custom AI solutions",
      "banking transformation",
    ],
    research_insight:
      "Janak Bhattrai emphasizes the opportunity for AI in banking and financial services, specifically in cutting bank loan processing times by integrating AI workflows.",
  },
  {
    id: "08e18992-d454-4a03-a1f8-c6f56ce445be",
    topic:
      "Harnessing AI Receptionists in 2026: Cost-Effective Customer Engagement Solutions",
    channel: "linkedin_article",
    pillar: "AI Receptionist",
    start: "2026-07-28T19:00:00Z",
    end: "2026-07-28T20:00:00Z",
    allDay: false,
    color: "#3EBFFF",
    status: "published",
    subtopics: [
      "AI Receptionists: Transforming Front-Desk Operations with Unmatched Efficiency",
      "AI vs Traditional Receptionists: Cost-Effective Solutions for Modern Businesses",
      "AI Receptionists as Growth Catalysts: How Small Businesses Are Benefiting",
    ],
    keywords: [
      "AI receptionist technology",
      "cost-effective AI",
      "customer engagement",
      "AI-driven front-desk",
      "business automation",
    ],
    research_insight:
      "The virtual receptionist market is projected to experience significant growth, reaching $9 billion by 2033, driven by advancements in NLP and ROI delivery.",
  },
  {
    id: "b41c2f4b-a4a7-4dd2-ad09-1fe43f7a9c55",
    topic: "The Automation Overhaul: AI's Impact on Customer Service in 2026",
    channel: "social",
    pillar: "Customer Service Automation",
    start: "2026-07-29T16:00:00Z",
    end: "2026-07-29T17:00:00Z",
    allDay: false,
    color: "#3186F5",
    status: "draft",
    subtopics: [
      "AI to handle 95% of customer interactions this year — are you ready?",
      "Transforming customer service: How AI is leading the 2026 automation charge.",
      "Navigating the AI-driven service landscape: Challenges and opportunities.",
    ],
    keywords: [
      "customer service automation",
      "AI chatbots 2026",
      "customer interaction",
      "service transformation",
      "automation trends",
    ],
    research_insight:
      "By 2026, AI is expected to manage 95% of customer support tasks, shifting enterprises towards predictive service models.",
  },
  {
    id: "0a976939-264f-41ad-aed6-0d27a716c479",
    topic: "Advancements in Customer Service Automation: A 2026 Perspective",
    channel: "blog",
    pillar: "Customer Service Automation",
    start: "2026-07-30T19:00:00Z",
    end: "2026-07-30T20:00:00Z",
    allDay: false,
    color: "#F1CC12",
    status: "draft",
    subtopics: [
      "Discover the cutting-edge advancements in customer service automation driving industry growth in 2026.",
      "Learn how businesses are achieving efficiency and enhanced customer satisfaction through service automation.",
      "Understand the strategic importance of automation in meeting rising consumer expectations and reducing costs.",
    ],
    keywords: [
      "customer service automation",
      "2026 AI trends",
      "business efficiency",
      "consumer expectations AI",
      "service automation growth",
    ],
    research_insight:
      'The customer service automation market is projected to grow significantly with a CAGR of 6.2% by 2033, driven by AI, machine learning, and cloud technology advancements. North America and Asia-Pacific regions are leading in this growth trajectory. "Customer Service Automation Market Size (2026-2033): The report highlights a market size rise at a CAGR of 6.2% per year. The industry\'s growth is strongly supported by AI advancements, with the market projected to expand considerably over the forecast period." "South Korea\'s customer service automation market is projected to grow at approximately 20% CAGR due to digital transformation and AI-focused governmental policies."',
  },
  {
    id: "cf265f02-f6d7-4531-8e8e-9d477d94e4d1",
    topic:
      "Exploring the Future of Customer Service Automation: Trends to Watch in 2026",
    channel: "linkedin_article",
    pillar: "Customer Service Automation",
    start: "2026-07-30T19:00:00Z",
    end: "2026-07-30T20:00:00Z",
    allDay: false,
    color: "#3EBFFF",
    status: "draft",
    subtopics: [
      "2026 Vision: AI-Driven Self-Service Revolutionizing Customer Support",
      "Automation's Impact: How Businesses Are Cutting Costs in Customer Service",
      "The AI-Driven Future: Transforming Customer Service with Predictive Support",
    ],
    keywords: [
      "customer service automation",
      "AI in customer service",
      "self-service AI",
      "predictive support",
      "AI-driven CX",
    ],
    research_insight:
      "Gartner predicts conversational AI will reduce global contact center labor costs by $80 billion by 2026, highlighting a major shift in customer service delivery.",
  },
  {
    id: "27301432-6ab6-462f-a536-637fb8a52b40",
    topic:
      "Pioneering the Path: Embracing AI Innovation in 2026 for Long-Term Impact",
    channel: "thought_leadership",
    pillar: "Thought Leadership",
    start: "2026-07-30T19:00:00Z",
    end: "2026-07-30T20:00:00Z",
    allDay: false,
    color: "#C52BE4",
    status: "draft",
    subtopics: [
      "The convergence of AI and thought leadership reshaping the future",
      "Leading through AI: Innovations setting new leadership benchmarks",
      "AI as a cornerstone of future strategic leadership models",
    ],
    keywords: [
      "AI innovation",
      "thought leadership",
      "strategic leadership",
      "AI future",
      "workforce development",
    ],
    research_insight:
      "The upcoming AI and Innovation Summit in 2026 highlights the role of AI in business, technology, and workforce development, focusing on strategic leadership through innovation.",
  },
  {
    id: "6d89f72d-6a4d-4a9a-ac2b-79f676b8e929",
    topic: "Strategizing AI-Enhanced Teams in 2026: A Guide for Leaders",
    channel: "social",
    pillar: "AI Staff Augmentation",
    start: "2026-07-31T16:00:00Z",
    end: "2026-07-31T17:00:00Z",
    allDay: false,
    color: "#3186F5",
    status: "publishing",
    subtopics: [
      "Align your workforce strategy with the latest AI staff augmentation insights.",
      "Driving innovation through AI-augmented teams: 2026 strategies revealed.",
      "Rethink staffing with AI: Insights into the evolving landscape for leaders.",
    ],
    keywords: [
      "AI-enhanced teams",
      "staffing strategy",
      "workforce innovation",
      "AI trends 2026",
      "leadership in AI",
    ],
    research_insight:
      "Global hiring models and AI integration are reshaping staff augmentation strategies in 2026, highlighting efficiency and innovation as key focuses.",
  },
]
