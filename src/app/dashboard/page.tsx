"use client";
import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent
} from "@/components/ui/chart";
import { useSession } from "next-auth/react";
type Task = {
    id: string;
    title: string;
    dueDate: string;
    category: string;
    completed: boolean;
};
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable"

import * as React from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarHeader,
    SidebarFooter,
} from "@/components/ui/sidebar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function DashboardPage() {
    const { data: session, status } = useSession();
    const [selectedProject, setSelectedProject] = React.useState("All");
    const [tasks, setTasks] = React.useState<Task[]>([]);
    const [title, setTitle] = React.useState("");
    const [dueDate, setDueDate] = React.useState<Date | undefined>();
    const [category, setCategory] = React.useState("");

    React.useEffect(() => {
        const fetchTasks = async () => {
            const response = await fetch("/api/todos");
            const data = await response.json();
            if (Array.isArray(data)) {
                setTasks(data);
            } else if (data && typeof data === "object" && !Array.isArray(data)) {
                // Wrap single object in an array
                setTasks([data]);
            } else {
                console.error("Unexpected response:", data);
                setTasks([]);
            }
        };
        fetchTasks();
    }, []);

    const categories = ["Project1", "Project2", "Work", "Personal", "Other"];
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
    
        if (status !== "authenticated" || !session) {
            console.error("User is not authenticated.");
            alert("You must be signed in to add a task.");
            return;
        }
    
        if (!dueDate) {
            alert("Please select a due date");
            return;
        }
    
        const newTask = {
            title,
            dueDate: dueDate.toISOString(),
            category,
            completed: false,
        };
    
        const response = await fetch("/api/todos", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newTask),
            credentials: "include",
        });
    
        if (response.ok) {
            const savedTask = await response.json();
            if (savedTask && savedTask.id) {
                console.log("Saved task:", savedTask);
                setTasks((prevTasks) => [...prevTasks, savedTask]);
            } else {
                console.error("Invalid task object returned from API:", savedTask);
            }
        } else {
            const errorText = await response.text();
            console.error("Failed to add task:", response.status, errorText);
            if (response.status === 401) {
                console.error("Unauthorized: Please check if user session is active.");
            }
        }
    
        setTitle("");
        setDueDate(undefined);
        setCategory("");
    };

    const handleComplete = async (taskId: string, completed: boolean) => {
        try {
            const response = await fetch(`/api/todos/${taskId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ completed }),
            });

            if (response.ok) {
                const updatedTask = await response.json();
                setTasks(prev =>
                    prev.map(t => (t.id === updatedTask.id ? updatedTask : t))
                );
            } else {
                console.error("Failed to update task:", await response.text());
            }
        } catch (err) {
            console.error("Error updating task:", err);
        }
    };

    const filteredTasks =
        selectedProject === "All" ? tasks : tasks.filter((task: Task) => task.category === selectedProject);

    const today = new Date().toDateString();
    const tasksToday = tasks.filter((task) =>
      new Date(task.dueDate).toDateString() === today
    );

    const completedCount = tasksToday.filter((task) => task.completed).length;
    const incompleteCount = tasksToday.length - completedCount;

    const chartData = [
      {
        label: "Today",
        completed: completedCount,
        remaining: incompleteCount,
      },
    ];

    const chartConfig = {
      completed: {
        label: "Completed",
        color: "#10b981", // green
      },
      remaining: {
        label: "Remaining",
        color: "#ef4444", // red
      },
    } satisfies ChartConfig;

    const overallCompleted = tasks.filter((task) => task.completed).length;
    const overallRemaining = tasks.length - overallCompleted;

    const chartDataOverall = [
      {
        label: "All Tasks",
        completed: overallCompleted,
        remaining: overallRemaining,
      },
    ];
    const chartDataByCategory = categories.map((category) => {
        const categoryTasks = tasks.filter((task) => task.category === category);

        const completedCount = categoryTasks.filter((task) => task.completed).length;
        const incompleteCount = categoryTasks.length - completedCount;

        return {
            category,
            completed: completedCount,
            remaining: incompleteCount,
        };
    });

    const chartConfigOverall = {
      completed: {
        label: "Completed",
        color: "#10b981",
      },
      remaining: {
        label: "Remaining",
        color: "#ef4444",
      },
    } satisfies ChartConfig;
    // Create a chart config for this new chart
    const chartConfigCategory = {
        completed: {
            label: "Completed",
            color: "#10b981", // green
        },
        remaining: {
            label: "Remaining",
            color: "#ef4444", // red
        },
    } satisfies ChartConfig;
    return (
        <>
            <SidebarProvider>
                <SidebarTrigger />
                <AppSidebar
                    selectedProject={selectedProject}
                    setSelectedProject={setSelectedProject}
                    categories={categories}
                />
                <main className="p-4 sm:p-6 max-w-screen-xl mx-auto dark:bg-background dark:text-foreground">
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4">
                        Dashboard
                    </h1>

                    <div className="flex flex-col lg:flex-row gap-6">
                        {/* Left Panel */}
                        <div className="flex-1 lg:max-w-sm space-y-4">
                            {/* Add Task Card */}
                            <Card className="bg-transparent shadow-none border-none w-full overflow-x-auto">
                                <CardHeader>
                                    <CardTitle>Add a New Task</CardTitle>
                                    <CardDescription>Fill in the task details below.</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <div>
                                            <Label htmlFor="title">Task Title</Label>
                                            <Input
                                                id="title"
                                                value={title}
                                                onChange={(e) => setTitle(e.target.value)}
                                                placeholder="Enter task title"
                                                className="w-full"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <Label htmlFor="dueDate">Due Date</Label>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <Button
                                                        variant="outline"
                                                        className={cn(
                                                            "w-full justify-start text-left font-normal",
                                                            !dueDate && "text-muted-foreground"
                                                        )}
                                                    >
                                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                                        {dueDate ? format(dueDate, "PPP") : <span>Pick a date</span>}
                                                    </Button>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-auto p-0" align="start">
                                                    <Calendar
                                                        mode="single"
                                                        selected={dueDate}
                                                        onSelect={setDueDate}
                                                        initialFocus
                                                    />
                                                </PopoverContent>
                                            </Popover>
                                        </div>

                                        <div>
                                            <Label htmlFor="category">Category</Label>
                                            <Select value={category} onValueChange={setCategory}>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Select category" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {categories.map((cat) => (
                                                        <SelectItem key={cat} value={cat}>
                                                            {cat}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <Button type="submit" className="w-full">
                                            Add Task
                                        </Button>
                                    </form>
                                </CardContent>
                            </Card>

                            {/* Task List */}
                            <div className="space-y-2 w-full overflow-x-auto">
                                {filteredTasks.map((task: Task) => {
                                    let formattedDate = "No due date";
                                    try {
                                        const date = new Date(task.dueDate);
                                        if (!isNaN(date.getTime())) {
                                            formattedDate = format(date, "PPP");
                                        }
                                    } catch (err) {
                                        console.error("Invalid date for task:", task, err);
                                    }

                                    return (
                                        <div
                                            key={task.id ?? task.title}
                                            className={`p-2 border rounded flex items-center justify-between ${task.completed ? "opacity-50 line-through" : ""
                                                }`}
                                        >
                                            <div>
                                                <strong>{task.title}</strong>
                                                <br />
                                                Due: {formattedDate}
                                            </div>
                                            <input
                                                type="checkbox"
                                                checked={task.completed}
                                                onChange={() => handleComplete(task.id, !task.completed)}
                                            />
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Right Panel */}
                        <div className="flex-[2] space-y-6 w-full overflow-x-auto">
                            {/* Small Charts Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Card className="overflow-x-auto">
                                    <CardHeader>
                                        <CardTitle>Today's Task Progress</CardTitle>
                                        <CardDescription>Completed vs Remaining Tasks</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <ChartContainer config={chartConfig} className="min-h-[200px] sm:min-h-[240px]">
                                            <BarChart accessibilityLayer data={chartData}>
                                                <CartesianGrid vertical={false} />
                                                <XAxis dataKey="label" tickLine={false} tickMargin={10} axisLine={false} />
                                                <YAxis allowDecimals={false} domain={[0, "dataMax + 1"]} />
                                                <ChartTooltip content={<ChartTooltipContent />} />
                                                <ChartLegend content={<ChartLegendContent />} />
                                                <Bar dataKey="completed" fill="var(--color-completed)" radius={4} />
                                                <Bar dataKey="remaining" fill="var(--color-remaining)" radius={4} />
                                            </BarChart>
                                        </ChartContainer>
                                    </CardContent>
                                </Card>

                                <Card className="overflow-x-auto w-full ">
                                    <CardHeader>
                                        <CardTitle>Overall Task Progress</CardTitle>
                                        <CardDescription>Completion stats for all tasks</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <ChartContainer config={chartConfigOverall} className="min-h-[200px] sm:min-h-[240px]">
                                            <BarChart accessibilityLayer data={chartDataOverall}>
                                                <CartesianGrid vertical={false} />
                                                <XAxis dataKey="label" tickLine={false} tickMargin={10} axisLine={false} />
                                                <YAxis allowDecimals={false} domain={[0, "dataMax + 1"]} />
                                                <ChartTooltip content={<ChartTooltipContent />} />
                                                <ChartLegend content={<ChartLegendContent />} />
                                                <Bar dataKey="completed" fill="var(--color-completed)" radius={4} />
                                                <Bar dataKey="remaining" fill="var(--color-remaining)" radius={4} />
                                            </BarChart>
                                        </ChartContainer>
                                    </CardContent>
                                </Card>
                            </div>

                            {/* Big Category Chart */}
                            <Card className="overflow-x-auto w-full ">
                                <CardHeader>
                                    <CardTitle>Task Progress by Category</CardTitle>
                                    <CardDescription>Completion stats for each category</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <ChartContainer config={chartConfigCategory} className="min-h-[300px] sm:min-h-[400px]">
                                        <BarChart data={chartDataByCategory}>
                                            <CartesianGrid vertical={false} />
                                            <XAxis dataKey="category" tickLine={false} tickMargin={10} axisLine={false} />
                                            <YAxis allowDecimals={false} domain={[0, "dataMax + 1"]} />
                                            <ChartTooltip content={<ChartTooltipContent />} />
                                            <ChartLegend content={<ChartLegendContent />} />
                                            <Bar dataKey="completed" fill="var(--color-completed)" radius={4} />
                                            <Bar dataKey="remaining" fill="var(--color-remaining)" radius={4} />
                                        </BarChart>
                                    </ChartContainer>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </main>
            </SidebarProvider>
        </>
    );
}

const AppSidebar = ({ selectedProject, setSelectedProject, categories }: { selectedProject: string; setSelectedProject: React.Dispatch<React.SetStateAction<string>>; categories: string[] }) => (
    <Sidebar>
        <SidebarHeader>
            <SidebarMenu>
                <SidebarMenuItem>
                    <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">Taskle</h2>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
            <SidebarGroup>
                <SidebarGroupLabel>Categories</SidebarGroupLabel>
                <SidebarGroupContent>
                    <SidebarMenu>
                        {categories.map((category) => (
                            <SidebarMenuItem key={category}>
                                <SidebarMenuButton asChild>
                                    <button
                                        onClick={() => setSelectedProject(category)}
                                        className="flex items-center gap-2 w-full text-left"
                                    >
                                        <span>{category}</span>
                                    </button>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroupContent>
            </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
            <SidebarMenu>
                <SidebarMenuItem>
                    <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">Username</h2>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarFooter>
    </Sidebar>
);