import { AWARDS } from "@/features/profile/data/awards";
import { CERTIFICATIONS } from "@/features/profile/data/certifications";
import { EXPERIENCES } from "@/features/profile/data/experiences";
import { PROJECTS } from "@/features/profile/data/projects";
import { SOCIAL_LINKS } from "@/features/profile/data/social-links";
import { TECH_STACK } from "@/features/profile/data/tech-stack";
import { USER } from "@/features/profile/data/user";

const aboutText = `## About

${USER.about.trim()}

### Personal Information

- First Name: ${USER.firstName}
- Last Name: ${USER.lastName}
- Display Name: ${USER.displayName}
- Job Title: ${USER.jobTitle}
- Location: ${USER.address}
- Website: ${USER.website}

### Social Links

${SOCIAL_LINKS.map((item) => `- [${item.title}](${item.href})`).join("\n")}

### Tech Stack

${TECH_STACK.map((item) => `- [${item.title}](${item.href})`).join("\n")}\n`;

const experienceText = `## Experience

${EXPERIENCES.map((item) =>
  item.positions
    .map((position) => {
      const skills = position.skills?.map((skill) => skill).join(", ") || "N/A";
      return `### ${position.title} | ${item.companyName}\n\nDuration: ${position.employmentPeriod.start} - ${position.employmentPeriod.end || "Present"}\n\nSkills: ${skills}\n\n${position.description?.trim()}`;
    })
    .join("\n\n")
).join("\n\n")}
`;

const projectsText = `## Projects

${PROJECTS.map((item) => {
  const skills = `\n\nSkills: ${item.skills.join(", ")}`;
  const description = item.description ? `\n\n${item.description.trim()}` : "";
  return `### ${item.title}\n\nProject URL: ${item.link}${skills}${description}`;
}).join("\n\n")}
`;

const awardsText = `## Awards

${AWARDS.map((item) => `### ${item.prize} | ${item.title}\n\n${item.description}`).join("\n\n")}
`;

const certificationsText = `## Certifications

${CERTIFICATIONS.map((item) => `- [${item.title}](${item.credentialURL})`).join("\n")}`;

const content = `<SYSTEM>This document contains detailed information about ${USER.displayName}'s professional profile and portfolio. It includes personal details, work experience, projects, achievements, and certifications, formatted for consumption by Large Language Models (LLMs) to provide accurate, up-to-date information about ${USER.displayName}'s background, skills, and expertise as a ${USER.jobTitle}.</SYSTEM>

# ${USER.displayName}

> ${USER.bio}

${aboutText}
${experienceText}
${projectsText}
${awardsText}
${certificationsText}`;

export const dynamic = "force-static";

export async function GET() {
  return new Response(content, {
    headers: {
      "Content-Type": "text/markdown;charset=utf-8",
    },
  });
}
