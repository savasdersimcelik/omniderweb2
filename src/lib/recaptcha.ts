type RecaptchaVerifyResult = {
  ok: true;
  score: number;
} | {
  ok: false;
  reason: "missing" | "unavailable" | "failed" | "action" | "score";
};

export async function verifyRecaptchaV3(options: {
  token: string | undefined;
  action: string;
  remoteIp?: string | null;
}): Promise<RecaptchaVerifyResult> {
  const secret = process.env.RECAPTCHA_SECRET?.trim();
  if (!secret) {
    // Dev / misconfig: skip verification when secret is absent.
    return { ok: true, score: 1 };
  }

  if (!options.token) {
    return { ok: false, reason: "missing" };
  }

  const minScore = Number(process.env.RECAPTCHA_MIN_SCORE || 0.5);
  const body = new URLSearchParams({
    secret,
    response: options.token,
  });

  if (options.remoteIp) {
    body.set("remoteip", options.remoteIp);
  }

  let response: Response;
  try {
    response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
    });
  } catch {
    return { ok: false, reason: "unavailable" };
  }

  if (!response.ok) {
    return { ok: false, reason: "unavailable" };
  }

  const data = (await response.json()) as {
    success?: boolean;
    score?: number;
    action?: string;
  };

  if (!data.success) {
    return { ok: false, reason: "failed" };
  }

  if ((data.action || "") !== options.action) {
    return { ok: false, reason: "action" };
  }

  const score = Number(data.score ?? 0);
  if (score < minScore) {
    return { ok: false, reason: "score" };
  }

  return { ok: true, score };
}
