// RSVP submission — posts to Zapier webhook which appends to Google Sheets
export interface RSVPData {
  name: string;
  email: string;
  phone: string;
  attending: "yes" | "no" | "maybe";
  guestCount: number;
  events: string[];
  dietary: string;
  message: string;
}

export async function submitRSVP(data: RSVPData): Promise<{ success: boolean; error?: string }> {
  const webhookUrl = process.env.NEXT_PUBLIC_ZAPIER_WEBHOOK_URL;

  const payload = {
    ...data,
    events: data.events.join(", "),
    timestamp: new Date().toISOString(),
    source: "Wedding Website",
  };

  // Save to localStorage as fallback regardless
  try {
    if (typeof window !== "undefined") {
      const existing = JSON.parse(localStorage.getItem("rsvp_submissions") || "[]");
      existing.push(payload);
      localStorage.setItem("rsvp_submissions", JSON.stringify(existing));
      localStorage.setItem("rsvp_submitted", "true");
    }
  } catch {
    // ignore storage errors
  }

  if (!webhookUrl) {
    // No webhook configured — localStorage-only mode
    return { success: true };
  }

  try {
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    return { success: res.ok, error: res.ok ? undefined : "Server error" };
  } catch (err) {
    return { success: false, error: "Network error" };
  }
}

