export async function POST(request: Request) {
  // localhost:8000/bilisimekipyonetim/create-session
  // ctx.response.body = { message: "Session oluşturuldu!", sessionUUID: uuid };
  // I want to send jwt token to the api in headers	to verify the user

  const API_URL =
    process.env.NODE_ENV === "development"
      ? "http://localhost:8000"
      : "https://b541fc65b5ca985335f4f72e.deno.dev";

  const jwt = request.headers.get("Authorization");

  if (!jwt) {
    return new Response(JSON.stringify({ error: "No JWT provided" }), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  const response = await fetch(`${API_URL}/bilisimekipyonetim/create-session`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${jwt}`,
    },
    cache: "no-cache",
  });
  const data = await response.json();
  return new Response(JSON.stringify(data), {
    status: response.status,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
