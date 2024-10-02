export async function GET(request: Request) {
  const API_URL =
    process.env.NODE_ENV === "development"
      ? "http://localhost:8000"
      : "https://b541fc65b5ca985335f4f72e.deno.dev";

  try {
    // X-Session-Id is the UUID of the quiz session

    const uuid = request.headers.get("X-Session-Id");

    if (!uuid) {
      return new Response(JSON.stringify({ error: "No UUID provided" }), {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    const response = await fetch(`${API_URL}/session/${uuid}`, {
      method: "GET",
      cache: "force-cache",
    });
    console.log("Response:", response);
    const data = await response.json(); // Get the response data

    return new Response(JSON.stringify(data), {
      status: response.status,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error fetching quiz:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch quiz" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
