import { NextRequest, NextResponse } from "next/server"
import { promptChatGPT } from "@/lib/chat"

export type ChatPrompt = {
    apiKey: string
    prompt: string
    document: string
}

export async function POST(request: NextRequest) {
    try {
        console.log(request)
        const chatPrompt = (await request.json()) as ChatPrompt

        if (!chatPrompt.apiKey || chatPrompt.apiKey.length == 0) {
            return NextResponse.json({
                success: true,
                result: {
                    text: "Please, set your OpenAI API key. It is required to use the chat.",
                },
            })
        }

        const response = await promptChatGPT(
            chatPrompt.apiKey,
            chatPrompt.prompt,
            chatPrompt.document
        )

        return NextResponse.json({
            success: true,
            result: response,
        })

    } catch (error) {
        console.log(error)

        return NextResponse.json(
            { success: false, message: "Internal application error" },
            { status: 500 }
        )
    }
}