import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { image, filename } = await req.json();
    if (!image) {
      return new Response(JSON.stringify({ error: "No image provided" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY not configured");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          {
            role: "system",
            content: `You are an expert stock metadata generator. Analyze the image and generate optimized metadata for stock photography platforms.
Return a JSON object using the suggest_metadata tool with:
- title: descriptive, keyword-rich title (5-15 words)
- description: detailed description (20-50 words)
- keywords: array of 25-40 relevant single and multi-word keywords
- confidence: number 0-1 indicating metadata quality confidence
- platforms: object with keys for Adobe Stock, Shutterstock, Getty Images, iStock, Freepik, Dreamstime, Alamy, 123RF, Pond5. Each has title, description, keywords array, and ready boolean.`
          },
          {
            role: "user",
            content: [
              { type: "text", text: `Generate stock metadata for this image. Filename: ${filename || "image.jpg"}` },
              { type: "image_url", image_url: { url: `data:image/jpeg;base64,${image}` } }
            ]
          }
        ],
        tools: [{
          type: "function",
          function: {
            name: "suggest_metadata",
            description: "Return generated stock metadata",
            parameters: {
              type: "object",
              properties: {
                title: { type: "string" },
                description: { type: "string" },
                keywords: { type: "array", items: { type: "string" } },
                confidence: { type: "number" },
                platforms: {
                  type: "object",
                  additionalProperties: {
                    type: "object",
                    properties: {
                      title: { type: "string" },
                      description: { type: "string" },
                      keywords: { type: "array", items: { type: "string" } },
                      ready: { type: "boolean" }
                    },
                    required: ["title", "description", "keywords", "ready"]
                  }
                }
              },
              required: ["title", "description", "keywords", "confidence", "platforms"]
            }
          }
        }],
        tool_choice: { type: "function", function: { name: "suggest_metadata" } }
      }),
    });

    if (!response.ok) {
      const status = response.status;
      if (status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again later." }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (status === 402) {
        return new Response(JSON.stringify({ error: "Credits exhausted. Please add funds." }), {
          status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const text = await response.text();
      console.error("AI error:", status, text);
      throw new Error("AI gateway error");
    }

    const data = await response.json();
    const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];
    if (!toolCall) throw new Error("No tool call in response");

    const metadata = JSON.parse(toolCall.function.arguments);

    return new Response(JSON.stringify(metadata), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("generate-metadata error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
