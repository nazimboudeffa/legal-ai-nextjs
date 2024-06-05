import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import Image from 'next/image'
import Link from 'next/link'

export default async function ChatGPTWithX() {

    return (
        <main className="min-h-screen flex flex-col items-center justify-center w-full h-full">
            <Header
                heading="Penal Code and AI"
                subheading="Powered by ChatGPT"
            />
            <div className="flex flex-row justify-between gap-2">
            <Button asChild>
                <Link href="/books">Interract with books</Link>
            </Button>
            <Link href="https://fr.tipeee.com/nazimboudeffa" passHref={true}>                   
                <Image
                    src="tipeee_tip_btn.svg"
                    alt="tip"
                    height={80}
                    width={70} 
                />
            </Link>
            </div>
        </main>
    )
}