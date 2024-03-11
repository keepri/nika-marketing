export type Service = {
    title: string;
    description: string;
};

export const SERVICES: Array<Service> = [
    {
        title: "social media stratedy",
        description:
            "Elevate your brand's online presence. Targeted content and analytics-driven strategies. Let's engage, connect, and grow together.",
    },

    {
        title: "copywriting",
        description:
            "Words that captivate. Compelling copy for websites, ads, and more. We transform ideas into impactful narratives that resonate with your audience.",
    },

    {
        title: "offline marketing",
        description:
            "From print to presence, we amplify your brand beyond screens. Real-world connections for lasting impressions.",
    },

    {
        title: "content creation",
        description:
            "Creativity unleashed. Curate captivating content that sparks conversations, resonates, and builds your brand's identity.",
    },

    {
        title: "event planning",
        description:
            "eamless events, unforgettable experiences. From concept to execution, we curate occasions that leave lasting impressions.",
    },

    {
        title: "website",
        description:
            "Your digital home. We design, develop, and optimize websites that leave a stellar first impression and drive results.",
    },
] as const;
