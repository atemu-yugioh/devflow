import { NextResponse } from "next/server";

// const openAI = "https://api.openai.com/v1"

export const POST = async (request: Request) => {
  const { question } = await request.json();
  try {
    // const response = await fetch(`${openAI}/chat/completions`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: `Bearer ${process.env.OPEN_API_KEY}`,
    //   },
    //   body: JSON.stringify({
    //     model: "gpt-3.5-turbo",
    //     messages: [
    //       {
    //         role: "system",
    //         content:
    //           "You are a knowlegeable assistant that provides quality information.",
    //       },
    //       {
    //         role: "user",
    //         content: `Tell me ${question}`,
    //       },
    //     ],
    //   }),
    // });

    // const responseData = await response.json();

    // const reply = responseData.choices[0].message.content;
    // console.log("🚀 ~ POST ~ reply:", reply);
    const reply = "You must payment to use AI Answer";
    return NextResponse.json({ reply });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
};
