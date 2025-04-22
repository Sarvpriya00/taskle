'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function GetStartedButton() {
    return (
        <Button asChild>
            <Link href="/login">Get Started</Link>
        </Button>
    )
}