import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

const roleList = [
    "Product Manager",
    "Frontend Developer",
    "Backend Developer",
    "UI/UX Designer",
    "QA Engineer",
] as const;

type Role = (typeof roleList)[number];

const roles: Role[] = [...roleList];

const taskBank: Record<Role, string[]> = {
    "Product Manager": [
        "Finalize MVP scope",
        "Write user stories for Sprint 1",
        "Prepare product roadmap",
        "Conduct stakeholder interviews",
        "Define product success metrics",
        "Analyze user feedback",
        "Schedule product review meeting",
        "Evaluate competitor apps",
        "Align product goals with team leads",
        "Sync with marketing on launch timeline",
    ],
    "Frontend Developer": [
        "Implement task list UI",
        "Connect frontend with API",
        "Fix responsiveness issues",
        "Set up Tailwind config",
        "Create reusable button components",
        "Build login/signup screens",
        "Add error handling in forms",
        "Refactor dashboard layout",
        "Integrate dark mode toggle",
        "Improve accessibility for inputs",
    ],
    "Backend Developer": [
        "Design database schema",
        "Implement user authentication",
        "Create REST API for todos",
        "Write tests for API routes",
        "Integrate Prisma ORM",
        "Add rate limiting to endpoints",
        "Fix bug in user session handling",
        "Optimize query performance",
        "Implement role-based access",
        "Set up daily DB backups",
    ],
    "UI/UX Designer": [
        "Design mobile layout",
        "Create onboarding flow mockups",
        "Define colour and typography styles",
        "Prototype user dashboard",
        "Review user journey map",
        "Conduct design audit",
        "Update Figma file for devs",
        "Create style guide",
        "Export assets for dev team",
        "Collaborate on dark mode UI",
    ],
    "QA Engineer": [
        "Write test plan for login flow",
        "Perform regression testing",
        "Test task creation edge cases",
        "Verify email validation",
        "File bugs for broken layouts",
        "Review production logs for errors",
        "Automate UI tests with Playwright",
        "Cross-browser test dashboard",
        "Validate API response structure",
        "Retest after backend fixes",
    ],
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const users = [
    { id: "U1", name: "Alice", email: "alice@taskle.io", password: "alice123", role: "Product Manager" },
    { id: "U2", name: "Bob", email: "bob@taskle.io", password: "bob123", role: "Frontend Developer" },
    { id: "U3", name: "Carol", email: "carol@taskle.io", password: "carol123", role: "Backend Developer" },
    { id: "U4", name: "David", email: "david@taskle.io", password: "david123", role: "UI/UX Designer" },
    { id: "U5", name: "Eve", email: "eve@taskle.io", password: "eve123", role: "QA Engineer" },
];

function getRandomDate() {
    const now = new Date();
    return new Date(now.getTime() + Math.floor(Math.random() * 14) * 86400000);
}

function getRandomElement<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
}

async function main() {

    /**
        if (
            process.env.NODE_ENV !== "development" &&
            process.env.NODE_ENV !== "test"
        ) throw new Error("Must run in development or testing!")
    
        if ((await prisma.user.count()) > 3) {
            throw new Error("Workspace count is high. Ensure you are not connected to production database!")
        }
    */
    // Clear previous data
    await prisma.subtask.deleteMany({});
    await prisma.todo.deleteMany({});
    await prisma.user.deleteMany({});

    // Now insert fresh data
    for (let i = 1; i <= 100; i++) {
        const role = getRandomElement(roles);
        const user = await prisma.user.create({
            data: {
                id: `U${i.toString().padStart(3, "0")}`,
                name: `User${i}`,
                email: `user${i}@taskle.io`,
                password: `user${i}pass`,
                todos: {
                    create: taskBank[role].slice(0, 5).flatMap((title) => [
                        {
                            title,
                            completed: Math.random() < 0.4,
                            dueDate: getRandomDate(),
                            category: getRandomElement(["Project1", "Project2", "Work", "Personal", "Other"]),
                            subtasks: {
                                create: [
                                    { title: `Discuss ${title}`, done: Math.random() < 0.5 },
                                    { title: `Document ${title}`, done: Math.random() < 0.5 },
                                ],
                            },
                        },
                        {
                            title: `${title} - follow up`,
                            completed: Math.random() < 0.4,
                            dueDate: getRandomDate(),
                            category: getRandomElement(["Project1", "Project2", "Work", "Personal", "Other"]),
                            subtasks: {
                                create: [
                                    { title: `Review notes on ${title}`, done: Math.random() < 0.5 },
                                    { title: `Recheck ${title}`, done: Math.random() < 0.5 },
                                ],
                            },
                        },
                    ]),
                },
            },
        });

        console.log(`🌱 Seeded user ${i}: ${user.email} (${role})`);
    }

}

main().catch(async (e: unknown) => {
    console.error("[ Error appeared ]:", e);
    process.exit(1);
}).finally(async () => {
    await prisma.$disconnect();
});