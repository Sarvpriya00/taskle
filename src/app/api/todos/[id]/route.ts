import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";


const prisma = new PrismaClient();


export async function PATCH(req: Request, { params }: { params: { id: string } }) {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();

    const todo = await prisma.todo.update({
        where: { id: Number(params.id) },
        data: {
            title: body.title,
            dueDate: body.dueDate ? new Date(body.dueDate) : undefined,
            category: body.category,
            completed: body.completed,
        },
    });

    return NextResponse.json(todo);
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    await prisma.todo.delete({
        where: { id: Number(params.id) },
    });

    return NextResponse.json({ success: true });
}