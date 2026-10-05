import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const convs = [
  `
Anomoly: What are you eating?

You: whoo whoo are u?

Anomoly: Don't you remember me? How rude of you...

You: i don't remember who you are? where are you?

Anomoly: haha you are lovelyy.

You: lovely wha.. whaat u mean ?.

Anomaly: Don't be scared.

You: why are you doing this?

Anomaly: Doing what?

You: talking to me like this.

Anomaly: I'm just talking to an old friend.

You: I'M NOT YOUR FRIEND.

Anomaly: You used to be.

You: I've never seen you before.

Anomaly: You have.

You: WHEN?

Anomaly: You were younger.

You: who are you???

Anomaly: Someone you forgot.

You: please just leave me alone.

Anomaly: I would.

You: then go.

Anomaly: I can't.

You: WHY?

Anomaly: Because you're looking at me.

You: WHAT?

Anomaly: Don't look around.

You: where are you?

Anomaly: You really want to know?

You: yes.

Anomaly: Look at your window.

You: ...

Anomaly: No, don't.

You: WHY DID YOU TELL ME TO LOOK?

Anomaly: I wanted to see if you would listen.

You: I don't see anyone.

Anomaly: Good.

You: what do you mean good?

Anomaly: It means I'm still outside.

You: ...

You: I'm closing the curtains.

Anomaly: Don't.

You: WHY?

Anomaly: I like seeing you.

You: please stop.

Anomaly: Okay.

You: ...

Anomaly: You can stop shaking now.

You: HOW DO YOU KNOW I'M SHAKING?

Anomaly: Because I can see your hands.

You: ...

Anomaly: Don't worry.

You: what?

Anomaly: I'll come inside soon.

`,
  `
Anomaly: Are you home?

You: who is this?

Anomaly: You don't recognize me?

You: no. who are you?

Anomaly: That's okay.

You: how did you get my number?

Anomaly: I didn't.

You: then how are you messaging me?

Anomaly: You gave it to me.

You: I never gave you my number.

Anomaly: You gave me something better.

You: what?

Anomaly: Your address.

You: ...

You: who are you?

Anomaly: Someone standing outside.

You: outside where?

Anomaly: Your house.

You: stop messing with me.

Anomaly: I'm not.

You: I'm calling the police.

Anomaly: You can.

You: ...

Anomaly: But they're going to have trouble finding me.

You: why?

Anomaly: Because I'm not outside anymore.

You: WHERE ARE YOU?

Anomaly: Don't turn around.

You: ...

Anomaly: I'm sorry.

You: sorry for what?

Anomaly: I thought you knew I was already inside.
`,
  `
Anomaly: Hello.

You: who are you?

Anomaly: Nobody important.

You: how did you get my email?

Anomaly: You left it open.

You: where?

Anomaly: On your computer.

You: I haven't shared it with anyone.

Anomaly: I know.

You: then how do you know me?

Anomaly: I don't know you.

You: then why are you talking to me?

Anomaly: Because I've been watching you.

You: ...

You: watching me where?

Anomaly: Everywhere.

You: what do you want?

Anomaly: Nothing.

You: then leave me alone.

Anomaly: Okay.

You: ...

You: wait.

You: how do you know what room I'm in?

Anomaly: Because I can see it.

You: what the hell?

Anomaly: Your curtains are open.

You: ...

You: I'm closing them.

Anomaly: Don't.

You: why?

Anomaly: Because then I won't be able to see you.

You: WHO ARE YOU?

Anomaly: I told you.

You: what?

Anomaly: Nobody important.

You: ...

Anomaly: But you should probably turn off your light.

You: why?

Anomaly: It makes it very easy to see you from here.
`,
];

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed",
    });
  }

  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        error: "Email is required",
      });
    }

    const message = convs[Math.floor(Math.random() * convs.length)];

    const { data, error } = await resend.emails.send({
      from: "Halloween Egg <spooky@halloweenegg.xyz>",

      to: email,

      subject: "Someone wanted to see you ...",

      html: `
        <div style ="margin:0; padding: 0;
        background: #f8f8f8;
        font-family: Georgia, 'Times New Roman', serif;">

          <div style=" max-width: 640px;  min-height: 960px;  margin: 0 auto;  background-image: url(https://egg-orpin.vercel.app/side-wall.jpg); background-size: 100% 100%; background-position: center;  background-repeat: no-repeat; padding: 150px 90px 130px 90px; box-sizing: border-box; text-align: center; ">

            <h1 style=" margin: 0 0 40px 0; font-family: Georgia, serif; font-size: 34px; letter-spacing: 3px; color: #24160d;">
              YOU HAVE A MESSAGE
            </h1>

            <p style=" font-size: 18px;  line-height: 1.8; color: #302015; white-space: pre-wrap; text-align: left; ">
              ${message}
            </p>

            <div style="margin-top: 70px; padding: 20px;">

              <p style="font-size: 16px; color: #4b2c1a; ">
                Have a gift from me <:)
              </p>

              <a href="https://cdn.phototourl.com/member/2026-09-30-b2fb2e23-3dad-4810-b1e5-eac6eaf2291a.webp" style="  display: inline-block;  margin-top: 15px; padding: 14px 25px; background: #21150e; color: #fff; text-decoration: none; font-family: Georgia, serif; letter-spacing: 2px; border-radius: 10px;">
                OPEN
              </a>

            </div>

            <p style="margin-top: 80px;  font-size: 11px; letter-spacing: 2px;  color: #5b493c; ">
              DON'T LOOK AWAY.
            </p>

          </div>

        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);

      return res.status(500).json({
        error: "Failed to send email",
      });
    }

    return res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    console.error("Server error:", error);

    return res.status(500).json({
      error: "Something went wrong",
    });
  }
}
