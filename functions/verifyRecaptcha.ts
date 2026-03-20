Deno.serve(async (req) => {
  try {
    const { token } = await req.json();

    if (!token) {
      return Response.json({ success: false, error: 'No token provided' }, { status: 400 });
    }

    const secretKey = Deno.env.get('RECAPTCHA_SECRET_KEY');
    if (!secretKey) {
      return Response.json({ success: false, error: 'Secret key not configured' }, { status: 500 });
    }

    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `secret=${secretKey}&response=${token}`,
    });

    const data = await response.json();

    if (data.success && data.score >= 0.5) {
      return Response.json({ success: true, score: data.score });
    } else if (data.success && data.score < 0.5) {
      return Response.json({ success: false, error: 'Bot detected', score: data.score }, { status: 400 });
    } else {
      return Response.json({ success: false, error: 'reCAPTCHA verification failed', codes: data['error-codes'] }, { status: 400 });
    }
  } catch (error) {
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
});