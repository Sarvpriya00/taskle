import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const todos = await prisma.todo.findMany({
        where: { user: { email: session.user?.email ?? "" } },
        include: { subtasks: true },
        orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(todos);
}

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();

    const validCategories = ["Project1", "Project2", "Work", "Personal", "Other"];
    if (!validCategories.includes(body.category)) {
        return NextResponse.json({ error: "Invalid category" }, { status: 400 });
    }

    const todo = await prisma.todo.create({
        data: {
            title: body.title,
            dueDate: body.dueDate ? new Date(body.dueDate) : undefined,
            category: body.category,
            user: { connect: { email: session.user?.email ?? "" } },
        },
    });

    return NextResponse.json(todo);
}