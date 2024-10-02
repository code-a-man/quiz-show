/*make handler for this 
await fetch(`https://localhost:3000/api/session/${params.uuid}/submit`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newAnswers),
        });

*/

export async function POST(request: Request) {
  const API_URL =
    process.env.NODE_ENV === "development"
      ? "http://localhost:8000"
      : "https://b541fc65b5ca985335f4f72e.deno.dev";
  try {
    const { uuid, newAnswers } = await request.json(); // Extract uuid from request body

    const response = await fetch(`${API_URL}/session/${uuid}/submit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newAnswers),
      cache: "force-cache",
    });

    const data = await response.json(); // Get the response data

    return new Response(JSON.stringify(data), {
      status: response.status,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error submitting quiz:", error);
    return new Response(JSON.stringify({ error: "Failed to submit quiz" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
