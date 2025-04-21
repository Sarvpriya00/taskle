"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

export default function TodoForm({ onSubmit }: { onSubmit: (data: any) => void }) {
    const [title, setTitle] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [category, setCategory] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({ title, dueDate, category });
        setTitle(""); // Clear fields after submit
        setDueDate("");
        setCategory("");
    };

    return (
        
        <form onSubmit={handleSubmit} className="space-y-4">
            
            <div>
                <Label htmlFor="title">Task Title</Label>
                
                <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter task title"
                    required
                />
            </div>

            <div>
                <Label htmlFor="dueDate">Due Date</Label>
                <Input
                    id="dueDate"
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    required
                />
            </div>

            <div>
                
                <Label htmlFor="category">Category (Project)</Label>
                <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select project" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Work">Work</SelectItem>
                        <SelectItem value="Personal">Personal</SelectItem>
                        <SelectItem value="Urgent">Urgent</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <Button type="submit" className="w-full">Add Task</Button>
        </form>
    );
}